import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="calculator-container">
      <h1>Professional Calculator</h1>
      <div className="tabs">
        <button
          className={activeTab === 'basic' ? 'active' : ''}
          onClick={() => setActiveTab('basic')}
        >
          Basic Calculator
        </button>
        <button
          className={activeTab === 'interest' ? 'active' : ''}
          onClick={() => setActiveTab('interest')}
        >
          Interest Calculator
        </button>
        <button
          className={activeTab === 'shopping' ? 'active' : ''}
          onClick={() => setActiveTab('shopping')}
        >
          Shopping Calculator
        </button>
      </div>

      {activeTab === 'basic' ? (
        <BasicCalculator />
      ) : activeTab === 'interest' ? (
        <InterestCalculator />
      ) : (
        <ShoppingCalculator />
      )}
    </div>
  );
}

function BasicCalculator() {
  const [display, setDisplay] = useState('0');

  const handleNumberClick = (num) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperatorClick = (op) => {
    const lastChar = display.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      setDisplay(display.slice(0, -1) + op);
    } else {
      setDisplay(display + op);
    }
  };

  const handleEquals = () => {
    try {
      const result = eval(display);
      setDisplay(String(result));
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleDecimal = () => {
    const lastNumber = display.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes('.')) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="basic-calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            onClick={() =>
              btn === '='
                ? handleEquals()
                : btn === '.'
                ? handleDecimal()
                : ['+', '-', '*', '/'].includes(btn)
                ? handleOperatorClick(btn)
                : handleNumberClick(btn)
            }
          >
            {btn}
          </button>
        ))}
        <button className="clear" onClick={handleClear}>C</button>
      </div>
    </div>
  );
}

function InterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFreq, setCompoundFreq] = useState('0'); // Default to "None"
  const [simpleInterest, setSimpleInterest] = useState(null);
  const [compoundInterest, setCompoundInterest] = useState(null);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFreq);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      alert('Please enter valid numbers for Principal, Rate, and Time');
      return;
    }

    // Simple Interest: P * R * T
    const si = p * r * t;
    setSimpleInterest(si.toFixed(2));

    // Compound Interest: Only calculate if n > 0
    if (n > 0) {
      const ci = p * Math.pow(1 + r / n, n * t) - p;
      setCompoundInterest(ci.toFixed(2));
    } else {
      setCompoundInterest(null); // No compound interest when "None" is selected
    }
  };

  const clearFields = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundFreq('0'); // Reset to "None"
    setSimpleInterest(null);
    setCompoundInterest(null);
  };

  return (
    <div className="interest-calculator">
      <div className="input-group">
        <label>Principal Amount ($):</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="e.g., 1000"
        />
      </div>
      <div className="input-group">
        <label>Annual Interest Rate (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="e.g., 5"
        />
      </div>
      <div className="input-group">
        <label>Time (Years):</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="e.g., 2"
        />
      </div>
      <div className="input-group">
        <label>Compound Frequency (per year):</label>
        <select value={compoundFreq} onChange={(e) => setCompoundFreq(e.target.value)}>
          <option value="0">None</option>
          <option value="1">Annually</option>
          <option value="4">Quarterly</option>
          <option value="12">Monthly</option>
          <option value="365">Daily</option>
        </select>
      </div>
      <div className="buttons">
        <button onClick={calculateInterest}>Calculate</button>
        <button onClick={clearFields}>Clear</button>
      </div>
      {simpleInterest && (
        <div className="results">
          <p>Simple Interest: ${simpleInterest}</p>
          {compoundInterest && <p>Compound Interest: ${compoundInterest}</p>}
          <p>Total Amount (Simple): ${(parseFloat(principal) + parseFloat(simpleInterest)).toFixed(2)}</p>
          {compoundInterest && (
            <p>Total Amount (Compound): ${(parseFloat(principal) + parseFloat(compoundInterest)).toFixed(2)}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ShoppingCalculator() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    const q = parseFloat(quantity);
    const p = parseFloat(pricePerUnit);

    if (!itemName || isNaN(q) || isNaN(p)) {
      alert('Please fill all fields with valid numbers');
      return;
    }

    const cost = (q * p).toFixed(2);
    const newItem = {
      name: itemName,
      quantity: q,
      unit,
      price: p,
      cost,
    };

    setItems([...items, newItem]);
    setItemName('');
    setQuantity('');
    setPricePerUnit('');
  };

  const clearItems = () => {
    setItems([]);
    setItemName('');
    setQuantity('');
    setPricePerUnit('');
  };

  const totalCost = items.reduce((sum, item) => sum + parseFloat(item.cost), 0).toFixed(2);

  return (
    <div className="shopping-calculator">
      <div className="input-group">
        <label>Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g., Wheat"
        />
      </div>
      <div className="input-group">
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g., 2"
        />
      </div>
      <div className="input-group">
        <label>Unit:</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="lb">lb</option>
          <option value="piece">piece</option>
        </select>
      </div>
      <div className="input-group">
        <label>Price per Unit ($):</label>
        <input
          type="number"
          value={pricePerUnit}
          onChange={(e) => setPricePerUnit(e.target.value)}
          placeholder="e.g., 5"
        />
      </div>
      <div className="buttons">
        <button onClick={addItem}>Add Item</button>
        <button onClick={clearItems}>Clear</button>
      </div>
      {items.length > 0 && (
        <div className="items-list">
          <h3>Items</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.name}: {item.quantity}{item.unit} * ${item.price} = ${item.cost}
              </li>
            ))}
          </ul>
          <p className="total">Total Cost: ${totalCost}</p>
        </div>
      )}
    </div>
  );
}

export default App;