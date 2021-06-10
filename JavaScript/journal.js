import { BASE_URL } from '../modules/contstants.js'
import { IMAGE_URL } from '../modules/contstants.js'
import { createCard, createCards , createMoreArticles , getFullDate , toggleBurger , getArticles, appentTo} from '../modules/create_card.js'

const pageUrl = new URL(window.location.href)
const PAGEID  = pageUrl.searchParams.get('journalId')

let importMoreaCardsParams = {
    langId: 1,
    journalId: PAGEID,
    offset: 11,
    size: 6
}

let importMainArticleParams = {
    langId: 1,
    journalId: PAGEID,
    offset: 0,
    size: 1
}

let importMoreArticlesParams = {
    langId: 1,
    journalId: PAGEID,
    offset: 1,
    size: 4
}

let importCardsParams = {
    langId: 1,
    journalId: PAGEID,
    offset: 5,
    size: 6
}

function createMainCard(importElement) {
    const mainArticle = document.createElement('div')
    mainArticle.id = 'mainArticle'
    mainArticle.classList.add('main-article')

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

    return mainArticle
}

function validationPage() {
    let page = document.getElementById('h1')
        page.innerText = 'Biologiya'
    if (PAGEID == 2) {
        page.innerText = 'Geografiya'
    }
    else if (PAGEID == 3) {
        page.innerText = 'Kimyo'
    }

}

window.onload = async function () {
    const articlesBlock = document.querySelector('.articles')
    const downloadMoreCards = document.getElementById('downloadMoreCards')
    const cardsContainer = document.getElementById('cardsContainer')

    const importMainCard = await getArticles(importMainArticleParams)
    for (let index = 0; index < 1; index++) {
        const element = importMainCard[index];
        const mainCard = createMainCard(element)
        appentTo(articlesBlock, mainCard)
    }

    const importMoreArticles = await getArticles(importMoreArticlesParams)
    const moreArticles = createMoreArticles(importMoreArticles)
    appentTo(articlesBlock, moreArticles)


    const importCards = await getArticles(importCardsParams)
    for (let index = 0; index < importCards.length; index++) {
        const element = importCards[index];
        const card = createCard(element)
        appentTo(cardsContainer, card)
    }

    downloadMoreCards.addEventListener('click', async function () {
        const importMoreCards = await getArticles(importMoreaCardsParams)
        
        for (let index = 0; index < importMoreCards.length; index++) {
            const importElement = importMoreCards[index];
            const card = createCard(importElement)
            appentTo(cardsContainer, card)
        }
        importMoreaCardsParams.offset = importMoreaCardsParams.offset + 6
    })


    validationPage()
    toggleBurger()
}