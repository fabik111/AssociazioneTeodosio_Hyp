var page_title;
var event_title;
var contenuto;
var image_url;

$(document).ready(function(){
    
    page_title = $("title");
    event_title = $("#title_event");
    contenuto = $("#contenuto_event");
    image_url = $("#image_event");
     console.log(URL.id);
    $.ajax({
        method: "GET",
        //dataType: "json",
        dataType: 'json',
        crossDomain: true,
        url: "/event/"+URL.id,
        data: {
            id: URL.id //SEND THE ID OF THE SERVICE TO THE SERVER TO RETRIVE ONLY THOSE DATA
        },
        success: function (response) {
           
            
            
            //UPDATE TEXT AND HTML RELATED TO THE RESPONSE RECEIVED
            page_title.text(response.name);
            event_title.text(response.name);
            contenuto.html(response.descrizione);
            image_url.attr("src", response.galleryfolder + "/event" + URL.id + ".png");
            
            loadGallery(response.galleryfolder);
            
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
    
    
});



function loadGallery(baseSrc) {

    var gal = "";
    for(var i = 1; i<=6; i++){
      var iLink = baseSrc + "/event" + URL.id + "-" + i + ".png";
      gal += '<div class="col-xs-6 col-sm-4 col-md-2 col-lg-2"><a href="'+iLink+'" data-lightbox="gallery"><img src="'+iLink+'"></a></div>';
    }
    $("#gallery_event").append(gal);
   
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
