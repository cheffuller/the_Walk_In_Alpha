import {getData, loadCategories, displayItems, getUrlParam} from './scripts.js'

const loadItemPage = async () => {
    loadCategories()
    const id = getUrlParam("product-id")
    const itemData = await getData(`/${id}`)
    displayItem(itemData)
    const relatedItemData = await getData(`/category/${itemData.category}?limit=5`)
    const relatedItems = relatedItemData.products
    removeCurrentItem(id, relatedItems)
    relatedItems.forEach(item => {displayItems(item)});
}

const displayItem = (item) => {
    document.querySelector("title").innerHTML = item.title
    document.querySelector("#item-image").src = item.thumbnail;
    document.querySelector("#item-id").append(`${item.id}`)
    document.querySelector("#item-title").innerHTML = item.title
    document.querySelector("#item-price").innerHTML = `$${item.price.toFixed(2)}`
    document.querySelector("#item-description").innerHTML = item.description
    document.querySelector("#item-stock").append(`${item.stock}`)
}

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

// function that calls getData() when the window has loaded
window.onload = () => {
    loadItemPage();
  };