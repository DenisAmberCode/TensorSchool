import {PersonFactory} from './personLib.js';
import {School} from './school.js';

const personArr = [
   {
       fullName: 'Иван Иванов',
       type: 'student',
       university: 'УГАТУ',
       course: 2,
       birthDate: new Date(2000, 0, 1),
       photoUrl: '/image/ava01.jpg',
   },
   {
       fullName: 'Маша Иванова',
       type: 'student',
       university: 'БФУ',
       course: 1,
       birthDate: new Date(2001, 1, 2),
       photoUrl: '/image/ava02.jpg',
   },
   {
       fullName: 'Дарья Петрова',
       type: 'student',
       university: 'УГАТУ',
       course: 3,
       birthDate: new Date(1999, 3, 4),
       photoUrl: '/image/ava03.jpg',
   },
   {
       fullName: 'Виктор Васин',
       type: 'student',
       university: 'БФУ',
       course: 3,
       birthDate: new Date(1999, 4, 5),
       photoUrl: '/image/ava04.jpg',
   },
   {
       fullName: 'Мария Фёдорова',
       type: 'student',
       university: 'УГАТУ',
       course: 2,
       birthDate: new Date(2000, 5, 6),
       photoUrl: '/image/ava05.jpg',
   },
   {
       fullName: 'Дима Сергеев',
       type: 'student',
       university: 'БФУ',
       course: 1,
       birthDate: new Date(2001, 6, 7),
       photoUrl: '/image/ava06.jpg',
   },
   {
       fullName: 'Михаил Богатырёв',
       type: 'teacher',
       post: 'Преподаватель',
       university: 'УГАТУ',
       birthDate: new Date(2000, 0, 1),
       photoUrl: '/image/ava01.jpg',
   },
   {
       fullName: 'Юрий Таранов',
       type: 'teacher',
       post: 'Преподаватель',
       university: 'БФУ',
       birthDate: new Date(2001, 1, 2),
       photoUrl: '/image/ava04.jpg',
   }

];


const personFactory = new PersonFactory();
const school = new School();

personArr.forEach((item) => {
	let person;
	switch(item.type) {
		case 'student':
			person = personFactory.createStudent(item);
			break;
		case 'teacher':
			person = personFactory.createTeacher(item);
			break;
		default:
			person = personFactory.createPerson(item);
			break;
	}
	school.enroll(person);
});

school.appendToDOM();

