class Student {

  constructor(params) {
    this.fullName = params.fullName;
    this.university = params.university;
    this.course = params.course;
    this.birthDate = params.birthDate;
    this.photoUrl =  params.photoUrl;
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

  appendStudentBlock = () => {
    let div = document.createElement("div");
    div.classList.add("student");
    let img = document.createElement("img");
    img.setAttribute("src", this.photoUrl);
    img.setAttribute("alt", this.fullName);
    div.appendChild(img);
    let p = document.createElement("p");
    p.setAttribute("title", this.fullName);
    p.appendChild(document.createTextNode(this.fullName));
    div.appendChild(p);
    let span = document.createElement("span");
    span.setAttribute("title", this.university.concat(" ", this.course));
    span.appendChild(document.createTextNode(this.university.concat(" ", this.course)));
    div.appendChild(span);
    document.getElementById("students").appendChild(div);
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
    span2.setAttribute("title", "Учится");
    span2.appendChild(document.createTextNode("Учится"));
    divDesc.appendChild(span2);

    let p2 = document.createElement("p");
    p2.setAttribute("title", this.fullName);
    p2.appendChild(document.createTextNode(this.university.concat(", ", this.course, " курс")));
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
    return this.appendStudentBlock();
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

const studentArr = [
   {
       fullName: 'Иван Иванов',
       university: 'УГАТУ',
       course: 2,
       birthDate: new Date(2000, 0, 1),
       photoUrl: '/image/ava01.jpg'
   },
   {
       fullName: 'Маша Иванова',
       university: 'БФУ',
       course: 1,
       birthDate: new Date(2001, 1, 2),
       photoUrl: '/image/ava02.jpg'
   },
   {
       fullName: 'Дарья Петрова',
       university: 'УГАТУ',
       course: 3,
       birthDate: new Date(1999, 3, 4),
       photoUrl: '/image/ava03.jpg'
   },
   {
       fullName: 'Виктор Васин',
       university: 'БФУ',
       course: 3,
       birthDate: new Date(1999, 4, 5),
       photoUrl: '/image/ava04.jpg'
   },
   {
       fullName: 'Мария Фёдорова',
       university: 'УГАТУ',
       course: 2,
       birthDate: new Date(2000, 5, 6),
       photoUrl: '/image/ava05.jpg'
   },
   {
       fullName: 'Дима Сергеев',
       university: 'БФУ',
       course: 1,
       birthDate: new Date(2001, 6, 7),
       photoUrl: '/image/ava06.jpg'
   }

];


window.onload = function() {
  studentArr.forEach((item) => {
      const student = new Student(item);
      student.appendToDOM();
  });

};
