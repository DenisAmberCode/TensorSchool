class Student {

  constructor(params) {
    this.fullName = params.fullName;
    this.university = params.university;
    this.course = params.course;
    this.birthDate = params.birthDate;
    this.photoUrl =  params.photoUrl;
  }

  get birthDateStr() {
    var months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let d = this.birthDate.getDate();
    let m = months[this.birthDate.getMonth()];
    return d.toString().concat(" ",m);
  }

  get age() {
    return (new Date().getFullYear() - this.birthDate.getFullYear()).toString().concat(" ", "лет");
  }

  render = () => {
    return appendStudentBlock(this);
  }

  appendToDOM = () => {
    const layout = this.render();
    layout.addEventListener('click', (event) => {
      if (document.getElementById("times") == null) {
        openCard(this, event.currentTarget);
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

function appendStudentBlock(student) {
  let div = document.createElement("div");
  div.classList.add("student");
  let img = document.createElement("img");
  img.setAttribute("src", student.photoUrl);
  img.setAttribute("alt", student.fullName);
  div.appendChild(img);
  let p = document.createElement("p");
  p.setAttribute("title", student.fullName);
  p.appendChild(document.createTextNode(student.fullName));
  div.appendChild(p);
  let span = document.createElement("span");
  span.setAttribute("title", student.university.concat(" ", student.course));
  span.appendChild(document.createTextNode(student.university.concat(" ", student.course)));
  div.appendChild(span);
  document.getElementById("students").appendChild(div);
  return div;
}


function openCard(student, currentTarget) {
  let div = document.createElement("div");
  div.classList.add("card");

  let div_desc = document.createElement("div");
  div_desc.classList.add("card__description");

  let h3 = document.createElement("h3");
  h3.appendChild(document.createTextNode(student.fullName));
  div_desc.appendChild(h3);

  let span1 = document.createElement("span");
  span1.setAttribute("title", "День рождения");
  span1.appendChild(document.createTextNode("День рождения"));
  div_desc.appendChild(span1);

  let p1 = document.createElement("p");
  p1.setAttribute("title", student.birthDateStr.concat(", ", student.age));
  p1.appendChild(document.createTextNode(student.birthDateStr.concat(", ", student.age)));
  div_desc.appendChild(p1);

  let span2 = document.createElement("span");
  span2.setAttribute("title", "Учится");
  span2.appendChild(document.createTextNode("Учится"));
  div_desc.appendChild(span2);

  let p2 = document.createElement("p");
  p2.setAttribute("title", student.fullName);
  p2.appendChild(document.createTextNode(student.university.concat(", ", student.course, " курс")));
  div_desc.appendChild(p2);

  div.appendChild(div_desc);

  let div_img = document.createElement("div");
  div_img.classList.add("card__image");

  let div_times = document.createElement("div");
  div_times.setAttribute("id", "times");
  div_times.setAttribute("class", "card__image_times");
  div_times.innerHTML = "&times";
  div_img.appendChild(div_times);

  let img = document.createElement("img");
  img.setAttribute("src", student.photoUrl);
  div_img.appendChild(img);

  div.appendChild(div_img);

  currentTarget.insertBefore(div, currentTarget.firstChild)
}

window.onload = function() {
  studentArr.forEach((item) => {
      const student = new Student(item);
      student.appendToDOM();
  });

};