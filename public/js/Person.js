import {Popup} from './personLib.js';
import {popupList, dataSet} from './app.js'

'use strict';

export class Person extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      fullName : this.props.person.fullName,
      birthDate : new Date(this.props.person.birthDate),
      photoUrl : this.props.person.photoUrl || "/image/anonymous.jpg"
    }
    this.id = this.props.person.id;
    this.type = 'Person';
    // this.fullName = this.props.person.fullName;
    // this.birthDate = new Date(this.props.person.birthDate);
    // this.photoUrl = this.props.person.photoUrl || "/image/anonymous.jpg";
  }

  get birthDateStr() {
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let d = this.state.birthDate.getDate();
    let m = months[this.state.birthDate.getMonth()];
    return d.toString().concat(" ",m);
  }

  get age() {
    let birthDate = new Date(this.state.birthDate);
    let now = new Date();
    let diffDate = now.getFullYear() - birthDate.getFullYear();
    birthDate.setFullYear(birthDate.getFullYear() + diffDate);
    if (birthDate > now) {
        diffDate -= 1;
    }
    if (diffDate % 10 == 1 && diffDate != 11) {
      return diffDate.toString().concat(" ", "год");
    } else if ([2, 3, 4].includes(diffDate % 10) && ![12, 13, 14].includes(diffDate % 10)) {
      return diffDate.toString().concat(" ", "года");
    } else {
      return diffDate.toString().concat(" ", "лет");
    }
  }

  getLastStringInCard = () => {
    return;
  }

  getPostInExtendedCard = () => {
    return;
  }

  getLastStringInExtendedCard = () => {
    return;
  }

  getPersonBlock = () => {
    let lastStringInCard = (this.getLastStringInCard()) ? this.getLastStringInCard() : null; 
    return React.createElement('div', {className: 'person', key: this.id},
              React.createElement('div', {className: 'person__popupCard'}),  
              React.createElement('img', {src: this.state.photoUrl, alt: this.state.fullName}),
              React.createElement('p', {title: this.state.fullName},  this.state.fullName),
              lastStringInCard,
              React.createElement('div', {},
                React.createElement('input', {className: 'btn btnDel', type: 'submit', name: 'buttonDel', value: 'Удалить'}),
                React.createElement('input', {className: 'btn btnUpdate', type: 'submit', name: 'buttonUpdate', value: 'Обновить'})
                 )
            );
  }

  render = () => {
    return this.getPersonBlock();
  }

  // прехук после монтирования
  componentDidMount() {
    let personContainer = ReactDOM.findDOMNode(this);
    personContainer.addEventListener('click', (event) => {this.onClick(event)});
    (personContainer.getElementsByClassName('btnDel')[0]).addEventListener('click', (event) => {
      dataSet.beforeDelete();
      dataSet.delete(this.id);
      dataSet.afterDelete();
      event.stopPropagation();
    });
    (personContainer.getElementsByClassName('btnUpdate')[0]).addEventListener('click', (event) => {this.onClick(event)});

  }


  onClick(event) {
    // console.log(this);
    // this.setState({
    //   course: '5'
    // });
    // console.log(this.state);
    if (!event.currentTarget.getElementsByClassName('card').length) {
      if (popupList.popups) {
        popupList.clear();
      }
      this.popup = new Popup({person: this, event: event});
      popupList.popups.push(this.popup);
      let popupCardContainer = ReactDOM.findDOMNode(this).getElementsByClassName('person__popupCard')[0];
      ReactDOM.render(React.createElement(Popup, {person: this, event: event}), popupCardContainer );
    }
  }

  
}

