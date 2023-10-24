import { WebIOT } from './WebIOT'
export class USBManager extends WebIOT{
  #devices = {}
  #selectedDevice = {}
  constructor (debug = false) {
    if('usb' in navigator) {

    } else {
      alert('USB not available on this device')
    }
    super(debug)
  }

  async getDevices () {
    this.devices = await navigator.usb.getDevices()
    return this.devices
  }

  async requestDevice(options = {}) {
    this.selectedDevice = this.selectedDevice = await navigator.usb.requestDevice(options)
    return this.selectedDevice
  }

  async openDevice() {
    await this.connectDevice()
  }

  async closeDevice(options) {
    await this.selectedDevice.close()
  }

  async connectDevice() {
    await this.selectedDevice.open();
    if (this.selectedDevice.configuration === null)
      await this.selectedDevice.selectConfiguration(1);
    await this.selectedDevice.claimInterface(0);
    return this.selectedDevice

  }

  async writeData(endpointNumber, data) {
    return await this.selectedDevice.transferOut(endpointNumber, data)
  }
  async readData(endpointNumber, data) {
    return await this.selectedDevice.transferIn(endpointNumber, data)
  }
}
