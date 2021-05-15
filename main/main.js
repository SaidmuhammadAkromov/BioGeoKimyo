function editCards(card, importElements) {
    card.firstElementChild.firstElementChild.src = importElements.image
    card.lastElementChild.firstElementChild.innerText = importElements.title
    card.lastElementChild.children[1].innerHTML = importElements.body
}










window.onload = function () {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://192.144.37.95:8080/api/articles?langId=1', false);

    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        function returnXhr() {
            const xhrResponseText = JSON.parse(xhr.responseText)
            return xhrResponseText
        }
    }

    const xhrResponseText = returnXhr()
    const biologCard0 = document.getElementById('biologCard0')
    const geografiyaCard0 = document.getElementById('geografiyaCard0')
    const kimyoCard0 = document.getElementById('kimyoCard0')

    editCards(biologCard0, xhrResponseText[0])
    editCards(geografiyaCard0, xhrResponseText[1])
    editCards(kimyoCard0, xhrResponseText[3])

    console.log(xhrResponseText);
}