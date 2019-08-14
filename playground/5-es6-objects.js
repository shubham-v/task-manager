// Object property shorthand
const name = 'Shubham'
const userAge  = 25
// const user = {
//     name: name,
//     age: userAge,
//     location: 'Bengaluru'
// }
// const user = {
//     name,    // shorthand
//     age: userAge,
//     location: 'Bengaluru'
// }
// console.log(user)


// Object destruturing
const product = {
    label:'Notebook',
    price:3,
    stock: 200,
    saleprice: undefined,
    rating: 4.2
}
// const label = product.label
// const stock = product.stock
const { label:productLabel, stock, rating = 5 } = product
// console.log(label)
console.log(productLabel)
console.log(stock)
console.log(rating)
// const transaction = (type, myProduct) => {
//     const { label } = myProduct
// }
const transaction = ( type, { label, stock } ) => {
    console.log(type, label, stock)
}
transaction('order', product)