$(document).ready(function(){
    
    $('.contactform').submit(function(){
        console.log("dentro submit");
        var str='{"nome":"';
        
       str += document.forms["form1"]["nome"].value+'","cognome":"'+ document.forms["form1"]["cognome"].value+'","email":"'+document.forms["form1"]["email"].value+'","messaggio":"'+document.forms["form1"]["messaggio"].value+'"}';
        console.log(str);
        var j=JSON.parse(str);
        console.log(j);
        $.ajax({
            method:"POST",
            crossDomain:true,
            url:"/contact",
            data:j,
            success: function(response){
               
                alert("Invio messaggio effettuato con successo");
            },
            error: function(request,error){
                console.log(request+": "+error);
            }
        });
    })
})