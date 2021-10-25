import { useState } from "react/cjs/react.development";
import { hex2a, sha3 } from "./Utils"

export function HomeScreen(props) {
    let eth = props.eth
    if(eth == undefined) {
        throw 'unable to get eth from props'
    }
    
    let [contractAddress, setContractAddress] = useState("")
    let [tokenName, setTokenName] = useState("")
    let [totalSupply, setTotalSupply] = useState("")


    function getTokenInfo() {
        let data = sha3('name()')?.slice(0,10)       
        eth.request({method: "eth_call", params: [{to: contractAddress, data: data}, "latest"]})
            .then((resp) => {
                let name = hex2a(resp.substring(2))
                console.log("eth call name", name, name.length)
                setTokenName(name)
            })
            .catch((err) => { 
                console.log("err", err)
                throw 'eth_call failed' 
            })
    
        data = sha3('totalSupply()')?.slice(0,10) 
        eth.request({method: "eth_call", params: [{to: contractAddress, data: data}, "latest"]})
            .then(resp => {
                console.log("total supply", resp, parseInt(resp))
                setTotalSupply(parseInt(resp))
            })
            .catch(err => {
                throw 'unable to get total supply'
            })
    }

    function renderForm() {
        return <div style={{display: "flex", flexDirection: "column", width: "30vw"}}>
            <div class="field">
                <label class="label">Token Name</label>
                <div class="control">
                    <input class="input is-success" type="text" value={tokenName}/>
                </div>
            </div>
            <div class="field">
                <label class="label">Total Supply</label>
                <div class="control">
                    <input class="input is-success" type="text" value={totalSupply} />
                </div>
            </div>
      </div>
    }

    return <div>
        <p>
            Using metamask, we can query the blockchain direcly by
            calling functions listed in the smart contract for a particular
            coin
        </p>
        <input onChange={(e) => setContractAddress(e.target.value)} className="input" type="text" placeholder="Token Address"></input>
        <button className="button is-primary" onClick={getTokenInfo}>Get Token Info</button>
        {
            tokenName == "" ? null : renderForm()
        }
    </div>
}