import {Person} from './personLib.js'

'use strict';

export class Student extends Person {

  constructor(props) {
    super(props);
    this.university = this.props.person.university;
    this.course = this.props.person.course;
    this.type = this.props.person.type;
  }

  getLastStringInCard = () => {
    return React.createElement('span', {title: this.university.concat(" ", this.course)}, this.university.concat(" ", this.course));
  }

  getPostInExtendedCard = () => {
    return React.createElement('span', {title: "Учится"}, "Учится");
  }

  getLastStringInExtendedCard = () => {
    return React.createElement('p', {title: this.university.concat(", ", this.course, " курс")}, this.university.concat(", ", this.course, " курс"));
  }


}

