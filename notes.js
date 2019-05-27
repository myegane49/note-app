const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    debugger

    if (!duplicateNote) {
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('note added'));
    } else {
        console.log(chalk.red.inverse('note title taken'));
    }
};

const removeNote = title => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title);
    
    if (newNotes.length !== notes.length) {
        saveNotes(newNotes);
        console.log(chalk.green.inverse('note removed'));
    } else {
        console.log(chalk.red.inverse('no note found'));
    }

};

const listNotes = () => {
    console.log(chalk.cyan.inverse("listing the notes"));
    const notes = loadNotes();

    notes.forEach(note => {
        console.log(note.title);
    });
};

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if (note) {
        console.log(`${chalk.yellow.inverse(note.title)}: ${note.body}`);
    } else {
        console.log(chalk.red.inverse('there is no such note'));
    }
};

const saveNotes = notes => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};