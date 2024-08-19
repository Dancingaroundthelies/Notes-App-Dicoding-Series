export class FooterNote extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._updateStyle();
    this.footerRender();
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
      display: block;
    }

    div {
      padding: 18px 10px;
      background-image: linear-gradient(to bottom, #202326, #2f3235 60%, #0077B6);
      color: #dfdfdf;
      text-align: center;
      padding-block: 20px;
    }
  `;
  }

  footerRender() {
    this._shadowRoot.innerHTML = ""; // Cleared the shadow DOM content before rendering
    this._shadowRoot.appendChild(this._style);

    const footerDiv = document.createElement("div"); // Created a div element
    footerDiv.textContent = "MyNotes App © 2024"; // Added text content to the div
    this._shadowRoot.appendChild(footerDiv); // Appended the div to the shadow DOM
  }
}
