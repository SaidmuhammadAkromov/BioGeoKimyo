import {BASE_URL} from '../asosiy/modules/contstants.js';
import {createCard} from '../asosiy/modules/create_card.js';
import {toggleBurger} from '../asosiy/modules/create_card.js';


async function getArticles() {
    const pageUrl = new URL(window.location.href)
    const tagId  = pageUrl.searchParams.get('tagId')
    const tagName = pageUrl.searchParams.get('tagName')
    const cardsContainer = document.getElementById('cardsContainer')
    try {
        const url = BASE_URL + '/articles?langId=1' + '&tagId=' + tagId
        const response = await fetch(url)
        const importElementsForCards = await response.json()
        console.log(importElementsForCards);
        document.querySelector('.tagName').innerText = `#${tagName}`

        for (let index = 0; index < importElementsForCards.length; index++) {
            const element = importElementsForCards[index];
            console.log(element);
            createCard(cardsContainer, element)
        }
    } catch (error) {
        console.log(error);
    }
}


window.onload = function () {
    toggleBurger()
    getArticles()
}