export class Person {

  constructor(params) {
    this.type = 'Person';
    this.fullName = params.fullName;
    this.birthDate = params.birthDate;
    this.photoUrl = params.photoUrl;
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
    } else if ([2, 3, 4].includes(diffDate % 10) && ![12, 13, 14].includes(diffDate % 10)) {
      return diffDate.toString().concat(" ", "года");
    } else {
      return diffDate.toString().concat(" ", "лет");
    }
  }

  getLastStringInCard = () => {
    return undefined;
  }

  getPostInExtendedCard = () => {
    return undefined;
  }

  getLastStringInExtendedCard = () => {
    return undefined;
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
    if (this.getLastStringInCard()) {
      div.appendChild(this.getLastStringInCard());
    }
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

    if (this.getPostInExtendedCard()) {
      divDesc.appendChild(this.getPostInExtendedCard());  
    }
    if (this.getLastStringInExtendedCard()) {
      divDesc.appendChild(this.getLastStringInExtendedCard());   
    }


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

