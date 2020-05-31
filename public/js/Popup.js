import {Component} from './personLib.js'
import {popupList, dataSet} from './app.js'

'use strict';

export class PopupList {
  constructor() {
    this.popups = [];
  }

  clear() {
    this.popups.forEach( p => {
      p.unmount();
    });
    this.popups = [];
  }

}


export class Popup extends Component {

  constructor({person, event}){
    super({person, event});
    this.person = person;
    this.event = event;
  }

//  Вёрстка Popup зависит от event: при клике на 'btnUpdate' формируется форма обновления, иначе формируется Popup с расширенной информацией
  render() {
    let div = document.createElement("div");
    switch (this.event.target.classList.contains('btnUpdate')) {
      case true:
        let lastInput = '';
        let classCard__form_inputPerson = '';
        switch (this.person.type) {
          case 'student':
            lastInput = `<label>Укажите ваш курс<input type="number" min="1" name="course" required placeholder="Курс"></label>`;
            break;
          case 'teacher':
            lastInput = `<label>Укажите вашу должность<input type="text" name="post" required placeholder="Преподаватель"></label>`;
            break;
          default:
            classCard__form_inputPerson = "card__form_inputPerson";
            break;
        }
        let patternDate = "^([0-9]{4})-([0-9]{2})-([0-9]{2})$";
        div.innerHTML = `<form id="formUpdate" class="card card__form ${classCard__form_inputPerson}">
                            <span id="times" class="card__image_times">&times</span>
                            <h2>Обновление информации о персоне</h2>
                            <fieldset class="form__info">
                                <label>
                                  Новое имя и фамилия
                                  <input type="text" name="fullName" required placeholder="Иван Иванов">
                                </label>
                                <label>
                                  Ваш университет
                                  <input type="text" name="university" required placeholder="University">
                                </label>
                                <label>
                                  Ваш День рождения (ГГГГ-ММ-ДД)
                                  <input type="text" name="birthDate" required pattern=${patternDate} placeholder="1998-01-15">
                                </label>
                                ${lastInput}                   
                            </fieldset>
                            <fieldset class="form__button">
                                <input class="btn" type="submit" name="submit" value="Обновить">
                            </fieldset>
                        </form>`;
        break;
      case false:
        div.classList.add("card", "card__popupInfo");

        let divTimes = document.createElement("div");
        divTimes.setAttribute("id", "times");
        divTimes.setAttribute("class", "card__image_times");
        divTimes.innerHTML = "&times";
        div.appendChild(divTimes);

        let divDesc = document.createElement("div");
        divDesc.classList.add("card__description");

        let h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(this.person.fullName));
        divDesc.appendChild(h3);

        let span1 = document.createElement("span");
        span1.setAttribute("title", "День рождения");
        span1.appendChild(document.createTextNode("День рождения"));
        divDesc.appendChild(span1);

        let p1 = document.createElement("p");
        p1.setAttribute("title", this.person.birthDateStr.concat(", ", this.person.age));
        p1.appendChild(document.createTextNode(this.person.birthDateStr.concat(", ", this.person.age)));
        divDesc.appendChild(p1);

        if (this.person.getPostInExtendedCard()) {
          divDesc.appendChild(this.person.getPostInExtendedCard());  
        }
        if (this.person.getLastStringInExtendedCard()) {
          divDesc.appendChild(this.person.getLastStringInExtendedCard());   
        }


        div.appendChild(divDesc);

        let divImg = document.createElement("div");
        divImg.classList.add("card__image");
        let img = document.createElement("img");
        img.setAttribute("src", this.person.photoUrl);
        divImg.appendChild(img);

        div.appendChild(divImg);
        break;         
    }

    return div;
  }

  afterMount() {
    this.container.querySelector('.card__image_times').addEventListener('click', (event) => {popupList.clear(); event.stopPropagation()});

    // Submit creation form
    if (document.getElementById("formUpdate")) {
      formUpdate.onsubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(formUpdate);

        let object = {};
        formData.forEach((value, key) => {object[key] = value});
        let jsonData = JSON.stringify(object);
        let id = this.person.id;

        await dataSet.update(id, jsonData, this.person);
      };
    }
  }


}