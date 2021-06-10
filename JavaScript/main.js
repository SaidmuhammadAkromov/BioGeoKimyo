let SELECTED_JOURNAL_ID = null;
let SELECTED_LANG_ID = null;

import { BASE_URL } from '../modules/contstants.js'
import { toggleBurger, appentTo , getArticles , createCards , createMoreArticles, createCard} from '../modules/create_card.js';

let biologiyaCard = {
    langId: 1,
    journalId: 1,
    size: 1,
    offset: 0
}
let geografiyaCard = {
    langId: 1,
    journalId: 2,
    size: 1,
    offset: 0
}
let kimyoCard = {
    langId: 1,
    journalId: 3,
    size: 1,
    offset: 0
}

let biologiyaMoreArticles = {
    langId: 1,
    journalId: 1,
    size: 3,
    offset: 1
}

let geografiyaMoreArticles = {
    langId: 1,
    journalId: 2,
    size: 3,
    offset: 1
}

let kimyoMoreArticles = {
    langId: 1,
    journalId: 3,
    size: 3,
    offset: 1
}



window.addEventListener('load', async function () {
    const biologiyaBlock = document.getElementById('biologiya-block')
    const geografiyaBlock = document.getElementById('geografiya-block')
    const kimyoBlock = document.getElementById('kimyo-block')
    
    toggleBurger()

    const importBioCard = await getArticles(biologiyaCard)
    const bioCard = createCard(importBioCard[0])
    appentTo(biologiyaBlock, bioCard)

    const importGeoCard = await getArticles(geografiyaCard)
    const geoCard = createCard(importGeoCard[0])
    appentTo(geografiyaBlock, geoCard)

    const importKimyoCard = await getArticles(kimyoCard)
    const kimCard = createCard(importKimyoCard[0])
    appentTo(kimyoBlock, kimCard)


    const importBiologiyaMoreArticles = await getArticles(biologiyaMoreArticles)
    const bioMoreArticles = createMoreArticles(importBiologiyaMoreArticles)
    appentTo(biologiyaBlock, bioMoreArticles)

    const importGeografiyaaMoreArticles = await getArticles(geografiyaMoreArticles)
    const geoMoreArticles = createMoreArticles(importGeografiyaaMoreArticles)
    appentTo(geografiyaBlock, geoMoreArticles)

    const importKimyoMoreArticles = await getArticles(kimyoMoreArticles)
    const kimMoreArticles = createMoreArticles(importKimyoMoreArticles)
    appentTo(kimyoBlock, kimMoreArticles)

})