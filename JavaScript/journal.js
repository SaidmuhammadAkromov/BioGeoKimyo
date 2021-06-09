import { BASE_URL } from '../modules/contstants.js'
import { IMAGE_URL } from '../modules/contstants.js'
import { createCard } from '../modules/create_card.js'
import { toggleBurger } from '../modules/create_card.js'
import { getFullDate } from '../modules/create_card.js'
import { createMoreArticles } from '../modules/create_card.js'
import { createCards } from '../modules/create_card.js'



const pageUrl = new URL(window.location.href)
const PAGEID  = pageUrl.searchParams.get('journalId')
let offset = 10

function createMainCard(importElement) {
    const articlesBlock = document.querySelector('.articles')
    console.log(articlesBlock);

    const mainArticle = document.createElement('div')
    mainArticle.id = 'mainArticle'
    mainArticle.classList.add('main-article')
    articlesBlock.append(mainArticle)

    const mainArticleHrefContainer = document.createElement('a')
    mainArticleHrefContainer.href = `../htmls/article.html?id=${importElement.id}`
    mainArticle.append(mainArticleHrefContainer)

    const mainArticleImage = document.createElement('img')
    mainArticleImage.src = `${IMAGE_URL}${importElement.image}`
    mainArticleHrefContainer.append(mainArticleImage)

    const mainArticleBody = document.createElement('div')
    mainArticleBody.id = 'mainArticleBody'
    mainArticleBody.classList.add('main-article-body')
    mainArticleHrefContainer.append(mainArticleBody)

    const container = document.createElement('div')
    container.classList.add('container')
    mainArticleBody.append(container)

    const categoryButton = document.createElement('a')
    categoryButton.classList.add('category-button')
    categoryButton.innerText = importElement.category.name
    container.append(categoryButton)

    const mainArticleTitle = document.createElement('h2')
    mainArticleTitle.classList.add('main-article-title')
    mainArticleTitle.innerText = importElement.title
    container.append(mainArticleTitle)

    const mainArticleText = document.createElement('p')
    mainArticleText.classList.add('main-article-text')
    mainArticleText.innerHTML = importElement.body
    container.append(mainArticleText)

}
function validationPage(PAGEID) {
    if (PAGEID == 1) {
        document.getElementById('h1').innerText = 'Biologiya'
        document.getElementById('categoryBtn').innerText = 'Biologiya'
    }else if (PAGEID == 2) {
        document.getElementById('h1').innerText = 'Geografiya'
        document.getElementById('categoryBtn').innerText = 'Geografiya'
    }
    else if (PAGEID == 3) {
        document.getElementById('h1').innerText = 'Kimyo'
        document.getElementById('categoryBtn').innerText = 'Kimyo'
    }
}
async function getArticlesForCards(PAGEID) {
    const cardsContainer = document.getElementById('cardsContainer')
    const url = BASE_URL + `/articles?langId=1&journalId=${PAGEID}&offset=4&size=6`
    const response = await fetch(url)
    const importElementsForCards = await response.json()
    
    createCards(importElementsForCards, cardsContainer)
}
async function getArticles() {
    try {
        const url = BASE_URL + `/articles?langId=1&journalId=${PAGEID}&size=4&offset=0 `
        const response = await fetch(url)
        const importElements = await response.json()
        const articlesBlock = document.querySelector('.articles')

        createMainCard(importElements[0])
        createMoreArticles(articlesBlock, importElements)
        getArticlesForCards(PAGEID)
        validationPage(PAGEID)

    } catch (error) {
        console.log(error);
    }
}


window.onload = function () {
    const downloadMoreCards = document.getElementById('downloadMoreCards')

    downloadMoreCards.addEventListener('click', async function () {
        const url = BASE_URL + '/articles?langId=1' + '&journalId=' + PAGEID + '&offset=' + offset + '&size=6'
        const response = await fetch(url)
        const importElementsForCards = await response.json()
        const cardsContainer = document.getElementById('cardsContainer')

        createCards(importElementsForCards, cardsContainer)

        offset = offset + 6
    })

    toggleBurger()
    getArticles()
}