export default class WebIOT {
  nfc = {}
  constructor () {}

  //Serial
  startSerialConnection (vendorId, cb) {}
  getAvailableSerialPorts () {}
  readSerialData (port, success, over = () => {}, failure = (error) => {console.log(error)}) {}
  writeSerialData (port, cb) {}

  //USB
  getUSBDevices() {}
  startBluetoothConnection (vendorId, cb) {}

  //NFC
  startNFC () {
    this.nfc = new NDEFReader()
  }
  async readNFCData (readCb, errorCb = (event) => console.log(event)) {
    this.nfc.onreading = readCb()
    await this.nfc.scan()
  }
  async writeNFCData (records, errorCb = (event) => console.log(event)) {
    try {
      await this.nfc.write(records)
    } catch (e) {
      errorCb(e)
    }
  }
  async lockNFCTag(errorCb = (event) => console.log(event)) {
    try {
      await this.nfc.makeReadOnly()
    } catch(e) {
      errorCb(e)
    }
  }
  static generateNFC () {
    return new NDEFReader()
  }
}
