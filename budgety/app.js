// BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, desc, val) {
        this.id = id, 
        this.desc = desc, 
        this.val = val,
        this.percent = -1
    };

    Expense.prototype.calcPer = function(totalInc){
        if (totalInc > 0) {
            this.percent = Math.round((this.val / totalInc) * 100); 
        } else {
            this.percent = -1; 
        }
    };

    Expense.prototype.getPer = function() {
        return this.percent;
    };

    var Income = function(id, desc, val) {
        this.id = id, 
        this.desc = desc, 
        this.val = val
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        precentage: -1
    };

    var calTotal = function(type) {
        var sum = 0; 
        data.allItems[type].forEach(function(item){
            sum += item.val;
        });
        data.totals[type] = sum; 
    }

    return {
        addItem: function(type, des, valu){
            var newItem, id;

            //generate new id based off current length of type 
            if(data.allItems[type].length > 0){
                id = data.allItems[type][data.allItems[type].length - 1].id + 1; 
            } else {
                id = 0;
            }
            //new expense
            if(type === 'exp') {
                newItem = new Expense (id, des, valu);
            } 
            //new income
            else if (type === 'inc') {
                newItem = new Income (id, des, valu);}
            //add new item to list
            data.allItems[type].push(newItem); 

            return newItem; 
        },

        deleteItem: function(type, id) {
            var ids, index;
            //create an array
            ids = data.allItems[type].map(function(current){
                return current.id; 
            });
            //get the index of the element to be removed from array above
            index = ids.indexOf(id); 

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function() {
            //calculate total inc and exp
            calTotal('exp');
            calTotal('inc');

            //calculate budget: inc - exp
            data.budget = data.totals.inc - data.totals.exp; 

            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
            } else {
                data.percentage = -1; 
            }

        },

        calculatePercentages: function() {

            data.allItems.exp.forEach(function(ele){
                ele.calcPer(data.totals.inc); 
            });

        },

        getPercentages: function() {
            //map returns data and stores in variable, forEach does not
            var allPercentages = data.allItems.exp.map(function(ele){
                return ele.getPer(); 
            });

            return allPercentages; 
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc, 
                totalExp: data.totals.exp,
                percentage: data.percentage 
            
            }
        },

        testing: function() {
            console.log(data);
        }
    }

})();

// UI CONTROLLER
var uicontroller = (function(){


    var DOMstrings = {
        inputType: '.add__type',
        desc: '.add__description',
        value: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list', 
        budgetLabel: '.budget__value',
        incLabel: '.budget__income--value',
        expLabel: '.budget__expenses--value',
        percentLabel: '.budget__expenses--percentage',
        container: '.container',
        expPercentLabel: 'item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber = function(num, type) {
        var num, numSplit, sign;

        //plus or minus before number if inc/ep

        //all values displayed with 2 decimcal places

        //add commas between 1000s

        //remove + / - symbols from incoming num
        num = Math.abs(num); 
        //set number to 2 decimal places
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];
        if(int.length > 3) {
            int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3,int.length); 
        } 
        dec = numSplit[1];
        return (type === 'exp' ? sign = "-" : sign = "+")+ ' ' + int + '.' + dec; 
    };

    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.desc).value,
                value: parseFloat(document.querySelector(DOMstrings.value).value)
            };
        },

        addListItem: function(obj, type){
            var html, newHtml, element;

            if(type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.desc);
            newHtml = newHtml.replace('%value%', formatNumber(obj.val, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        display_month: function() {
            var now, year, month_num, month_txt, months;
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Oct','Nov','Dec'];
            now = new Date(); 
            year = now.getFullYear(); 
            month_num = now.getMonth();
            month_txt = months[month_num];

            document.querySelector(DOMstrings.dateLabel).textContent=month_txt + ' , ' + year;
        
        },

        deleteListItem: function(selectorid) {
            var el = document.getElementById(selectorid);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArray; 
            fields = document.querySelectorAll(DOMstrings.desc + ', ' + DOMstrings.value);
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(field){
                field.value = ""; 
            });

            fieldsArray[0].focus();
        },

        displayBudget: function(obj) {
            var type; 
            obj.budget > 0 ? type="inc" : type="exp";

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incLabel).textContent = formatNumber(obj.totalInc, 'inc'); 
            document.querySelector(DOMstrings.expLabel).textContent = formatNumber(obj.totalExp, 'exp')
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentLabel).textContent = '---';
            }
        },

        displayPercents: function(percents) {

            var fields = document.querySelectorAll(DOMstrings.expPercentLabel);

            // var nodeListForEach = function(list, callback) {
            //     for(var i = 0; i < list.length; i++) {
            //         callback(list[i], i);
            //     }
            // };

            nodeListForEach(fields, function(current, index){
                if(percents[index] > 0 ) {
                    current.textContent = percents[index];
                } else {
                    current.textContent = "---";
                }
            });
        },

        changeType: function() {
            var fields = document.querySelectorAll(DOMstrings.inputType + ',' + DOMstrings.desc + ',' + DOMstrings.value );
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus'); 
            }); 

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, uictrl){

    var setupEventListeners = function() {

        var dom = uictrl.getDOMstrings();

        document.querySelector(dom.inputBtn).addEventListener('click', function(){
            ctrlAddItem();
            updateBudget();
        });
        //KEYPRESS
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
                updateBudget();
            }
        });

        document.querySelector(dom.inputType).addEventListener('change', uictrl.changeType);

        document.querySelector(dom.container).addEventListener('click', ctrlDeleteItem);
    };
    
    var updateBudget = function() {
        var input, newItem; 

        //calculate budget
        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget(); 
        //display budget
        uictrl.displayBudget(budget);

    };

    var updatePercentages = function() {
        console.log('begin');
        //calculate percentages
    
        budgetCtrl.calculatePercentages();
        //read percetages from budget controller
        var percents = budgetCtrl.getPercentages();
        //update UI 
        uictrl.displayPercents(percents);
    };

    var ctrlAddItem = function() {
        var input, newItem; 
        //get input data
        input = uicontroller.getInput();

        if (input.description != "" && input.value != NaN && input.value > 0) {
            //console.log(input);
            //add data to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //update user interface
            uictrl.addListItem(newItem, input.type);
            uictrl.clearFields(); 

            //calculate and display budget
            updateBudget(); 

            //calculate and display percentages
            updatePercentages();


        } else {
            console.log('ha-ha');
        }
    };


    var ctrlDeleteItem = function(event) {
        var itemId, splitID, type, id; 

       itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

       if (itemId) {
           //split id into type, either inc or exp and the ID number assigned
           splitID = itemId.split('-');
           type = splitID[0];
           //splitId[1] returns a string use parseInt to convert to integer
           id = parseInt(splitID[1]);
           //delete item from data struct
           budgetCtrl.deleteItem(type, id);
           //delete item from UI
           uicontroller.deleteListItem(itemId);
           //recalculate and display new budget
           updateBudget();
           //calculate and display percentages
           updatePercentages();
       }
        
    };

    return {
        init: function() {
            console.log('started');
            uictrl.displayBudget({
                budget: 0, 
                totalInc: 0, 
                totalExp: 0,
                percentage: -1
            });
            uictrl.display_month();
            setupEventListeners();
        }
    }


})(budgetController, uicontroller);

controller.init();