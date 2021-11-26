let params = new URLSearchParams(document.location.search.substring(1));
let varId = params.get("_id");
var str = "http://localhost/Kanap/front/html/product.html?_id="+ varId;
    
// Fonction permettant l'affichage d'un canapé unique sur la page produit
function viewIdProduct(){

    
    //Affiche l'url complet avec l'id adéquat dans la console pour s'assurer du bon fonctionnement
    console.log(str);

    //Si l'url contient bien une id on charge ce script qui affiche le détails du canapé
    if (str){
        fetch("http://localhost:3000/api/products/"+ varId)
        .then(response => response.json()) 
        .then(data  => {
            console.log(data)
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
// On retourne le canapé avec l'id unique
viewIdProduct();

//On ajoute une fonction pour ajouter au panier
function addCart(){
    
    
    let inputColors = document.getElementById("colors");
    inputColors.addEventListener('change', (event) => {
        inputColors = event.target.value;
            //On implémente la valeur choisie dans le tableau grâce à son index "1"  
            
            console.log(inputColors);
            
    });

    //On récupère la valeur du champ input quantité
    let inputQuantity = document.getElementById("quantity");
    inputQuantity.addEventListener('change', (event) => {
        inputQuantity = event.target.value;
            //On implémente la valeur choisie dans le tableau grâce à son index "2"  
            
            console.log(inputQuantity);
            
    });
        
            
    //On ajoute au panier grâce au bouton "ajouter"
    let addToCart = document.getElementById("addToCart");
    addToCart.addEventListener("click", () => {
        //On créer l'objet qui va contenir les valeurs du produit pour l'ajout au panier
        let arrayCart = {
            name: "Kanap",
            id: varId,
            colors: inputColors,
            quantity: inputQuantity,
        };


        //---Local storage qui va permettre la sauvegarde des produits enregistré dans le panier


        //Déclaration de la variable de récupération du localstorage
        let savedProductStorage = JSON.parse(localStorage.getItem("cart"));

        //Conditions pour voir si le produit est déjà dans le panier ou pas
        if(savedProductStorage){
            if(arrayCart.id === savedProductStorage.indexOf(varId)){
                
                console.log(savedProductStorage[{varId}]);
            }
            savedProductStorage.push(arrayCart);
            localStorage.setItem("cart", JSON.stringify(savedProductStorage));
            console.log(savedProductStorage);
        }
        else{
           
            savedProductStorage = [];
            savedProductStorage.push(arrayCart);
            localStorage.setItem("cart", JSON.stringify(savedProductStorage));
            console.log(savedProductStorage);
        }
        
        
        //Affichage de l'ajout panier dans la console
        console.log(arrayCart)    
        
        
        
    })     
}
addCart();

