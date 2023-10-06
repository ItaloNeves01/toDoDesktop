function createNoteElment(note){
    const noteElement = document.createElement("div");
    noteElement.classList.add('note', 'red-border');
    noteElement.innerHTML = `
        <p class="noteText">${note.contentNote}</p>
        <p class="noteTime">${note.time}</p>
    `;

    return noteElement;

    function displayNotes(notes) {
        const notesContainer = document.getElementById('notesContainer');
        notesContainer.innerHTML = '';
        notes.slice().reverse().forEach (function (note) {
            const noteElement = createNoteElment(note);
            notesContainer.appendChild(noteElement);
        });
    }

    module.exports = displayNotes;
}