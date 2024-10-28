import React, {useState, useStates} from 'react';
import "./Calculator.css";

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState('0');
    const [pendingOperation, setPendingOperation] = useState(null);
    const [pendingValue, setPendingValue] = useState(null);
    const [completeOperation, setCompleteOperation] = useState('');

    const keypadNumbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
    const operations = ['+', '-', '*', '/']

    const handleClick = (val) => {
        setCurrentValue(prevValue => {
            if(prevValue === '0') {
                return val;
            } else {
                return prevValue + val;
            }
        });

        setCompleteOperation(prevOperation => prevOperation + val);
    };

    const handleCalculete = () => {
        if(!pendingOperation || !pendingValue) {
            return;
        }

        const num1 = parseFloat(pendingValue)
        const num2 = parseFloat(currentValue)

        let result;

        switch (pendingOperation) {
            case '+':
                result = num1 + num2
                break;

            case '-':
                result = num1 - num2
                break;
            
            case '*':
                result = num1 * num2
                break;

            case '/':
                if(num2 !== 0) {
                    result = num1 / num2;
                } else {
                    setCurrentValue('Error!');
                    setCompleteOperation('Error!');
                    setPendingOperation(null);
                    setPendingValue(null);
                    return;
                }
                break;

            default:
                break;
        }

        setCompleteOperation(
            pendingValue + 
            ' ' + 
            pendingOperation + 
            ' ' + 
            currentValue + 
            ' = ' + result
            );
        setCurrentValue(result.toString());
        setPendingOperation(null)
        setPendingValue(null)
    };

    const handleOperation = (operations) => {
        setCompleteOperation(currentValue + ' ' + operations)
        setPendingOperation(operations)
        setPendingValue(currentValue)
        setCurrentValue(' ')
    };

    const handleClear = () => {
        setCurrentValue('0')
        setPendingOperation(null)
        setPendingValue(null)
        setCompleteOperation('')
    };

  return (
    <div className='calculator'>
        <div className='complete-operation'>{completeOperation}</div>
        <div className='display'>{currentValue}</div>
        <div className='buttons'>
            <button onClick={handleClear}>AC</button>
            {keypadNumbers.map((num) => (<button key={num} onClick={() => handleClick(num)}>{num}</button>))}
            {operations.map((operations) => (<button key={operations} onClick={() => handleOperation(operations)}>{operations}</button>))}
            <button onClick={handleCalculete}>=</button>
        </div>
    </div>
  )
}

export default Calculator;