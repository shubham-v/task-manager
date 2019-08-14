const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('Adding a new note')
        // console.log('title: ' + argv.title)
        // console.log('body: '  + argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler(arv) {
        console.log('Listing notes')
        notes.listNotes()
    }
})



yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Removing note')
        console.log('title: ' + argv.title)
        notes.removeNote(argv.title)
        
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('Reading note')
        notes.readNote(argv.title)
    }
})

yargs.parse()