document.addEventListener('DOMContentLoaded', () => {

    //check to display login page
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // user is signed in
            
        } else {
            // no user is signed in
        }
    })

    //autofill 
    document.querySelector('#email').value = 'jojo@gmail.com'
    document.querySelector('#password').value = 'password'

    //login btn function
    document.querySelector('#loginBtn').addEventListener('click', () => {
        let email = document.querySelector('#email').value
        let pass = document.querySelector('#password').value
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                //signed in
                let user = userCredential.user;

                //ui updates
                let loginPage = document.querySelector('#login-page')
                loginPage.classList.add('disappearSlow')
                loginPage.classList.remove('appearSlow')
                document.querySelector('#email').value = ''
                document.querySelector('#password').value = ''
                setTimeout(() => {
                    loginPage.style.zIndex = -10
                }, 1500)
            })
            .catch(function (error) {
                // handle errors
                var errorCode = error.code
                var errorMessage = error.message
        
                window.alert('Error : ' + errorMessage)
            })
    })

    //logout function
    document.querySelector('#logoutBtn').addEventListener('click', () => {
        firebase.auth().signOut()
        let loginPage = document.querySelector('#login-page')
        loginPage.classList.remove('disappearSlow')
        loginPage.classList.add('appearSlow')
        loginPage.style.zIndex = 500
    })

    //inputs on goal setting page
    let sleepInput = document.querySelector('#sleepGoal')
    let meditInput = document.querySelector('#meditGoal')
    let eInput = document.querySelector('#eGoal')
    let numTimes = document.querySelector('#num-times')
    let numWeeks = document.querySelector('#num-weeks')
    let inputArr = [sleepInput, meditInput, eInput, numTimes, numWeeks]
    let numDays = document.querySelector('#num-days')

    //start goal btn
    let goalBtn = document.querySelector('#goalBtn')
    goalBtn.addEventListener('click', () => {

        //check to see if values greater than 0
        let greaterThanZero = true
        for (let i = 0; i < inputArr.length; i++) {
            let input = inputArr[i]
            if (input.value < 0) {
                greaterThanZero = false
            }
            if (input.value == '') {
                input.value = input.placeholder
            }
        }

        //check to see if all values valid
        if (greaterThanZero && parseFloat(sleepInput.value) <= 24 && parseInt(numWeeks.value) * 7 >= parseInt(numTimes.value)) {

            //ui updates
            for (let i = 0; i < inputArr.length; i++) {
                let input = inputArr[i]
                input.disabled = 'disabled'
            }
            numDays.textContent = sleep.goalPeriod
            goalBtn.classList.remove('usableBtn')
            goalBtn.classList.add('unusableBtn')
            restartBtn.classList.add('usableBtn')
            restartBtn.classList.remove('unusableBtn')

            //sleep object updates
            sleep.goalIP = true
            sleep.goalHoursPD = parseFloat(sleepInput.value)
            sleep.goalDaysLeft = parseInt(numTimes.value)
            sleep.goalPeriod = parseInt(numWeeks.value) * 7

            //update sleep goal chart and related stuff to match current values
            updateGoal()
        } else {
            alert('Please enter valid values.')
        }
    })

    //restart goal btn
    let restartBtn = document.querySelector('#restartBtn')
    restartBtn.addEventListener('click', () => {
        //ui updates
        goalBtn.classList.add('usableBtn')
        goalBtn.classList.remove('unusableBtn')
        restartBtn.classList.remove('usableBtn')
        restartBtn.classList.add('unusableBtn')
        for (let i = 0; i < inputArr.length; i++) {
            inputArr[i].value = ''
            inputArr[i].disabled = ''
        }
        numDays.textContent = '0'
        document.querySelector('#sleep-goal-percent').textContent = '0.0'

        //reinitialize sleep goal chart
        sleepGoalChart.chart.data.datasets.forEach((dataset => {
            dataset.data = [7, 0]
        }))
        sleepGoalChart.update()

        //sleep object updates
        sleep.goalIP = false
        sleep.goalDaysCompleted = 0
        sleep.goalDaysLeft = 0
        sleep.goalHoursPD = 0.0
        sleep. goalPeriod = 0
    })

    //update goal stuff 
    function updateGoal() {
        numDays.textContent = sleep.goalPeriod  //time left to complete goal

        let percent = sleep.goalDaysCompleted / (sleep.goalDaysCompleted + sleep.goalDaysLeft) * 100    //percent completed
        document.querySelector('#sleep-goal-percent').textContent = percent.toFixed(1).toString()

        //update sleep goal chart
        sleepGoalChart.chart.data.datasets.forEach((dataset => {
            dataset.data = [sleep.goalDaysLeft, sleep.goalDaysCompleted]
        }))
        sleepGoalChart.update()
    }

    //switching between sleep chart and e chart
    let side = 1
    let slider = document.querySelector('#slider')
    let sec1 = document.querySelector('#section1')
    let sec2 = document.querySelector('#section2')
    let sec3 = document.querySelector('#section3')
    let breathe = document.querySelector('#title0')
    let slideBtn = document.querySelector('#slideBtn')
    let beginBtn = document.querySelector('#beginBtn')
    let circles = document.querySelector('#circles')

    //slide btn clicked-- all ui updates
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
                circles.style.display = 'block'
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
                circles.style.display = 'none'
            }, 1500)
            setTimeout(() => {
                sec1.classList.remove('disappear')
                sec1.classList.add('appear')
                breathe.classList.remove('appearSlow')
                breathe.classList.add('disappear')
            }, 300)
            side = 1
        }
    })

    //switching between goal setting page and logging chart page
    let slideBtn2 = document.querySelector('#slideBtn2')
    let logoutPage = document.querySelector('#logout-page')
    let vertical = 1

    //slideBtn2 clicked-- all ui updates
    slideBtn2.addEventListener('click', (e) => {
        if (vertical === 1) {
            logoutPage.classList.remove('slideUp')
            logoutPage.classList.add('slideDown')
            slideBtn2.classList.remove('slideUpBtn')
            slideBtn2.classList.add('slideDownBtn')
            vertical = 2
        } else {
            logoutPage.classList.add('slideUp')
            logoutPage.classList.remove('slideDown')
            slideBtn2.classList.add('slideUpBtn')
            slideBtn2.classList.remove('slideDownBtn')
            vertical = 1
        }
    })

    //initialize weekly sleep logging chart
    var ctx = document.querySelector('#sleepChart').getContext('2d')
    var sleepChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '# of hours',
                data: [],
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
        weeklys: [],    // all weekly avgs
        currentWeekly: 0.0, //current weekly avg
        currentDays: 0, //current number of days logged this week
        currentSum: 0.0,    //current sum of all hours logged this week
        sign: '+',  //increase or decrease
        percentage: 0.0,    //percentage change in avg daily sleep from last week
        goalIP: false,  //goal in progress
        goalHoursPD: 0.0,   //goal: hours per day 
        goalDaysCompleted: 0,   //num days completed
        goalDaysLeft: 0,    //num days left to complete
        goalPeriod: 0,  //num days left until time runs out 
        allDays: [],    //all sleep hours logged
    }

    //meditation data object (mins)
    let meditation = {
        weeklys: [3],
        currentWeekly: 4.5,
        currentDays: 6,
        currentSum: 27,
        currentMonthly: 0.0,
        monthlys: [],
    }

    //update sleep object
    function updateStats(data, state) {
        if (state === -1) {
            //data was removed
            sleep.allDays.pop()
            sleep.currentSum -= data
            sleep.currentDays--
        } else {
            //data was added
            sleep.allDays.push(data)
            sleep.currentSum += parseFloat(data)
            sleep.currentDays++
        }
        sleep.currentWeekly = sleep.currentSum / sleep.currentDays

        //calc percentage change
        let deci = sleep.currentWeekly / sleep.weeklys[sleep.weeklys.length - 1]
        if (sleep.currentSum === 0) {
            sleep.currentWeekly = 0.0
            deci = 1
        } else if (!(deci >= 0)) {
            deci = 1
        }
        if (deci < 1){
            sleep.sign = '-'
            sleep.percentage = (1 - deci) * 100
        } else{
            sleep.sign = '+'
            sleep.percentage = (deci - 1) * 100
        }

        //ui update 
        document.querySelector('#sign').textContent = sleep.sign
        document.querySelector('#percentage').textContent = sleep.percentage.toFixed(2)
        document.querySelector('#weeklyAvg').textContent = sleep.currentWeekly.toFixed(1)
    }

    let dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    //add data function - updates chart
    function addData(chart) {
        let data = document.querySelector('#data').value
        if(chart.data.labels.length <7 && data <=24 && data >= 0 && data != '') {
            //values are valid & there's space
            chart.data.labels.push(dayNames[chart.data.labels.length])
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data)
            })
            chart.update()
            updateStats(data, 1)
        } else if (chart.data.labels.length == 7){
            //no more space
            alert('Week has been filled. Press "Save Data" to start a new week.')
        } else {
            //values not valid
            alert('Please provide a valid value.')
        }
    }

    document.querySelector('#data').value = 7
    //add data button
    document.querySelector('#addDataBtn').addEventListener('click', () => {
        addData(sleepChart)
        let data = document.querySelector('#data').value
        //sleep goal stuff
        if (sleep.goalIP && data >= sleep.goalHoursPD && sleep.goalDaysLeft !== 0 && sleep.goalPeriod > 0) {
            sleep.goalDaysLeft--
            sleep.goalDaysCompleted++
            sleep.goalPeriod--
            updateGoal()
        } else if (sleep.goalIP && sleep.goalPeriod > 0) {
            sleep.goalPeriod--
            updateGoal()
        } 
    })

    //remove data function
    function removeData(chart) {
        if (chart.data.labels.length > 0) {
            //chart isn't empty

            //update log chart
            chart.data.labels.pop()
            let deleted
            chart.data.datasets.forEach((dataset) => {
                deleted = dataset.data.pop()
            })
            chart.update()

            //update sleep object
            updateStats(deleted, -1)

            //update sleep goal stuff
            if (sleep.goalIP && deleted >= sleep.goalHoursPD && sleep.goalPeriod > 0 && sleep.goalDaysLeft !== 0) {
                sleep.goalDaysLeft++
                sleep.goalDaysCompleted--
                sleep.goalPeriod++
                updateGoal()
            } else if (sleep.goalIP && sleep.goalPeriod > 0) {
                sleep.goalPeriod++
                updateGoal()
            } 
        }
    }
    //remove data button
    document.querySelector('#removeDataBtn').addEventListener('click', () => {
        removeData(sleepChart)
    })

    //save data function
    function saveData(chart) {
        if (sleep.currentDays == 7) {
            //chart filled

            //update chart
            chart.data.labels = []
            chart.data.datasets.forEach((dataset => {
                dataset.data = []
            }))
            chart.update()

            //update sleep object
            sleep.weeklys.push(sleep.currentWeekly)
            sleep.currentDays = 0
            sleep.currentSum = 0.0
            sleep.currentWeekly = 0.0
            sleep.percentage = 0.0
            sleep.sign = '+'

            //update ui
            document.querySelector('#weeklyAvg').textContent = sleep.currentWeekly.toFixed(1)
            document.querySelector('#sign').textContent = sleep.sign
            document.querySelector('#percentage').textContent = sleep.percentage.toFixed(2)
        } else {
            //chart not filed
            alert('Please fill in with all week values to save data.')
        }
    }
    //save data button
    document.querySelector('#saveBtn').addEventListener('click', () => {
        saveData(sleepChart)
    })

    /*
    document.querySelector('#sleepGoal').value = sleep.goal
    document.querySelector('#meditGoal').value = exercise.goal
    */

    //sleep goal chart
    var ctx2 = document.querySelector('#sleepGoalChart').getContext('2d')
    var sleepGoalChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Days Left', 'Days Completed'],
            datasets: [{
                data: [4, 0],
                backgroundColor: [
                    'rgb(255, 166, 83, 0.3)',
                    'rgb(255, 166, 83)'
                ],
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: 'black'
                }
            }
        }
    })

    //e goal chart
    var ctx3 = document.querySelector('#eGoalChart').getContext('2d')
    var eGoalChart = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: ['Days Left', 'Days Completed'],
            datasets: [{
                data: [4, 0],
                backgroundColor: [
                    'rgb(112, 139, 255, 0.3)',
                    'rgb(112, 139, 255)'
                ],
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
        }
    })
    
    //begin btn clicked 
    beginBtn.addEventListener('click', (e) => {
        setTimeout(() => {
            //circle animations on
            for (let i = 1; i <= 6; i++) {
                document.querySelector(`#circle${i}`).style.animation = `circle-anim${i} 12s ease-in-out 0s infinite`
            }
        }, 500)
    })

})