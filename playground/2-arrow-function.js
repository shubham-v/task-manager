// const square = function(x) {
//     return x * x
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x * x

// const square = x => x * x

// console.log(square(2))

const event = {
    name: 'Event 1',
    guestList: ['shubham', 'name2', 'name3'],
    // printGuestList: function() {
    //     console.log('guest List for ' + this.name)
    // }
    // printGuestList: () => {
    //     console.log('guest List for ' + this.name) // undefined
    // } 
    printGuestList() {
        console.log('guest List for ' + this.name)
        
        this.guestList.forEach( function(guest)  {
            console.log(guest + " is attending "+ this.name +" party")
        })

        const that = this
        this.guestList.forEach( function(guest)  {
            console.log(guest + " is attending "+ that.name +" party")
        })

        this.guestList.forEach((guest) => {
            console.log(guest + " is attending "+ this.name +" party")
        })
    }
}

event.printGuestList()