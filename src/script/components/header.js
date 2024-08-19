export class NoteHeader extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._updateStyle();
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
        div{
          color: #dfdfdf;
          text-align: center;
          padding-block: 0 10px;
          position: sticky;
          top: 0;
          background-image: linear-gradient(40deg, #0077B6, #03045E);
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          font-size: 24px;
          font-weight: bold;
          min-height: 60.1px;
          max-height: 60.1px;
          justify-content: center;
          align-items: center;
        }
    `;
  }

  render() {
    this._shadowRoot.innerHTML = ""; // Cleared the shadow DOM content before rendering
    this._shadowRoot.appendChild(this._style);

    const noteHeaderDiv = document.createElement("div"); // Created a div element
    noteHeaderDiv.classList.add("note-header"); // Added a class to the div
    noteHeaderDiv.innerHTML = "<h3>MyNotes</h3>"; // Added HTML content to the div
    this._shadowRoot.appendChild(noteHeaderDiv); // Appended the div to the shadow DOM
  }
}


