import {Component} from './personLib.js'
import {popupList, dataSet} from './app.js'

'use strict';

export class PopupList {
  constructor() {
    this.popups = [];
  }

  clear() {
    let popups = document.getElementsByClassName('person__popupCard')
    for (let i=0; i<popups.length; i++) {
      if (popups[i].innerHTML != "") {
        ReactDOM.unmountComponentAtNode(popups[i]);
      }
    }
  }

}


export class Popup extends React.Component {

  constructor(props){
    super(props);
    this.person = props.person;
    this.event = props.event;
  }

//  Вёрстка Popup зависит от event: при клике на 'btnUpdate' формируется форма обновления, иначе формируется Popup с расширенной информацией
  render() {
    switch (this.event.target.classList.contains('btnUpdate')) {
      case true:
        return this.renderPopupForm();
        break;
      case false:
        return this.renderPopupCard();
        break;         
    }
  }

  renderPopupForm() {
    let lastInput = null;
    let classCard__form_inputPerson = '';
    switch (this.person.type) {
      case 'student':
        lastInput = React.createElement('label', {},
          "Укажите ваш курс",
          React.createElement('input', {type: "number", min: "1", name: "course", required: true, placeholder: "Курс"})
        );
        break;
      case 'teacher':
        lastInput = React.createElement('label', {},
          "Укажите вашу должность",
          React.createElement('input', {type: "text", name: "post", required: true, placeholder: "Преподаватель"})
        );
        break;
      default:
        classCard__form_inputPerson = "card__form_inputPerson";
        break;
    }
    let patternDate = "^([0-9]{4})-([0-9]{2})-([0-9]{2})$";
    let times = "\u00D7";  // крестик &times
    return React.createElement('div', {},  
            React.createElement('form', {id: "formUpdate", className: `card card__form ${classCard__form_inputPerson}`},
              React.createElement('span', {id: "times", className: 'card__image_times'}, times),
              React.createElement('h2', {}, "Обновление информации о персоне"),
              React.createElement('fieldset', {className: 'form__info'},
                React.createElement('label', {},
                  "Новое имя и фамилия",
                  React.createElement('input', {type: "text", name: "fullName", required: true, placeholder: "Иван Иванов"}),
                ),
                React.createElement('label', {},
                  "Ваш университет",
                  React.createElement('input', {type: "text", name: "university", required: true, placeholder: "University"}),
                ),
                React.createElement('label', {},
                  "Ваш День рождения (ГГГГ-ММ-ДД)",
                  React.createElement('input', {type: "text", name: "birthDate", required: true, pattern: patternDate, placeholder: "1998-01-15"}),
                ),
                lastInput
              ),
              React.createElement('fieldset', {className: 'form__button'},
                React.createElement('input', {className: 'btn', type: "submit", name: "submit", value: "Обновить"})
              )
            )
          );
  }

  renderPopupCard() {
    let postInExtendedCard = (this.person.getPostInExtendedCard()) ? this.person.getPostInExtendedCard() : null;
    let lastStringInExtendedCard = (this.person.getLastStringInExtendedCard()) ? this.person.getLastStringInExtendedCard() : null;
    let times = "\u00D7";  // крестик &times
    return React.createElement('div', {className: 'card card__popupInfo', key: this.id},  
              React.createElement('div', {id: "times", className: 'card__image_times'}, times), //&times
              React.createElement('div', {id: "times", className: 'card__description'},
                React.createElement('h3', {}, this.person.fullName),
                React.createElement('span', {title: 'День рождения'}, "День рождения"),
                React.createElement('p', {title: this.person.birthDateStr.concat(", ", this.person.age)}, this.person.birthDateStr.concat(", ", this.person.age)),
                this.person.getPostInExtendedCard(),
                this.person.getLastStringInExtendedCard()
                ),
              React.createElement('div', {className: 'card__image'},
                React.createElement('img', {src: this.person.photoUrl})
                )
            );
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).querySelector('.card__image_times').addEventListener('click', (event) => {popupList.clear(); event.stopPropagation()});

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