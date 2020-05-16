import {Person} from './personLib.js'
export class Student extends Person {

  constructor(params) {
    super(params);
    this.university = params.university;
    this.course = params.course;
    this.type = params.type;
  }

  getLastStringInCard = () => {
    let span = document.createElement("span");
    span.setAttribute("title", this.university.concat(" ", this.course));
    span.appendChild(document.createTextNode(this.university.concat(" ", this.course)));
    return span;
  }

  getPostInExtendedCard = () => {
    let span = document.createElement("span");
    span.setAttribute("title", "Учится");
    span.appendChild(document.createTextNode("Учится"));
    return span;
  }

  getLastStringInExtendedCard = () => {
    let p = document.createElement("p");
    p.setAttribute("title", this.university.concat(", ", this.course, " курс"));
    p.appendChild(document.createTextNode(this.university.concat(", ", this.course, " курс")));
    return p;
  }


}

