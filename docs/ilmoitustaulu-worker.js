/* Ilmoitustaulu Worker koodi */
export default {
    async fetch(request, env, ctx) {
        // Cors headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Expose-Headers': 'X-Total-Count',
        };

        // Preflight request (CORS)
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);

        // HAE ILMOITUKSET
        if (url.pathname === '/api/board' && request.method === 'GET') {
            try {
                const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 50);
                const offset = parseInt(url.searchParams.get('offset') || '0');

                // Hae viestit
                const { results } = await env.DB.prepare(
                    'SELECT * FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?'
                ).bind(limit, offset).all();

                // Hae kokonaismäärä paginationia varten
                const countResult = await env.DB.prepare('SELECT COUNT(*) as total FROM messages').first();
                const totalCount = countResult.total;

                return new Response(JSON.stringify(results), {
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                        'X-Total-Count': totalCount.toString()
                    }
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
            }
        }

        // TALLENNA UUSI ILMOITUS
        if (url.pathname === '/api/board' && request.method === 'POST') {
            try {
                const data = await request.json();

                // 1. Turnstile validointi
                const token = data['cf-turnstile-response'];
                if (!token) {
                    return new Response(JSON.stringify({ error: 'Turnstile token missing' }), { status: 400, headers: corsHeaders });
                }

                const formData = new FormData();
                formData.append('secret', env.TURNSTILE_SECRET_KEY);
                formData.append('response', token);

                const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                    method: 'POST',
                    body: formData,
                });

                const turnstileData = await turnstileRes.json();
                if (!turnstileData.success) {
                    return new Response(JSON.stringify({ error: 'Turnstile validation failed' }), { status: 400, headers: corsHeaders });
                }

                // 2. Viestin validointi ja tallennus
                let name = (data.name || 'Nimetön').substring(0, 100).trim();
                let title = (data.title || '').substring(0, 200).trim();
                let message = data.message;
                if (!message) {
                    return new Response(JSON.stringify({ error: 'Viesti puuttuu' }), { status: 400, headers: corsHeaders });
                }

                await env.DB.prepare(
                    'INSERT INTO messages (name, title, email, message) VALUES (?, ?, ?, ?)'
                ).bind(
                    name,
                    title,
                    (data.email || '').substring(0, 100).trim(),
                    message.substring(0, 3000).trim()
                ).run();

                return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
            } catch (error) {
                return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
            }
        }

        return new Response('API Endpoint not found. Use /api/board', { status: 404, headers: corsHeaders });
    }
};
