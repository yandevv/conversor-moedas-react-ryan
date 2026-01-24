function ConverterCurrencySelect({ isDisabled, currency, currencySetter, currencies }) {
  function onChange(event) {
    currencySetter(event.target.value);
  }

  return (
    <select
      disabled={isDisabled}
      onChange={onChange}
      value={currency}
      className="px-3 py-2 rounded-lg border bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    >
      {currencies ? (
        currencies.map((moeda) => (
          <option key={moeda} value={moeda}>
            {moeda}
          </option>
        ))
      ) : (
        <option>Carregando...</option>
      )}
    </select>
  )
}

export default ConverterCurrencySelect