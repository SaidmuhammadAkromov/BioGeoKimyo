import {BASE_URL} from '../asosiy/modules/contstants.js';
import {IMAGE_URL} from '../asosiy/modules/contstants.js';
import {createCard} from '../asosiy/modules/create_card.js';
import {toggleBurger} from '../asosiy/modules/create_card.js';
import {getFullDate} from '../asosiy/modules/create_card.js';

let offset = 10

function editMainArticle(importElement) {
    const mainArticle = document.getElementById('mainArticle')
    const container = document.getElementById('container')
    mainArticle.children[0].href = "../article/index.html?id=" + importElement.id
    mainArticle.children[0].children[0].src = IMAGE_URL + importElement.image
    container.children[2].innerText = importElement.title
    container.children[3].innerHTML = importElement.body
}
async function getArticles() {
    const pageUrl = new URL(window.location.href)
    const pageId  = pageUrl.searchParams.get('journalId')
    const downloadMoreCards = document.getElementById('downloadMoreCards')
    downloadMoreCards.addEventListener('click', async function () {
        const cardsContainer = document.getElementById('cardsContainer')
        const url = BASE_URL + '/articles?langId=1' + '&journalId=' + pageId + '&offset=' + offset + '&size=6'
        const response = await fetch(url)
        const importElementsForCards = await response.json()
        const categoryButtons = document.getElementsByClassName('card-category-button')

        for (let index = 0; index < importElementsForCards.length; index++) {
            const elementForCard = importElementsForCards[index];
            const categoryButton = categoryButtons[index]
            console.log(categoryButton);
            categoryButton.innerText = elementForCard['category'].name
            createCard(cardsContainer, elementForCard)
        }

        offset = offset + 6
    })
    async function getArticlesForCards() {
        const cardsContainer = document.getElementById('cardsContainer')
        const url = BASE_URL + '/articles?langId=1' + '&journalId=' + pageId + '&offset=4'
        const response = await fetch(url)
        const importElementsForCards = await response.json()
        
        for (let index = 0; index < 6; index++) {
            const elementForCard = importElementsForCards[index];
            console.log(elementForCard['category'].id);
            createCard(cardsContainer, elementForCard)
        }
    }
    try {
        const url = BASE_URL + '/articles?langId=1' + '&journalId=' + pageId
        const response = await fetch(url)
        const importElements = await response.json()
        const articles = document.querySelectorAll('article')
        console.log(importElements);
        for (let index = 0; index < importElements.length; index++) {
            const element = importElements[index];
            console.log(element['category'].id);
        }
        editMainArticle(importElements[0])
        getArticlesForCards()
        if (pageId == 1) {
            document.getElementById('h1').innerText = 'Biologiya'
            document.getElementById('categoryBtn').innerText = 'Biologiya'
        }else if (pageId == 2) {
            document.getElementById('h1').innerText = 'Geografiya'
            document.getElementById('categoryBtn').innerText = 'Geografiya'
        }
        else if (pageId == 3) {
            document.getElementById('h1').innerText = 'Kimyo'
            document.getElementById('categoryBtn').innerText = 'Kimyo'
        }
        for (let index = 0; index < importElements.length; index++) {
            const element = importElements[index];
            const article = articles[index]

            article.firstElementChild.innerText = element.title
            article.firstElementChild.href = '../article/index.html?id=' + element.id
            article.lastElementChild.innerText = getFullDate(element.date)
        }
    } catch (error) {
        console.log(error);
    }
}


window.onload = function () {
    toggleBurger()
    getArticles()
}