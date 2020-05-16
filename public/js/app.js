import {PersonFactory} from './personLib.js';
import {School} from './school.js';

// проинициализируем фабрику
// const factory = new Factory();

// создадим школу (если есть для нее фабрика, то тоже через фабрику) 
// let school = new School();

// добавим в список школы студентов используйте те данные, которые у вас есть
// Vasia и пр. тут скорее для примера
// если методы называются по другому, поменяйте
// по желанию можно добавить больше
// school.add( factory.createStudent({ name: 'Vasia' }) );
// school.add( factory.createStudent({ name: 'Petia' }) );
// school.add( factory.createTeacher({ name: 'Misha' }) );

// отрисуем всех студентов в dom 
// если методы называются по другому, поменяйте
// точка монтирования document.body может быть изменена на любой другой элемент DOM
// school.appendToDom(document.body);

// в итоге в на странице должны получить список студентов и учителей
// папка js будет содержать несколько файлов, минимум 3, а лучше больше
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
const school = new School(personFactory);

personArr.forEach((item) => {
  const person = school.enroll(item);
  person.appendToDOM();
});
