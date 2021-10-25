import {utils} from "web3"

export function hex2a(str) {
    var hex = str.toString()
    var res = ''
    for (var i = 0; i < hex.length; i += 2)
        res += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    return res
}

export function sha3(str) {
    return utils.sha3(str)
}