let display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;
let isDarkMode = false;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    display.textContent = currentInput;
    shouldResetDisplay = false;
}

function calculate() {
    try {
        let expression = currentInput.replace(/×/g, '*');
        let result = eval(expression);
        
        if (result.toString().includes('e')) {
            result = parseFloat(result.toFixed(8));
        }
        
        currentInput = result.toString();
        display.textContent = currentInput;
        shouldResetDisplay = true;
    } catch (error) {
        display.textContent = 'Erro';
        currentInput = '0';
        shouldResetDisplay = true;
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
}

window.onload = function() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark');
        isDarkMode = true;
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('×');
    } else if (key === '/') {
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});