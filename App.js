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
            }, 800)
            side = 2;
        } else {
            slider.classList.remove('slideR')
            slider.classList.add('slideL')
            sec3.style.zIndex = '0'
            setTimeout(() => {
                sec3.classList.remove('appear')
                sec3.classList.add('disappear')
            }, 800)
            setTimeout(() => {
                sec1.classList.remove('disappear')
                sec1.classList.add('appear')
            }, 300)
            side = 1;
        }
    })

    let ctx = document.querySelector('#myChart').getContext('2d')
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
                label: '# of hours',
                data: [5, 8, 8, 3, 6, 7, 4],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })

})