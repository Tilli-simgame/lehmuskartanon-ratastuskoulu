# Ilmoitustaulu Backend Setup

Tämä kansio sisältää ilmoitustaulun backend-tiedostot.

## Tiedostot
- [ilmoitustaulu-worker.js](ilmoitustaulu-worker.js) - Cloudflare Workerin lähdekoodi.
- [ilmoitustaulu-schema.sql](ilmoitustaulu-schema.sql) - D1-tietokannan rakenne (schema).

## Pikaohje
1. Luo Cloudflaressa uusi Worker (nimellä `board`) ja D1-tietokanta.
2. Aja `ilmoitustaulu-schema.sql` tietokannan konsolissa.
3. Bindaa D1-tietokanta Workeriin nimellä `DB`.
4. Lisää `TURNSTILE_SECRET_KEY` Environment Variableksi.
5. Kopioi `ilmoitustaulu-worker.js` koodi Workeriin.
6. Varmista, että Workerin osoite on `board.anniina-sipria.workers.dev`.
