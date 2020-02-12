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
        }
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
        expenseList: '.expense__list'
    }

    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        addListItem: function(obj, type) {

            var item, newItem;

            if(type == 'income') {
                item = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type == 'expense') {
                item = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Fill placeholder values
            newItem = item.replace('%id%', obj.id);
            newItem = newItem.replace('%description%', obj.description);
            newItem = newItem.replace('%value%', obj.value);
            
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



    var addBudgetItem = function() {
        
        var input, newItem;

        input = uiController.getInput();
        newItem = budgetController.addItem(input.type, input.description, input.value);

    }

    return {
        init: function() {
            console.log('Application Started');
            setupEventListeners();
        }
    }

})(budgetController, uiController);

appController.init();