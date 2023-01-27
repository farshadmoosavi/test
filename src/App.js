import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [crypto, setCrypto] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [usd, setUsd] = useState('');
  const [eur, setEur] = useState('');
  const [link, setLink] = useState('');
  const [symbol, setSymbol] = useState('');
  const [des, setDes] = useState('');
  const [flag,setFlag] = useState(false);

  const handleSubmit = () => {
    const url = `https://api.coingecko.com/api/v3/coins/${crypto}`;
    axios.get(url).then(res => {
      console.log(res.data);
      setImage(res.data.image.large);
      setName(res.data.name);
      setSymbol(res.data.symbol);
      setLink(res.data.links.blockchain_site[1]);
      setUsd(res.data.market_data.current_price.usd + " $");
      setEur(res.data.market_data.current_price.eur + " €");
      setDes(JSON.stringify(res.data.description.en));
      setFlag(true);
    })
  }

  
  const createMarkeup = () => {
    return {__html:des};
  }

  return (
    <div className='App'>
      <h1 className='title'>CryptoCurrency Search</h1>
      <div className='search'>
        <input 
          type="text" 
          // value = {crypto} 
          onChange = {(e) => setCrypto(e.target.value)}
          placeholder = "Enter the name of Crypto"
          required /> 
      </div>
      <button type='submit' onClick={handleSubmit} className = "btn">Submit</button>
     {
        flag && 
          <div className='container'>
          <div className='crypto-info'>
            <img src = {image} alt = 'crypto' width = '250' />
            <br/>
            <h1 className='crypto-title'> name: {name}</h1>
            <h2 className='symbol'>symbol: {symbol}</h2>
            <h2 className='link'> Link: <a href = {link}>{link}</a></h2>
            <br/>
            <h2 className='europrice'>Euro price: {eur}</h2>
            <h2 className='usdprice'>Dollar price: {usd}</h2>
          </div>
          <div className='des'>
              <div dangerouslySetInnerHTML = {createMarkeup()}>
              </div>
        </div>
        </div>
        }
     
       
    </div>
    
  );
}

export default App;
