const fs = require("fs");

function saveNotesLocally(notes){
    const content = JSON.stringify(notes);


    //obter 

    fs.writeFile(filePath, content, function(err){
        if(err) {
            return console.log(err);
        }
        console.log('arquivo salvo com sucesso no disco');
    });
}


