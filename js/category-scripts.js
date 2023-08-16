import {getData, loadCategoriesFromPages, displayItemsFromPages, formatCategoryName, getUrlParam} from './scripts.js'

// main body of javascript for category page
const loadCategoryPage = async () => {
    // loads categories into menu bar
    loadCategoriesFromPages()
    // gets the current category name from the url
    const category = getUrlParam("category")
    // writes the category name to the html page
    document.querySelector("title").innerHTML = formatCategoryName(category)
    document.querySelector("#category").innerHTML = formatCategoryName(category)
    // gets the current category item object from the API
    const categoryItemData = await getData(`products/category/${category}`)
    // creates a category items array from the category items object
    const categoryItems = categoryItemData.products
    // displays the item data for each item in the array
    categoryItems.forEach(item => {displayItemsFromPages(item)});
}

// function that calls main body of code when the window loads
window.onload = () => {
    loadCategoryPage();
  };