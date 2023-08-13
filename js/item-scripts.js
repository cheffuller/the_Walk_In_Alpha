import {displayItems, getCategories} from './scripts.js'

const getItemId = () => {
    const url_string = window.location.href
    const url = new URL(url_string);
    const id = url.searchParams.get("product-id");
    return id
}

const getItemData = async () => {
    const id = getItemId()
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await response.json()
    const catResponse = await fetch(`https://dummyjson.com/products/category/${data.category}?limit=5`)
    const catData = await catResponse.json()
    const relatedItems = catData.products
    displayItem(data)
    removeCurrentItem(id, relatedItems)
    relatedItems.forEach(item => {displayItems(item)});
    getCategories()
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
    getItemData();
  };