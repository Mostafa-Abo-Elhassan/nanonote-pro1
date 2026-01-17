const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 900, height: 600,
        frame: false, // بدون حواف ويندوز
        transparent: true, // يدعم الشفافية
        alwaysOnTop: true, // يظل في المقدمة
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('renderer/index.html');

    // اختصار عالمي Alt+Shift+N للإخفاء والإظهار
    globalShortcut.register('Alt+Shift+N', () => {
        win.isVisible() ? win.hide() : win.show();
    });
}

// التحكم في حجم النافذة (Compact Mode)
ipcMain.on('resize-window', (e, mode) => {
    if (mode === 'compact') {
        win.setSize(300, 60, true);
    } else {
        win.setSize(900, 600, true);
    }
});

// أزرار التحكم (إغلاق وتصغير)
ipcMain.on('window-control', (e, action) => {
    if (action === 'close') win.close();
    if (action === 'min') win.minimize();
});

app.whenReady().then(createWindow);
app.on('will-quit', () => globalShortcut.unregisterAll());