import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"
function Wallet({ address, setAddress, balance, setBalance, setPrivatekey ,privatekey}) {
  async function onChange(evt) {
    const privatekey = evt.target.value;
    setPrivatekey(privatekey)
    const address= toHex(secp.getPublicKey(privatekey))
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={privatekey} onChange={onChange}></input>
      </label>
      <div>{address.slice(0, 10)} ...</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
