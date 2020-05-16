import {Student, Teacher, Person} from './personLib.js';
export class PersonFactory {
    createStudent(params) {
        return new Student(params);
    }
    createTeacher(params) {
        return new Teacher(params);
    }
    createPerson(params) {
        return new Person(params);
    }

}

