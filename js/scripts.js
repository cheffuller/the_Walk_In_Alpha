/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

// main body of javascript for index page
const loadIndexPage = async () => {
    loadCategories()
    const productsObject = await getData(`products/`)
    const products = productsObject.products
    products.forEach(item => displayItems(item))
}

// function to get the data from the API
const getData = async (parameter = '') => {
    const response = await fetch(`https://dummyjson.com/${parameter}`)
    const data = await response.json()
    return data
}

// function to get the url parameters for the item and category pages
const getUrlParam = (parameter) => {
    const url_string = window.location.href
    const url = new URL(url_string);
    const value = url.searchParams.get(`${parameter}`);
    return value
}

// function to get the categories in the API, sort them alphabetically and call 
// the function to display them
// this function will write to the html files in the pages directory
const loadCategoriesFromPages = async () => {
    const categories = await getData('products/categories')
    categories.sort()
    categories.forEach(category => displayCategoriesFromPages(category))
}

// function to get the categories in the API, sort them alphabetically and call 
// the function to display them
const loadCategories = async () => {
    const categories = await getData('products/categories')
    categories.sort()
    categories.forEach(category => displayCategories(category))
}

// function to display the categories and create dynamic links in the menu bar
const displayCategories = (category) => {
    const catMenu = document.querySelector(".dropdown-menu")
    const listItem = document.createElement("li")
    const a = document.createElement("a")
    a.className = "dropdown-item"
    a.innerHTML = formatCategoryName(category)
    a.href = `pages/category.html?category=${category}`
    listItem.append(a)
    catMenu.append(listItem)
}

// function to display the categories and create dynamic links in the menu bar
// this function will write to the html files in the pages directory
const displayCategoriesFromPages = (category) => {
    const catMenu = document.querySelector(".dropdown-menu")
    const listItem = document.createElement("li")
    const a = document.createElement("a")
    a.className = "dropdown-item"
    a.innerHTML = formatCategoryName(category)
    a.href = `category.html?category=${category}`
    listItem.append(a)
    catMenu.append(listItem)
}

// function that takes a string, removes the hyphens, and capitalizes the first letter
// of each word
const formatCategoryName = (category) => {
    return category.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

// function that creates the nested div structure for each item and displays the items info
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

// function that creates a div and assigns it a class name
const createDiv = (className) => {
    const div = document.createElement("div")
    div.className = className
    return div
}

// function that creates an image and assigns it a class name
const createImage = (item, className) => {
    const img = document.createElement("img");
    img.className = className
    img.src = item.thumbnail;
    return img
}

// function that creates an h5 element for each item's title
const createItemTitle = (item) => {
    const h5 = document.createElement("h5");
    h5.className = "fw-bolder"
    h5.innerHTML = item.title
    return h5
}

// function that creates a "view detail button for each item"
const createDetailButton = (item) => {
    const div = createDiv("text-center")
    const button = document.createElement("a")
    button.className = "btn btn-outline-dark mt-auto"
    button.href = `pages/item.html?product-id=${item.id}`
    button.innerHTML = "View Details"
    div.append(button)
    return div
}

// function that calls getData() when the window has loaded
window.onload = () => {
    loadIndexPage();
};

// exports the functions used by the other pages
export {getData, loadCategoriesFromPages, displayItems, formatCategoryName, getUrlParam, createDiv, createImage}