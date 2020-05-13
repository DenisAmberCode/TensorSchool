class Person {

  constructor(params) {
    this.type = 'Person';
    this.fullName = params.fullName;
    this.birthDate = params.birthDate;
    this.photoUrl = params.photoUrl;
    this.university = params.university;
  }

  get birthDateStr() {
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let d = this.birthDate.getDate();
    let m = months[this.birthDate.getMonth()];
    return d.toString().concat(" ",m);
  }

  get age() {
    let diffDate = Math.ceil( Math.abs(new Date().getTime() - this.birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
    if (diffDate % 10 == 1 && diffDate != 11) {
      return diffDate.toString().concat(" ", "год");
    } else if ([2, 3, 4].includes(diffDate % 10) && [12, 13, 14].includes(diffDate % 10) == false) {
      return diffDate.toString().concat(" ", "года");
    } else {
      return diffDate.toString().concat(" ", "лет");
    }
  }

  appendPersonBlock = () => {
    let div = document.createElement("div");
    div.classList.add("person");
    let img = document.createElement("img");
    img.setAttribute("src", this.photoUrl);
    img.setAttribute("alt", this.fullName);
    div.appendChild(img);
    let p = document.createElement("p");
    p.setAttribute("title", this.fullName);
    p.appendChild(document.createTextNode(this.fullName));
    div.appendChild(p);
    let span = document.createElement("span");
    switch(this.type) {
      case 'student':
        span.setAttribute("title", this.university.concat(" ", this.course));
        span.appendChild(document.createTextNode(this.university.concat(" ", this.course)));
        break;

      case 'teacher':
        span.setAttribute("title", this.post);
        span.appendChild(document.createTextNode(this.post));
        break;

      default:
        break;
    }
    div.appendChild(span);
    document.getElementById("persons").appendChild(div);
    return div;
  }

  openCard = (currentTarget) => {
    let div = document.createElement("div");
    div.classList.add("card");

    let divDesc = document.createElement("div");
    divDesc.classList.add("card__description");

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(this.fullName));
    divDesc.appendChild(h3);

    let span1 = document.createElement("span");
    span1.setAttribute("title", "День рождения");
    span1.appendChild(document.createTextNode("День рождения"));
    divDesc.appendChild(span1);

    let p1 = document.createElement("p");
    p1.setAttribute("title", this.birthDateStr.concat(", ", this.age));
    p1.appendChild(document.createTextNode(this.birthDateStr.concat(", ", this.age)));
    divDesc.appendChild(p1);

    let span2 = document.createElement("span");
    let p2 = document.createElement("p");
    switch(this.type) {
      case 'student':
        span2.setAttribute("title", "Учится");
        span2.appendChild(document.createTextNode("Учится"));
        p2.setAttribute("title", this.university.concat(", ", this.course, " курс"));
        p2.appendChild(document.createTextNode(this.university.concat(", ", this.course, " курс")));
        break;

      case 'teacher':
        span2.setAttribute("title", "Преподаёт");
        span2.appendChild(document.createTextNode("Преподаёт"));
        p2.setAttribute("title", this.university);
        p2.appendChild(document.createTextNode(this.university));
        break;

      default:
        break;
    }
    divDesc.appendChild(span2);
    divDesc.appendChild(p2);

    div.appendChild(divDesc);

    let divImg = document.createElement("div");
    divImg.classList.add("card__image");

    let divTimes = document.createElement("div");
    divTimes.setAttribute("id", "times");
    divTimes.setAttribute("class", "card__image_times");
    divTimes.innerHTML = "&times";
    divImg.appendChild(divTimes);

    let img = document.createElement("img");
    img.setAttribute("src", this.photoUrl);
    divImg.appendChild(img);

    div.appendChild(divImg);

    currentTarget.insertBefore(div, currentTarget.firstChild)
  }

  render = () => {
    return this.appendPersonBlock();
  }

  appendToDOM = () => {
    const layout = this.render();
    layout.addEventListener('click', (event) => {
      if (document.getElementById("times") == null) {
        this.openCard(event.currentTarget);
      } else {
          document.getElementsByClassName('card')[0].remove();
      }
    });
  }
}


class Student extends Person {

  constructor(params) {
    super(params);
    this.course = params.course;
    this.type = params.type;
  }

}


class Teacher extends Person {

  constructor(params) {
    super(params);
    this.post = params.post;
    this.type = params.type;
  }

}


class PersonFactory {
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


class SchoolList {
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


class School {
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


window.onload = function() {
  const personFactory = new PersonFactory();
  const school = new School(personFactory);

  personArr.forEach((item) => {
      const person = school.enroll(item);
      person.appendToDOM();
  });

};
