let express =require("express");
let app = express();
let process= require("process");
let bodyparser=require("body-parser");
let _ =require("lodash");
let knex=require("knex");
//other/

let sqldb;
//load data from json
let services= require ("./other/Service.json");
let people= require ("./other/People.json");
let locations = require ("./other/location.json");
let events= require ("./other/Event.json");
let agenda = require ("./other/Agenda.json");


function initdatabaseconnection(){
  sqldb=  knex({
        client: "sqlite3",
        debug: true,
        connection:{
            filename: "./other/assteodosio.sqlite"
        }
        /*client: "pg",
        debug: true,
        
        connection: process.env.DATABASE_URL,
        ssl: true*/
    });
}

function ensurepopulated()
{  
    //creating services table
     sqldb.schema.hasTable("services").then(function(exists){
        if(!exists){
            sqldb.schema.createTable("services", function(table){
                table.integer('id').primary(); 
               table.string("name");
               table.text("img");
                table.text("descrizione");
                
            }).then(function(){
                let insertion= _.map(services,function(p){ 
                 
                  return sqldb("services").insert(p);
                })
            return Promise.all(insertion);
                });
        }else{
            return true;
        }
    });
    
    
    
    //creating location table
    sqldb.schema.hasTable("location").then(function(exists){
        if(!exists){
            sqldb.schema.createTable("location", function(table){
                table.integer('id').primary(); 
               table.string("name");
               table.text("img");
                table.text("descrizione");
                table.text("mappa");
                table.text("contatti");
            }).then(function(){
                let insertion= _.map(locations,function(p){ 
                 
                  return sqldb("location").insert(p);
                })
            return Promise.all(insertion);
                });
        }else{
            return true;
        }
    });
    //creating people table
     sqldb.schema.hasTable("people").then(function(exists){
        if(!exists){
            sqldb.schema.createTable("people", function(table){
                table.integer('id').primary(); 
               table.string("name");
               table.text("img1");
                table.text("descrizione");
                table.text("img2");
                table.string("qualifica");
                
            }).then(function(){
                let insertion= _.map(people,function(p){ 
                 
                  return sqldb("people").insert(p);
                })
            return Promise.all(insertion);
                });
        }else{
            return true;
        }
    });
    
    //creating events table
    sqldb.schema.hasTable("events").then(function(exists){
        if(!exists){
            sqldb.schema.createTable("events", function(table){
                table.integer('id').primary(); 
               table.string("name");
               //table.text("img");
                table.text("descrizione");
                table.string("galleryfolder");
                
            }).then(function(){
                let insertion= _.map(events,function(p){ 
                 
                  return sqldb("events").insert(p);
                })
            return Promise.all(insertion);
                });
        }else{
            return true;
        }
    });
    
    sqldb.schema.hasTable("messages").then(function(exists){
        if(!exists){
            sqldb.schema.createTable("messages", function(table){
               table.increments('id');
                table.text("nome");
                table.text("cognome");
                table.text("email");
                table.text("messaggio");
            }).then();
        }else{
            return true;
        }
    });
    
    //creating agenda table
     return sqldb.schema.hasTable("agenda").then(function(exists){
        if(!exists){
            sqldb.schema.createTable("agenda", function(table){
                table.primary(['idservizio','idlocation','idpersona']);
                table.integer('idservizio'); 
                table.integer('idlocation');
               table.integer('idpersona');
               
                table.text("orario");
                
            }).then(function(){
                let insertion= _.map(agenda,function(p){ 
                 
                  return sqldb("agenda").insert(p);
                })
            return Promise.all(insertion);
                });
        }else{
            return true;
        }
    });
    
 
     
}

let myport=process.env.PORT | 3000;



app.use(express.static(__dirname + ""));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.set("port",myport);
app.use(express.static(__dirname + '/public'));


app.get("/service/:id", function(req,res){ 
    
    let myidentifier = parseInt(req.params.id);//prende l'id dalla stringa
    sqldb("services").where("id",myidentifier).select().map(function(row){
    
        res.status(200);
        console.log(row);
        res.send(row);
    })
})
app.get("/person/:id", function(req,res){ 
    
    let myidentifier = parseInt(req.params.id);//prende l'id dalla stringa
    sqldb("people").where("id",myidentifier).select().map(function(row){
    
        res.status(200);
        console.log(row);
        res.send(row);
    })
})

app.get("/location/:id", function(req,res){ 
    
    let myidentifier = parseInt(req.params.id);//prende l'id dalla stringa
    sqldb("location").where("id",myidentifier).select().map(function(row){
    
        res.status(200);
        console.log(row);
        res.send(row);
    })
})

app.get("/event/:id", function(req,res){ 
    
    let myidentifier = parseInt(req.params.id);//prende l'id dalla stringa
    sqldb("events").where("id",myidentifier).select().map(function(row){
    
        res.status(200);
        console.log(row);
        res.send(row);
    })
})
//return agenda for people and services pages topic
//agenda?page=table&spec=id
app.get("/agenda",function(req, res){
    let table= _.get(req,"query.page");
    let spec=_.get(req,"query.spec");
    var id=table + ".id";
    var name=table +".name";
    var condition;
    var comparator;
    console.log(table+" "+spec);
    if (table==="services"){
        joined="agenda.idservizio";
        condition="agenda.idpersona";
    }
    else if (table==="people"){
        condition="agenda.idservizio";
        joined="agenda.idpersona";
    }
    sqldb("agenda").join("location","agenda.idlocation","location.id").join(table,joined,id).where(condition,spec).orderBy(id).select("agenda.idlocation",  "location.name as locationname", id, name, "agenda.orario").then(function(row){
       res.status(200);
        console.log(row);
       res.send(row);
    })
    
    
})
//return agenda for location pages topic
app.get("/agenda_location",function(req,res){
    let id=_.get(req,"query.id");
    sqldb("agenda").join("services","agenda.idservizio","services.id").where("idlocation",id).select("idservizio", "services.name as servicesname","orario").then(function(row){
        console.log(row);
        res.status(200);
        res.send(row);
    })
})
// /all?ttable=services||location||people||events
app.get("/all",function(req,res){
    let table=_.get(req,"query.table");
    let result;
    if(table==="people"){
        result="img1";
       sqldb(table).orderBy("name").select("id","name",result,"qualifica").then(function(row){
        console.log(row);
        res.status(200);
        res.send(row);
    })
    }else if(table==="events"){
        sqldb(table).orderBy("name").select("id","name","galleryfolder").then(function(row){
        console.log(row);
        res.status(200);
        res.send(row);
    })
    }else
     {   result="img";
    sqldb(table).orderBy("name").select("id","name",result).then(function(row){
        console.log(row);
        res.status(200);
        res.send(row);
    })
     }
})


        
app.post("/contact",function(req,res){
    let msg = {
    nome: req.body.nome,
    cognome: req.body.cognome,
    email: req.body.email,
    messaggio: req.body.messaggio
  };
    sqldb("messages")
    .insert(msg)
    .then(function() {
      res.status(200);
    res.send("ok");
    });
    
})

initdatabaseconnection();
ensurepopulated().then(
    function(){app.listen(myport, function(){
    console.log("Server running");
})
}
);
    




