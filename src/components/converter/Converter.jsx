import { useContext, createContext, useEffect, useState } from "react";
import ConverterCurrencySelect from "./ConverterCurrencySelect";
import ConverterTable from "./ConverterTable";

function Converter() {
  const apiKey = 'e2ed1ed66e9b42428ef67bb381b726b4';

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
    if (!exchanges) return;

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

  function handleInputDeValor(event) {
    setDeValor(event.target.value);
  }

  useEffect(() => {
    if (!useMainContext.exchanges) {
      const fetchExchangeRates = async () => {
        const response = await fetch(
          `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`
        );

        const data = await response.json();

        setExchanges(data.rates);

        const currenciesArray = Object.keys(data.rates);
        currenciesArray.sort((a, b) => a.localeCompare(b));

        setCurrencies(currenciesArray);
      };

      fetchExchangeRates();
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center
      bg-linear-to-br from-blue-600 to-indigo-800
      dark:from-gray-900 dark:to-gray-800
      px-4 py-10"
    >
      {/* CONVERSOR */}
      <div className="w-full max-w-xl rounded-2xl shadow-2xl p-8
        bg-white text-gray-800
        dark:bg-gray-900 dark:text-gray-100"
      >
        <h1 className="text-3xl font-bold text-center mb-8
          text-indigo-700 dark:text-indigo-400">
          💱 Conversor de Moedas
        </h1>

        {/* DE */}
        <div className="flex items-center gap-4 mb-6">
          <label className="font-semibold w-14 text-gray-700 dark:text-gray-300">
            De:
          </label>

          <input
            type="text"
            onChange={handleInputDeValor}
            className="flex-1 px-4 py-2 rounded-lg border
              bg-white text-gray-800 border-gray-300
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />

          <ConverterCurrencySelect
            isDisabled={!exchanges}
            currency={deMoeda}
            currencySetter={setDeMoeda}
            currencies={currencies}
          />
        </div>

        {/* PARA */}
        <div className="flex items-center gap-4 mb-8">
          <label className="font-semibold w-14 text-gray-700 dark:text-gray-300">
            Para:
          </label>

          <input
            type="text"
            value={paraValor}
            readOnly
            className="flex-1 px-4 py-2 rounded-lg border
              bg-gray-100 text-gray-700 border-gray-300 cursor-not-allowed
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <ConverterCurrencySelect
            isDisabled={!exchanges}
            currency={paraMoeda}
            currencySetter={setParaMoeda}
            currencies={currencies}
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full py-3 rounded-xl font-semibold transition shadow-md
            bg-indigo-600 hover:bg-indigo-700 text-white
            dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Converter
        </button>
      </div>

      {/* TABELA */}
      <ConverterTable
        currencies={currencies}
        exchanges={exchanges}
      />
    </div>
  );
}

export default Converter;