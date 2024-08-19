import Notes from "../data/local/notes.js";
import home from "../view/home.js";

export class AddNewNotes extends HTMLElement {
  _style = null;

  constructor() {
    super();

    this._style = document.createElement("style");
    this.renderForm();
  }

  connectedCallback() {
    this.querySelector(".closebtn-form").addEventListener("click", () => {
      document.querySelector(".block").setAttribute("hidden", true);
    });

    this.querySelector(".close").addEventListener("click", () => {
      document.querySelector(".block").setAttribute("hidden", true);
    });

    this.querySelector("form").addEventListener("submit", (event) => {
      let titleNotes = this.querySelector("form").titleNotes.value;
      let bodyNotes = this.querySelector("form").bodyNotes.value;

      document.querySelector(".block").setAttribute("hidden", true);

      Notes.addNotes(titleNotes, bodyNotes);
      event.preventDefault();

      home();
    });
  }

  _emptyContent() {
    this.innerHTML = "";
  }

  _updateStyle() {
    this._style.textContent = ` 
      .form-add-notes {
        padding: 1.3em;
        position: fixed;
        right: 20%;
        bottom: 100px;
        left: 20%;
        background-color: #031B29;
        transition: 500ms linear;
        border-radius: 5px;
        z-index: 9999;
      }
      .form-add-notes h2 {
        font-size: 1.3rem;
        text-align: center;
      }
      
      .form-add-notes .close {
        position: absolute;
        top: 3px;
        right: 2px;
        border-radius: 50%;
        cursor: pointer;
      }
      
      .form-group {
        padding: 1em;
      }
      .form-group label {
        display: block;
        margin-block-end: 0.5em;
        font-size: 1.2rem;
      }
      .form-group input,
      .form-group textarea {
        font-size: 1rem;
        padding: 0.5rem;
        width: 100%;
        transition : 100ms;

      }
      .form-group textarea {
        resize: none;
        height: 150px;
      }
      
      .form-group.button-wrapper {
        display: flex;
        justify-content: space-around;
        gap: 1em;
      }
      
      .form-group button {
        outline: none;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #b6bbc4;
        transition: 300ms;
        width: 10em;
      }
      
      .form-group button:hover {
        font-weight: bold;
        background-color: #0077B6;
      }

      .validation-message{
        color: white;
      }
      
      @media (max-width: 570px) {
        .form-add-notes {
          position: fixed;
          top: 60px;
          right: 10%;
          bottom: 50px;
          left: 10%;
        }
        .form-group textarea {
          height: 250px;
        }
      }

      @media screen and (max-height:500px){
        .form-group textarea {
          height: 18vh;
        }
      }

    `;
  }

  renderForm() {
    this._emptyContent();
    this._updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
     <form id="formAddNotes" class="form-add-notes">
      <span class="close"
        ><i
          class="fa-solid fa-circle-xmark fa-lg"
          style="color: #f8f6f2"
        ></i>
      </span>
      <h2>Add new notes</h2>
      <div class="form-group">
        <label for="titleNotes">Title</label>
        <input
          type="text"
          id="titleNotes"
          name="titleNotes"
          required
          minlength="5"
          pattern= "^.{1,25}$"
          aria-describedby="titleNotesValidation"
        />
        <p
          id="titleNotesValidation"
          class="validation-message"
          aria-live="polite"
        ></p>
      </div>
      <div class="form-group">
        <label for="bodyNotes">Body</label>
        <textarea name="bodyNotes" id="bodyNotes" required minlength="15" maxlength="100" aria-describedby="bodyNotesValidation"></textarea>
        <p
          id="bodyNotesValidation"
          class="validation-message"
          aria-live="polite"
        ></p>
      </div>
      <div class="form-group button-wrapper">
        <button
          class="button addnotesbtn"
          id="addnotesbtn"
          type="submit"
        >
          Add Notes
        </button>
        <button
          class="button closebtn-form"
          id="button-close-notes"
          type="button"
        >
          Batal
        </button>
      </div>
    </form>
    `;
  }
}
