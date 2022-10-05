const calcBtns = document.querySelectorAll('button');
const display = document.querySelector('.display-container');
const clearBtn = document.querySelector('#ac');
let displayVal = '0';
display.textContent = displayVal;
let firstOperator = null;
let firstOperand = null;
let secondOperand = null;
let result = null;
let negative = false;

 

window.addEventListener('keydown', function (e) { // clicks button that corresponds with the key pressed
    const keyBtn = document.querySelector(`button[data-key='${e.key}']`);
    keyBtn.click();
});

calcBtns.forEach(btn => btn.addEventListener
    ('click', (e) => { // adds a click event-listener to calculator buttons
          
        e.target.classList.add('click');
        //e.target.value === 'ac' ? resetCalc(e): null;
        makePercentage(e);
        ifHasDecimal();
        makeNegative(e);
        createExpression(e);
        findResult(e);
        
        setTimeout(() => { // click animation
           // takeshot()
            e.target.classList.remove('click')
        }, 150);
    }));

function createExpression(e) {
                             // creates operands and operators, stores them in variables 
                             // and displays the current operand or operator on the screen
                            // e.target.value === 'ac'? resetCalc(): null;
   if (e.target.classList.contains('operator') && firstOperand === null || e.target.value === 'ac'){
    resetCalc(e);

   } else if (firstOperand === null && e.target.classList.contains('operand')) {
         if ( result !== null && firstOperand === null 
             && e.target.classList.contains('operand')){
             resetCalc(e)
         } else {
        firstOperand = e.target.value;
        firstOperand = negative === true ? firstOperand = -firstOperand : firstOperand
        updateDisplay(firstOperand);
        negative = false;
         }

    } else if (firstOperand && firstOperator === null
        && e.target.classList.contains('operand')) {
        firstOperand += e.target.value;
        updateDisplay(firstOperand);
        
    } else if (secondOperand !== null && firstOperand !== null
        && e.target.classList.contains('operand')) {
        
        secondOperand += e.target.value;
        updateDisplay(secondOperand)

    } else if (secondOperand === null && firstOperator !== null
        && e.target.classList.contains('operand')) {
        
        secondOperand = e.target.value;
        secondOperand = negative === true ? secondOperand = -secondOperand : secondOperand;
        updateDisplay(secondOperand)
        negative = false;

    } else if (firstOperand !== null && firstOperator === null
        && e.target.classList.contains('operator')) {
            
        firstOperator = e.target.value;
        
    } else if (result !== null && e.target.classList.contains('operator')){
        firstOperator = e.target.value;   
    } 
}

function calculateExpr() { // calculates result of complete expression
                           // is called in findResult()  
    if (firstOperator === '*') {
        result = firstOperand * secondOperand;
        firstOperand = result;

    } else if (firstOperator === '/') {
        result = firstOperand / secondOperand;
        firstOperand = result;

    } else if (firstOperator === '+') {
        result = Number(firstOperand) + Number(secondOperand);
        firstOperand = result;

    } else if (firstOperator === '-') {
        result = firstOperand - secondOperand;
        firstOperand = result;
    }
}

function isInvalid() { // returns an error code on display 
                       // if calculation result is illogical or invalid
                       // is called in findResult()
    result = '[E]invalid';
    firstOperand = result;
    firstOperator = null;
    secondOperand = null;
    result = null;
    updateDisplay(firstOperand)
    return;
}

function isValid() { // formats and displays valid calculation result
                     // allows for chained expressions
                     // is called in findResult()
     result = result % 1 != 0 ? result.toFixed(2) : Math.trunc(result);
     firstOperand = result;
     firstOperator = null;
     secondOperand = null;
     updateDisplay(firstOperand)
     return;
}

function findResult(e) { // Calculates result of expression when result key (enter key) is hit
                         // or result button (=) is clicked
    if (e.target.classList.contains('operator') && secondOperand !== null && result === null){
        
        calculateExpr();
        secondOperand = null;
        firstOperand = result;
        result = null;
        firstOperator = e.target.value;
        updateDisplay(firstOperand)

    } else if (e.target.classList.contains('result')) {

        if (secondOperand === null) { // reset calculator if expression is incomplete
            resetCalc(e)

        } else {
            if (firstOperator !== null) {
                calculateExpr();

                if (result === NaN || result === null || result === Infinity) {
                    isInvalid();

                } else {
                    isValid();
                }
            }
        }
    }
}

function makeNegative(e) { // turns the current operand into a negative number
     if (e.target.value === 'sign') {
     
        firstOperand =  firstOperand !== null && firstOperator === null ?
        firstOperand = -firstOperand : firstOperand;
        secondOperand =  secondOperand !== null  && firstOperator !== null && result === null ?
        secondOperand = -secondOperand : secondOperand;
         
              if (firstOperand === null && firstOperator === null){
                   negative = true
                 } else if (secondOperand === null && firstOperator !== null){
                   negative = true;
                 }           
     } 
        if (firstOperand < 0 && secondOperand === null){
                updateDisplay(firstOperand)
            
        } else if (secondOperand < 0 && result === null){
                updateDisplay(secondOperand)
            
        } else if (firstOperand === result){
                updateDisplay(firstOperand)
        }
    }

function makePercentage(e) { // turns current operand into a percentage (operand / 100)
    if (e.target.value === 'modulo') {
        
        firstOperand =  firstOperand !== null &&  firstOperator === null ? 
        firstOperand = firstOperand / 100 : firstOperand;
        secondOperand =  secondOperand !== null  && firstOperator !== null && result === null ?
        secondOperand = secondOperand / 100: secondOperand;

        if (firstOperand / 1 !== 0 && secondOperand === null){         
          updateDisplay(firstOperand)

        } else if (firstOperand % 1 !== 0 && result === null){
          updateDisplay(secondOperand.toFixed(2))

        } else if (firstOperand === result){
          updateDisplay(firstOperand)
        }
    }
}

function ifHasDecimal() {// validates if the current operand contains a decimal
                         // prevents decimals from being added if true
                         // allows decimals to be added if false
    document.querySelector('#dec-btn').disabled = true
    if (!String(firstOperand).includes('.') && firstOperator === null) {
        document.querySelector('#dec-btn').disabled = false;

    } else if (!String(secondOperand).includes('.') && firstOperator !== null) {
        document.querySelector('#dec-btn').disabled = false;

    } else if (String(firstOperand).includes('.') && firstOperator === null) {
        document.querySelector('#dec-btn').disabled = true
    } 
}

function updateDisplay(operand){
    displayVal = operand;
    display.textContent = displayVal
}

function resetCalc(e) { // resets the calculator 
    
    // e.target.classList.contains('operand') && result !== null ?
     // firstOperand = e.target.value : firstOperand = null;
     
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    result = null;
    negative = false;
    // displayVal = '0';
    // display.textContent = displayVal;
    updateDisplay(firstOperand === e.target.value ? displayVal = firstOperand : displayVal = '0')
    //display.textContent = displayVal;
    
}

