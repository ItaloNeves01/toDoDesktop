const {contextBridge, ipcRenderer} = require ('electron');


contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    recive : (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
});