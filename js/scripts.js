/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

const loadIndexPage = async () => {
    const productsObject = await getData(`products/`)
    const products = productsObject.products
    products.forEach(item => displayItems(item))
    loadCategories()
}

const getData = async (parameter = '') => {
    const response = await fetch(`https://dummyjson.com/${parameter}`)
    const data = await response.json()
    return data
}

const getUrlParam = (parameter) => {
    const url_string = window.location.href
    const url = new URL(url_string);
    const value = url.searchParams.get(`${parameter}`);
    return value
}

const loadCategories = async () => {
    const categories = await getData('products/categories')
    categories.sort()
    categories.forEach(category => displayCategories(category))
}

const displayCategories = (category) => {
    const catMenu = document.querySelector(".dropdown-menu")
    const listItem = document.createElement("li")
    const a = document.createElement("a")
    a.className = "dropdown-item"
    a.innerHTML = formatCategoryName(category)
    a.href = `/pages/category.html?category=${category}`
    listItem.append(a)
    catMenu.append(listItem)
}

const formatCategoryName = (category) => {
    return category.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

const displayItems = (item) => {
    const displayWindow = document.querySelector("#display");
    const divOne = createDiv("col mb-5")
    const divTwo = createDiv("card h-100")
    const img = createImage(item, "card-img-top thumbnail")
    const divThree = createDiv("card-body p-4")
    const divFour = createDiv("text-center")
    const divFive = createDiv("card-footer p-4 pt-0 border-top-0 bg-transparent")
    divOne.append(divTwo)
    divTwo.append(img)
    divTwo.append(divThree)
    divThree.append(divFour)
    divFour.append(createItemTitle(item))
    divFour.append(`$${item.price.toFixed(2)}`)
    divTwo.append(divFive)
    divFive.append(createDetailButton(item))
    displayWindow.append(divOne);
}

const createDiv = (className) => {
    const div = document.createElement("div")
    div.className = className
    return div
}

const createImage = (item, className) => {
    const img = document.createElement("img");
    img.className = className
    img.src = item.thumbnail;
    return img
}

const createItemTitle = (item) => {
    const h5 = document.createElement("h5");
    h5.className = "fw-bolder"
    h5.innerHTML = item.title
    return h5
}

const createDetailButton = (item) => {
    const div = createDiv("text-center")
    const button = document.createElement("a")
    button.className = "btn btn-outline-dark mt-auto"
    button.href = `/pages/item.html?product-id=${item.id}`
    button.innerHTML = "View Details"
    div.append(button)
    return div
}

// function that calls getData() when the window has loaded
window.onload = () => {
    loadIndexPage();
  };

export {getData, loadCategories, displayItems, formatCategoryName, getUrlParam, createDiv, createImage}