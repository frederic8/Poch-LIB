// créer une function qui créer un element "section" qui contient la classList "result"
const functionSection = () => {
  let section = document.createElement("section");
  section.classList.add("result");
  return section;
};

// créer une function qui créer un element "div" qui contient la classList "result"
const functionDiv = (result) => {
  let div = document.createElement("div");
  div.classList.add(result);
  return div;
};

// créer une function qui créer un element "i" qui contient les classList "fas" & "fa-bookmark"
const functionSave = () => {
  let i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add("fa-bookmark");
  return i;
};

// créer une function qui créer un element i qui contient les classList "fas" & "fa-trash"
const functionTrash = () => {
  let i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add("fa-trash");
  return i;
};

// créer une function qui créer un element h3
const functionH3 = () => {
  let h3 = document.createElement("h3");
  return h3;
};

// créer une function qui créer un element p
const functionP = () => {
  let p = document.createElement("p");
  return p;
};

// créer une function qui créer un element img
const functionImg = () => {
  let img = document.createElement("img");
  return img;
};

// créer une function qui créer un element form
const functionForm = () => {
  let form = document.createElement("form");
  return form;
};

// créer une function qui créer un element label
const functionLabel = () => {
  let label = document.createElement("label");
  return label;
};

// créer une function qui créer un element input
const functionInput = () => {
  let input = document.createElement("input");
  return input;
};

// créer une function qui créer un element button
const functionButton = () => {
  let button = document.createElement("button");
  return button;
};

// créer une function qui créer un element hr
const functionHr = () => {
  let hr = document.createElement("hr");
  return hr;
};

// créer une function qui créer un element h2
const functionH2 = () => {
  let h2 = document.createElement("h2");
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

  const cancelBtn = functionButton();
  cancelBtn.innerHTML = "Annuler";
  cancelBtn.classList.add("btn", "btn--cancel");
  cancelBtn.onclick = (event) => {
    event.preventDefault();
    cancelSearch(form);
    message.style.display = "none";
  };

  form.appendChild(createField(labelTitle, title));
  form.appendChild(createField(labelAuthor, author));
  form.appendChild(message);
  form.appendChild(searchBtn);
  form.appendChild(cancelBtn);
  insertElement(form);
  form.style.display = "none";
}

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

