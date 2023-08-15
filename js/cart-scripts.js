import {getData, loadCategories, createDiv, createImage, formatCategoryName} from './scripts.js'

// main body of code for cart html page
const loadCartPage = async () => {
    // loads categories into menu bar
    loadCategories()
    // randomly selects a cart number between 1-20
    const cartNumber = getRandomIntInclusive().toString()
    // gets the cart data from the API
    const cart = await getData(`carts/${cartNumber}`)
    // creates a cartItems array from the cart object
    const cartItems = cart.products
    // gets thumbnail images of the cart items and adds them to the 
    // item object in the cartItem array
    for (const item of cartItems) {
        item.thumbnail = await getCartImages(item)
    }
    // displays each item in the cartItems array
    cartItems.forEach((item, index) => {
        if (index !== cartItems.length -1) {
            displayCartItems(item)
        } else {
            displayCartItems(item, 'border-bottom')
        }
    })
    // displays the totals for the cart
    displayCartTotals(cart)
}

// function to get the thumbnail images of the cart items
const getCartImages = async (item) => {
    const data = await getData(`products/${item.id}`)
    return data.thumbnail
}

// function to display the cart item info
const displayCartItems = (item, className = '') => {
    const displayWindow = document.querySelector("#display");
    const divZero = createDiv(`row border-top ${className}`)
    const divOne = createDiv("row main align-items-center")
    const divTwo = createDiv("col-2")
    divTwo.setAttribute('id', 'item-image')
    const img = createImage(item, "img-fluid")
    const divThreeA = createDiv("col-4")
    const divThreeB = createDiv("col-1")
    const divThreeC = createDiv("col")
    const divThreeD = createDiv("col text-center")
    const divThreeE = createDiv("col text-center")
    const divThreeF = createDiv("col text-end")
    const divFour = createDiv("col")
    divZero.append(divOne)
        divOne.append(divTwo)
            divTwo.append(img)
        divOne.append(divThreeA)
            divThreeA.append(divFour)
                divFour.append(formatCategoryName(item.title))
        divOne.append(divThreeB)
            divThreeB.innerHTML = `<a href="" class="border text-center text-decoration-none">${item.quantity}</a>`
        divOne.append(divThreeC)
            divThreeC.append(`x`)
        divOne.append(divThreeD)
            divThreeD.append(`$${item.price.toFixed(2)}`)
        divOne.append(divThreeE)
            divThreeE.append(`=`)
        divOne.append(divThreeF)
            divThreeF.append(`$${item.total.toFixed(2)}`)
    displayWindow.append(divZero);
}

// function to display the cart totals info on the page
const displayCartTotals = (cart) => {
    document.querySelector('#cart-item-total').innerHTML = `${cart.totalQuantity}`
    document.querySelector('#display-item-total').innerHTML = `${cart.totalQuantity} items`
    document.querySelector('#total-price').innerHTML = `${cart.total.toLocaleString("en-US", {style:"currency", currency:"USD"})}`
}

// function that returns a random integer for cart selection
const getRandomIntInclusive = (min = 1, max = 20) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function that calls main body of code when the window loads
window.onload = () => {
    loadCartPage();
  };