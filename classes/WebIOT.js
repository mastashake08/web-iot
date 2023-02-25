import { NFCManager } from './NFCManager'
export class WebIOT {
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
    this.nfc = new NFCManager()
  }
  readNFCData (readCb, errorCb = (event) => console.log(event)) {
    this.nfc.readNFCData(readCb, errorCb)
  }
  writeNFCData (records, errorCb = (event) => console.log(event)) {
    this.nfc.writeNFCData(records, errorCb)
  }
  lockNFCTag(errorCb = (event) => console.log(event)) {
    this.nfc.lockNFCTag(errorCb)
  }
  static generateNFC () {
    return new NFCManager()
  }
}
