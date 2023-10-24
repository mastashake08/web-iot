import { WebIOT } from './WebIOT'
export class SerialManager extends WebIOT {
  #ports = {}
  #selectedPort = {}
  constructor (debug = false) {
    if ('serial' in navigator) { /* Scan and write NFC tags */
    super(debug)
  } else {
    alert('Serial is not supported in your browser')
  }
  }

  async getPorts () {
    this.ports = await navigator.serial.getPorts()
    return this.ports
  }

  async requestPort(options = {}) {
    this.selectedPort = this.selectedPort = await navigator.serial.requestPort(options)
    return this.selectedPort
  }

  async openPort(options) {
    return await this.selectedPort.open(options)
  }

  async closePort(options) {
    await this.selectedPort.close()
  }

  async getInfo() {
    return await this.selectedPort.getInfo()
  }

  async setSignals(options) {
    await this.selectedPort.setSignals(options)
  }

  async getSignals() {
    return await this.selectedPort.getSignals()
  }

  async readData () {
    
    while(this.selectedPort.readable){
      try {
        const reader = this.selectedPort.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            console.log('done')
            reader.releaseLock();
            break;
          }
          console.log(value.buffer)
          console.log(done)
          // value is a Uint8Array.
          return value
        }
      } catch (e) {

      }
      
    }
    
  }

  async writeData(data) {
    const writer = this.selectedPort.writable.getWriter();
    
    await writer.write(data);
    // Allow the serial port to be closed later.
    
    writer.releaseLock();
  }
}
