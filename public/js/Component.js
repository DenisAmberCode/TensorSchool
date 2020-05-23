'use strict';

export class Component {

  constructor(params) {
    this.params = params;
    this.state = {};
    this.container = undefined;
  }

  // view компонента, обязательно должен содержать контейнер!!!
  render() {
    return '<div></div>';
  }

  /**
    * помещает верстку компонента в DOM
    * @param {DOMElement} container - контейнер в котором строиться верстка, куда помещается вёрстка
    * @param {String} position - insertAdjacentElement позиция куда помесить контейнер (до, в начало, в конец, после)
    */
  mount(container, position) {
    this.beforeMount();

    const newComponent = document.createElement('div');
    newComponent.innerHTML = this.render(this.params).outerHTML;
    this.container = newComponent.firstElementChild;
    container.insertAdjacentElement(position || 'beforeend', this.container);
    newComponent.remove();

    this.afterMount();
  }

  unmount() {
    this.beforeUnmount();
    this.removeContainer();
    this.afterUnmount();
  }

  removeContainer() {
    if (this.container) {
      this.container.remove();
      this.container = undefined;
    }
  }

  update() {}

     // прехук до монтирования
  beforeMount() {}

   // прехук после монтирования
  afterMount() {}

   // прехук до размонтирования
  beforeUnmount() {}

   // прехук после размонтирования
  afterUnmount() {}
}