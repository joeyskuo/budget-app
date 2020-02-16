// budget module

var budgetController = (function() {

    var Expense = function(id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    }

    var Income = function(id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    }

    var data = {
        items: {
            expense: [],
            income: []
        },
        total: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: 0
    }

    var calculateTotal = function(type) {
        var sum = 0;
        data.items[type].forEach(function(curr) {
            sum += curr.value;
        });
        data.total[type] = sum;
    }

    return {
        addItem: function(type, des, val) {

            var newItem;

            var idSeed = data.items[type][data.items[type].length-1];
            var id = (idSeed === undefined) ? 1 : idSeed.id + 1;

            if(type === 'expense') {
                newItem = new Expense(id, des, val);
            } else if (type === 'income') {
                newItem = new Income(id, des, val);
            }

            data.items[type].push(newItem);

            console.log(data);

            return newItem;
        },

        calculateBudget: function() {
            calculateTotal('expense');
            calculateTotal('income');

            data.budget = data.total.income - data.total.expense;

            if(data.total.income > 0) {
                data.percentage = Math.round((data.total.expense / data.total.income) * 100);
            } else {
                data.percentage = 0;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.total.income,
                totalExpense: data.total.expense,
                percentage: data.percentage
            }
        }
    }

})();

// ui module

var uiController = (function() {
    
    var DOMstrings = {
        inputType: '.form__type',
        inputDescription: '.form__description',
        inputValue: '.form__value',
        inputSubmit: '.form__submit',
        incomeList: '.income__list',
        expenseList: '.expense__list',
        budgetValue: '.budget__value',
        incomeValue: '.budget__income--value',
        expenseValue: '.budget__expenses--value',
        percentageValue: '.budget__expenses--percentage'
    }

    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem: function(obj, type) {

            var item, newItem, itemContainer;

            if(type == 'income') {
                itemContainer = DOMstrings.incomeList;
                item = '<div class="item clearfix" id="income-%id%"><div class="item__description left">%description%</div><div class="right clearfix"><div class="item__value left">%value%</div><div class="item__delete left"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type == 'expense') {
                itemContainer = DOMstrings.expenseList;
                item = '<div class="item clearfix" id="expense-%id%"><div class="item__description left">%description%</div><div class="right clearfix"><div class="item__value left">%value%</div><div class="item__percentage left">%percentage%</div><div class="item__delete left"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Fill placeholder values
            newItem = item.replace('%id%', obj.id);
            newItem = newItem.replace('%description%', obj.description);
            newItem = newItem.replace('%value%', obj.value);
            
            // Insert HTMl
            document.querySelector(itemContainer).insertAdjacentHTML('beforeend', newItem);

        },

        clearFields() {
            var fields;

            fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);

            var fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach((field, index, arr) => {
                field.value = '';
            });

            fieldsArray[0].focus();
        },

        displayBudget: function(budget) {
            document.querySelector(DOMstrings.budgetValue).textContent = budget.budget;
            document.querySelector(DOMstrings.incomeValue).textContent = budget.totalIncome;
            document.querySelector(DOMstrings.expenseValue).textContent = budget.totalExpense;
            document.querySelector(DOMstrings.percentageValue).textContent = budget.percentage;
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();

// main module

var appController = (function(budget, ui) {

    var setupEventListeners = function() {
        var DOM = uiController.getDOMstrings();
    
        document.querySelector(DOM.inputSubmit).addEventListener('click', addBudgetItem);

        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13) {
                addBudgetItem();
            }
        })
    }

    var updateBudget = function() {
        budgetController.calculateBudget();
        var budget = budgetController.getBudget();
        uiController.displayBudget(budget);
    }

    var addBudgetItem = function() {
        
        var input, newItem;

        input = uiController.getInput();
        newItem = budgetController.addItem(input.type, input.description, input.value);
        uiController.addListItem(newItem, input.type);
        uiController.clearFields();
        updateBudget();

    }

    return {
        init: function() {
            console.log('Application Started');
            setupEventListeners();
        }
    }

})(budgetController, uiController);

appController.init();