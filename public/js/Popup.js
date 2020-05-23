import {Component} from './personLib.js'
import {popupList} from './app.js'

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
  render(options) {
    let div = document.createElement("div");
    div.classList.add("card");

    let divDesc = document.createElement("div");
    divDesc.classList.add("card__description");

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(options.fullName));
    divDesc.appendChild(h3);

    let span1 = document.createElement("span");
    span1.setAttribute("title", "День рождения");
    span1.appendChild(document.createTextNode("День рождения"));
    divDesc.appendChild(span1);

    let p1 = document.createElement("p");
    p1.setAttribute("title", options.birthDateStr.concat(", ", options.age));
    p1.appendChild(document.createTextNode(options.birthDateStr.concat(", ", options.age)));
    divDesc.appendChild(p1);

    if (options.getPostInExtendedCard()) {
      divDesc.appendChild(options.getPostInExtendedCard());  
    }
    if (options.getLastStringInExtendedCard()) {
      divDesc.appendChild(options.getLastStringInExtendedCard());   
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
    img.setAttribute("src", options.photoUrl);
    divImg.appendChild(img);

    div.appendChild(divImg);

    return div;
  }

  afterMount() {
    this.container.querySelector('.card__image_times').addEventListener('click', (event) => {popupList.clear(); event.stopPropagation()});
  }


}