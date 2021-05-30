const IMAGE_URL = "http://192.144.37.95/images/"
const BASE_URL = 'http://192.144.37.95:8080/api'

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

function getFullDate(date) {
    const d = new Date(date)
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}

async function getArticles() {
    const pageUrl = new URL(window.location.href)
    const tagId  = pageUrl.searchParams.get('tagId')
    const cardsContainer = document.getElementById('cardsContainer')
    try {
        const url = BASE_URL + '/articles?langId=1' + '&tagId=' + tagId
        const response = await fetch(url)
        const importElementsForCards = await response.json()
        console.log(importElementsForCards);

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