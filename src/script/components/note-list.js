export class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector(".add-button")
      .addEventListener("click", () => {
        document.querySelector(".block").removeAttribute("hidden");
        document.querySelector("#formAddNotes").titleNotes.focus();
      });
  }

  _attachEventListeners() {
    this._shadowRoot
      .querySelector("#searchForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this._handleSearch();
      });
  }

  _handleSearch() {
    const searchTerm = this._shadowRoot.querySelector("#name").value.trim();
    const noteItems = this._shadowRoot.querySelectorAll("note-items");

    noteItems.forEach((item) => {
      const title = item.getAttribute("data-title").toLowerCase();
      if (title.includes(searchTerm.toLowerCase())) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  _updateStyle() {
    this._style.textContent = `
        :host{
            display:block;
        }
        .notes-container {
            max-width: 900px;
            margin: auto;
            padding: 11px 20px 30px;
            background-color: #202326 !important;
            backdrop-filter: blur(6px);
          }
          
          .notes-wrapper {
            margin-top: 10px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 2em;
            background-color: #202326;
          }
          .button-wrapper{
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding-inline:5px;
            height:50px;
          }
          .button-wrapper button{
            outline:none;
            padding : .5rem;
            cursor: pointer; 
            border-radius: 5px;
            border: 1px solid #B6BBC4;
            transition : 300ms;
          }
          
          .button-wrapper button:hover{
            font-weight: bold;
            background-color: #0077B6;
            color: #dfdfdf
            border: none;
          }

          /* Search bar */
          .search-bar-container {
            display: inline;
          }

          .search-form {
            display: flex;
            gap: 16px;
          }

          .search-form .form-group {
            flex-grow: 1;

            position: relative;
          }

          .search-form .form-group input {
            display: block;
            width: 100%;
            height: 35px;
            padding: 1px 10px 0 10px;
            border-inline: none;
            border-block-start: none;
            border-block-end: 1px solid #ffaf45;
            border: none;
            border-radius: 5px;
            font-size: 1em;
          }

          .search-form .form-group input:focus-visible {
            outline: 0;
          }
          .search-form .form-group label {
            line-height: 60px;
            font-size: 1em;
            font-weight: 700;
            text-transform: uppercase;
            color: #ffaf45;
            white-space: nowrap;
            position: absolute;
            top: 0;
            left: 20px;
            user-select: none;
            pointer-events: none;
            transition: 150ms all ease-in-out;
          }

          .search-form button {
            background-color: #0077B6;
            color: black;
            border: none;
          }

          .search-form button:hover {
            background-color: #0077B6;
          }

          .search-form button:active {
            background-color: #0077B6;
          }
          /* Search bar */
        
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="notes-container">
          <div class="button-wrapper">
            <div id="searchBarContainer" class="search-bar-container">
                <form id="searchForm" class="search-form">
                  <div class="form-group">
                    <input id="name" name="name" type="search" placeholder="Search notes..." required />
                    <label for="name"></label>
                    </div>
                    <button>Search</button>
                </form>
            </div>
            <button type="button" class="add-button"><slot name="icon-add"></slot> New</button>
          </div>
          <div class="notes-wrapper">
            <slot></slot>
          </div>
        </div>
    `;
  }
}
