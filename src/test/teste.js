document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("noteInput");
  const notesContainer = document.getElementById("notesContainer");
  const addNoteButton = document.getElementById("addNoteButton");

  if (noteInput && notesContainer && addNoteButton) {
    //convertendo para json para que assim eu possa efetuar o localstore
    //e realizar o armazenamento de maneira local
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    function saveNotes() {
      localStorage.setItem("notes", JSON.stringify(notes));
    }


    //criando a nota, referente ao assunto da nots e sua hora de criaçãp
    //gerando a mesma em uma div

    function displayNotes() {
      notesContainer.innerHTML = "";
      notes.slice().reverse().forEach(function (note) {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note", 'red-border');
      //  noteElement.style.border = '1px solid red';
        noteElement.innerHTML = `
          <p class="noteText">${note.contentNote}</p>
          <p class="noteTime">${note.time}</p>
        `;
        notesContainer.appendChild(noteElement);
      });
    }

    displayNotes();

    //definindo a nota, com tempo e data no padrão brasileiro
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
    })


  }
});