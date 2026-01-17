const { ipcRenderer } = require('electron');

let notes = JSON.parse(localStorage.getItem('notes_db')) || [{id: Date.now(), title: 'ملاحظة أولى', content: ''}];
let activeNoteId = notes[0].id;
let isCompact = false;

// وظائف الـ Tabs
function renderTabs(filter = "") {
    const list = document.getElementById('tabsList');
    list.innerHTML = '';
    notes.filter(n => n.title.includes(filter)).forEach((note, index) => {
        const div = document.createElement('div');
        div.className = `tab-item ${note.id === activeNoteId ? 'active' : ''}`;
        div.draggable = true;
        div.innerHTML = `<span>${note.title}</span><span onclick="deleteNote(event, ${note.id})">×</span>`;
        
        div.onclick = () => { activeNoteId = note.id; updateUI(); };
        
        // Drag & Drop Logic
        div.ondragstart = (e) => e.dataTransfer.setData('text', index);
        div.ondragover = (e) => e.preventDefault();
        div.ondrop = (e) => {
            const fromIndex = e.dataTransfer.getData('text');
            const target = notes.splice(fromIndex, 1)[0];
            notes.splice(index, 0, target);
            saveData();
        };
        list.appendChild(div);
    });
}

function updateUI() {
    const note = notes.find(n => n.id === activeNoteId);
    document.getElementById('editor').value = note.content;
    renderTabs();
}

function saveData() {
    localStorage.setItem('notes_db', JSON.stringify(notes));
    renderTabs();
}

function addNewNote() {
    const newNote = { id: Date.now(), title: 'نوت جديدة', content: '' };
    notes.push(newNote);
    activeNoteId = newNote.id;
    updateUI();
}

function deleteNote(e, id) {
    e.stopPropagation();
    if(notes.length === 1) return;
    notes = notes.filter(n => n.id !== id);
    if(activeNoteId === id) activeNoteId = notes[0].id;
    saveData(); updateUI();
}

// Editor Events
document.getElementById('editor').oninput = (e) => {
    const note = notes.find(n => n.id === activeNoteId);
    note.content = e.target.value;
    note.title = e.target.value.split('\n')[0].substring(0, 15) || 'عنوان جديد';
    saveData();
};

// UI Toggles
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('collapsed'); }
function toggleTheme() { document.body.classList.toggle('light-mode'); }
function windowControl(action) { ipcRenderer.send('window-control', action); }

document.getElementById('compactBtn').onclick = () => {
    isCompact = !isCompact;
    document.body.classList.toggle('compact');
    ipcRenderer.send('resize-window', isCompact ? 'compact' : 'normal');
};

// Initial Start
updateUI();