let params = new URLSearchParams(document.location.search.substring(1));
let varId = params.get("_id");
var str = "http://localhost/Kanap/front/html/product.html?_id="+ varId;
  
// Fonction permettant l'affichage d'un canapé unique sur la page produit
function viewIdProduct(){

//Si l'url contient bien une id on charge ce script qui affiche le détails du canapé
if (str){
    fetch("http://localhost:3000/api/products/"+ varId)
    .then(response => response.json()) 
    .then(data  => {

        //On change le titre de l'onglet en mettant le nom du canapé choisi
        document.querySelector('title').innerHTML = data.name;

        //On ajoute chaque éléments contenu dans le tableau pour un seul canapé
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
viewIdProduct();

//Fenêtre de confirmation lorsqu'on ajoute un produit au panier. OK = panier , ANNULER = accueil
function confirmCart(){
    let result = confirm("Produit ajouté au panier avec succès, redirection vers le panier ?");
    if (result == true){
        location.href = "./cart.html";
    }else {
        location.href = "./index.html";
    }
}

//Fonction pour ajouter un produit au panier via son ID
function addCart(){
    fetch("http://localhost:3000/api/products/"+ varId)
    .then(response => response.json()) 
    .then(data  => {
    
    let inputColors = document.getElementById("colors");
    inputColors.addEventListener('change', (event) => {
        inputColors = event.target.value;   
    });

    let inputQuantity = document.getElementById("quantity");
    inputQuantity.addEventListener('change', (event) => {
        inputQuantity = event.target.value; 
    });
               
    //On ajoute au panier grâce au bouton "ajouter"
    let addToCart = document.getElementById("addToCart");
    addToCart.addEventListener("click", () => {
        //On créer l'objet qui va contenir les valeurs du produit pour l'ajout au panier
        let arrayCart = {
            name: data.name,
            img: data.imageUrl,
            price: data.price,
            id: varId,
            colors: inputColors,
            quantity: inputQuantity,
        };
        
        //Déclaration de la variable de récupération du localstorage
        let savedProductStorage = JSON.parse(localStorage.getItem("cart"));
        
        //Fonction permettant d'éviter un doulon et des répétitions avec la même id/couleur dans le tableau donc dans le localstorage
        function noDoublons(array) {
            return array.reduce(function (p, keyName) {
              var keys = [keyName.id, keyName.colors].join('|');
              if (p.temp.indexOf(keys) === -1) {
                p.out.push(keyName);
                p.temp.push(keys);
              }
              return p;
            }, { temp: [], out: [] }).out;
          }
        
        //Conditions pour voir si le produit est déjà dans le panier ou pas avec la fonction Nodoublons
        if(savedProductStorage){
            let foundProduct = savedProductStorage.find(p => p.id == arrayCart.id && p.colors == arrayCart.colors);
            if(foundProduct != undefined){
                foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(arrayCart.quantity);
            }
            savedProductStorage.push(arrayCart);
            localStorage.setItem("cart", JSON.stringify(noDoublons(savedProductStorage)));
        }
        else{
            savedProductStorage = [];
            savedProductStorage.push(arrayCart);
            localStorage.setItem("cart", JSON.stringify(savedProductStorage));
        }
        
        
        //Affichage de l'ajout panier dans la console
        console.log(arrayCart)    
        confirmCart();  
    })     
})
}
addCart();

