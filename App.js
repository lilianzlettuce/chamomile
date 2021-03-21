document.addEventListener('DOMContentLoaded', () => {

    let side = 1
    let slider = document.querySelector('#slider')
    let sec1 = document.querySelector('#section1')
    let sec2 = document.querySelector('#section2')
    let sec3 = document.querySelector('#section3')
    let breathe = document.querySelector('#title0')
    let slideBtn = document.querySelector('#slideBtn')
    let beginBtn = document.querySelector('#beginBtn')
    let circles = document.querySelector('#circles')

    //begin btn clicked 
    beginBtn.addEventListener('click', (e) => {
        let c1 = document.querySelector('#circle1')
        let c2 = document.querySelector('#circle2')
        let c3 = document.querySelector('#circle3')
        let c4 = document.querySelector('#circle4')
        let c5 = document.querySelector('#circle5')
        let c6 = document.querySelector('#circle6')
        setTimeout(() => {
            c1.style.animation = 'circle-anim 12s ease-in-out 0s'
            c2.style.animation = 'circle-anim2 12s ease-in-out 0s'
            c3.style.animation = 'circle-anim3 12s ease-in-out 0s'
            c4.style.animation = 'circle-anim4 12s ease-in-out 0s'
            c5.style.animation = 'circle-anim5 12s ease-in-out 0s'
            c6.style.animation = 'circle-anim6 12s ease-in-out 0s'
        }, 1000)
    })

    //slide btn clicked
    slideBtn.addEventListener('click', (e) => {
        if (side === 1) {
            slider.classList.remove('slideL')
            slider.classList.add('slideR')
            sec3.style.zIndex = '20'
            setTimeout(() => {
                slideBtn.classList.remove('slideBtn')
                slideBtn.classList.add('blueBtn')
                sec1.classList.remove('appear')
                sec1.classList.add('disappear')
                breathe.classList.remove('disappearSlow')
                breathe.classList.add('appearSlow')
                sec3.classList.remove('disappear')
                sec3.classList.add('appearSlow')
                circles.classList.remove('disappearSlow')
                circles.classList.add('appearSlow')
            }, 800)
            side = 2
        } else {
            slider.classList.remove('slideR')
            slider.classList.add('slideL')
            sec3.style.zIndex = '0'
            slideBtn.classList.remove('blueBtn')
            slideBtn.classList.add('slideBtn')
            sec3.classList.remove('appearSlow')
            sec3.classList.add('disappear')
            circles.classList.remove('appearSlow')
            circles.classList.add('disappearSlow')
            setTimeout(() => {

            }, 800)
            setTimeout(() => {
                sec1.classList.remove('disappear')
                sec1.classList.add('appear')
                breathe.classList.remove('appearSlow')
                breathe.classList.add('disappear')
            }, 300)
            side = 1
        }
    })

    //initializing chart
    var ctx = document.querySelector('#myChart').getContext('2d')
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['S', 'M', 'T', 'W', 'T', 'F'],
            datasets: [{
                label: '# of hours',
                data: [8, 9, 4, 8, 5, 3],
                backgroundColor: [
                    'rgba(95, 138, 255, 0.3)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(95, 138, 255, 0.3)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(95, 138, 255, 0.3)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(95, 138, 255, 0.3)',
                ],
                borderColor: [
                    'rgba(95, 138, 255, 1)', 
                    'rgba(255, 159, 64, 1)',
                    'rgba(95, 138, 255, 1)', 
                    'rgba(255, 159, 64, 1)',
                    'rgba(95, 138, 255, 1)', 
                    'rgba(255, 159, 64, 1)',
                    'rgba(95, 138, 255, 1)', 
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

    //sleep data object
    let sleep = {
        weeklys: [5.8],
        currentWeekly: 6.2,
        currentDays: 6,
        currentSum: 37.0,
        sign: '+', 
        percentage: 6.9,
    }

    //update stats function
    function updateStats() {
        sleep.currentWeekly = sleep.currentSum / sleep.currentDays
        document.querySelector('#weeklyAvg').textContent = sleep.currentWeekly.toFixed(1)
        let deci = sleep.currentWeekly / sleep.weeklys[sleep.weeklys.length - 1]
        if (deci >= 1){
            sleep.sign = '+'
            sleep.percentage = deci - 1
        } else{
            sleep.sign = '-'
            sleep.percentage = 1 - deci
        }
        document.querySelector('#sign').textContent = sleep.sign
        document.querySelector('#percentage').textContent = sleep.percentage.toFixed(2)
    }

    //add data function - updates chart & sleep object
    function addData(chart) {
        let data = document.querySelector('#data').value
        if(chart.data.labels.length < 7 && data <=24 && data != '') {
            chart.data.labels.push(document.querySelector('#label').value)
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data)
            })
            chart.update()
            sleep.currentSum += parseFloat(data)
            sleep.currentDays++
            updateStats()
        }
    }
    //add data button
    document.querySelector('#addDataBtn').addEventListener('click', () => {
        addData(myChart)
    })

    //remove data function
    function removeData(chart) {
        chart.data.labels.pop()
        let deleted
        chart.data.datasets.forEach((dataset) => {
            deleted = dataset.data.pop()
        })
        chart.update()
        sleep.currentSum -= deleted
        sleep.currentDays--
        updateStats()
    }
    //remove data button
    document.querySelector('#removeDataBtn').addEventListener('click', () => {
        removeData(myChart)
    })

    //save data function
    function saveData(chart) {
        if (sleep.currentDays == 7) {
            chart.data.labels = []
            chart.data.datasets.forEach((dataset => {
                dataset.data = []
            }))
            chart.update()
            sleep.weeklys.push(sleep.currentWeekly)
            sleep.currentDays = 0
            sleep.currentSum = 0
            sleep.currentWeekly = 0
            sleep.percentage = 0.0
            sleep.sign = '+'
            document.querySelector('#weeklyAvg').textContent = sleep.currentWeekly.toFixed(1)
            document.querySelector('#sign').textContent = sleep.sign
            document.querySelector('#percentage').textContent = sleep.percentage.toFixed(2)
        }
    }
    //save data button
    document.querySelector('#saveBtn').addEventListener('click', () => {
        saveData(myChart)
    })

})