export class USBManager {
  #devices = {}
  #selectedDevice = {}
  constructor () {

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

  async writeData(endpointNumber, data) {}
  async readData(endpointNumber, data) {}
}
