const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
app.use(cors());
app.use(express.json());

const balances = {
  "04b83fe916f9696403ab2ade4b6b06508f674a8a1e5ae32cde8afbd07de606892b749c1850069e739ec5139a73e6c5223a6128b8dbdaaed3916cfdb47f103f04c0": 100,
  "046d091bda1c04173c5b39272157aee88cfb02c0b88865a2594efd8ea4c2b50e9e3a1b07db7c864914355ba8e9acbf0b70b33683b4165f7fa515c9f457935cd942": 50,
  "04f24a12440bd068fa8591a6c2c85abc4336bfe8c52ac0546de96e5bc7cf826280905e3536594422f74e3ad80e13882504565e42fa4921ec6d39a43484b009da90": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  console.log("sender", sender)
  console.log("receiver", recipient)
  const getPublickKey =  toHex(secp.getPublicKey(recipient))

  setInitialBalance(sender);
  setInitialBalance(getPublickKey);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[getPublickKey] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
