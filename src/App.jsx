import { useState } from "react"

function App() {
  const [valorReais, setValorReais] = useState('');
  const [valorDolares, setValorDolares] = useState('');

  function converterMoeda() {
    const valorEmReais = parseFloat(valorReais.replace(',', '.'));
    if (!isNaN(valorEmReais)) {
      const valorConvertido = valorEmReais / 5.4;
      setValorDolares(valorConvertido.toFixed(2).replace('.', ','));
    } else {
      setValorDolares('');
    }
  }

  function handleConvert() {
    converterMoeda();
  }

  function handleInputReais(event) {
    setValorReais(event.target.value);
  }

  return (
    <>
      <div className="w-full flex flex-col items-center h-screen justify-center">
        <h1 className="text-center pt-8">Conversor de Moedas</h1>
        <h2 className="text-center pt-2">De Reais para Dólares</h2>
        <div className="pt-4">
          <label htmlFor="valor" className="block text-left">Valor em Reais:</label>
          <input
            type="text"
            id="valor"
            placeholder="Digite o valor em Reais"
            className="border border-gray-300 p-2 rounded-md w-80 mt-4"
            onChange={handleInputReais}
          />
        </div>
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleConvert}
        >Converter</button>
        {valorDolares && (
          <div>
            <h2 className="mt-6">Valor Convertido:</h2>
            <p className="text-2xl font-bold mt-2">U$ {valorDolares}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
