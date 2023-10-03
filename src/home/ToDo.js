document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("noteInput");
  const notesContainer = document.getElementById("notesContainer");
  const addNoteButton = document.getElementById("addNoteButton");

  if (noteInput && notesContainer && addNoteButton) {
    ipcRenderer.invoke("load-notes").then((notes) => {
      function displayNotes() {
        notesContainer.innerHTML = "";
        notes
          .slice()
          .reverse()
          .forEach(function (note) {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note", "red-border");
            noteElement.innerHTML = `
                            <p class="noteText">${note.contentNote}</p>
                            <p class="noteTime">${note.time}</p>
                        `;
            notesContainer.appendChild(noteElement);
          });
      }

      displayNotes();

      addNoteButton.addEventListener("click", function () {
        const noteText =
          noteInput instanceof HTMLInputElement ? noteInput.value : "";
        if (noteText) {
          const newNote = {
            contentNote: noteText,
            time: new Date().toLocaleDateString("pt-br", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          notes.push(newNote);
          noteInput.value = "";
          ipcRenderer.invoke("save-notes", notes).then(() => {
            displayNotes();
          });
        }
      });
    });
  }
});
