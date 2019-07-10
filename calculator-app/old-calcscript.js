class Calculator {
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear(); //Call this right when calc is instatiated to ensure blank slate
    }

    clear() {
        //Used to clear variables
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        //For backspacing single number in calc 
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();

    }

    appendNumber(number) {
        //For concatenating new number to the end of current operand
        if (number === "." && this.currentOperand.includes(".")) {
            return;
        }
        //Convert to strings so that each new number gets appended rather than summed
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        //Executes the user-selected operation
 
        //'If no operation was input by user, end function
        if (this.currentOperand === '') {
            return;

        } else if (this.previousOperand != '' ) {
            this.compute();
        } 
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    compute() {
        // Will do the actual calculating of operands
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        //Test to make sure user didn't enter blank value, stop program if so
        if (isNaN(prev) || isNaN(curr)) {
            return;
        }

        //Operations computed
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;        
            default:
                return;
        }
        //after computed, update current operand to be result, reset operation and previousoperand for display
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

    updateDisplay() {
        //updates values in the output
        this.currentOperandText.innerText = 
            this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandText.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;

        } else {
            this.previousOperandText.innerText = '';

        }

    }
}


const numberButtons = document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

//Loop through each button in the html and add an eventhandler

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        
       });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        
    });
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
    
});
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();   

});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();   

});

/*
function getDisplayNumber(number) {
    const floatNumber = parseFloat(number);
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);

    console.log(integerDigits);

    if (isNaN(floatNumber)) {
        return '';
    } else {
        return floatNumber.toLocaleString('en');
    }

}

getDisplayNumber(5.6);

*/