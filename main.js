const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const si = require('systeminformation');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'How much app',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  })
  
  ipcMain.handle('getCpuInfo', () => si.cpu().then(data => {return data}))
  ipcMain.handle('getGpuInfo', () => si.graphics().then(data => {return data}))

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});