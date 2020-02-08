// budget module

var budgetController = (function() {

    var x = 23;

    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            console.log(add(b));
        }
    }

})();

// ui module

var uiController = (function() {
    
    var DOMstrings = {
        inputType: '.form__type',
        inputDescription: '.form__description',
        inputValue: '.form__value'
    }

    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        }
    }

})();

// main module

var appController = (function(budget, ui) {


    var addBudgetItem = function() {
        
        var input = uiController.getInput();

        console.log(input);
    }

    // event listeners
    
    document.querySelector('.form__submit').addEventListener('click', addBudgetItem);

    document.addEventListener('keypress', function(event) {

        if(event.keyCode === 13) {
            addBudgetItem();
        }

    })

})(budgetController, uiController);