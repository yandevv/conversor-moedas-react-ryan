function ConverterTable({ currencies, exchanges }) {
  if (!currencies || !exchanges) return null;

  const currencyInfo = {
    USD: { name: "Dólar Americano", symbol: "$" },
    BRL: { name: "Real Brasileiro", symbol: "R$" },
    EUR: { name: "Euro", symbol: "€" },
    GBP: { name: "Libra Esterlina", symbol: "£" },
    JPY: { name: "Iene Japonês", symbol: "¥" },
    AUD: { name: "Dólar Australiano", symbol: "A$" },
    CAD: { name: "Dólar Canadense", symbol: "C$" },
    CHF: { name: "Franco Suíço", symbol: "CHF" },
    CNY: { name: "Yuan Chinês", symbol: "¥" },
    ARS: { name: "Peso Argentino", symbol: "$" },
  };

  return (
    <div className="w-full max-w-4xl mt-10">
      <div className="rounded-2xl shadow-xl overflow-hidden bg-gray-900">
        <h2 className="text-xl font-bold p-4 text-white border-b border-gray-700">
          📊 Tabela de Cotações (USD)
        </h2>

        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-sm text-white">
            <thead className="sticky top-0 bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Moeda</th>
                <th className="px-4 py-3 text-left">Sigla</th>
                <th className="px-4 py-3 text-right">Valor em USD</th>
              </tr>
            </thead>

            <tbody>
              {currencies.map((currency) => {
                const info = currencyInfo[currency];

                return (
                  <tr
                    key={currency}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-2">
                      {info ? `${info.name} (${info.symbol})` : "—"}
                    </td>

                    <td className="px-4 py-2 font-mono font-semibold">
                      {currency}
                    </td>

                    <td className="px-4 py-2 text-right font-mono">
                      {Number(exchanges[currency]).toFixed(4)} $
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ConverterTable;