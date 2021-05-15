function editCards(card, importElements) {
    card.firstElementChild.firstElementChild.src = importElements.image
    card.lastElementChild.firstElementChild.innerText = importElements.title
    card.lastElementChild.children[1].innerHTML = importElements.body
}

window.onload = function () {
    const biologCard0 = document.getElementById('biologCard0')
    const geografiyaCard0 = document.getElementById('geografiyaCard0')
    const kimyoCard0 = document.getElementById('kimyoCard0')


    fetch('http://192.144.37.95:8080/api/articles?langId=1')
        .then(response => {
           return response.json()
        })
        .then(function returnFetch(importElements) {
            const elements = importElements
            // return elements;
            editCards(biologCard0, elements[0])
            editCards(geografiyaCard0, elements[1])
            editCards(kimyoCard0, elements[3])
            console.log(elements);
        });
}