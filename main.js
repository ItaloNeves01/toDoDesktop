const {app, BrowserWindow} = require ('electron');


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
