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




window.onload = function () {
    toggleBurger()
}