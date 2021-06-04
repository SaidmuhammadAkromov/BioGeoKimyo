const IMAGE_URL = "http://192.144.37.95/images/"
const BASE_URL = 'http://192.144.37.95:8080/api'

function createCard(block, importElement) {
    const card = document.createElement('a')
    card.href = '../article/index.html?id=' + importElement.id
    card.classList.add('card')
    let cardId;
    cardId = importElement.id
    card.href = '../article/index.html?id=' + cardId 
    
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
function createMoreArticles(block, importElements) {
    const moreArticlesBlock = document.createElement('div')
    moreArticlesBlock.classList.add('more-articles')
    block.append(moreArticlesBlock)
    
    const moreArticlesBlockContainer = document.createElement('div')
    moreArticlesBlockContainer.classList.add('more-articles-container')
    moreArticlesBlock.append(moreArticlesBlockContainer)

    const moreArticlesTitle = document.createElement('h4')
    moreArticlesTitle.innerText = 'Boshqa malumotlar'
    moreArticlesBlockContainer.append(moreArticlesTitle)

    for (let index = 0; index < 3; index++) {
        const element = importElements[index];
        const article = document.createElement('article')
        moreArticlesBlockContainer.append(article)

        const articleTittle = document.createElement('a')
        articleTittle.innerText = element.title
        articleTittle.href = '../article/index.html?id=' + element.id

        const articleDate = document.createElement('span')
        articleDate.innerText = getFullDate(element.date)

        article.append(articleDate)
        article.append(articleTittle)
    }
}

function getFullDate(date) {
    const d = new Date(date)
    let dateStr = ("00" + d.getDate()).slice(-2) + "." + ("00" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear()
    return dateStr;
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
export {createCard, getFullDate, createMoreArticles, toggleBurger};
