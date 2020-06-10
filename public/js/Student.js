import {Person} from './personLib.js'

'use strict';

export class Student extends Person {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, 
      {university: this.props.person.university,
           course: this.props.person.course});
    this.type = this.props.person.type;
  }

  getLastStringInCard = () => {
    return React.createElement('span', {title: this.state.university.concat(" ", this.state.course)}, this.state.university.concat(" ", this.state.course));
  }

  getPostInExtendedCard = () => {
    return React.createElement('span', {title: "Учится"}, "Учится");
  }

  getLastStringInExtendedCard = () => {
    return React.createElement('p', {title: this.state.university.concat(", ", this.state.course, " курс")}, this.state.university.concat(", ", this.state.course, " курс"));
  }


}

