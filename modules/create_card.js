const IMAGE_URL = "http://192.144.37.95/images/"
const BASE_URL = 'http://192.144.37.95:8080/api'

function createCards(importElements) {
    for (let index = 0; index < importElements.length; index++) {
        const importElement = importElements[index];
        createCard(importElement);
    }
}

function createCard(importElement) {
    const card = document.createElement('a')
    card.href = '../article/index.html?id=' + importElement.id
    card.classList.add('card')
    let cardId;
    cardId = importElement.id
    card.href = '../htmls/article.html?id=' + cardId 

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
    cardCategoryButton.innerText = importElement.category.name
    cardCategoryButton.style.textTransform = 'capitalize'
    cardCategoryButton.style.alignItems = 'center'
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
    return card
}
function createMoreArticles(importElements) {
    const moreArticlesBlock = document.createElement('div')
    moreArticlesBlock.classList.add('more-articles')
    
    const moreArticlesBlockContainer = document.createElement('div')
    moreArticlesBlockContainer.classList.add('container')
    moreArticlesBlock.append(moreArticlesBlockContainer)

    const moreArticlesTitle = document.createElement('h4')
    moreArticlesTitle.innerText = 'Boshqa malumotlar'
    moreArticlesBlockContainer.append(moreArticlesTitle)

    for (let index = 0; index < importElements.length; index++) {
        const element = importElements[index];
        const article = document.createElement('article')
        moreArticlesBlockContainer.append(article)

        const articleTittle = document.createElement('a')
        articleTittle.innerText = element.title
        articleTittle.href = '../htmls/article.html?id=' + element.id
        article.append(articleTittle)

        const articleDate = document.createElement('span')
        articleDate.innerText = getFullDate(element.date)
        article.append(articleDate)
        
        if (index <= importElements.length -2) {
            const hr = document.createElement('hr')
            moreArticlesBlockContainer.append(hr)
        }

    }

    return moreArticlesBlock
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



async function getArticles(params) {
    const url = `${BASE_URL}/articles?langId=${params.langId}&journalId=${params.journalId}&size=${params.size}&offset=${params.offset}`
    const response = await fetch(url)
    const importElements = await response.json()
    return importElements
}

function appentTo(block, target) {
    block.append(target)
}
export {createCard, getFullDate, createMoreArticles, toggleBurger, createCards, getArticles, appentTo};
