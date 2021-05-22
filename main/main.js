const IMAGE_URL = "http://192.144.37.95/images/"
const BASE_URL = 'http://192.144.37.95:8080/api'
let SELECTED_JOURNAL_ID = null;
let SELECTED_LANG_ID = null;


function getFullDate(date) {
    const d = new Date(date)
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}

function createCard(block, importElement) {
    const card = document.createElement('a')
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
    card.append(cardDate)
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

        const articleTittle = document.createElement('h4')
        articleTittle.innerText = element.title
        const articleDate = document.createElement('span')
        articleDate.innerText = getFullDate(element.date)

        article.append(articleDate)
        article.append(articleTittle)
    }
}
async function getArticles(block,langId, journalId , size=10, offset=0) {
    const url = BASE_URL+ "/articles?langId=" + langId + "&journalId=" + journalId + "&size="+ size + "&offset=" + offset;
    
    // setLoading(true)
    try {
        const response = await fetch(url)
        const importElements = await response.json()
        console.log(importElements);
        for (let index = 0; index < importElements.length; index++) {
            const element = importElements[index];
            createCard(block, element)
        }
    } catch (error) {
        console.log(error)
    } finally {
        // setLoading(false)
    }
}
async function getMoreArticles(block,langId, journalId , size=3, offset) {
    const url = BASE_URL+ "/articles?langId=" + langId + "&journalId=" + journalId + "&size="+ size + "&offset=" + offset;
    
    // setLoading(true)
    try {
        const response = await fetch(url)
        const importElements = await response.json()
        console.log(importElements);
        createMoreArticles(block, importElements)
    } catch (error) {
        console.log(error)
    } finally {
        // setLoading(false)
    }
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

window.addEventListener('load', async function () {
    const biologiyaBlock = document.getElementById('biologiya-block')
    const geografiyaBlock = document.getElementById('geografiya-block')
    const kimyoaBlock = document.getElementById('kimyo-block')
    toggleBurger()
    getArticles(biologiyaBlock, 1, 1, 1)
    getArticles(geografiyaBlock, 1, 2, 1)
    await getArticles(kimyoaBlock, 1, 3, 1)
    getMoreArticles(biologiyaBlock, 1, 1, 3, 3)
    getMoreArticles(geografiyaBlock, 1, 2, 3, 3)
    getMoreArticles(kimyoaBlock, 1, 3, 3, 3)
})