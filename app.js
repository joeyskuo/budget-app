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
    
    return {
        getInput: function() {

            return {
                type: document.querySelector('.form__type').value,
                description: document.querySelector('.form__description').value,
                value: document.querySelector('.form__value').value
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