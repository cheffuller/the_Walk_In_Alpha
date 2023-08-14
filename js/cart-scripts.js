import {getData, loadCategories, createDiv, createImage, formatCategoryName} from './scripts.js'

// main body of code for cart html page
const loadCartPage = async () => {
    loadCategories()
    const cartNumber = getRandomIntInclusive().toString()
    const cart = await getData(`carts/${cartNumber}`)
    const cartItems = cart.products
    for (const item of cartItems) {
        item.thumbnail = await getCartImages(item)
    }
    cartItems.forEach(item => displayCartItems(item))
    displayCartTotals(cart)
}

const getCartImages = async (item) => {
    const data = await getData(`products/${item.id}`)
    return data.thumbnail
}

const displayCartItems = (item) => {
    const displayWindow = document.querySelector("#display");
    const divZero = createDiv("row border-top")
    const divOne = createDiv("row main align-items-center")
    const divTwo = createDiv("col-2")
    const img = createImage(item, "img-fluid")
    const divThreeA = createDiv("col-4")
    const divThreeB = createDiv("col-1")
    const divThreeC = createDiv("col")
    const divThreeD = createDiv("col-2 text-center")
    const divThreeE = createDiv("col text-center")
    const divThreeF = createDiv("col-2 text-end")
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

const displayCartTotals = (cart) => {
    document.querySelector('#cart-item-total').innerHTML = `${cart.totalQuantity}`
    document.querySelector('#display-item-total').innerHTML = `${cart.totalQuantity} items`
    document.querySelector('#total-price').innerHTML = `${cart.total.toLocaleString("en-US", {style:"currency", currency:"USD"})}`
}

const getRandomIntInclusive = (min = 1, max = 20) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function that calls main body of code when the window loads
window.onload = () => {
    loadCartPage();
  };