const chalk = require('chalk')
const getNotes = () => {
    return 'Your notes...'
}


const addNote = (title, body) => {
    const notes = loadNotes()
    // console.log(notes)
    const duplicateNote = notes.find( note => note.title === title )

    // console.log(duplicateNote)
    // console.log(title)

    // debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNodes(notes)
        console.log(chalk.green('New node added'))
    } else {
        console.log(chalk.red('Note title taken'))
    }
    // console.log(loadNotes())
}

const fs = require('fs')
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNodes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = title => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)
    if (notes.length > notesToKeep.length) {
        saveNodes(notesToKeep)
        console.log(chalk.green("Removed Note"))
    } else {
        console.log(chalk.red("No Note removed"))
    }
    // console.log(loadNotes())
}

const readNote = title => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note not found"))
    }

}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach(note => {
         console.log(note.title)
    });
}

// module.exports = getNotes

module.exports = {
    getNotes : getNotes, 
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}