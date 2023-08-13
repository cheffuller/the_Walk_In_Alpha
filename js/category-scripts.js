import {getData, loadCategories, displayItems, formatCategoryName, getUrlParam} from './scripts.js'

const loadCategoryPage = async () => {
    loadCategories()
    const category = getUrlParam("category")
    const categoryItemData = await getData(`/category/${category}`)
    const categoryItems = categoryItemData.products
    document.querySelector("#category").innerHTML = formatCategoryName(category)
    categoryItems.forEach(item => {displayItems(item)});
}

window.onload = () => {
    loadCategoryPage();
  };