# Il Casale delle Erbe

Sito vetrina dell'azienda agricola biologica ed erboristeria contadina
Il Casale delle Erbe — Via Cafarette 6, Bolzano Vicentino (VI).

Sito statico: nessuna build, nessuna dipendenza. Si apre `index.html` e funziona.

## Struttura

    index.html      tutta la pagina (HTML + CSS + JS in un file solo)
    favicon.png     icona della scheda del browser
    immagini/       tutte le foto, già ottimizzate per il web
    .nojekyll       dice a GitHub Pages di servire i file così come sono

## Pubblicare con GitHub Pages

1. Carica questi file in un repository **pubblico**.
2. Nel repository: Settings → Pages.
3. In "Source" scegli **Deploy from a branch**, ramo `main`, cartella `/ (root)`.
4. Salva. Dopo un paio di minuti il sito è online su
   `https://TUO-UTENTE.github.io/NOME-REPOSITORY/`

## Da completare prima del lancio

- **Modulo di iscrizione**: in `index.html` cerca `TUO-ID-FORMSPREE` e
  sostituiscilo con l'endpoint del tuo modulo gratuito creato su formspree.io.
  Finché non lo fai, il pulsante avvisa che il modulo non è collegato.
- **Dati da confermare**: indirizzo (Via Cafarette 6 o Via Roma 52), orari di
  apertura, testi degli eventi, e la risposta sulle spedizioni nelle domande frequenti.

## Modificare i testi

Sono tutti dentro `index.html`, in chiaro, in italiano. Cerca la frase che vuoi
cambiare e riscrivila. Le sezioni sono separate da commenti in maiuscolo
(`APERTURA`, `ERBARIO`, `EVENTI`, `DOMANDE`, ecc.).
