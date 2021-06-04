import {BASE_URL} from '../asosiy/modules/contstants.js';
import {IMAGE_URL} from '../asosiy/modules/contstants.js';
import {createCard} from '../asosiy/modules/create_card.js';
import {toggleBurger} from '../asosiy/modules/create_card.js';


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
        console.log(response);
        editAuthor(importElements[0].author)
        for (let index = 0; index < importElements.length; index++) {
            const importElement = importElements[index];
        createCard(cardsContainer, importElement);
        }
    } catch (error) {
        console.log(error);
    }
}


window.onload = function () {
    toggleBurger()
    getArticles()
}