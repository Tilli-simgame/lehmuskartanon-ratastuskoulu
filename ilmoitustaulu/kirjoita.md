---
layout: default
title: Jätä ilmoitus
theme: muuta
---

<link rel="stylesheet" href="{{ '/assets/css/board.css' | relative_url }}">
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<div class="board-container">
    <h1>Ilmoitustaulu</h1>
    <hr>

    <div class="board-rules">
        <ul>
            <li><strong>Ohje:</strong> Voit lisätä ilmoituksesi alkuun tagin asettamalla sen hakasulkeisiin, esim. <span class="board-tag tag-sell">[myydään]</span>, <span class="board-tag tag-buy">[ostetaan]</span>, <span class="board-tag tag-trade">[vaihdetaan]</span> tai <span class="board-tag tag-general">[etsitään]</span>. Se väritetään automaattisesti ilmoitustaululla.</li>
            <li><strong>Muista maili:</strong> Muista ilmoittaa e-mailisi jos haluat että sinuun otetaan yhteyttä!</li>
            <li><strong>Pysy aiheessa:</strong> Ei spämmäystä tai asiattomuuksia.</li>
        </ul>
    </div>

    <div class="board-nav">
        <a href="{{ '/ilmoitustaulu.html' | relative_url }}">&laquo; Takaisin ilmoitustaululle</a>
    </div>

    <div class="board-form-container" id="gb-form">
        <h3 style="margin-top: 0;">Jätä uusi ilmoitus</h3>
        <form id="gb-form-el">
            <div class="board-form-group">
                <label for="name">Nimi:</label>
                <input type="text" id="name" name="name" required placeholder="Nimesi">
            </div>
            <div class="board-form-group">
                <label for="title">Ilmoituksen otsikko:</label>
                <input type="text" id="title" name="title" required placeholder="Esim: [myydään] vähän käytetyt ratsastussaappaat">
            </div>
            <div class="board-form-group">
                <label for="email">Sähköposti:</label>
                <input type="email" id="email" name="email" placeholder="Sähköpostiosoitteesi (valinnainen)">
            </div>
            <div class="board-form-group">
                <label for="message">Ilmoitus:</label>
                <textarea id="message" name="message" required placeholder="Esim: [myydään] vähän käytetyt ratsastussaappaat..."></textarea>
            </div>
            
            <!-- Turnstile Widget -->
            <div class="cf-turnstile" data-sitekey="0x4AAAAAACoTiePPXl9kCVYY" style="margin-bottom: 15px;"></div>
            
            <button type="submit" class="board-submit-btn" id="submit-btn">Lähetä ilmoitus!</button>
        </form>
        <div id="form-status" style="margin-top: 15px; font-weight: bold; text-align: center;"></div>
    </div>
</div>

<script>
    const API_URL = 'https://board.anniina-sipria.workers.dev/api/board';
    const gbForm = document.getElementById('gb-form-el');
    const formStatus = document.getElementById('form-status');

    gbForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        formStatus.textContent = 'Lähetetään...';

        const token = document.querySelector('[name="cf-turnstile-response"]').value;
        if (!token) {
            formStatus.style.color = '#c62828';
            formStatus.textContent = 'Ole hyvä ja suorita spämmitarkistus.';
            submitBtn.disabled = false;
            return;
        }

        const data = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            'cf-turnstile-response': token
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Lähetys epäonnistui');
            
            formStatus.style.color = '#2e7d32';
            formStatus.innerHTML = 'Ilmoitus lisätty! <br><br><a href="{{ "/ilmoitustaulu.html" | relative_url }}" style="color:#2e7d32; text-decoration:underline;">Palaa takaisin lukemaan ilmoituksia tästä.</a>';
            gbForm.reset();
            if (window.turnstile) window.turnstile.reset();
        } catch (err) {
            formStatus.style.color = '#c62828';
            formStatus.textContent = 'Virhe lähetyksessä. (Tietokantaa tai workeria ei ehkä ole vielä konfiguroitu oikein)';
            console.error(err);
        } finally {
            submitBtn.disabled = false;
        }
    });
</script>
