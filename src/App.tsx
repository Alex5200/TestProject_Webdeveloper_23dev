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
  const [select, setSelect] = useState("");
  const [inputNum, setInputNum] = useState("");
  const [calculate, setCalculate] = useState(0);
  const [focus, setIsFocused] = useState(false);
  let outsInput = "";
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() =>{
    console.log(focus);
    if(focus == false && !inputNum.includes("руб.") && inputNum != ""){
      setInputNum(inputNum + " руб.")
    }}, [focus])

  useEffect(() => {
    if(select != null || select != "Выберете валюту"){
      Object.keys(rates).forEach((key:any) => {
        console.log(rates);
        console.log(`Ключ: ${key}, Значение: ${rates[key]}`);
        if (rates[key].Name === select) {
          console.log(`Найдено имя: ${rates[key].Name}`);
          if (inputNum != "0" || inputNum != null){
            setCalculate(parseInt(inputNum) / parseInt(rates[key].Value));
          }
        }
      });
    }
  },[select])
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
        console.log(rates);
        console.log(rates[0]);

      })
     .catch(error => console.error('Ошибка:', error));
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNum(event.target.value); // Обновление состояния при изменении инпута
  };
 
  return (
    <>
     <div>
      <h1 className=' font-bold'>Расчет курса валют </h1>
      <div className='flex items-center mt-20 max-lg:flex-col gap-20'>
      <div className='w-1/2 flex flex-col '>
        <label for="Value" class="block text-sm font-medium text-gray-900 dark:text-white">Введите сумму</label>
        <div className='flex justify-center'>
          <input id="Value"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder='Введите цену в руб ' className='border  p-2 w-1/2 rounded-l-lg'  onChange={handleChange} value={inputNum}/>
          
          <button onClick={() =>setInputNum("")} className='border rounded-r-lg '>
            <svg class="w-6 h-6 mt-auto mb-auto mx-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
          </svg></button>
        </div>
      </div>
      <div>
      <form class="max-w-sm mx-auto">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбор валюты</label>
        <select onChange={event => setSelect(event.target.value)}  id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Выберете валюту</option>
          {rates.map((rate, index) => (
            <option key={index}>{rate.Name}</option>
          ))}
        </select>
      </form>
      </div>
      <div className='w-1/2'>
      <label for="Value" class="block text-sm font-medium text-gray-900 dark:text-white"> 
        {(select == null || select == "Выберете валюту")? 
      "Вывод валюты" : "Валюта " + select}
      </label>
      <input disabled id="Value" placeholder='сколько валюты получешь ' className='border rounded text-sm  p-2 w-1/2 disabled:true ' value={calculate}/>
      </div>
      </div>
      

      <div className='mt-20'>
      <input placeholder='Поиск валют можно ввести несколько через запятую'/>
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
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xl mb-5">
              <td className='p-2'>{rate.Name}</td>
              <td className='p-2'> {rate.Value}</td>
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
