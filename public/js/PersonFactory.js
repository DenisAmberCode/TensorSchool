import {Student, Teacher, Person} from './personLib.js';

'use strict';

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

	create(item) {
		let person;
		switch(item.type) {
			case 'student':
				person = this.createStudent(item);
				break;
			case 'teacher':
				person = this.createTeacher(item);
				break;
			default:
				person = this.createPerson(item);
				break;
		}
		return person;
	}

}

