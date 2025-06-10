class LocalStoreEvent extends Event {
  #data = {
    key: '',
    item: {}
  }
  constructor(type, data) {
    super(`localstore:${type}`);
    this.#data = data ?? this.#data;
  }
  
  get key() { return this.#data.key }
  
  get item() { return this.#data.item }
}

class LocalStore extends EventTarget {
  #cache = JSON.parse(JSON.stringify(localStorage));
  #storage = localStorage;
  
  constructor() {
    super();
  }
  
  get(key, options) {
    const item = JSON.parse(localStorage.getItem(key));
    this.emit('get', { item });
    
    return item;
  }
  
  set(key, item, options) {
    localStorage.setItem(key, JSON.stringify(item));
    
    const itm = this.get(key);
    this.emit('set', { item });
    
    return itm;
  }
  
  delete(key, options) {
    const item = this.get(key);
    localStorage.removeItem(key);
    this.emit('delete', { item })
    
    return item;
  }
  
  has(key, options) {
    const res = !!this.get(key);
    this.emit('hasitem', { value: res })
    return res;
  }
  
  clear(key, options) {
    localStorage.clear();
    this.emit('clear')
    return this;
  }
  
  emit(type = '', payload = {}) {
    this.dispatchEvent(new LocalStoreEvent(type, payload));
  }
}

export default new LocalStore()