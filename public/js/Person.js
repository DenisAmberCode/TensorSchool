import {Component, Popup,} from './personLib.js';
import {popupList, dataSet} from './app.js'

'use strict';

export class Person extends Component{

  constructor(params) {
    super(params);
    this.id = params.id;
    this.type = 'Person';
    this.fullName = params.fullName;
    this.birthDate = new Date(params.birthDate);
    this.photoUrl = params.photoUrl || "/image/anonymous.jpg";
  }

  get birthDateStr() {
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let d = this.birthDate.getDate();
    let m = months[this.birthDate.getMonth()];
    return d.toString().concat(" ",m);
  }

  get age() {
    let diffDate = Math.round( Math.abs(new Date().getTime() - this.birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
    if (diffDate % 10 == 1 && diffDate != 11) {
      return diffDate.toString().concat(" ", "год");
    } else if ([2, 3, 4].includes(diffDate % 10) && ![12, 13, 14].includes(diffDate % 10)) {
      return diffDate.toString().concat(" ", "года");
    } else {
      return diffDate.toString().concat(" ", "лет");
    }
  }

  getLastStringInCard = () => {
    return;
  }

  getPostInExtendedCard = () => {
    return;
  }

  getLastStringInExtendedCard = () => {
    return;
  }

  getPersonBlock = () => {
    let div = document.createElement("div");
    div.classList.add("person");
    let img = document.createElement("img");
    img.setAttribute("src", this.photoUrl);
    img.setAttribute("alt", this.fullName);
    div.appendChild(img);
    let p = document.createElement("p");
    p.setAttribute("title", this.fullName);
    p.appendChild(document.createTextNode(this.fullName));
    div.appendChild(p);
    if (this.getLastStringInCard()) {
      div.appendChild(this.getLastStringInCard());
    }
    let btnDiv = document.createElement("div");
    let btn1 = document.createElement("input");
    btn1.setAttribute("class", "btn btnDel");
    btn1.setAttribute("type", "submit");
    btn1.setAttribute("name", "buttonDel");
    btn1.setAttribute("value", "Удалить");
    btnDiv.appendChild(btn1);
    let btn2 = document.createElement("input");
    btn2.setAttribute("class", "btn btnUpdate");
    btn2.setAttribute("type", "submit");
    btn2.setAttribute("name", "buttonUpdate");
    btn2.setAttribute("value", "Обновить");
    btnDiv.appendChild(btn2);
    div.appendChild(btnDiv)
    return div;
  }

  render = () => {
    return this.getPersonBlock();
  }

  afterMount() {
    this.container.addEventListener('click', (event) => {this.onClick(event)});
    (this.container.getElementsByClassName('btnDel')[0]).addEventListener('click', (event) => {
      dataSet.beforeDelete();
      dataSet.delete(this.id);
      dataSet.afterDelete();
      event.stopPropagation();
    });
    (this.container.getElementsByClassName('btnUpdate')[0]).addEventListener('click', (event) => {this.onClick(event)});

  }


  onClick(event) {
    if (!event.currentTarget.getElementsByClassName('card').length) {
      if (popupList.popups) {
        popupList.clear();
      }
      this.popup = new Popup({person: this, event: event});
      popupList.popups.push(this.popup);
      this.popup.mount(this.container, 'afterBegin');
    }
  }

  
}

