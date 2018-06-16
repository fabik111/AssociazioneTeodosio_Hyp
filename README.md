# Progetto Hypermedia 2018
Progetto di hypermedia AA 2017-2018: Associazione Teodosio

## Heroku url
```
https://polimi-hyp-2018-team-10490408.herokuapp.com/index.html
```

## Team
- Team Administrator: Centonze Fabio Massimo 10490408 
- Team member n.2   : Baldasseroni Eva 10522652
- Team member n.3   : Di Clemente Francesco 10422431

## Workflow
- Baldasseroni Eva: Creazione delle pagine Multiple Topic Service, Location e People; Creazione della pagina Group All events; gestione delle immagini
- Centonze Fabio Massimo: Gestione della Repo e deployment; modifiche al template (modifiche toolbar, header, footer, style.css per responsivity); creazione pagine Single Topic Chi siamo, News, Contatti, Dona. 
- Di Clemente Francesco: Creazione delle pagine Groups All Service, All People, All location; creazione pagina Multiple Group Services by Location X;

## Strumenti usati
### Front-End
- Framework
```
- Bootstrap v 3.3.7
```
- Linguaggi
```
- HTML5
- CSS3
- Javascript (JQuery, Stellar http://markdalgleish.com/projects/stellar.js, Waypoints http://imakewebthings.com/waypoints/)
```
- Template
```
- Flexor https://bootstrapmade.com/flexor-free-multipurpose-bootstrap-template/
```
- Guida ai CSS
```
- bootstrap-*.css      //Framework
- font-awesome.css     //CSS Caratteri speciali
- 1-col-portfolio.css  //CSS Layout pagine
- owl-*css             //CSS slide-show homepage
- style.css            //CSS Generico
- lightbox.css         //CSS Modal slideshow (Locations, Events)
```
### Back-end
- Motore JS
```
- NodeJS
```
- Framework usati
```
- Express JS      
- Process
- Body-parser
- Lodash
- Knex.js
```
- Tabelle nel database
```
- Services //Informazioni relative alle pagine servizi: id, nome, descrizione, link immagini    
- Location //Informazioni relative alle pagine location: id, nome, descrizione, link immagini, link mappa
- People   //Informazioni relative alle pagine persona: id, nome, descrizione, link immagini, qualifica
- Events   //Informazioni relative alle pagine eventi: id, nome, descrizione, link immagini
- Agenda   //Tabella contenente la schedulazione delle attività dell'associazione Servizio (Cosa) - Location (Dove) - Persona (Chi) - Orario (Quando)
- Messages //Tabella contenente i messaggi ricevuti dal contact form: id, nome, cognome, email, messaggio
```
- API REST
#### Pagine Servizio
```
/service/:id (id del servizio di cui si stanno richiedendo le risorse) 
```
#### Pagine Persona
```
/person/:id (id della persona di cui si stanno richiedendo le risorse) 
```
#### Pagine Location
```
/location/:id (id della location di cui si stanno richiedendo le risorse) 
```
#### Pagine Eventi
```
/event/:id (id dell'evento di cui si stanno richiedendo le risorse) 
```
#### Informazioni dall'agenda per pagine Servizio e Persona
```
/agenda?page=type&id=id ("page" va completato con il nome della categoria da cui estrarre informazioni [services,people]; 
"id" della risorsa di cui si vogliono informazioni)

```
#### Informazioni dall'agenda per pagina Location
```
/agenda_location?id (id della risorsa di cui si vogliono informazioni)

```
#### Informazioni dalle tabelle per ottenere gli elenchi di Servizi, Persone, Location e Eventi
```
/all?table=table (table è il nome della risorsa di cui vogliamo tutti gli elementi [services, people, location,events])

```
#### Invio dei messaggi
```
/contact il resto degli argomenti viene passato in formato JSON attraverso il metodo POST

```

##Problemi
```
- Problemi nella realizzazione della pagina Service by Location X per via delle policy di Google Chrome che bloccano degli attributi "onclick" nel tag select.
Problema risolto, autonomamente, usando l'attributo "selected" del tag select 
```