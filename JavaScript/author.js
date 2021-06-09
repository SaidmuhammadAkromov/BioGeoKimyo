import { BASE_URL } from '../modules/contstants.js';
import { IMAGE_URL } from '../modules/contstants.js';
import { toggleBurger } from '../modules/create_card.js';
import { createCards } from '../modules/create_card.js';


function editAuthor(author) {
    document.querySelector('.author-logo').children[0].src = IMAGE_URL + author.image
    document.querySelector('#authorName').innerText = author.name
    document.querySelector('.author-bio').innerText = author.bio
}

async function getArticles() {
    const pageUrl = new URL(window.location.href)
    const authorID  = pageUrl.searchParams.get('authorId')
    const cardsContainer = document.getElementById('cardsContainer')

    try {
        const url = BASE_URL + '/articles?langId=1' + '&journalId=1' + '&authorId=' + authorID
        const response = await fetch(url)
        const importElements = await response.json()

        editAuthor(importElements[0].author)
        createCards(importElements)

    } catch (error) {
        console.log(error);
    }
}

window.onload = function () {
    toggleBurger()
    getArticles()
}