import Notes from "../data/local/notes.js";

const home = () => {
  const data = Notes.getNotes();
  const searchFormElement = document.querySelector("#searchForm");
  const notelist = document.querySelector("note-list");
  notelist.innerHTML = "";
  notelist.innerHTML = `<span slot="icon-add"><i class="fa-solid fa-plus"></i></span>`;

  // const noteLoadingElement =
  //   noteListContainerElement.querySelector(".search-loading");

  const daftarNotes = () => {
    const apa = data.map((item) => {
      const noteItems = document.createElement("note-items");
      noteItems.setAttribute("data-title", `${item.dataTitle}`);
      noteItems.setAttribute("data-body", `${item.dataBody}`);
      return noteItems;
    });

    return apa;
  };
  notelist.append(...daftarNotes());

  const validateTitleNotes = (event) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Title cannot be empty");
      return;
    }
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Title must be at least 5 characters long");
      return;
    }
    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity("Title cannot exceed 25 characters");
      return;
    }
  };

  // validasi data
  const validateBodyNotes = (event) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Body cannot be empty");
      return;
    }
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Body must be at least 15 characters long");
      return;
    }
  };

  const realtimeValidate = (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationID = event.target.getAttribute("aria-describedby");
    const connectedValidationEL = connectedValidationID
      ? document.getElementById(connectedValidationID)
      : null;

    if (connectedValidationEL && errorMessage && !isValid) {
      connectedValidationEL.innerText = `* ${errorMessage}`;
    } else {
      connectedValidationEL.innerText = "";
    }
  };

  // Searching
  const search = () => {
    const searchTerm = document.querySelector("#name").value.toLowerCase();
    showLoading();

    const filteredResults = NotesData.getAll().filter((note) => {
      return note.title.toLowerCase().includes(searchTerm);
    });
    displayResult(filteredResults);

    showNoteList();
  };

  const showNote = () => {
    showLoading();

    const result = NotesData.getAll();
    displayResult(result);

    showNoteList();
  };

  // Display Note
  const displayResult = (notesData) => {
    const noteItemElements = notesData.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  // searchFormElement.addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   search();
  // });

  const getForm = document.getElementById("formAddNotes");
  const getInputTitle = getForm.elements.titleNotes;
  const getInputBody = getForm.elements.bodyNotes;
  getInputTitle.value = "";
  getInputBody.value = "";

  getInputTitle.addEventListener("keyup", validateTitleNotes);
  getInputTitle.addEventListener("invalid", validateTitleNotes);
  getInputTitle.addEventListener("keyup", realtimeValidate);

  getInputBody.addEventListener("keyup", validateBodyNotes);
  getInputBody.addEventListener("invalid", validateBodyNotes);
  getInputBody.addEventListener("keyup", realtimeValidate);
};

export default home;
