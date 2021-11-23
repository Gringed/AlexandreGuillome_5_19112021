//Fonction qui va récupérer et afficher toutes les données sur la page index.html
function viewAllProducts(){
//Permet la récupération de la partie back
fetch("http://localhost:3000/api/products/")
  .then(response => response.json()) 
  .then(data  => {
      
    //Affiche le tableau avec toutes les valeurs dans la console (vérification du bon fonctionnement du script)
    console.log(data);

    //Boucle permettant l'affichage des kanap sur l'index
    for (let product of data) {
      
        document.getElementById("items").innerHTML 
        += `<a href=\"./product.html?_id=${product._id}\"><article><img src=\"${product.imageUrl}\" alt=\"Lorem ipsum dolor sit amet, Kanap name1\"><h3 class=\"productName\">${product.name}</h3><p class=\"productDescription\">${product.description}.</p></article></a>`;
        let varId = product._id;
    }
  })
  
  .catch(function(err) {
    console.log(err);
  });
}
//On retourne la fonction
viewAllProducts();