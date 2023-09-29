document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('noteInput');
    const notesContainer = document.getElementById('notesContainer');
    const addNoteButton = document.getElementById('addNoteButton');

    if (noteInput && notesContainer && addNoteButton) {
        const notes = [];

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

                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.innerHTML = `
                    <p class="noteText">${newNote.contentNote}</p>
                    <p class="noteTime">${newNote.time}</p>
                `;

                if (notesContainer) {
                    notesContainer.appendChild(noteElement);
                }
            }
        });
    }
});
