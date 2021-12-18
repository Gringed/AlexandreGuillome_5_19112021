//Fonction qui va récupérer et afficher toutes les données sur la page index.html
function viewAllProducts(){
//Permet la récupération de la partie back
fetch("http://localhost:3000/api/products/")
  .then(response => response.json()) 
  .then(data  => {
    //Boucle permettant l'affichage des kanap sur l'index
    for (let product of data) {
    document.getElementById("items").innerHTML 
    += `<a href=\"./product.html?_id=${product._id}\">
          <article>
            <img src=\"${product.imageUrl}\" alt=\"${product.altTxt}\">
            <h3 class=\"productName\">${product.name}</h3>
            <p class=\"productDescription\">${product.description}.</p>
          </article>
        </a>`;
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}
//On retourne la fonction
viewAllProducts();