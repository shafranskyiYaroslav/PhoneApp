export default class Component{
  constructor({ element }) {
    this._callbackMap = {};
    this._element = element;
  }
 
  on(eventName, selector, callback) {
    this._element.addEventListener(eventName, (event) => {
      const delegatedTarget = event.target.closest(selector);
      if (!delegatedTarget) {
        return;
      }
      callback(event);
    });
  }

  emit(eventName, data) {
    const callbacks = this._callbackMap[eventName];
    if (!callbacks) {
      return;
    }
    callbacks.forEach((callback) => {
      callback(data);
    });
  }

  subscribe(eventName, callback) {
    if (!this._callbackMap[eventName]) {
      this._callbackMap[eventName] = [];
    }
    this._callbackMap[eventName].push(callback);
  }

  unsubscribe(eventName, callbackToRemove) {
    const callbacks = this._callbackMap[eventName];
    if (callbacks) {
      this._callbackMap[eventName] = callbacks
        .filter((cb) => cb !== callbackToRemove);
    }
  }
  
  hide(){
    this._element.hidden = true;
  }

  show(){
    this._element.hidden = false;
  }
}
