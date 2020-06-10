import {School, Student, Teacher, Person, PopupList, PersonFactory, DataSet} from './personLib.js'

'use strict';


class ComponentFactory {
  create(component, params) {
    return new component(params || {});
  }
}


class Model {
  constructor(data) {
    for(let key in data) {
      this[key] = data[key];
    }
  }
}


// Отображение карточек персон
class ViewPerson {
  render(page, limit) {
    let personArr = dataSet.getList((page + 1), limit);
    personArr.then(arr => {
      ReactDOM.render(React.createElement(School, {persons: arr}), document.getElementById('persons') );
    });
  }

}


class PageInfo {
  constructor(params) {
    this.currentPage = 0;         // Текущая отображаемая страница
    this.currentLimit = 3;        // Лимит отображения карточек
    this.countPersons = 0;        // Количество персон (до запроса на сервер)
    this.countPages = 0;          // Количество страниц (до запроса на сервер)
  }

}


const componentFactory = new ComponentFactory();
export const personFactory = new PersonFactory();
export const school = componentFactory.create(School);
export const popupList = componentFactory.create(PopupList);
export const dataSet = new DataSet({
  model: Model,
  object: 'person'
});
export const viewPerson = new ViewPerson();
export const pageInfo = new PageInfo();


viewPerson.render(pageInfo.currentPage, pageInfo.currentLimit);  // Рендерим первую страницу с персонами

dataSet.query('countPersons/1').then(result => {   // Загружаем количество персон из db.json

pageInfo.countPersons = result["countPersons"];  // Количество персон из db.json
pageInfo.countPages = Math.ceil(pageInfo.countPersons / pageInfo.currentLimit);  // Количество страниц

if (pageInfo.countPersons == 0) {  // Если кол-во нет персон, то скрываем пагинацию и раздел persons
	document.getElementById("pagination").hidden = true;
	document.getElementById("persons").hidden = true;
}


// Pagination
let buttons = document.getElementsByClassName('view__button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (event) => {
    ReactDOM.unmountComponentAtNode(document.getElementById('persons'));
    switch(event.target.getAttribute('id')) {
      case 'prevButton':
        pageInfo.currentPage = ((pageInfo.currentPage - 1 + pageInfo.countPages) % pageInfo.countPages);
        viewPerson.render(pageInfo.currentPage, pageInfo.currentLimit);
        break;
      case 'nextButton':
        pageInfo.currentPage = ((pageInfo.currentPage + 1) % pageInfo.countPages);
        viewPerson.render(pageInfo.currentPage, pageInfo.currentLimit);
        break;
    }
  });
}


// Submit creation form
formElem.onsubmit = async (event) => {
  event.preventDefault();
  let formData = new FormData(formElem);
  switch (formData.get('type')) {
    case 'student':
      formData.set("course", "1");
      break;
    case 'teacher':
      formData.set("post", "Преподаватель");
      break;
    case 'person':
      formData.delete('university');
      break;
  }
  formData.set("photoUrl", "/image/anonymous.jpg");

  let object = {};
  formData.forEach((value, key) => {object[key] = value});
  let jsonData = JSON.stringify(object);

  result = await dataSet.create(jsonData);
  dataSet.afterCreate(result);

  pageInfo.countPersons += 1;
  pageInfo.countPages = Math.ceil(pageInfo.countPersons / pageInfo.currentLimit);

  dataSet.ChangeTheNumberOfPersons(pageInfo.countPersons);

  formElem.reset();
};


});


