$(document).ready(function(){
    $( "select" )
  .change(function() {
   
   
    $( "select option:selected" ).each(function() {
    
       mostraservizi($( this ).val());
       
    });
    
  })
  .trigger( "change" );
});
//FRANCESCO & FABIO FOR 'GROUP_BY_SERV'
function mostraservizi(loc){
    $("#serv").empty();
  if(loc!="none"){
    $.ajax({
        method: "GET",
        //dataType: "json",
        dataType: 'json',
        crossDomain: true,
        url: "http://localhost:3000/agenda_location?id="+loc,
        success: function (response) {
           var st="";
            console.log(response);
            for(var i=0; i<response.length; i++){
                st +='<li><a href="./service.html?id='+response[i].idservizio+'">'+response[i].servicesname+'</a></li> ';
            }
            console.log(st);
            $("#serv").append(st);
            
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
  }
   
}