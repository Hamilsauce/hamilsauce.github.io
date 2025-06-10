export class Collapsible {
  #self = document.querySelector(`#node-template`).content.cloneNode(true).querySelector('.node');
  #active;
  #childNodes;
  #nodes;
  #removedContent;

  constructor(model, parent) {

    this.parent = parent

    this.isRoot = model.isRoot || false;

    this.id = model.id;

    this.nodeType = model.nodeType;

    this.#nodes = new Map(
      this.childNodes
      .filter(_ => _.classList.contains('node'))
      .map(_ => [_, this.createNode.bind(this)(_)])
    );

    this.active = false;

    this.size = model.size || 0;

    this.name = model.name || 'Unnamed';

    this.childClickHandler = this.handleChildButtonClick.bind(this);
    this.content.addEventListener('child-click', this.childClickHandler);

    this.clickListener = this.handleButtonClick.bind(this);
    this.button.addEventListener('click', this.clickListener);
  };

  get hasChildren() { return this.dataset.hasChildren === 'true' ? true : false }

  set hasChildren(v) { this.dataset.hasChildren = v; }

  get nodes() { return this.#nodes }

  set nodes(val) { this.#nodes = val }

  get childNodes() { return [...this.content.children].filter(_ => _.classList.contains('node')) }

  set childNodes(val) { this.#childNodes = val }

  get dataset() { return this.self.dataset }

  get id() { return this.model.id }

  set id(val) {
    this._id = val;
    this.self.id = val;
  }

  get name() { return this._name }

  set name(val) {
    this.buttonName.textContent = `${val}`;
    this._name = val;
  }

  set children(val) {
    this._children = val || [];
    this.size = this._children.length;
  }

  get children() { return this._children || [] }

  get size() { return this._size || 0 }

  set size(v) {
    this._size = v;

    if (v > 0) this.dataset.hasChildren = true;
    else this.dataset.hasChildren = false;

    this.buttonSize.textContent = `Size: ${v || 0}`;
  }

  get nodeType() { return this.dataset.nodeType }

  set nodeType(val) { this.dataset.nodeType = val }

  get active() { return this.#active };

  set active(newValue) {
    this.#active = newValue;
    this.toggleActiveState(this.active);

    if (!this.active) {
      this.nodes.forEach((ch) => {
        ch.active = false;
        ch.content.style.maxHeight = null;
      })
    }
  }

  get self() { return this.#self };

  get button() { return this.self.querySelector('.collapsible-button') }

  get buttonName() { return this.button.querySelector('.button-name') }

  get buttonSize() { return this.button.querySelector('.button-size') }

  get content() { return this.self.querySelector('.collapsible-content') || this.#removedContent }

  createNode(model = {}, callback = (newNode, parent) => {}) {
    const n = new Collapsible(model, this);

    this.nodes.set(n.self, n);

    this.append(n);

    if (callback) callback(n);

    return n;
  }

  append(element, position, callback) {
    if (position) { this.content.insertBefore(element.self, position); }
    else { this.content.appendChild(element.self); }

    this.adjustToChildHeight.bind(this)(element.self.style.maxHeight);

    if (callback) callback(element);

    return element;
  }

  toggleActiveState(state) { this.dataset.active = state }

  buttonClicked(e) { return e.composedPath().some(t => t instanceof Element && t === this.button) }

  getTargetNode(e) {
    let t = e instanceof Event ? e.target : e;
    t = t.classList.contains('node') ? t : t.closest('.node');

    if (this.nodes.has(t)) { return this.nodes.get(t) }
    else return this;

    return null;
  }

  handleButtonClick(e) {
    if (!this.buttonClicked(e) || !this.hasChildren) return this.selected = false;

    this.selected = true;
    this.active = !this.active;

    if (this.content.style.maxHeight) { this.content.style.maxHeight = null; }
    else { this.content.style.maxHeight = this.content.scrollHeight + "px"; }

    this.#self.scrollIntoView({ behavior: 'smooth' })

    const childClickEvent = new CustomEvent(
      'child-click', {
        bubbles: true,
        detail: { childMaxHeight: this.content.style.maxHeight }
      });

    this.self.dispatchEvent(childClickEvent);
  }

  handleChildButtonClick(e) { this.adjustToChildHeight(e.detail.childMaxHeight) }

  adjustToChildHeight(childMaxHeight = '') {
    this.content.style.maxHeight = `${parseInt(this.content.scrollHeight) + parseInt(childMaxHeight)}px`;
  }
};