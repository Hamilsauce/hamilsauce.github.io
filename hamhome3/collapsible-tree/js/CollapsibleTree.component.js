import { style } from './style-src.js';
import { Collapsible } from './CollapsibleNode.js';

window.customElements.define('collapsible-tree',
  class CollapsibleTree extends HTMLElement {
    #data;
    #rootNode;
    #childElements;

    constructor() {
      super();

      this.self = document.querySelector(`#root-template`).content.cloneNode(true).querySelector('#component-container');

      this.#childElements = new Map();

      this.attachShadow({ mode: 'open' });

      this.shadowRoot.innerHTML = `<style>\n${style}\n</style>`;

      this.shadowRoot.append(this.self);
    }

    static get observedAttributes() { return ['mycoolattribute'] }

    get data() { return this.#data }

    set data(v) {
      this.#data = v;
      this.#rootNode = new Collapsible({
        isRoot: true,
        id: v.id || null,
        nodeType: v.nodeType,
        name: v.name,
        nodes: v.nodes,
      }, null);

      this.#rootNode.children = v.children;
      this.#buildTree.bind(this)(this.#rootNode);

      this.self.querySelector('#tree-list').appendChild(this.#rootNode.self);
    }

    get mycoolattribute() { return this.getAttribute('mycoolattribute') }
    set mycoolattribute(value) { this.setAttribute('mycoolattribute', this._mycoolattribute) }

    connectedCallback() { this.addEventListener("click", this.handler) }

    attributeChangedCallback(attrName, oldVal, newVal) {
      switch (attrName) {
        case "disabled": {
          this.shadowRoot.getElementById("button").disabled = newVal === "true";
          break;
        }
        default: {
          console.log("unhandled attribute change", attrName, oldVal, newVal);
          break;
        }
      }
    }

    loadData(data) {
      if (data && typeof data === 'object') {
        this.#data = data;
      }
    }

    #buildTree = (node, fsService) => {
      let children = [...Object.values(node.children)];

      node.size = children.length;

      children.forEach((child) => {
        const newNode = node.createNode(child);

        newNode.children = child.children;

        this.#childElements.set(newNode.button, newNode);

        if (Object.values(child.children).length) {
          this.#buildTree(newNode);
        }
      });
    }
  }
)