import Component from './component.js'

export default class ShoppingCart extends Component {
  constructor ({element}) {
    super ({element});
        
    this._items = {}
       
    this._render();

    this.on('click', '[data-element = "remove"]', (event) => {
      const phoneEl = event.target.closest('li');
      const phoneId = phoneEl.dataset.phoneId;
      this.remove(phoneId);
    })
  }

  addToCart(phone) {
    if (!this._items.hasOwnProperty(phone)) {
      this._items[phone]= 0;
    }
    this._items[phone] += 1;
    this._render();
  }

  remove(phone) {
    if (this._items.hasOwnProperty(phone)) {
      this._items[phone] -=1;
    }

    if (this._items[phone] ===0) {
      delete this._items[phone];
    }

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${
        Object.entries(this._items)
        .map(([name, quantity]) => 
          `<li data-phone-id="${name}">${name} - ${quantity}
           <button data-element="remove">X</button></li>
          `).join('')
        }
      </ul>
      `
  }
}
