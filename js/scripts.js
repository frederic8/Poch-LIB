// créer une function qui créer un element "section" qui contient la classList "result"
const functionSection = () => {
  const section = document.createElement("section");
  section.classList.add("result");
  return section;
};

// créer une function qui créer un element "div" qui contient la classList "result"
const functionDiv = (result) => {
  const div = document.createElement("div");
  div.classList.add(result);
  return div;
};

// créer une function qui créer un element "i" qui contient les classList "fas" & "fa-bookmark"
const functionSave = () => {
  const i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add("fa-bookmark");
  return i;
};

// créer une function qui créer un element i qui contient les classList "fas" & "fa-trash"
const functionTrash = () => {
  const i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add("fa-trash");
  return i;
};

// créer une function qui créer un element h3
const functionH3 = () => {
  const h3 = document.createElement("h3");
  return h3;
};

// créer une function qui créer un element p
const functionP = () => {
  const p = document.createElement("p");
  return p;
};

// créer une function qui créer un element img
const functionImg = () => {
  const img = document.createElement("img");
  return img;
};

// créer une function qui créer un element form
const functionForm = () => {
  const form = document.createElement("form");
  return form;
};

// créer une function qui créer un element label
const functionLabel = () => {
  const label = document.createElement("label");
  return label;
};

// créer une function qui créer un element input
const functionInput = () => {
  const input = document.createElement("input");
  return input;
};

// créer une function qui créer un element button
const functionButton = () => {
  const button = document.createElement("button");
  return button;
};

// créer une function qui créer un element hr
const functionHr = () => {
  const hr = document.createElement("hr");
  return hr;
};

// créer une function qui créer un element h2
const functionH2 = () => {
  const h2 = document.createElement("h2");
  return h2;
};

// variables messages d'erreurs
const noResultMsg = "Aucun livre n'a été trouvé.";
const emptyFieldsMsg = "Merci de remplir au moins un des champs proposés.";
const missInfoMsg = "Information manquante";
const notAddSameBookMsg = "Vous ne pouvez ajouter deux fois le même livre !";

// creation class "Book"
class Book {
  constructor(title, idISBN, idItem, author, description, image) {
    this.title = title;
    this.idISBN = idISBN;
    this.idItem = idItem;
    this.author = author;
    this.description = description;
    this.image = image;
  }

  // Presentation des livres
  createBookPresentation(parentElement) {
    let section = functionSection();
    const bookInfo = functionDiv("result__info");
    const imgWrapper = functionDiv("result__img");
    const iconBookmark = functionSave();
    const iconTrash = functionTrash();
    iconTrash.style.display = "none";
    const titleElement = functionH3("result__info--title");
    const idElement = functionH3();
    const idHiddenElement = functionDiv();
    idHiddenElement.style.display = "none";
    const authorElement = functionP();
    const descriptionElement = functionP();
    const imageElement = functionImg();
    imageElement.src = this.image;
    titleElement.innerHTML = `Titre : ${this.title}`;
    idElement.innerHTML = `Id : ${this.idISBN}`;
    idHiddenElement.innerHTML = this.idItem;
    authorElement.innerHTML = `Auteur : ${this.author}`;
    descriptionElement.innerHTML = `Description : ${this.description}`;
    const bookInfoChildren = [
      iconBookmark,
      iconTrash,
      titleElement,
      idElement,
      idHiddenElement,
      authorElement,
      descriptionElement,
    ];
    for (const child of bookInfoChildren) {
      bookInfo.appendChild(child);
    }
    imgWrapper.appendChild(imageElement);
    section.appendChild(bookInfo);
    section.appendChild(imgWrapper);
    parentElement.appendChild(section);
  }
}

// Insert la presentations des livres dans la div myBook avant le hr
function insertElement(element) {
  const parentDiv = document.getElementById("myBooks");
  const target = document.getElementsByTagName("hr")[0];
  parentDiv.insertBefore(element, target);
}

// Creation de la div qui contiendra le formulaire
function createField(label, input) {
  const field = functionDiv("form__field");
  field.appendChild(label);
  field.appendChild(input);
  return field;
}

// creation du formulaire qui apparaît lorsqu'on click sur le bouton "ajouter un livre"
function createForm() {
  const form = functionForm();
  form.classList.add("form");

  const labelTitle = functionLabel();
  const labelTitleTxt = document.createTextNode("Titre du livre");
  labelTitle.setAttribute("for", "intitle");
  labelTitle.appendChild(labelTitleTxt);

  const title = functionInput();
  title.setAttribute("type", "text");
  title.setAttribute("name", "intitle");
  title.setAttribute("id", "book-title");

  const labelAuthor = functionLabel();
  const labelAuthorTxt = document.createTextNode("Auteur");
  labelAuthor.setAttribute("for", "inauthor");
  labelAuthor.appendChild(labelAuthorTxt);

  const author = functionInput();
  author.setAttribute("type", "text");
  author.setAttribute("name", "inauthor");
  author.setAttribute("id", "author");

  const message = createWarningMessage("empty-fields-msg", emptyFieldsMsg);

  const searchBtn = functionButton();
  searchBtn.innerHTML = "Rechercher";
  searchBtn.classList.add("btn");
  searchBtn.onclick = (event) => {
    event.preventDefault();
    searchBook();
    title.value = "";
    title.focus();
    author.value = "";
  };

  // Créer Function "cancelButton"
  const cancelBtn = functionButton();
  cancelBtn.innerHTML = "Annuler";
  cancelBtn.classList.add("btn", "btn--cancel");
  cancelBtn.onclick = (event) => {
    event.preventDefault();
    cancelSearch(form);
    message.style.display = "none";
  };

  //Insert element "form"
  form.appendChild(createField(labelTitle, title));
  form.appendChild(createField(labelAuthor, author));
  form.appendChild(message);
  form.appendChild(searchBtn);
  form.appendChild(cancelBtn);
  insertElement(form);
  form.style.display = "none";
}

// Créer function "displayForm"
function displayForm() {
  const btn = document.getElementById("addBook");
  const form = document.getElementsByClassName("form")[0];
  const title = document.getElementById("book-title");
  if (btn !== null && form !== null) {
    btn.style.display = "none";
    form.style.display = "block";
    title.focus();
  }
}

// Function addButton pour ajouter un livre
function addButton() {
  const addBookBtn = functionButton();
  addBookBtn.innerHTML = "Ajouter un livre";
  addBookBtn.classList.add("btn", "btn--center");
  addBookBtn.id = "addBook";
  insertElement(addBookBtn);
  addBookBtn.onclick = displayForm;
}

// Function "WarningMessage" affiche le warning-message lorsque la function est appelée
function createWarningMessage(msgId, msg) {
  const message = functionDiv("warning-msg");
  message.id = msgId;
  message.innerHTML = msg;
  message.style.display = "none";
  return message;
}

// Créer une function qui créer le "result container"
function createResultsContainer() {
  const resultsContainer = functionDiv("res-container");
  resultsContainer.id = "res-output";
  resultsContainer.style.display = "none";
  const resultsLine = functionHr();
  const resultsTitle = functionH2();
  resultsTitle.innerHTML = "Résultats de recherche";
  const warningMsg = createWarningMessage("no-results-msg", noResultMsg);
  const resultsGrid = functionDiv("res-grid");
  resultsGrid.id = "list-grid";
  resultsContainer.appendChild(resultsLine);
  resultsContainer.appendChild(resultsTitle);
  resultsContainer.appendChild(warningMsg);
  resultsContainer.appendChild(resultsGrid);
  insertElement(resultsContainer);
}

// Créer une function qui créer la "PochList container"
function createPochlistContainer() {
  const pochlistContainer = document.getElementById("content");
  const pochlistGrid = functionDiv("res-grid");
  pochlistGrid.id = "pochlist-grid";
  pochlistContainer.appendChild(pochlistGrid);
}

// créer un function "onload" qui appel les functions qu'elle contient
function onload() {
  createForm();
  addButton();
  createResultsContainer();
  createPochlistContainer();
  displayPochlist();
}

// Écoute les événements de la fenêtre et appel la fonction "onload"
window.addEventListener("load", onload);

// Function qui construit l'URL
function setBookURL() {
  // Lien API Google Books
  let bookURL = "https://www.googleapis.com/books/v1/volumes?q=";
  // Container de résultat
  const resultsContainer = document.getElementById("res-output");
  // Message d'erreur si le champ n'est pas remplis
  const message = document.getElementById("empty-fields-msg");
  if (message.style.display === "block") {
    message.style.display = "none";
  }
  const form = document.forms[0];
  const formData = new FormData(form);
  const urlParams = new URLSearchParams(formData);
  let queryString = urlParams.toString();
  const intitle = urlParams.get("intitle");
  const inauthor = urlParams.get("inauthor");
  if (intitle === "" && inauthor === "") {
    message.style.display = "block";
    document.getElementById("book-title").focus();
    resultsContainer.style.display = "none";
    return null;
  }
  if (intitle === "") {
    queryString = queryString.replace("intitle=&inauthor", "inauthor");
  }
  if (inauthor === "") {
    queryString = queryString.replace("&inauthor=", "");
  }
  queryString = queryString.replace("&", "+");
  queryString = queryString.replace(/=/g, ":");
  bookURL += queryString;
  return bookURL;
}

// Créer une fonction pour la bascule des icons
function toggleIcons() {
  const icons = document.querySelectorAll("#pochlist-grid i");
  for (const icon of icons) {
    if (icon.className === "fas fa-bookmark" && icon.style.display !== "none") {
      icon.style.display = "none";
    }
    if (icon.className === "fas fa-trash" && icon.style.display === "none") {
      icon.style.display = "block";
    }
  }
}

// Ajoute l'icône pour sauvegarder le livre dans la Pochlist
function addIconBookmarkAction(books) {
  for (let i = 0; i < books.length; i++) {
    const iconBookmark = document.getElementsByClassName("fa-bookmark")[i];
    iconBookmark.onclick = () => {
      saveBook(books[i], books[i].idItem);
    };
  }
}

// Ajoute l'icône pour supprimer le livre dans la Pochlist
function addIconTrashAction(idItem, parentElt) {
  const section = parentElt.lastChild;
  const iconTrash = section.getElementsByTagName("i")[1];
  iconTrash.addEventListener("click", () => {
    removeBook(idItem);
  });
}

// Fonction qui affiche un message d'erreur si l'utilisateur essaye d'ajouter 2fois le meme livre dans la PochList
function isInSession(idItem) {
  if (sessionStorage.getItem(idItem) !== null) {
    alert(notAddSameBookMsg);
    return true;
  }
  return false;
}

// Fonction pour sauvegarder les livres et ajouter l'icon Trash pour supprimer un element de la PochList
function saveBook(book, idItem) {
  const parentDiv = document.getElementById("pochlist-grid");
  // Si l' idItem n'est pas enregistrer dans le sessionStorage
  if (!isInSession(idItem)) {
    // Convertir l'objet JavaScript en une chaîne avec JSON.stringify() et envoyer les donnees dans le sessionStorage
    sessionStorage.setItem(book.idItem, JSON.stringify(book));
    book.createBookPresentation(parentDiv);
    // Appel de la function icons et ajout de l'icon Trash
    toggleIcons();
    addIconTrashAction(idItem, parentDiv);
  }
}

// Function pour supprimer les livres du sessionStorage
function removeBook(idItem) {
  const targetElt = document.querySelectorAll("#pochlist-grid > section");
  targetElt.forEach((element) => {
    const targetId = element.querySelector(".result__info > div");
    if (targetId.innerHTML === idItem) {
      element.parentNode.removeChild(element);
      sessionStorage.removeItem(idItem);
    }
  });
}

// Function pour afficher le résultat de recherche
function displayResults(data, list) {
  let item;
  let title;
  let id;
  let idHidden;
  let author;
  let description;
  let image;
  let books = [];
  let index = 0;
  for (item of data.items) {
    id = null;
    title = item.volumeInfo.title;
    idHidden = item.id;
    if (item.volumeInfo.industryIdentifiers) {
      for (let i = 0; i < item.volumeInfo.industryIdentifiers.length; i++) {
        if (item.volumeInfo.industryIdentifiers[i].type === "ISBN_13") {
          id = item.volumeInfo.industryIdentifiers[i].identifier;
        }
      }
      if (!id) {
        id = item.volumeInfo.industryIdentifiers[0].identifier;
      }
    } else {
      id = missInfoMsg;
    }
    // Message "information manquante"
    author = item.volumeInfo.authors ? item.volumeInfo.authors[0] : missInfoMsg;
    if (item.volumeInfo.description) {
      description = item.volumeInfo.description;
      // Si la description et supérieur a 200 caractère
      if (description.length > 200) {
        // Afficher uniquement les 200 premiers caractère
        description = description.slice(0, 200);
        description = description.substring(0, description.lastIndexOf(" "));
        // Si la description ne se finit pas avec un "."
        if (!description.endsWith(".")) {
          // Ajouter "..."
          description += "...";
        }
      }
      // Sinon affiche le message "information manquante" dans la description
    } else {
      description = missInfoMsg;
    }
    image = item.volumeInfo.imageLinks
      ? // Si le livre n'a pas d'image afficher le fichier image "unavailable.png"
        item.volumeInfo.imageLinks.thumbnail
      : "images/unavailable.png";
    books[index] = new Book(title, id, idHidden, author, description, image);
    books[index].createBookPresentation(list);
    index++;
  }
  addIconBookmarkAction(books);
}

// Function pour afficher la Poch'List
function displayPochlist() {
  const parentDiv = document.getElementById("pochlist-grid");
  const keys = Object.keys(sessionStorage);
  for (const key of keys) {
    const sessionObject = JSON.parse(sessionStorage.getItem(key));
    const book = new Book(
      sessionObject.title,
      sessionObject.idISBN,
      sessionObject.idItem,
      sessionObject.author,
      sessionObject.description,
      sessionObject.image
    );
    book.createBookPresentation(parentDiv);
    addIconTrashAction(sessionObject.idItem, parentDiv);
  }
  toggleIcons();
}

// L’API de Google Books est utilisée pour rechercher les livres correspondant aux données saisies dans le formulaire.
function searchBook() {
  const resultsContainer = document.getElementById("res-output");
  const listOutput = document.getElementById("list-grid");
  const message = document.getElementById("no-results-msg");
  const url = setBookURL();
  // Tant que la liste de résultat de recherche est inférieur a 0
  while (listOutput.childNodes.length > 0) {
    cleanOutputList(listOutput);
  }
  // XMLHttpRequest permet d'interagir avec API Google Book
  if (url) {
    // Créer un objet XMLHttpRequest
    let request = new XMLHttpRequest();
    // configurer la requête et appeler la méthode
    request.open("GET", url);
    // Envoie la requête au serveur
    request.send();
    // Implémenter l'événement "readystatechange" pour détecter les événements
    request.onreadystatechange = function () {
      // Si l'operation est terminée && la requête réussie
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Utilisez la fonction JavaScript JSON.parse()pour convertir les donnees textes en objet JavaScript
        let jsonData = JSON.parse(this.responseText);
        // Si les donnees textes de tous les items sont strictement égale a 0
        if (jsonData.totalItems === 0) {
          // Affiche les div resultsContainer & message
          resultsContainer.style.display = "block";
          message.style.display = "block";
          // Sinon
        } else {
          // Affiche les donnes de résultats de recherche dans le container & masque le message
          displayResults(jsonData, listOutput);
          message.style.display = "none";
          resultsContainer.style.display = "block";
        }
        // Sinon si la requête n'est pas réussie
      } else if (this.status !== 200) {
        //  Afficher le message d'erreur et le status
        console.error(
          `Network request failed. Returned status of ${this.status}`
        );
      }
    };
  }
}

// Function pour supprimer les résultats de recherche
function cleanOutputList(parentElement) {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
}

// Function pour annuler la recherche et appeler la function qui supprime les résultats de recherche
function cancelSearch(form) {
  const parentElement = document.getElementById("list-grid");
  const btn = document.getElementById("addBook");
  const resContainer = document.getElementById("res-output");
  const inputs = form.querySelectorAll("input");
  if (parentElement) {
    cleanOutputList(parentElement);
  }
  form.style.display = "none";
  btn.style.display = "block";
  resContainer.style.display = "none";
  for (const input of inputs) {
    if (input) {
      input.value = "";
    }
  }
}
