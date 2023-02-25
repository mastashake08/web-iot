export class SerialManager {
  #ports = {}
  #selectedPort = {}
  constructor () {

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
    await this.selectedPort.open(options)
  }

  async closePort(options) {
    await this.selectedPort.close()
  }

  async getInfo() {
    await this.selectedPort.getInfo()
  }

  async setSignals(options) {
    await this.selectedPort.setSignals(options)
  }

  async getSignals() {
    return await this.selectedPort.getSignals()
  }
}
