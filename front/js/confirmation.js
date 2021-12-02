let params = new URLSearchParams(document.location.search.substring(1));
let orderId = params.get("orderId");
var linkConfirmed = "http://localhost/Kanap/front/html/confirmation?orderId="+ orderId;
if(linkConfirmed){

    document.getElementById("orderId").innerHTML = orderId;
}