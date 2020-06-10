import {Person} from './personLib.js'

'use strict';

export class Teacher extends Person {

  constructor(props) {
    super(props);
    this.university = this.props.person.university;
    this.post = this.props.person.post;
    this.type = this.props.person.type;
  }

  getLastStringInCard = () => {
    return React.createElement('span', {title: this.post}, this.post);
  }

  getPostInExtendedCard = () => {
    return React.createElement('span', {title: "Преподаёт"}, "Преподаёт");
  }

  getLastStringInExtendedCard = () => {
    return React.createElement('p', {title: this.university}, this.university);
  }


}


