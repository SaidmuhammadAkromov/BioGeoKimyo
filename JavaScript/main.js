let SELECTED_JOURNAL_ID = null;
let SELECTED_LANG_ID = null;

import { BASE_URL } from '../modules/contstants.js'
import { createCard } from '../modules/create_card.js';
import { createMoreArticles } from '../modules/create_card.js';
import { toggleBurger } from '../modules/create_card.js';

async function getArticles(block,langId, journalId , size=10, offset=0) {
    const url = BASE_URL+ "/articles?langId=" + langId + "&journalId=" + journalId + "&size="+ size + "&offset=" + offset;
    
    try {
        const response = await fetch(url)
        const importElements = await response.json()
        const categoryButtons = document.getElementsByClassName('card-category-button') 

        for (let index = 0; index < importElements.length; index++) {
            const element = importElements[index];
            createCard(block, element)
        }
    } 
    catch (error) {
        console.log(error)
    }
}
async function getMoreArticles(journalId , size=3, offset) {
    const url = `${BASE_URL}/articles?langId=1&journalId=${journalId}&size=${size}&offset=1`
    try {
        const response = await fetch(url)
        const importElements = await response.json()
        return importElements;
    }
    catch (error) {
        console.log(error)
    }
}

window.addEventListener('load', async function () {
    const biologiyaBlock = document.getElementById('biologiya-block')
    const geografiyaBlock = document.getElementById('geografiya-block')
    const kimyoBlock = document.getElementById('kimyo-block')
    
    toggleBurger()
    getArticles(biologiyaBlock, 1, 1, 1)
    getArticles(geografiyaBlock, 1, 2, 1)
    getArticles(kimyoBlock, 1, 3, 1)

    const biologiya = await getMoreArticles( 1, 3, 1)
    const geografiya = await getMoreArticles( 2, 3, 1)
    const kimyo = await getMoreArticles( 3, 3, 1)

    createMoreArticles(biologiyaBlock, biologiya)
    createMoreArticles(geografiyaBlock, geografiya)
    createMoreArticles(kimyoBlock, kimyo)
})