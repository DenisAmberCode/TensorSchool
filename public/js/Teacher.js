import {Person} from './personLib.js'

'use strict';

export class Teacher extends Person {

  constructor(params) {
    super(params);
    this.university = params.university;
    this.post = params.post;
    this.type = params.type;
  }

  getLastStringInCard = () => {
    let span = document.createElement("span");
    span.setAttribute("title", this.post);
    span.appendChild(document.createTextNode(this.post));
    return span;
  }

  getPostInExtendedCard = () => {
    let span = document.createElement("span");
    span.setAttribute("title", "Преподаёт");
    span.appendChild(document.createTextNode("Преподаёт"));
    return span;
  }

  getLastStringInExtendedCard = () => {
    let p = document.createElement("p");
    p.setAttribute("title", this.university);
    p.appendChild(document.createTextNode(this.university));
    return p;
  }


}


