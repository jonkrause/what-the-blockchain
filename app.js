const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previoushash = '') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previoushash = previoushash
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.previoushash +
      this.timestamp +
      JSON.stringify(this.data)).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, "01/04/2017", "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previoushash = this.getLatestBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }
}

let coin = new Blockchain()
coin.addBlock(new Block(1, "01/04/2017", { amount: 4 }))
coin.addBlock(new Block(2, "01/05/2017", { amount: 12 }))

console.log(JSON.stringify(coin, null, 4))