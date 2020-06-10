import {Person} from './personLib.js'

'use strict';

export class Teacher extends Person {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, 
      {university: this.props.person.university,
            post : this.props.person.post});
    // this.university = this.props.person.university;
    // this.post = this.props.person.post;
    this.type = this.props.person.type;
  }

  getLastStringInCard = () => {
    return React.createElement('span', {title: this.state.post}, this.state.post);
  }

  getPostInExtendedCard = () => {
    return React.createElement('span', {title: "Преподаёт"}, "Преподаёт");
  }

  getLastStringInExtendedCard = () => {
    return React.createElement('p', {title: this.state.university}, this.state.university);
  }


}


