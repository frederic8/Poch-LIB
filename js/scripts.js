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

