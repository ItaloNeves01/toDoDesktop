const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const userDataPath = app.getPath('userData');
const notesFilePath = path.join(userDataPath, 'notes.json');

function loadNotes() {
  try {
    const data = fs.readFileSync(notesFilePath, 'utf-8');
    return JSON.parse(data) || [];
  } catch (error) {
    return [];
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const noteInput = document.getElementById('noteInput');
  const notesContainer = document.getElementById('notesContainer');
  const addNoteButton = document.getElementById('addNoteButton');

  if (noteInput && notesContainer && addNoteButton) {
    const notes = loadNotes();
    const saveNotes = require('./saveNotes'); // Importa a função saveNotes

    function displayNotes() {
      notesContainer.innerHTML = '';
      notes.slice().reverse().forEach(function (note) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note', 'red-border');
        noteElement.innerHTML = `
          <p class="noteText">${note.contentNote}</p>
          <p class="noteTime">${note.time}</p>
        `;
        notesContainer.appendChild(noteElement);
      });
    }

    displayNotes();

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
        saveNotes(notes); // Usa a função saveNotes para salvar as notas
        displayNotes();
      }
    });
  }
});
