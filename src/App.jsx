import "./App.css";
import Input from "./components/Input";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function App() {
  const [amount1, setAmount1] = useState("1");
  const [amount2, setAmount2] = useState("1");
  const [currency1, setCurrency1] = useState("GBP");
  const [currency2, setCurrency2] = useState("INR");
  const [rates, setRates] = useState({});

  // Define handleAmount1Change before it's used in useEffect
  const handleAmount1Change = useCallback(
    (amount1) => {
      setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
      setAmount1(amount1);
    },
    [currency1, currency2, rates]
  );

  useEffect(() => {
    axios
      .get(
        "https://data.fixer.io/api/latest?access_key=fa6cf770e671dbe3ce558c3458badaab"
      )
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [handleAmount1Change, rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <Input
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      ></Input>
      <Input
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      ></Input>
    </div>
  );
}

export default App;
