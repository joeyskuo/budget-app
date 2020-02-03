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
    
    //

})();

// main module

var appController = (function(budget, ui) {



})(budget, ui);