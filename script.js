const display = document.querySelector('.display');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');

const operation = {
  currentNumber:'',
  previousNumber:'',
  operator:undefined,
}

function clear(){
  operation.previousNumber = '';
  operation.currentNumber = '';
  operation.operator = undefined;
};

function addNumber(number){
  if(number === '.' && operation.currentNumber.includes('.')) return;
  operation.currentNumber += number; 
};

function chooseOperator(operator){
  if(operation.currentNumber ==='') return;
  if(operation.previousNumber !==''){
    let result = operate(operation);
    display.innerText = result
  };
  operation.operator = operator;
  operation.previousNumber = operation.currentNumber;
  operation.currentNumber = '';
};

function operate(operation){
  let result;
  const previous = Number(operation.previousNumber);
  const current = Number(operation.currentNumber);
  if(isNaN(previous) || isNaN(current)) return;
  switch(operation.operator){
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break
    case '/':
      result = previous / current;
      break;
    default:
      return
  }
  operation.currentNumber = result;
  operation.operator = undefined;
  operation.previousNumber = '';
  return result
};

function updateDisplay(){
  display.innerText = operation.currentNumber
};

clearButton.addEventListener('click',function(){
  clear();
  updateDisplay();
});

numbers.forEach(number => {
  number.addEventListener('click',() => {
    addNumber(number.innerText);
    updateDisplay();
  })
});

operators.forEach(operator => {
  operator.addEventListener('click',() => {
    chooseOperator(operator.innerText);
  })
});

equalButton.addEventListener('click',() => {
  operate(operation);
  updateDisplay();
  clear()
});