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


export class School {
    constructor() {
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

    appendToDOM = () => {
      this.schoolList.list.forEach((person) => {
        person.mount(document.getElementById("persons"));
      });
    }
    
}

