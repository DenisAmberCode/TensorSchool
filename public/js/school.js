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
    constructor(personFactory) {
      this.schoolList = new SchoolList();
      this.personFactory = personFactory;
    }

    enroll(person) {
      switch(person.type) {
        case 'student':
          let student = this.personFactory.createStudent(person);
          this.schoolList.add(student);
          return student;
          break;

        case 'teacher':
          let teacher = this.personFactory.createTeacher(person);
          this.schoolList.add(teacher);
          return teacher;
          break;

        default:
          break;
      }
    }

    dismiss(fullName) {
      this.schoolList.del(fullName);
    }

    getPerson(fullName) {
      return this.schoolList.list.find(person => person.fullName === fullName);
    }
    
}

