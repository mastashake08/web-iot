import { WebIOT } from './WebIOT'
export class NFCManager extends WebIOT {
  #nfc = {}
  constructor (debug = false) {
    super(debug)
    if ('NDEFReader' in window) { /* Scan and write NFC tags */
      this.startNFC()
    } else {
      alert('NFC is not supported in your browser')
    }
  }

  startNFC () {
    this.nfc = new NDEFReader()
  }
  
  async readNFCData (readCb = (event) => {console.log(event)}, errorCb = (event) => console.log(event)) {
    try {
    await this.nfc.scan()
    this.nfc.onreading = readCb
    } catch(e) {
      errorCb(e)
    }
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
