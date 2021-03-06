var page_title;
var loc_name;
var image_url;

$(document).ready(function(){
    console.log("READY");
    
    page_title = $("title");
    list = $("#content");
    console.log(URL.table);
    
    $.ajax({
        method: "GET",
        dataType: "json",
        //crossDomain: true,
        url: "/all?table=" + URL.table,
        /*data: {
            table: URL.table
        },*/
        success: function(response) {
            console.log(response.name);
            
            //page_title.text(response.name);
            if(URL.table=="people"){
                console.log(response.qualifica);
            }
            loadData(response);
        },
        error: function(request, error){
            console.log(request + ":" + error);
            console.log("URL: "+ URL.table);
        }
        
    });

});

function loadData(json){
    console.log(json);
    var el="";
    el += '<div class="services block block-bg-gradient-border-bottom"><div class="container">'
    
    var ph="";
    var link="";
    
    if(URL.table=="services"){
        link="services/service.html?id=";
        page_title.text("All services");
    }
    
    if(URL.table=="location"){
       link="location/location.html?id=";
        ph="1.jpg";
        page_title.text("All locations");
    }
    
    if(URL.table=="people"){
        link="people/persona.html?id=";
        page_title.text("All people");
    }
    
    if(URL.table=="events"){
        link="event/event.html?id=";
        page_title.text("All events");
    }
    
    
    
    if(URL.table=="services" || URL.table=="location" ){
        for(var i = 0; i< json.length; i++){
            
            var itemLink = link + json[i].id;
            var itemImg = json[i].img;
            el += '<div class="row"><div class="col-md-7"><a href="' + itemLink + '"><img  class="img-fluid rounded mb-3 mb-md-0" src="'+ itemImg + ph+'" height="60%" width="60%" alt="' + json[i].name + '"></a></div><div class="col-md-5"><h3><b>' +json[i].name + '</b></h3> <a class="btn btn-primary" href="' + itemLink + '">Scopri di più</a></div></div>';
        
            if(i != (json.length - 1)){
            el += '<hr>'; 
            }      
        }
        el += '</div></div>';
        
    }
    
    if(URL.table=="people"){
        el += '<div class="row"><img src="../assets/img/people/peoples.png" width="100%" height="20%"></div> <div class="row"><hr><h1>Semplicemente Noi</h1></div><h4>Membri associazione in ordine alfabetico</h4></div></div><div class="showcase block block-border-bottom-grey"><div class="container">';
        
        for(var i = 0; i< json.length; i++){

            var itemLink = link + json[i].id;
            var itemImg = json[i].img1;
            el += '<div class="row"><div class="col-md-6"><div class="col-md-6"><a href="' + itemLink + '"><img src="' + itemImg + '" width="50%" height="50%"></a></div><div class="col-md-6"><h3><a href="' + itemLink +'">' + json[i].name + '</a></h3><p>' + json[i].qualifica + '</p></div></div></div>';
            
            if(i != (json.length - 1)){
            el += '<hr>'; 
            }      
        }
        
        el += '</div></div>';
    
    }
    
    if(URL.table == "events"){
        el += '<div class="row"><h1 class="block-title">Eventi</h1><p>Elenco dei prossimi eventi organizzati dall associazione.</p></div></div></div><div class="thumbnails">';

            
        for(var i = 0; i< json.length; i++){

            var itemLink = link + json[i].id;
            var itemImg = json[i].galleryfolder + '/event'+json[i].id;
            el += '<div class="showcase block block-border-bottom-grey"><div class="container"><div class="row"><div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"><a href="' + itemLink + '"><img src="' + itemImg  + '.png" class="img-responsive img-thumbnail img-rounded pull-left" width="300px"></a></div><div class="col-xs-12 col-sm-9 col-md-9 col-lg-9"><h3 class="block-title">' + json[i].name + '</h3><a href="'+ itemLink + '" class="btn btn-more large"><i class="fa fa-plus"></i> Scopri di più</a></div></div></div></div>';
            
            /*if(i != (json.length - 1)){
                el += '<hr>'; 
            }*/      
        }
            el += '</div>';
        
    }

    
    $("#content").append(el);   
    
    
}

   
var URL = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();