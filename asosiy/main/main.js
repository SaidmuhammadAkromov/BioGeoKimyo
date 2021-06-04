let SELECTED_JOURNAL_ID = null;
let SELECTED_LANG_ID = null;

import {BASE_URL} from '../modules/contstants.js'
import {createCard} from '../modules/create_card.js';
import {createMoreArticles} from '../modules/create_card.js';

async function getArticles(block,langId, journalId , size=10, offset=0) {
    const url = BASE_URL+ "/articles?langId=" + langId + "&journalId=" + journalId + "&size="+ size + "&offset=" + offset;
    
    // setLoading(true)
    try {
        const response = await fetch(url)
        const importElements = await response.json()
        const categoryButtons = document.getElementsByClassName('card-category-button') 
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
    getMoreArticles(biologiyaBlock, 1, 1, 3, 1)
    getMoreArticles(geografiyaBlock, 1, 2, 3, 1)
    getMoreArticles(kimyoaBlock, 1, 3, 3, 1)
})