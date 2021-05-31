const IMAGE_URL = "http://192.144.37.95/images/"
const BASE_URL = 'http://192.144.37.95:8080/api'
let offset = 0
function createCard(block, importElement) {
    const card = document.createElement('a')
    card.href = '../article/index.html?id=' + importElement.id
    card.classList.add('card')
    block.append(card)


    const cardImgBlock = document.createElement('div')
    cardImgBlock.classList.add('card-image-block')
    card.append(cardImgBlock)


    const cardImage = document.createElement('img')
    cardImage.style.width = '100%'
    cardImage.style.height = '100%'
    cardImage.src = IMAGE_URL + importElement.image
    cardImgBlock.append(cardImage)


    const cardCategoryButton = document.createElement('a')
    cardCategoryButton.classList.add('card-category-button')
    cardCategoryButton.innerText = "Category"
    cardImgBlock.append(cardCategoryButton)


    const cardContent = document.createElement('div')
    cardContent.classList.add('card-content')
    card.append(cardContent)


    const cardTitle = document.createElement('h4')
    cardTitle.innerText = importElement.title
    cardContent.append(cardTitle)


    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardBody.innerHTML = importElement.body
    cardContent.append(cardBody)


    const cardDate = document.createElement('span')
    cardDate.innerText = getFullDate(importElement.date)
    cardContent.append(cardDate)
}

function toggleBurger() {
    document.querySelector('.header-burger').addEventListener('click', function() {
        console.log('hello');
        document.querySelector('.header-burger').classList.toggle('active')
        document.querySelector('.header-menu').classList.toggle('active')
        document.querySelector('.settings').classList.toggle('active')
        document.querySelector('#uzLang').innerText = 'Uzbek'
        document.querySelector('#ruLang').innerText = 'Russian'
        document.querySelector('#engLang').innerText = 'English'
    })
}
function editMainArticle(importElement) {
    const mainArticle = document.getElementById('mainArticle')
    mainArticle.children[0].src = IMAGE_URL + importElement.image
    mainArticle.children[1].children[0].children[1].innerText = importElement.title
    mainArticle.children[1].children[0].children[2].innerHTML = importElement.body
}
function getFullDate(date) {
    const d = new Date(date)
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}
async function getArticles() {
    const pageUrl = new URL(window.location.href)
    const pageId  = pageUrl.searchParams.get('journalId')
    const downloadMoreCards = document.getElementById('downloadMoreCards')

    downloadMoreCards.addEventListener('click', async function () {
        let offset =+ 6
        const cardsContainer = document.getElementById('cardsContainer')
        const url = BASE_URL + '/articles?langId=1' + '&journalId=' + pageId + '&offset=' + offset +1
        const response = await fetch(url)
        const importElementsForCards = await response.json()
        const categoryButtons = document.getElementsByClassName('card-category-button')

        for (let index = 0; index < 6; index++) {
            const elementForCard = importElementsForCards[index];
            const categoryButton = categoryButtons[index]
            console.log(categoryButton);
            categoryButton.innerText = elementForCard['category'].name
            createCard(cardsContainer, elementForCard)
        }
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
        getArticlesForCards(offset)
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