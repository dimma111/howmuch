const { contextBridge, ipcRenderer  } = require('electron')

contextBridge.exposeInMainWorld('cpu', {
    info: () => ipcRenderer.invoke('getCpuInfo')
})

contextBridge.exposeInMainWorld('gpu', {
    info: () => ipcRenderer.invoke('getGpuInfo')
})

contextBridge.exposeInMainWorld('gpu', {
    info: () => ipcRenderer.invoke('getGpuInfo')
})