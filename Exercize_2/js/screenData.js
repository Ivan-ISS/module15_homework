// Задание 3: Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 


const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    let screenHeight = document.documentElement.clientHeight
    let screenWidth = document.documentElement.clientWidth
    let scrollHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight,
        document.body.clientHeight, 
        document.documentElement.clientHeight);
    let scrollWidth = Math.max(
        document.body.scrollWidth, 
        document.documentElement.scrollWidth,
        document.body.offsetWidth, 
        document.documentElement.offsetWidth,
        document.body.clientWidth, 
        document.documentElement.clientWidth);
    let currentScrollTop = window.pageYOffset;
    let currentScrollLeft = window.pageXOffset;
    alert(
              `
                  Ширина экрана: ${screenWidth},
                  Высота экрана: ${screenHeight},
                  Ширина документа: ${scrollWidth},
                  Высота документа: ${scrollHeight},
                  Текущая прокрутка сверху: ${currentScrollTop},
                  Текущая прокрутка слева: ${currentScrollLeft}
              `
          )
})