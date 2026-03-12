---
layout: default
title: Lehmuskartanon Ratsastuskoulun lokikirja
theme: toiminta
---

<link rel="stylesheet" href="{{ '/assets/css/guestbook.css' | relative_url }}">
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<div class="guestbook-container">
    <h1>Lehmuskartanon Ratsastuskoulu</h1>
    <h2>LOKIKIRJA</h2>
    <hr>
    <img src="{{ '/assets/img/uni1.gif' | relative_url }}" alt="" class="guestbook-header-img">

    <div class="gb-nav">
        <a href="{{ '/toiminta/lokikirja.html' | relative_url }}"> Takaisin lokikirjaan</a>
    </div>

    <div class="guestbook-form" id="gb-form">
        <h3>Laita muistot talteen!</h3>
        <form id="gb-form-el">
            <div class="form-group">
                <label for="name">Nimi :</label>
                <input type="text" id="name" name="name" required placeholder="Nimesi">
            </div>
            <div class="form-group">
                <label for="email">@ :</label>
                <input type="email" id="email" name="email" placeholder="Sähköpostiosoitteesi (valinnainen)">
            </div>
            <div class="form-group">
                <label for="event_type">Tapahtuma :</label>
                <select id="event_type" name="event_type" required>
                    <option value="">-- Valitse tapahtuma --</option>
                    <option value="Aloittelijaleiri">Aloittelijaleiri</option>
                    <option value="Kouluratsastusleiri">Kouluratsastusleiri</option>
                    <option value="Esteleiri">Esteleiri</option>
                    <option value="Erikoisleiri">Erikoisleiri</option>
                    <option value="Metsävaellus">Metsävaellus</option>
                    <option value="Rantavaellus">Rantavaellus</option>
                    <option value="Muu leiri tai vaellus">Muu leiri tai vaellus</option>
                </select>
            </div>
            <div class="form-group">
                <label for="message">Kertomus :</label>
                <textarea id="message" name="message" required placeholder="Kerro miten meni..."></textarea>
            </div>
            <!-- Turnstile Widget -->
            <div class="cf-turnstile" data-sitekey="0x4AAAAAACn-0CzwlsyjJaLi" style="margin-bottom: 10px;"></div>

            <button type="submit" class="submit-btn" id="submit-btn" style="width: 100%;">Lähetä lokikirjaus!</button>
        </form>
        <div id="form-status" style="margin-top: 10px; font-weight: bold; text-align: center;"></div>
    </div>
</div>

<script>
    const API_URL = 'https://guestbook.anniina-sipria.workers.dev/api/lokikirja';
    const gbForm = document.getElementById('gb-form-el');
    const formStatus = document.getElementById('form-status');

    gbForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        formStatus.textContent = 'Lähetetään...';

        const token = document.querySelector('[name="cf-turnstile-response"]').value;
        if (!token) {
            formStatus.style.color = 'orange';
            formStatus.textContent = 'Ole hyvä ja suorita spämmitarkistus.';
            submitBtn.disabled = false;
            return;
        }

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            event_type: document.getElementById('event_type').value,
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

            formStatus.style.color = 'green';
            formStatus.innerHTML = 'Lokikirjaus lähetetty! <br><a href="{{ "/toiminta/lokikirja.html" | relative_url }}">Palaa takaisin lokikirjaan tästä.</a>';
            gbForm.reset();
            if (window.turnstile) window.turnstile.reset();
        } catch (err) {
            formStatus.style.color = 'red';
            formStatus.textContent = 'Virhe lähetyksessä.';
            console.error(err);
        } finally {
            submitBtn.disabled = false;
        }
    });
</script>

<div style="margin-top: 30px; text-align: center; font-size: 0.8em; color: #999;">
    inspired by freebok.net
</div>
