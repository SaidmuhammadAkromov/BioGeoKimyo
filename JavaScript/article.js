import { BASE_URL , IMAGE_URL} from '../modules/contstants.js'
import { toggleBurger, getFullDate, getArticles, createMoreArticles, appentTo} from '../modules/create_card.js'


const pageUrl = new URL(window.location.href)
const mainCardId  = pageUrl.searchParams.get('id')

async function getOneArticle(id) {
    const url = `${BASE_URL}/article?langId=1&id=${id}`
    const response = await fetch(url)
    const importElement = await response.json()
    console.log(importElement);
    return importElement
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

function createAllButton(element) {
    const con = document.getElementById('con')
    const allBtn = document.createElement('a')
    allBtn.innerText = 'Barchasi'
    allBtn.classList.add('all-button')
    allBtn.href = `../htmls/journal.html?langId=${element.langId}&journalId=${element.journalId}`
    con.append(allBtn)
}

function createTags(tag) {
    const tags = document.querySelector('.tags')
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `../htmls/hashtag.html?tagId=${tag.id}&tagName=${tag.name}` 
    a.innerText = '#' + tag.name
    tags.append(li)
    li.append(a)
}

window.onload = async function () {
    const articlesBlock = document.querySelector('.articles')
    const importMainArticle = await getOneArticle(mainCardId)

    editMainArticle(importMainArticle)

    for (let index = 0; index < importMainArticle.tags.length; index++) {
        const tags = importMainArticle.tags[index];
        const tag = createTags(tags)
    }

    let importMoreArticlesParams = {
        langId: importMainArticle.langId,
        journalId: importMainArticle.journalId,
        size: 5,
        offset: 1
    }

    const importMoreArticles = await getArticles(importMoreArticlesParams)
    console.log(importMoreArticles);
    const moreArticles = createMoreArticles(importMoreArticles)
    appentTo(articlesBlock, moreArticles)
    createAllButton(importMainArticle)
    toggleBurger()
}