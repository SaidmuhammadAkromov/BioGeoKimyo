const IMAGE_URL = "http://192.144.37.95/images/"
const BASE_URL = 'http://192.144.37.95:8080/'
let SELECTED_JOURNAL_ID = null;
let SELECTED_LANG_ID = null;

function getFullDate(date) {
    const d = new Date(date)
    console.log(d);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}

function editCards(card, importElements) {
    card.firstElementChild.firstElementChild.src = IMAGE_URL + importElements.image
    card.lastElementChild.firstElementChild.innerText = importElements.title
    card.lastElementChild.children[1].innerHTML = importElements.body
    card.lastElementChild.lastElementChild.innerText = getFullDate(importElements.date) 
}
function editCardsLang(card,importElements) {
    card.firstElementChild.firstElementChild.src = IMAGE_URL + importElements[0].author.image
    card.lastElementChild.firstElementChild.innerText = importElements[0].title
    card.lastElementChild.children[1].innerHTML = importElements[0].body
}

async function getMoreArticles(block) {
    const url = BASE_URL + 'api/articles?langId=' + SELECTED_LANG_ID + '&journalId=' + SELECTED_JOURNAL_ID;

    try {
        const response = await fetch(url)
        const importElements = await response.json()
        block.children[0].children[1].children[0].innerHTML = importElements[0].title
        block.children[0].children[3].children[0].innerHTML = importElements[1].title
        block.children[0].children[5].children[0].innerHTML = importElements[2].title
        block.children[0].children[1].children[1].innerHTML = getFullDate(importElements[0].date)
        block.children[0].children[3].children[1].innerHTML = getFullDate(importElements[1].date)
        block.children[0].children[5].children[1].innerHTML = getFullDate(importElements[2].date)
        var d = new Date(importElements[0].date)
        console.log(d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear());
        console.log(importElements[0].date);
        
    } catch (error) {
        console.log(error);
    }
}

async function getArticles(size=6, offset=6) {
    const url = BASE_URL + 'api/articles?langId=' + SELECTED_LANG_ID;
    
    // setLoading(true)
    try {
        const response = await fetch(url)
        const importElements = await response.json()
        const biologCard0 = document.getElementById('biologCard0')
        const geografiyaCard0 = document.getElementById('geografiyaCard0')
        const kimyoCard0 = document.getElementById('kimyoCard0')

        console.log(importElements);
        const elements = importElements
        editCards(biologCard0, elements[0])
        editCards(geografiyaCard0, elements[1])
        editCards(kimyoCard0, elements[3])

    } catch (error) {
        console.log(error)
    } finally {
        // setLoading(false)
    }
}
window.onload = function () {
    const biologCard0 = document.getElementById('biologCard0')
    const geografiyaCard0 = document.getElementById('geografiyaCard0')
    const kimyoCard0 = document.getElementById('kimyoCard0')
    const ruLang = document.getElementById('ruLang')
    const uzLang = document.getElementById('uzLang')
    const engLang = document.getElementById('engLang')
    const bioMoreArticle = document.getElementById('bioMoreArticle')
    const geoMoreArticles = document.getElementById('geoMoreArticle')
    const kimyoMoreAricles = document.getElementById('kimyoMoreArticles')

    SELECTED_LANG_ID = 1
    getArticles()
    SELECTED_JOURNAL_ID = 1
    getMoreArticles(bioMoreArticle)

    SELECTED_JOURNAL_ID = 2
    getMoreArticles(geoMoreArticles)

    SELECTED_JOURNAL_ID = 3
    getMoreArticles(kimyoMoreAricles)

    ruLang.addEventListener('click', function () {
        SELECTED_LANG_ID = 2
        fetch(BASE_URL + 'api/articles?langId=2')
        .then(response => {
           return response.json()
        })
        .then(function (importElements) {
            const elements = importElements
            editCardsLang(biologCard0, importElements)
            editCardsLang(geografiyaCard0, importElements)
            editCardsLang(kimyoCard0, importElements)
            console.log(elements);
            ruLang.classList.add('active-class')
            uzLang.classList.remove('active-class')
            engLang.classList.remove('active-class')
        });

    })

    engLang.addEventListener('click', function () {
        // SELECTED_LANG_ID = 3
        engLang.classList.add('active-class')
        uzLang.classList.remove('active-class')            
        ruLang.classList.remove('active-class')
    })

    uzLang.addEventListener('click', function () {
        SELECTED_LANG_ID = 1
        getArticles()
        uzLang.classList.add('active-class')
        ruLang.classList.remove('active-class')
        engLang.classList.remove('active-class')
    })
}







 // fetch(BASE_URL + 'api/articles?langId=1')
    //     .then(response => {
    //        return response.json()
    //     })
    //     .then(function returnFetch(importElements) {
    //         const elements = importElements
    //         editCards(biologCard0, elements[0])
    //         editCards(geografiyaCard0, elements[1])
    //         editCards(kimyoCard0, elements[3])
    //         console.log(elements);
    //     });