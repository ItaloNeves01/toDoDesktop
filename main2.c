const { app, BrowserWindow, ipcMain, contextBridge } = require ('electron');
const path = require ('path');
const url = require ('url');
const setupNoteInteraction = require("./src/home/ToDo");
const { saveNotes } = require('./src/home/saveNotes');

const createWindow = () =>{
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    //criando janela
    win.loadFile('index.html')

};



app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed' , () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0 ) {
        createWindow();
    }
})


contextBridge.exposeInMainWorld('electronAPI', {
    loadNotes: () => saveNotes.loadNotes(),
    saveNotes: (notes) => saveNotes.saveNotes(notes),
});