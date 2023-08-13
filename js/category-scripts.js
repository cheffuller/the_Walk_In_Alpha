import {getData, displayItems, getCategories} from './scripts.js'

const getCategory = () => {
    const url_string = window.location.href
    const url = new URL(url_string);
    const value = url.searchParams.get("category");
    console.log(value)
    getData(`/category/${value}`)
}



window.onload = () => {
    getCategory();
  };