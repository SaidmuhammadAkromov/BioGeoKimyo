import { BASE_URL } from '../modules/contstants.js';
import { toggleBurger, createCards , createCard, appentTo} from '../modules/create_card.js';

const pageUrl = new URL(window.location.href)
const tagID  = pageUrl.searchParams.get('tagId')
const tagName  = pageUrl.searchParams.get('tagName')

async function getHashtag() {
    const url = `${BASE_URL}/articles?langId=1&tagId=${tagID}`
    const response = await fetch(url)
    const importElement = await response.json()

    return importElement
}

window.onload = async function () {
    const cardsContainer = document.getElementById('cardsContainer')
    let qweqwe = await getHashtag()
    document.querySelector('.tagName').innerText = `#${tagName}`
    for (let index = 0; index < qweqwe.length; index++) {
        const element = qweqwe[index];
        const card = createCard(element)
        appentTo(cardsContainer, card)
    }

    toggleBurger()
}