document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("noteInput");
  const notesContainer = document.getElementById("notesContainer");
  const addNoteButton = document.getElementById("addNoteButton");

  if (noteInput && notesContainer && addNoteButton) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    function saveNotes() {
      localStorage.setItem("notes", JSON.stringify(notes));
    }

    function displayNotes() {
      notesContainer.innerHTML = "";
      notes.slice().reverse().forEach(function (note, index) {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note", 'red-border');

        const noteWords = note.contentNote.split(' ');
        const title = `<strong>${noteWords.slice(0, 3).join(' ')}</strong> ${noteWords.slice(3).join(' ')}`;

        noteElement.innerHTML = `
          <p class="noteTitle">${title}</p>
          <p class="noteText">${note.contentNote}</p>
          <p class="noteTime">${note.time}</p>
          <button class="editButton" onclick="editNote(${index})">Editar</button>
          <button class="deleteButton" onclick="deleteNote(${index})">Apagar</button>
        `;

        notesContainer.appendChild(noteElement);
      });
    }

    displayNotes();

    // Função para editar uma nota pelo índice
    window.editNote = function(index) {
      const updatedNoteText = prompt("Editar nota:", notes[index].contentNote);
      if (updatedNoteText !== null) {
        notes[index].contentNote = updatedNoteText;
        saveNotes();
        displayNotes();
      }
    };

    // Função para excluir uma nota pelo índice
    window.deleteNote = function(index) {
      if (confirm("Tem certeza que deseja apagar esta nota?")) {
        notes.splice(index, 1);
        saveNotes();
        displayNotes();
      }
    };

    addNoteButton.addEventListener('click', function () {
      const noteText = noteInput instanceof HTMLInputElement ? noteInput.value : '';
      if (noteText) {
        const newNote = {
          contentNote: noteText,
          time: new Date().toLocaleDateString('pt-br', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };

        notes.push(newNote);
        noteInput.value = '';
        saveNotes();
        displayNotes();
      }
    });
  }
});
