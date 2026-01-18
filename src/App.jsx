import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

function App() {
  const apiKey = 'YOUR_API_KEY_HERE'; // Substitua pela sua chave de API

  const [exchanges, setExchanges] = useState(null);
  const [currencies, setCurrencies] = useState(null);

  const [deMoeda, setDeMoeda] = useState('BRL');
  const [paraMoeda, setParaMoeda] = useState('USD');
  const [deValor, setDeValor] = useState('');
  const [paraValor, setParaValor] = useState('');

  const MainContext = createContext({
    exchanges,
    setExchanges,
    currencies,
    setCurrencies,
  });
  const useMainContext = useContext(MainContext);

  function converterMoeda() {
    if (!exchanges) return; // TODO: tratar erro

    const cotacaoDeMoeda = exchanges[deMoeda];
    const cotacaoParaMoeda = exchanges[paraMoeda];

    if (deMoeda === 'USD') {
      setParaValor((deValor * cotacaoParaMoeda).toFixed(2));
    } else if (paraMoeda === 'USD') {
      setParaValor((deValor / cotacaoDeMoeda).toFixed(2));
    } else {
      const valorEmDolar = deValor / cotacaoDeMoeda;
      setParaValor((valorEmDolar * cotacaoParaMoeda).toFixed(2));
    }
  }

  function handleConvert() {
    converterMoeda();
  }

  function handleInputDeMoeda(event) {
    setDeMoeda(event.target.value);
  }

  function handleInputParaMoeda(event) {
    setParaMoeda(event.target.value);
  }

  function handleInputDeValor(event) {
    setDeValor(event.target.value);
  }

  useEffect(() => {
    if (!useMainContext.exchanges) {
      const fetchExchangeRates = async () => {
        const response = await fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`);

      const data = await response.json();

      useMainContext.setExchanges(data.rates);

      const currenciesArray = Object.keys(data.rates);
      currenciesArray.sort((currencyA, currencyB) => {
        return currencyA.localeCompare(currencyB);
      });

      useMainContext.setCurrencies(currenciesArray);
    };

      fetchExchangeRates();
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center h-screen justify-center">
        <h1 className="text-center pt-8">Conversor de Moedas</h1>
        <div className="flex gap-4 items-center pt-4">
          <label htmlFor="inputDeValor" className="block text-left font-semibold">De:</label>
          <input
            type="text"
            id="inputDeValor"
            // placeholder=""
            className="border border-gray-300 p-2 rounded-md w-80"
            onChange={handleInputDeValor}
          />
          <select
            className={`border border-gray-300 p-2 rounded-md w-fit`}
            disabled={!exchanges}
            onChange={handleInputDeMoeda}
            value={deMoeda}
          >
            {useMainContext.currencies ? useMainContext.currencies.map((moeda) => (
              <option key={moeda} value={moeda}>{moeda}</option>
            )) : <option>Carregando...</option>}
          </select>
        </div>
        <div className="pt-4 flex gap-4 items-center">
          <label htmlFor="inputParaValor" className="block text-left font-semibold">Para:</label>
          <input
            type="text"
            id="inputParaValor"
            disabled={exchanges}
            // placeholder=""
            className="border border-gray-300 p-2 rounded-md w-80"
            value={paraValor}
          />
          <select
            className={`border border-gray-300 p-2 rounded-md w-fit`}
            disabled={!exchanges}
            onChange={handleInputParaMoeda}
            value={paraMoeda}
          >
            {useMainContext.currencies ? useMainContext.currencies.map((moeda) => (
              <option key={moeda} value={moeda}>{moeda}</option>
            )) : <option>Carregando...</option>}
          </select>
        </div>
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleConvert}
        >Converter</button>
      </div>
    </>
  )
}

export default App
