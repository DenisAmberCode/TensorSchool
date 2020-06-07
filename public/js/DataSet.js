import {personFactory, pageInfo, school, viewPerson} from './app.js'

export class DataSet {
  constructor(options) {
    this.options = {
      host: 'http://localhost:8080/api/',
      model: options.model,
      object: options.object
    };
  }

  toModel(result) {
    return new (this.options.model)(result);
  }

  query(query, options, params) {
    let url = new URL(this.options.host);
    url.pathname += query;
    for (let key in params) {
      url.searchParams.set(key, params[key]);
    }

    return fetch(url, options).then(
      response => response.json()
    );
  }

  getList(page, limit) {
    return this.query(
        `${this.options.object}`,
        {
          method: 'GET'
        },
        {
          '_page': page,
          '_limit': limit
        }).then(results => {
          return results.map((item) => this.toModel(item));
        });
  }

  create(jsonData) {
    let divPersons = document.getElementById('persons');
    return this.query(
        `${this.options.object}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        }
      ).then(result => {
        return this.toModel(result);
      });   
  }

  afterCreate(personModel) {
    // Рендерим карточку, если есть место на странице (если карточек < 3)
    let divPersons = document.getElementById('persons');
    if (divPersons.children.length < 3) {
      let person = personFactory.create(personModel);
      person.mount(divPersons);
    }
    document.getElementById("pagination").hidden = false;
    document.getElementById("persons").hidden = false;
  }

  read(id) {
    return this.query(
        `${this.options.object}/${id}`,
        {
          method: 'GET'
        }
      ).then(result => {
        return this.toModel(result);
      });
  }

  update(id, jsonData, OldPerson) {
    return this.query(
      `${this.options.object}/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      }
    ).then(result => {
      return result;
      let newPerson = personFactory.create(this.toModel(result));
      newPerson.mount(OldPerson.container, "beforebegin");
      OldPerson.unmount();
    });
  }

  delete(id) {
    return this.query(
        `${this.options.object}/${id}`,
        {
          method: 'DELETE'
        }
      ).then(result => {
        return this.toModel(result);
      });
  }

  beforeDelete() {
    pageInfo.countPersons -= 1;
    pageInfo.countPages = Math.ceil(pageInfo.countPersons / pageInfo.currentLimit);
  }

  afterDelete() {
    this.ChangeTheNumberOfPersons(pageInfo.countPersons);
    let divPersons = document.getElementById('persons');
    if (divPersons.children.length - 1 == 0 && pageInfo.currentPage > 0) {  // После удалении последней карточки со страницы, запросить предыдущую страницу
      pageInfo.currentPage -= 1;
    };
    divPersons.innerHTML = "";
    school.schoolList.list = [];
    if (pageInfo.countPersons > 0) {
      viewPerson.render(pageInfo.currentPage, pageInfo.currentLimit);
    } else {
      document.getElementById("pagination").hidden = true;
      document.getElementById("persons").hidden = true;
    }  
  }

  ChangeTheNumberOfPersons(countPersons) {
    let jsonData = JSON.stringify({"countPersons": countPersons});
    this.query(        
      `/countPersons/1`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      },
      ).then(result => {
        return result;
      });
  }

}