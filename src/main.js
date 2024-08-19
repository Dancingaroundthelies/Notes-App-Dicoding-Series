import { NoteHeader } from "./script/components/header.js";
import { FooterNote } from "./script/components/footer.js";
import { NoteList } from "./script/components/note-list.js";
import { NoteItems } from "./script/components/note-item.js";
import { AddNewNotes } from "./script/components/add-notes.js";

customElements.define("note-header", NoteHeader);
customElements.define("footer-note", FooterNote);
customElements.define("note-list", NoteList);
customElements.define("note-items", NoteItems);
customElements.define("add-new-notes", AddNewNotes);
