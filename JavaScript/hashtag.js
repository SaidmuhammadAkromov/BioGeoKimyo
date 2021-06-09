import { BASE_URL } from '../modules/contstants.js';
import { createCard } from '../modules/create_card.js';
import { toggleBurger } from '../modules/create_card.js';
import { createCards } from '../modules/create_card.js';


async function getArticles() {
    const pageUrl = new URL(window.location.href)
    const tagId  = pageUrl.searchParams.get('tagId')
    const tagName = pageUrl.searchParams.get('tagName')
    const cardsContainer = document.getElementById('cardsContainer')
    try {
        const url = BASE_URL + '/articles?langId=1' + '&tagId=' + tagId
        const response = await fetch(url)
        const importElementsForCards = await response.json()
        document.querySelector('.tagName').innerText = `#${tagName}`

        createCards(importElementsForCards)
        
    } catch (error) {
        console.log(error);
    }
}


window.onload = function () {
    toggleBurger()
    getArticles()
}