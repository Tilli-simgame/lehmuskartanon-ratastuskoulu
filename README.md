# Lehmuskartanon Ratsastuskoulu

Tämä on Lehmuskartanon Ratsastuskoulun Jekyll-pohjainen verkkosivusto.

## Paikallinen kehitys

### Ohjelmistovaatimukset
- **Ruby**: Versio 3.0 tai uudempi suositeltu.
- **Bundler**: Rubyn riippuvuuksien hallintaan (`gem install bundler`).
- **Git**: Versiohallintaan.

### Asennus
1. Avaa komentorivi projektin kansiossa.
2. Aja komento:
   ```bash
   bundle install
   ```
   Tämä asentaa kaikki tarvittavat gemit (Jekyll, teemat ja lisäosat).

### Jekyllin ajaminen lokaalisti
Käynnistä kehityspalvelin komennolla:
```bash
bundle exec jekyll serve
```
Sivusto on tämän jälkeen saatavilla osoitteessa: `http://localhost:4000/lehmuskartanon-ratastuskoulu/`

---

## Hevosten päivittäminen (Contentful Sync)

Sivuston hevosprofiilit haetaan Contentful-sisällönhallintajärjestelmästä `sync_horses.rb`-skriptillä.

### Määritykset (.env)
Varmista, että projektin juuressa on `.env`-tiedosto, joka sisältää seuraavat tiedot:
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
STABLE_NAME=Lehmuskartanon Ratsastuskoulu
```

### Hevosten synkronointi
Kun haluat päivittää hevoset Contentfulista, aja komento:
```bash
ruby sync_horses.rb
```
Skripti luo hevosprofiilit markdown-tiedostoina `_hevoset/`-kansioon. Päivityksen jälkeen Jekyll-palvelin huomaa muutokset automaattisesti, jos se on käynnissä.
