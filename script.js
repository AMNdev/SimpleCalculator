const numberOutput = document.querySelector('.display-numbers');
const buttons = document.querySelectorAll('button');

let inputNumber = '';
let previousValue = '';
let operator = '';

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const buttonClicked = e.target.innerText;
        calculator(buttonClicked);
    })
})

function calculator(pressed) {
    // console.log({pressed, previousValue, inputNumber})

    if (pressed == 'AC') return clearAll()
    if (pressed == 'C') return clearLast()
    if ((/^[0-9]+$/).test(pressed)) return addNumber(pressed)
    if ((/[.]+/g).test(pressed)) return addNumber(pressed)
    if ((/[=]+/g).test(pressed)) return equalTo()


    if (!previousValue) {
        if (pressed == '-' && !inputNumber) return addNumber('-')
        previousValue = inputNumber
    } else {
        if ((operator == '*' || operator == '/') && pressed == '-') return addNumber('-')
        previousValue = operate(previousValue, operator, inputNumber);
    }

    print(previousValue);
    inputNumber = '';
    operator = pressed;
}

function operate(a, _operator, b) {
    // console.log({ a, _operator, b })
    a = +a;
    b = +b;

    switch (_operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b != 0 ? a / b : 'error';
        default:
            return b;
    }
}

function addNumber(num) {
    if (inputNumber.length == 0 && num == '.') inputNumber = '0';
    inputNumber += num;
    print(inputNumber)
}

function equalTo() {
    if (previousValue && operator && inputNumber) {
        previousValue = operate(previousValue, operator, inputNumber);
        print(previousValue)
        operator = ''
    }
}

function print(_toPrint) {
    _toPrint += '';
    _toPrint = _toPrint.length < 10 ? _toPrint : _toPrint.slice(0, 10);
    numberOutput.innerText = _toPrint;
    inputNumber = _toPrint;
}

function clearAll() {
    print(0)
    previousValue = '';
    inputNumber = '';
    operator = '';
}

function clearLast() {
    print(0)
    inputNumber = '';
}

