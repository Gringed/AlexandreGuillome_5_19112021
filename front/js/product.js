// Fonction permettant l'affichage d'un canapé unique sur la page produit
function viewIdProduct(){

    let params = new URLSearchParams(document.location.search.substring(1));
    let varId = params.get("_id");
    var str = "http://localhost/Kanap/front/html/product.html?_id="+ varId;
    
    //Affiche l'url complet avec l'id adéquat dans la console pour s'assurer du bon fonctionnement
    console.log(str);

    //Si l'url contient bien une id on charge ce script qui affiche le détails du canapé
    if (str){
        fetch("http://localhost:3000/api/products/"+ varId)
        .then(response => response.json()) 
        .then(data  => {
            console.log(data)
            document.querySelector('title').innerHTML = data.name;
            let itemImg = document.querySelector(".item__img");
            itemImg.innerHTML = `<img src=\"${data.imageUrl}\" alt="${data.description}"\>`;
            document.getElementById("title").innerHTML = data.name;
            document.getElementById("price").innerHTML = data.price + " ";
            document.getElementById("description").innerHTML = data.description;
            if(data.colors[0,1])
            {
                document.getElementById("colors").innerHTML = `
                <option value="">--SVP, choisissez une couleur --</option>
                <option value=\"${data.colors[0]}\">${data.colors[0]}</option>
                <option value=\"${data.colors[1]}\">${data.colors[1]}</option>`;
            }
            if (data.colors[0,1,2]){
                document.getElementById("colors").innerHTML = `
                <option value="">--SVP, choisissez une couleur --</option>
                <option value=\"${data.colors[0]}\">${data.colors[0]}</option>
                <option value=\"${data.colors[1]}\">${data.colors[1]}</option>
                <option value=\"${data.colors[2]}\">${data.colors[2]}</option>`;
            }
            if (data.colors[0,1,2,3]){
                document.getElementById("colors").innerHTML = `
                <option value="">--SVP, choisissez une couleur --</option>
                <option value=\"${data.colors[0]}\">${data.colors[0]}</option>
                <option value=\"${data.colors[1]}\">${data.colors[1]}</option>
                <option value=\"${data.colors[2]}\">${data.colors[2]}</option>
                <option value=\"${data.colors[3]}\">${data.colors[3]}</option>`;
            }
            
            
        })
        .catch(function(err) {
        console.log(err);
        });
    }
    
    
}
// On retourne le canapé avec l'id unique
viewIdProduct();

