import { Notes, home, showErrorMessage } from '../../vendor.js';

export class NoteItems extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _notes = {
    id: null,
    title: null,
    body: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  get notes() {
    return this._notes;
  }

  set notes(value) {
    this._notes = value;
  }

  connectedCallback() {
    this.render();

    const getArchive = document
      .querySelector('note-list')
      .shadowRoot.querySelector('.archive');
    const getUnArchive = document
      .querySelector('note-list')
      .shadowRoot.querySelector('.unArchive');

    const buttonDel = this.shadowRoot.querySelectorAll('.card__button-del');
    Array.from(buttonDel).map(button => {
      button.addEventListener('click', () => {
        const notesId = button.id;
        async function DelNotes(idNotes) {
          try {
            await Notes.deleteNotes(idNotes);
          } catch (err) {
            showErrorMessage(err.message);
          }
          home();
        }

        DelNotes(notesId);
      });
    });

    const buttonUnArchive = this.shadowRoot.querySelectorAll(
      '.card__button-unArchive',
    );
    Array.from(buttonUnArchive).map(button => {
      button.addEventListener('click', () => {
        const notesId = button.id;
        async function unArchive(idNotes) {
          try {
            await Notes.unArchiveNotes(idNotes);

            getUnArchive.setAttribute('hidden', true);
            getArchive.removeAttribute('hidden');

            home();
          } catch (err) {
            showErrorMessage(err.message);
          }
        }

        unArchive(notesId);
      });
    });

    const buttonArchive = this.shadowRoot.querySelectorAll(
      '.card__button-arsip',
    );
    Array.from(buttonArchive).map(button => {
      button.addEventListener('click', () => {
        const notesId = button.id;
        async function archive(idNotes) {
          try {
            await Notes.archiveNotes(idNotes);
            home();
          } catch (err) {
            showErrorMessage(err.message);
          }
        }

        archive(notesId);
      });
    });
  }

  _updateStyle() {
    this._style.textContent = `
    :host{
        display:block;
    }
    div {
      word-wrap: break-word;
    }
    .card {
      outline:none;
        display: flex;
        flex-direction:column;
        padding: 10px 20px;
        height:200px;
        transition: 200ms ;
        background-color: #2f3235;
        border: none;
        border-radius: 5px;
        color: white !important;
      }
    .card:hover {
      transition: ease 0.5s;
      background-color: #0077B6 !important;
      color: white !important;
      border: 1px solid #0077B6 !important;
    }
    .card__title{
      border-bottom: 1px solid black;
    }
    .card__button{
      display:flex;
      justify-content:space-around;
      margin-block-start:15px;
    }
    .button{
      outline:none;
      padding : .8em 1em;
      cursor: pointer; 
      border-radius: 5px;
      border: 1px solid #B6BBC4;
      transition : 300ms;
      
    }
    .button:hover{
      background-color : #c9c5c0;
    }
    `;
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="card" tabindex="0">
        <div class="card__title">
            <h3>${this.notes.title}</h3>
        </div>
        <div class="card__body">
            <p>
                ${this.notes.body}
            </p>
        </div>
        <div class="card__button">
            <button id="${this.notes.id}" class="button card__button-del"><slot name="icon-del"></slot></button>
            <button id="${this.notes.id}" class="button card__button-arsip"><slot name="icon-arsip"></slot></button>
            <button id="${this.notes.id}" class="button card__button-unArchive" hidden><slot name="icon-unArchive"></slot></button>
        </div>
     </div>
    `;
  }
}
