import {BASE_URL} from '../asosiy/modules/contstants.js';
import {IMAGE_URL} from '../asosiy/modules/contstants.js';
import {toggleBurger} from '../asosiy/modules/create_card.js';

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
        getMorArticles()
        for (let index = 0; index < 3; index++) {  //<<<<<<<<<<<<<<<<<TAG SIZE
            const tag = importElement['tags'][index];
            createTags(tag.name, tag.id)
        }
        async function getMorArticles() {
            try {
                const url = BASE_URL + '/articles?langId=1' + '&journalId=' + importElement.journalId + '&'
                const response = await fetch(url)
                const moreArticles = await response.json()
                const articles = document.querySelectorAll('article')

                document.querySelector('.all-button').href = '../category/index.html?journalId=' + importElement.journalId
                document.querySelector('#h1').innerText = importElement['category']['name']
                console.log(moreArticles);

                for (let index = 0; index < articles.length; index++) {
                    const article = articles[index];
                    const importArticle = moreArticles[index];
                    
                    article.children[0].innerText = importArticle.title
                    article.children[0].href = '../article/index.html?id=' + importArticle.id
                    article.children[1].innerText = getFullDate(importArticle.date)
                }
            
            } catch (error) {
                console.log(error);
            }

            
        }
    } catch (error) {
        console.log(error);
    }
}



function editMainArticle(importElement) {
    const articleBody = document.getElementById('articleBody')
    console.log(articleBody);
    articleBody.children[0].children[0].innerText = importElement.title
    articleBody.children[1].innerHTML = importElement.body
    articleBody.children[2].children[0].src = IMAGE_URL + importElement.image

    const authorInfo = document.querySelector('.author')
    authorInfo.children[0].src = IMAGE_URL + importElement.author.image
    authorInfo.children[1].innerText = importElement.author.name

    authorInfo.children[1].href = '../author/index.html?authorId=' + importElement.author.id

}

function getFullDate(date) {
    const d = new Date(date)
    let dateStr = ("00" + d.getDate()).slice(-2) + "." + ("00" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear()
    return dateStr;
}

function editMoreArticles(importElements) {
    const articles = document.getElementsByTagName('article')
    for (let index = 0; index < articles.length; index++) {
        const element = articles[index];
        console.log(element);
    }
    
}

function createTags(tag, id) {
    const tags = document.querySelector('.tags')
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `../hashtag/index.html?tagId=${id}&tagName=${tag}` 
    a.innerText = '#' + tag
    tags.append(li)
    li.append(a)
}

window.onload = function () {
    getArticle()
    // editMoreArticles()
}