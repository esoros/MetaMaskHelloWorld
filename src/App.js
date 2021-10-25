import logo from './logo.svg';
import './App.css';
import "./bulma.min.css"
import { useState } from 'react';
import { HomeScreen } from './HomeScreen';

function App() {  
  let [eth, setEth] = useState()
  
  let connectMetamask = () => {
    let eth = window.ethereum    
    if (typeof eth !== 'undefined') {
        eth.request({method: "eth_requestAccounts"})
            .then((accounts) => {
                eth.accounts = accounts
                setEth(eth)
            })
            .catch(() => { throw 'unable to create eth provider' })
    }
    else
    {
        throw 'metamask not installed!'
    }   
  }

  if(eth == undefined) {
    return <div>
      <button onClick={connectMetamask} className="button is-info">Connect Metamask</button>
    </div>
  }

  return <HomeScreen eth={eth} />
}

export default App;
