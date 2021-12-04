function noDoublons(array) {
  if(savedProductStorage){
    return array.reduce(function (p, keyName) {
    var keys = [keyName.id, keyName.colors].join('|');
    if (p.temp.indexOf(keys) === -1) {
      p.out.push(keyName);
      p.temp.push(keys);
    }
    return p;
    }, { temp: [], out: [] }).out;
  }
}
let savedProductStorage = JSON.parse(localStorage.getItem("cart"));

if(savedProductStorage === null || savedProductStorage == 0){
  document.getElementById("cart__items").innerHTML = `
    <p>Le panier est vite</p>
  `;
}

//Fonction permettant l'affichage complet du panier
function viewCart(){

  console.log(noDoublons(savedProductStorage));
  
  //Affichage des produits commandés dans le panier
  if(savedProductStorage){
  for (let product of noDoublons(savedProductStorage)) {
  
  document.getElementById("cart__items").innerHTML += `
  <article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
    <div class="cart__item__img">
      <img src="${product.img}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.colors}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantité : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  `;
    //Total du prix et des articles présents dans le panier
    let totalPrice = 0;
    savedProductStorage.forEach(row => {
      let pricesValue = row.price * row.quantity;
      totalPrice += pricesValue;
    });
    let articlesCount = noDoublons(savedProductStorage).length;
    document.getElementById("totalQuantity").innerHTML = articlesCount;
    document.getElementById("totalPrice").innerHTML = totalPrice;
    
    }    
  }
}
viewCart();

//Fonction permettant le changement de quantité du produit et sauvegarder dans le localstorage la nouvelle quantité
function updateQuantity(){

  let itemQuantity = document.querySelectorAll(".itemQuantity");
  for (let ind = 0; ind < itemQuantity.length; ind++){
    itemQuantity[ind].addEventListener("change", (event) =>{
    event.preventDefault();
      let changeQuantity = event.target.value
      changeQuantity[ind] += itemQuantity[ind];
      savedProductStorage[ind].quantity = changeQuantity;
    
    localStorage.setItem("cart", JSON.stringify(savedProductStorage));
    window.location.href = "cart.html";
   })
  }
 
}
updateQuantity();


// Fonction permettant la suppression d'un produit dans le panier et le localstorage
function supprCommand(){

  let btnSupprimer = document.querySelectorAll(".deleteItem")
  console.log(btnSupprimer)
  for (let i = 0; i < btnSupprimer.length; i++){
    btnSupprimer[i].addEventListener("click", (event) =>{
    event.preventDefault();

    let id_suppression = savedProductStorage[i].id;
    let colors_suppression = savedProductStorage[i].colors;

    savedProductStorage = savedProductStorage.filter(el => el.id !== id_suppression || el.colors !== colors_suppression)

    localStorage.setItem("cart", JSON.stringify(savedProductStorage));
    alert("Ce produit a été supprimer du panier");
    window.location.href = "cart.html";
    })
  }
}
supprCommand();

//Déclaration des variables pour le formulaire
let prenom = document.getElementById("firstName");
    prenom.addEventListener('input', (event) => {
    prenom = event.target.value;   
});
let nom = document.getElementById("lastName");
    nom.addEventListener('input', (event) => {
    nom = event.target.value;   
});
let adresse = document.getElementById("address");
    adresse.addEventListener('input', (event) => {
    adresse = event.target.value;   
});
let ville = document.getElementById("city");
    ville.addEventListener('input', (event) => {
    ville = event.target.value;   
});
let mail = document.getElementById("email");
    mail.addEventListener('input', (event) => {
    mail = event.target.value;   
});
//Foncion permettant l'envoi du formulaire sur le serveur 
function send(e) {
  if(savedProductStorage === null || savedProductStorage == 0){
    alert("Votre panier est vide, veuillez sélectionner des articles");
    location.href = "./index.html";
  }
  else{
  e.preventDefault();
  let contact = {
    firstName: prenom,
    lastName: nom,
    address: adresse,
    city: ville,
    email: mail,
  }
  let products = [];
  savedProductStorage.forEach(row => {
    let productId = row.id;
    products.push(productId);
  });
  
  let productContact = {
    contact,
    products,
  }
  
  const regexFirstLastNameCity = (value) => {
    return /^[a-zA-Z0-9\séè-]{3,25}$/.test(value);
  }
  const regexAddress = (value) => {
    return /^[a-zA-Z0-9\séè()]{3,600}$/.test(value);
  }
  const regexMail = (value) => {
    return /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+.+[a-zA-Z0-9-]$/.test(value);
  }
  //Fonction qui test le champ Prenom
  function checkPrenom(){
    const prenom = contact.firstName;
    if(regexFirstLastNameCity(prenom)){
      document.getElementById("firstNameErrorMsg").textContent = "";
      return true;
    }else {
      document.getElementById("firstNameErrorMsg").textContent = 'Veuillez entrer un prénom correct, 3 à 25 caractères';
      return false;
    }
  }
  //Fonction qui test le champ Nom
  function checkNom(){
    const nom = contact.lastName;
    if(regexFirstLastNameCity(nom)){
      document.getElementById("lastNameErrorMsg").textContent = "";
      return true;
    }else {
      document.getElementById("lastNameErrorMsg").textContent = 'Veuillez entrer un nom correct, 3 à 25 caractères';
      return false;
    }
  }
  //Fonction qui test le champ Adresse
  function checkAdress(){
    const address = contact.address;
    if(regexAddress(address)){
      document.getElementById("addressErrorMsg").textContent = "";
      return true;
    }else {
      document.getElementById("addressErrorMsg").textContent = 'Veuillez respectez les données saisies';
      return false;
    }
  }
  //Fonction qui test le champ Ville
  function checkCity(){
    const city = contact.city;
    if(regexFirstLastNameCity(city)){
      document.getElementById("cityErrorMsg").textContent = "";
      return true;
    }else {
      document.getElementById("cityErrorMsg").textContent = 'Veuillez entrer une ville correcte, 3 à 25 caractères';
      return false;
    }
  }
  //Fonction qui test le champ Email
  function checkEmail(){
    const email = contact.email;
    if(regexMail(email)){
      document.getElementById("emailErrorMsg").textContent = "";
      return true;
    }else {
      document.getElementById("emailErrorMsg").textContent = 'Veuillez entrer une adresse mail valide';
      return false;
    }
  }
  if(checkPrenom() && checkNom() && checkAdress() && checkCity() && checkEmail()){
  const promise1 = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productContact),
  })
  promise1.then(async(response) =>{
    try{
      console.log(response)
      const contenu = await response.json();
      console.log(contenu);
      orderId = contenu.orderId;
      window.location.href = "confirmation.html?orderId="+ orderId;
      localStorage.clear();
    }
    catch(e){
      console.log(e)
    }
  })
}
}
}
document.querySelector(".cart__order__form").addEventListener("submit", send);