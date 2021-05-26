const IMAGE_URL = "http://192.144.37.95/images/"
const BASE_URL = 'http://192.144.37.95:8080/api'

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

function editMoreArticles(importElement) {
    const moreArticles = document.getElementsByTagName('article')
    for (let index = 0; index < moreArticles.length; index++) {
        const article = moreArticles[index];
        article.children[0].innerText = importElement.title
        article.children[1].innerText = getFullDate(importElement.date)
        console.log(article);
    }
}
async function getArticles() {
    const pageUrl = new URL(window.location.href)
    const pageId  = pageUrl.searchParams.get('journalId')
    
    try {
        const url = BASE_URL + '/articles?langId=1' + '&journalId=' + pageId
        const response = await fetch(url)
        const importElements = await response.json()
        const articles = document.querySelectorAll('article')
        console.log(articles);
        editMainArticle(importElements[0])
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