import './App.css';
import React, { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD'); 
  const [toCurrency, setToCurrency] = useState('EUR'); 
  const [exchangeRate, setExchangeRate] = useState(null); 
  const [convertedAmount, setConvertedAmount] = useState(''); 

  const convertCurrency = async () => {
    if (!amount) {
      alert('Введите сумму');
      return;
    }

    const url = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=f0c3006bd46f4629a23be629ff0b96e5';

    try {
      const response = await fetch(url); 
      const data = await response.json(); 
      const rate = data.rates[toCurrency]; 
      setExchangeRate(rate); 

      const result = parseFloat(amount) * rate; 
      setConvertedAmount(result.toFixed(2)); 
    } catch (error) {
      console.error('Ошибка при получении курса:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Конвертер валют</h1>

      <div className="input-group">
        <label className="label">
          Сумма:
          <input
            className="input-field"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>

      <div className="currency-select">
        <label className="label">
          Из:
          <select className="select-field" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="RUB">RUB</option>
          </select>
        </label>

        <label className="label">
          В:
          <select className="select-field" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="RUB">RUB</option>
          </select>
        </label>
      </div>

      <button className="convert-button" onClick={convertCurrency}>Конвертировать</button>

      {convertedAmount && (
        <div className="result">
          <h2>Результат: {convertedAmount} {toCurrency}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
