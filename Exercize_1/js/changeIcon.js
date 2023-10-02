// Задание 1: Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). 
// При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.


const btn = document.querySelector('.btn')
const icon = document.querySelectorAll('.btn__icon')

btn.addEventListener('click', () => {
    icon[0].classList.toggle('btn__icon_fill_off')
    icon[1].classList.toggle('btn__icon_fill_off')
})