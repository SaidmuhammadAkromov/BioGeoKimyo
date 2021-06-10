import { BASE_URL, IMAGE_URL } from '../modules/contstants.js';
import { toggleBurger, createCards, getArticles, getFullDate, createCard, appentTo } from '../modules/create_card.js';

const pageUrl = new URL(window.location.href)
const authorID  = pageUrl.searchParams.get('authorId')


async function getAuthor(langId, authorID) {
    const url = `${BASE_URL}/articles?langId=${langId}&authorId=${authorID}`
    const response = await fetch(url)
    const importAuthor = await response.json()
    
    return importAuthor
}

function editAuthor(author) {
    document.querySelector('.author-logo').children[0].src = IMAGE_URL + author.image
    document.querySelector('#authorName').innerText = author.name
    document.querySelector('.author-bio').innerText = author.bio
}

window.onload = async function () {
    const importElements = await getAuthor(1, authorID)
    const cardsContainer = document.getElementById('cardsContainer')
    editAuthor(importElements[0].author)

    for (let index = 0; index < importElements.length; index++) {
        const element = importElements[index];
        const card =  createCard(element)
        appentTo(cardsContainer, card)
    }

    toggleBurger()
}