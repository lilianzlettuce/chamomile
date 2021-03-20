document.addEventListener('DOMContentLoaded', () => {

    //click event
    document.querySelector('#slideRightBtn').addEventListener('click', (e) => {
        document.querySelector('#slider').classList.add('slide')
        document.querySelector('#section3').style.zIndex = '20'
        setTimeout(() => {
            document.querySelector("#section1").classList.add('disappear')
        }, 1000)
    })



})