let start = document.getElementById('start'),
    budget_value = document.getElementsByClassName("budget-value")[0],
    daybudget_value = document.getElementsByClassName("daybudget-value")[0],
    level_value = document.getElementsByClassName("level-value")[0],
    expenses_value = document.getElementsByClassName("expenses-value")[0],
    optionalexpenses_value = document.getElementsByClassName("optionalexpenses-value")[0],
    income_value = document.getElementsByClassName("income-value")[0],
    monthsaviungs_value = document.getElementsByClassName("monthsavings-value")[0],
    yearsavings_value = document.getElementsByClassName("yearsavings-value")[0],

    expenses_item = document.getElementsByClassName("expenses-item"),
    buttons = document.getElementsByTagName("button"),
    accept1 = buttons[0],
    accept2 = buttons[1],
    count = buttons[2],
    opts = document.querySelectorAll(".optionalexpenses-item"),
    income = document.querySelector(".choose-income"),
    checkbox = document.querySelector("#savings"),
    sumValue = document.querySelector(".choose-sum"),
    percentValue = document.querySelector(".choose-percent"),
    year = document.querySelector(".year-value"),
    month = document.querySelector(".month-value"),
    day = document.querySelector(".day-value"),

    money,
    time,
    checkStart;

var appData = {
        Budjet: money,
        TimeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false,
        checkStart: false,
    };

    function activateBtns() {
        if (appData.checkStart == false) {
            accept1.disabled = true;
            accept2.disabled = true;
            count.disabled = true;
        } else {
            accept1.disabled = false;
            accept2.disabled = false;
            count.disabled = false;
        }
    }

    activateBtns();


    start.addEventListener("click", function() {
        time = prompt("Введите дату в формате YYYY-MM-DD");
        money = +prompt("Ваш бюджет на месяц?");
        
        while(isNaN(money) || money == "" || money == null) {
            money = +prompt("Ваш бюджет на месяц?");
        }
        appData.Budjet = money;
        appData.TimeData = time;
        budget_value.textContent = money.toFixed();
        year.value = new Date(Date.parse(time)).getFullYear();
        month.value = new Date(Date.parse(time)).getMonth() + 1;
        day.value = new Date(Date.parse(time)).getDate();
        appData.checkStart = true;
        activateBtns();
    });

    
    accept1.addEventListener("click", function() {
        let sum = 0;

        for (let i = 0; i < expenses_item.length; i++) {
            let a = expenses_item[i].value,
                b = expenses_item[++i].value;
            
            if ((typeof(a))==='string' && (typeof(a)) != null && (typeof(b)) != null && !isNaN(b)
                && a != '' && b != '' && a.length < 50) {
                console.log("done");
                appData.expenses[a] = b;
                sum += +b;
            } else {
                i = i - 1;
            }
            
        } 
        expenses_value.textContent = sum;
    });

    accept2.addEventListener("click", function() {

        for (let i = 0; i < opts.length; i++) {
            let opt = opts[i].value;
            appData.optionalExpenses[i] = opt;
            optionalexpenses_value.textContent += appData.optionalExpenses[i] + ", ";
        }
    });
    
    count.addEventListener("click", function() {
        var sum = +expenses_value.textContent;
        if (appData.Budjet != undefined) {
            
            appData.moneyPerDay = ((appData.Budjet - sum) / 30).toFixed();
            daybudget_value.textContent = appData.moneyPerDay;

            if (appData.moneyPerDay < 100) {
                level_value.textContent = "Минимальный уровень достатка";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                level_value.textContent = "Средний уровень достатка";
            } else if (appData.moneyPerDay > 2000) {
                level_value.textContent = "Высокий уровень достатка";
            } else {
                level_value.textContent = "Произошла ошибка";
            }
        } else {
            daybudget_value.textContent = "Произошла ошибка";
        }
    });
    

    income.addEventListener("input", function() {
        let items = income.value;
        appData.income = items.split(", ");
        income_value.textContent = appData.income;
    });
    
    checkbox.addEventListener("click", function() {
        if (appData.savings == true) {
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    });

    sumValue.addEventListener("input", function() {
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
                
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthsaviungs_value.textContent = appData.monthIncome.toFixed(1);
            yearsavings_value.textContent = appData.yearIncome.toFixed(1);
        }
    });

    percentValue.addEventListener("input", function() {
        if (appData.savings == true) {
             let sum = +sumValue.value,
                percent = +percentValue.value;
                
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthsaviungs_value.textContent = appData.monthIncome.toFixed(1);
            yearsavings_value.textContent = appData.yearIncome.toFixed(1);
        }
    });

    