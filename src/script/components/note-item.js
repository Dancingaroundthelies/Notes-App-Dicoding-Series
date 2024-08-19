export class NoteItems extends HTMLElement {
  static observedAttributes = ["data-title", "data-body"];

  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._updateStyle();
  }

  set title(value) {
      this.setAttribute("data-title", value);
  }

  get title() {
    return this.getAttribute("data-title");
  }
  set body(value) {
      this.setAttribute("data-body", value);
  }

  get body() {
    return this.getAttribute("data-body");
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-title" || name === "data-body") {
      this.render();
    }
  }

  _updateStyle() {
    this._style.textContent = `
    :host{
        display:block;
    }
    .card {
      outline:none;
        display: flex;
        flex-direction:column;
        padding: 10px 20px;
        box-shadow: 0 0 4px 3px #0077B6;
        height:200px;
        transition: 200ms ;
        background-color: #2f3235;
        border: none;
        border-radius: 5px;
      }
      
      .card:hover {
        transition: ease 0.5s;
        background-color: #0077B6 !important;
        color: white !important;
        border: 1px solid #0077B6 !important;
    }
    div {
      word-wrap: break-word;
    }
    `;
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }
  
  render() {
    this._emptyContent();
    this._updateStyle();

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("tabindex", "0");
    cardElement.innerHTML = `
      <div class="card__title">
        <h3>${this.title}</h3>
      </div>
      <div class="card__body">
        <p>${this.body}</p>
      </div>
    `;

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.appendChild(cardElement);
  }
}
