'use strict';

function selector(selector) {
  return document.querySelector(selector);
}

function listener(selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

function createElement(tag) {
  return document.createElement(tag);
}

class User {
  #id;
  #name;
  #userName;
  #email; 

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = userName
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get userName() { return this.#userName; }
  get email() { return this.#email; }

  getInfo() {
    let info = `<span>ID: ${this.id}</span>
               <span>Name: ${this.name}</span>
               <span>Username: ${this.userName}</span>
               <span>Email: ${this.email}</span>
               <span>Pages: ${this.pages}</span>
               <span>Groups: ${this.groups}</span>
               <span>Can Monetize: ${this.canMonetize}</span>`;
  return info;
  }
}

class Subscriber extends User{
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize; 
  }
  
  get pages() { return this.#pages; }
  get groups() { return this.#groups; }
  get canMonetize() { return this.#canMonetize; }
}

//create the User info
const submitInfo = selector('.info-submit');
const infoValues = document.querySelectorAll('.infoText');
const pages = ['page1', 'page2', 'page3'];
const groups = ['jack', 'sam', 'ken'];

listener(submitInfo, 'click', () => {
  if (infoValid()) {
    let id = infoValues[0].value;
    let name = infoValues[1].value;
    let userName = infoValues[2].value;
    let email = infoValues[3].value;
    
    infoValues.forEach(input => input.value = '');
    user = new Subscriber(id, name, userName, email, pages, groups, true);
  }   
});

let user = new Subscriber('1Q2W3E', 'guess', 'guess', 'guess', pages, groups, false);

const iconBtn = selector('.icon-btn');
const showInfoClick = selector('.user-info-container');
const removeInfo = selector('.cancel-create-info');
listener(iconBtn, 'click', () => {
  showInfoClick.style.display = 'flex';
});

listener(removeInfo, 'click', () => {
  showInfoClick.style.display = 'none';
})

setInterval(() => {
  if (infoValid()) {
    colorButton('#0866ff', submitInfo);
  } else  {
    colorButton('#0867ff83', submitInfo);
  }
});

function infoValid() {
  const infoValues = document.querySelectorAll('.infoText');
  const hasEmptyValue = Array.from(infoValues).some(info => info.value === '');
  
  return !hasEmptyValue;
}

// Print user's info
const showPrintedInfoClick = selector('.display-curent-info-container')
const displayInfoBtn = selector('.user-info');
const userInfoList = selector('.user-information');
const removePrintedInfo = selector('.cancel-print-info');

listener(displayInfoBtn, 'click', () => {
  userInfoList.innerHTML = user.getInfo();
  showPrintedInfoClick.style.display = 'flex';
});

listener(removePrintedInfo, 'click', () => {
  showPrintedInfoClick.style.display = 'none';
});

// Posting new post
const boxContainer = selector('.box-output');
const postBtn = selector('.post-btn');
const textInput = selector('.text-input');
const imgInput = selector('.img-list');

setInterval(() => {
  if (isValid()) {
    colorButton('#0866ff', postBtn);
  } else  {
    colorButton('#0867ff83', postBtn);
  }
});

listener(postBtn, 'click', () => {
  if (isValid()) {
    createBox();
  }
});

function colorButton(color, button) {
  return button.style.backgroundColor = color;
}

function isValid() {
  if (noText() && noImg()) return false;
  return true;
}

function getText() {
  return textInput.value;
}

function noText() { 
  return getText() === '';
}

function getImg() {
  return imgInput.options[imgInput.selectedIndex].value;
}
function noImg() { 
  return getImg() === 'None'; 
}

const parentBox = selector('.box-output');
function createBox() {
  const newBox = createElement('div');
  addClass(newBox, 'box');
  addContext(newBox);
  parentBox.prepend(newBox);
}

function addContext(newBox) {
  createBoxHeader(newBox);
  createContext(newBox);
}

function findDate() {
  const date = new Date();

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  return(`${month}/${day}/${year}`);
}

function createBoxHeader(newBox) {
  const header = createElement('div');
  addClass(header, 'box-post-header')

  addNameHeader(header);
  addDateHeader(header);

  newBox.appendChild(header);
}

function addNameHeader(header) {
  const boxUsername = createElement('div');
  const logo = createElement('div');
  const image = createElement('img');
  const name = createElement('p');

  addClass(logo, 'user-icon');
  addClass(boxUsername, 'box-username');
  
  image.src = './source/img/city.jpg';
  name.innerText = user.userName;

  logo.appendChild(image);
  boxUsername.appendChild(logo);
  boxUsername.appendChild(name);

  header.appendChild(boxUsername);
}

function addDateHeader(header) {
  const boxDate = createElement('div');
  addClass(boxDate, 'box-date');
  const printDate = createElement('p');
  printDate.innerText = findDate();
  boxDate.appendChild(printDate);

  header.appendChild(boxDate);
}

function createContext(newBox) {
  const textOutput = createElement('p');
  const imgOutput = createElement('img');

  addClass(textOutput, 'text-output');
  addClass(imgOutput, 'img');
  
  if (!noText()) {
    textOutput.innerText = getText();
    newBox.appendChild(textOutput);
  }

  if (!noImg()) {
    imgOutput.src = getImg();
    newBox.appendChild(imgOutput);
  }
}

function addClass(selector, property) {
  selector.classList.add(property);
}