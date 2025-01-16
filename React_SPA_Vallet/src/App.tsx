import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
interface IValute {
  Name: string;
  Value: string;
}
interface IValutes {
  [key: string]: IValute;
}
interface IResponse {
  Date: string;
  Valute: IValutes;
}
function App() {
  const [rates, setRates] = useState<IValute[]>([]);
  const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

  useEffect(() => {
    fetch(url)
     .then(response => response.json())
     .then((data: IResponse) => {
        const rate = data.Valute;
        const ratesArray: IValute[] = [];
        Object.keys(rate).forEach(key => {
          const rates = rate[key];
          ratesArray.push({
            Name: rates.Name,
            Value: rates.Value,
          });
        });
        setRates(ratesArray);
      })
     .catch(error => console.error('Ошибка:', error));
  }, []);
  function getValute(){
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
    fetch(url)
    .then(response => response.json())
    .then((data:IResponse) => {
        const rate = data.Valute;
        const ratesArray: IValute[] = [];
        Object.keys(rate).forEach(key => {
          const rates = rate[key];
          ratesArray.push({
            Name: rates.Name,
            Value: rates.Value,
          });
          setRates(ratesArray);

          console.log(`Валюта: ${rates.Name}`);
          console.log(`Курс: ${rates.Value} руб.`);
          console.log(`Дата: ${data.Date}`);
          console.log('---');
          
        });
      })
    .catch(error => console.error('Ошибка:', error));
  }
 
  return (
    <>
     <div>
      <h1 className=' font-bold'>Расчет курса валют </h1>
      <div className='flex items-center mt-20'>
      <div className='w-1/2'>
      <label for="Value" class="block text-sm font-medium text-gray-900 dark:text-white">Выбор валюты</label>
      <input id="Value" placeholder='Введите цену в руб ' className='border rounded  p-2 w-1/2'/>
      </div>
      <div>
      <form class="max-w-sm mx-auto">
        
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбор валюты</label>
        <select  id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Выберете валюту</option>
          {rates.map((rate, index) => (
            <option key={index}>{rate.Name}</option>
          ))}
        </select>
      </form>
      </div>
      <div className='w-1/2'>
      <label for="Value" class="block text-sm font-medium text-gray-900 dark:text-white">Вывод валюты</label>
      <input disabled id="Value" placeholder='сколько валюты получешь ' className='border rounded text-sm  p-2 w-1/2 disabled:true '/>
      </div>
      </div>
      

      <div className='mt-20'>
      <table className="w-full text-2xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
            Валюта</th>
            <th scope="col" className="px-6 py-3">
            Цена в рублях</th>
          </tr>
        </thead>
        <tbody className=''>
        {rates.map((rate, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xl">
              <td>{rate.Name}</td>
              <td>{rate.Value}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
     </div>
    </>
  )
}

export default App
