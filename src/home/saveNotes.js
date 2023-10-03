const fs = require ('fs');
const path = require ('path');
const {app} = require ('electron');

const userDataPAth = app.getPath('userData');
const notesFilePath = path.join(userDataPAth, 'notes.json');

function loadNotes(){
    try{
        const data = fs.readFileSync(notesFilePath, 'utf-8');
        return JSON.parse(data) || [];
    }catch(error){
        return[]; 
    }
}

function saveNotes(notes){
    fs.writeFileSync(notesFilePath, JSON.stringify(notes));
}

module.exports = {loadNotes, saveNotes};