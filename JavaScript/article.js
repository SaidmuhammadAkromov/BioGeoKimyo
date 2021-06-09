import { BASE_URL } from '../modules/contstants.js'
import { IMAGE_URL } from '../modules/contstants.js'
import { toggleBurger} from '../modules/create_card.js'
import { getFullDate } from '../modules/create_card.js'



async function getMorArticles(importElement) {
    try {
        const url = BASE_URL + '/articles?langId=1' + '&journalId=' + importElement.journalId + '&'
        const response = await fetch(url)
        const moreArticles = await response.json()
        const articles = document.querySelectorAll('article')

        document.querySelector('.all-button').href = '../htmls/journal.html?journalId=' + importElement.journalId
        document.querySelector('#h1').innerText = importElement['category']['name']

        for (let index = 0; index < articles.length; index++) {
            editMoreArticles(moreArticles, articles)
        }
    
    } catch (error) {
        console.log(error);
    }

    
}

async function getArticle() {
    const pageUrl = new URL(window.location.href)
    const id  = pageUrl.searchParams.get('id')
    
    try {
        const url = BASE_URL + '/article?langId=1' + '&id=' + id
        const response = await fetch(url)
        const importElement = await response.json()
        console.log(importElement);
        editMainArticle(importElement)
        toggleBurger()
        getMorArticles(importElement)
        for (let index = 0; index < 3; index++) {  //<<<<<<<<<<<<<<<<<TAG SIZE
            const tag = importElement['tags'][index];
            createTags(tag.name, tag.id)
        }
    } catch (error) {
        console.log(error);
    }
}



function editMainArticle(importElement) {
    const articleBody = document.getElementById('articleBody')
    articleBody.children[0].children[0].innerText = importElement.title
    articleBody.children[1].innerHTML = importElement.body
    articleBody.children[2].children[0].src = IMAGE_URL + importElement.image

    const authorInfo = document.querySelector('.author')
    authorInfo.children[0].src = IMAGE_URL + importElement.author.image
    authorInfo.children[1].innerText = importElement.author.name

    authorInfo.children[1].href = '../htmls/author.html?authorId=' + importElement.author.id

}

function editMoreArticles(importElements, articles) {
    for (let index = 0; index < articles.length; index++) {
        const article = articles[index]
        const element = importElements[index];
        
        article.children[0].innerText = element.title
        article.children[0].href = '../htmls/article.html?id=' + element.id
        article.children[1].innerText = getFullDate(element.date)
    }
    
}

function createTags(tag, id) {
    const tags = document.querySelector('.tags')
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `../htmls/hashtag.html?tagId=${id}&tagName=${tag}` 
    a.innerText = '#' + tag
    tags.append(li)
    li.append(a)
}

window.onload = function () {
    getArticle()
}