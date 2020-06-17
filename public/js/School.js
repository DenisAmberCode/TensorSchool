import {Person, Student, Teacher} from './personLib.js'

'use strict';

export class SchoolList {
    constructor() {
      this.list = [];
    }

    add(person) {
      this.list.push(person);
    }

    del(fullName) {
      this.list = this.list.filter(person => person.fullName !== fullName);
    }
}


export class School extends React.Component{
    constructor(props) {
      super(props);
      this.persons = this.props.persons;
      this.schoolList = new SchoolList();
    }

    enroll(person) {
      this.schoolList.add(person);
    }

    dismiss(fullName) {
      this.schoolList.del(fullName);
    }

    getPerson(fullName) {
      return this.schoolList.list.find(person => person.fullName === fullName);
    }

    render() {
      this.persons.forEach((item) => {
        let person;
        switch(item.type) {
          case 'student':
            person = React.createElement(Student, {person: item, key: item.id});
            break;
          case 'teacher':
            person = React.createElement(Teacher, {person: item, key: item.id});
            break;
          default:
            person = React.createElement(Person, {person: item, key: item.id});
            break;
        }
        this.enroll(person);
      });

      return this.schoolList.list;
    }
    
}

