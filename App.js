document.addEventListener('DOMContentLoaded', () => {

    let side = 1;
    let slider = document.querySelector('#slider')
    let sec1 = document.querySelector('#section1')
    let sec2 = document.querySelector('#section2')
    let sec3 = document.querySelector('#section3')
    //slide btn clicked
    document.querySelector('#slideBtn').addEventListener('click', (e) => {
        if (side === 1) {
            slider.classList.remove('slideL')
            slider.classList.add('slideR')
            sec3.style.zIndex = '0'
            sec3.classList.remove('disappear')
            sec3.classList.add('appear')
            setTimeout(() => {
                sec1.classList.remove('appear')
                sec1.classList.add('disappear')
            }, 900)
            side = 2;
        } else {
            slider.classList.remove('slideR')
            slider.classList.add('slideL')
            sec3.style.zIndex = '0'
            sec1.classList.remove('disappear')
            sec1.classList.add('appear')
            setTimeout(() => {
                sec3.classList.remove('appear')
                sec3.classList.add('disappear')
            }, 1000)
            side = 1;
        }
    })



})