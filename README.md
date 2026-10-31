# Anatomiapeli V8 – QA-navigaatio + QA6.1

**QA5 lukittu: 43 tarkistettua ja hyväksyttyä kysymystä.** Niiden anatomista sisältöä, kuvia tai nuolia ei ole muutettu.

## Uutta: erillinen QA-/testausnavigaatio

- Tavallinen opiskelupeli toimii kuten ennenkin.
- Yläpalkin **QA-tarkastus** avaa erillisen testausnäkymän.
- **Näytä vain review-kysymykset** avaa tällä hetkellä suoraan QA6.1:n kolme uutta kysymystä.
- QA-erät voi avata myös yksitellen: QA1, QA2, QA3, QA4, QA5 ja QA6.1.
- Kysymyksen yhteydessä QA-tilassa näkyy erä sekä status `locked` / `review`.
- URL-parametri `?qa=1` avaa QA-valikon suoraan.
- Kalibrointi `?calibrate=1` toimii edelleen.

## QA-status kysymysdatassa

Jokaisella kysymyksellä on nyt kentät `qa` ja `status`.

- kysymykset 1–43: `status: 'locked'`
- QA6.1 / kysymykset 44–46: `status: 'review'`

## QA6.1 – jalkaterän luuryhmät

- nilkan luut
- jalkapöydän luut
- varpaiden luut

Yhteensä 46 kysymystä.
