import { Notes, showErrorMessage } from '../../vendor';

const home = () => {
  const notelist = document.querySelector('note-list');
  notelist.innerHTML = '<loading-bar></loading-bar>';

  const daftarNotes = async () => {
    try {
      const data = await Notes.getNotes();
      hideLoading();
      if (data.length <= 0) {
        const newElementKosong = document.createElement('h2');
        newElementKosong.innerText = 'No Notes...';
        notelist.appendChild(newElementKosong);
      }

      data.forEach((element, index) => {
        const noteItems = document.createElement('note-items');

        if (index === 0 || index === 5 || index === 8) {
          noteItems.classList.add('animate__animated');
          noteItems.classList.add('animate__backInRight');
        }
        if (index >= 6 || index <= 8) {
          noteItems.classList.add('animate__animated');
          noteItems.classList.add('animate__backInLeft');
        }

        console.log(noteItems);
        noteItems.notes = element;
        notelist.appendChild(noteItems);

        const iconDel = document.createElement('span');
        iconDel.setAttribute('slot', 'icon-del');
        iconDel.innerHTML = `<i class="fa-solid fa-trash" style="color: #31304d;"></i>`;

        const iconArsip = document.createElement('span');
        iconArsip.setAttribute('slot', 'icon-arsip');
        iconArsip.innerHTML = `<i class="fa-solid fa-box-archive style="color: #31304d;"></i>`;

        const iconEdit = document.createElement('span');
        iconEdit.setAttribute('slot', 'icon-edit');
        iconEdit.innerHTML = `<i class="fa-solid fa-pen-to-square style="color: #31304d;"></i>`;

        noteItems.append(iconDel, iconArsip, iconEdit);
      });
    } catch (err) {
      if (err.message.toLowerCase() === 'failed to fetch') {
        err.message = 'Tidak ada koneksi internet';
      }
      showErrorMessage(err.message);
    }
  };

  const hideLoading = () => {
    notelist.innerHTML = '';
    notelist.innerHTML = `<span slot="icon-add"><i class="fa-solid fa-plus"></i></span>`;
    notelist.innerHTML += `<span class="icon-arsip" slot="icon-archive"><i class="fa-solid fa-folder" style="color: #31304d;"></i></span>`;
    notelist.innerHTML += `<span class="icon-unArchive" slot="icon-unArchive"><i class="fa-solid fa-folder-open" style="color: #31304d;"></i></span>`;

    const getArchive = document
      .querySelector('note-list')
      .shadowRoot.querySelector('.archive');
    const getUnArchive = document
      .querySelector('note-list')
      .shadowRoot.querySelector('.unArchive');

    getUnArchive.setAttribute('hidden', true);
    getArchive.removeAttribute('hidden');
  };

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

  const realtimeValidate = event => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationID = event.target.getAttribute('aria-describedby');
    const connectedValidationEL = connectedValidationID
      ? document.getElementById(connectedValidationID)
      : null;

    if (connectedValidationEL && errorMessage && !isValid) {
      connectedValidationEL.innerText = `* ${errorMessage}`;
    } else {
      connectedValidationEL.innerText = '';
    }
  };

  const getForm = document.getElementById('formAddNotes');
  const getInputTitle = getForm.elements.titleNotes;
  const getInputBody = getForm.elements.bodyNotes;
  getInputTitle.value = '';
  getInputBody.value = '';

  getInputTitle.addEventListener('keyup', validateTitleNotes);
  getInputTitle.addEventListener('invalid', validateTitleNotes);
  getInputTitle.addEventListener('keyup', realtimeValidate);

  getInputBody.addEventListener('keyup', validateBodyNotes);
  getInputBody.addEventListener('invalid', validateBodyNotes);
  getInputBody.addEventListener('keyup', realtimeValidate);
  daftarNotes();
};

export default home;
