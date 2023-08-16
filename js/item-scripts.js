import {getData, loadCategoriesFromPages, displayItemsFromPages, getUrlParam} from './scripts.js'

// main body of javascript for item page
const loadItemPage = async () => {
    // loads categories into menu bar
    loadCategoriesFromPages()
    // gets the current product id from the url
    const id = getUrlParam("product-id")
    // gets the item data based on product id
    const itemData = await getData(`products/${id}`)
    // calls function to display item data
    displayItem(itemData)
    // gets the related item object from the API
    const relatedItemData = await getData(`products/category/${itemData.category}?limit=5`)
    // creates a related items array from the related items object
    const relatedItems = relatedItemData.products
    // removes main item from related items array
    removeCurrentItem(id, relatedItems)
    // displays each item in the relatedItems array
    relatedItems.forEach(item => {displayItemsFromPages(item)});
}

// function to display the selected item info on the page
const displayItem = (item) => {
    document.querySelector("title").innerHTML = item.title
    document.querySelector("#item-image").src = item.thumbnail;
    document.querySelector("#item-id").append(`${item.id}`)
    document.querySelector("#item-title").innerHTML = item.title
    document.querySelector("#item-price").innerHTML = `$${item.price.toFixed(2)}`
    document.querySelector("#item-description").innerHTML = item.description
    document.querySelector("#item-stock").append(`${item.stock}`)
}

// function to remove the current main item displayed on the page from the Related Items
// displayed below
const removeCurrentItem = (item, array) => {
    let currentItem = -1
    array.forEach((element, index) => {
        if (element.id == item) {
            currentItem = index
        }
    })
    if (currentItem === -1) {
        array.pop()
    } else {
        array.splice(currentItem, 1)
    }
}

// function that calls main body of code when the window loads
window.onload = () => {
    loadItemPage();
  };