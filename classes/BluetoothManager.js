import { WebIOT } from './WebIOT'
export class BluetoothManager extends WebIOT {
  #bluetooth = {}
  #device = {}
  #server = {}
  #selectedService = {}
  #services = {}
  #characteristic = {}
  #currentValue = null
  constructor (callback = ()=>({}), debug = false) {
    super(debug)
    navigator.bluetooth.getAvailability().then((available) => {
      if (available) {
        this.bluetooth = navigator.bluetooth

        this.bluetooth.onadvertisementreceived = callback
      } else {
        alert("Doh! Bluetooth is not supported");
      }
    }).catch((e) => {console.log(e)});

  }

  async requestDevice (options = {acceptAllDevices: true}) {
    return await this.requestDevice(options)
  }
  async getDevices (options = {}) {
    return await navigator.bluetooth.getDevices(options)
  }
  async requestDevice (options) {
    try {
      this.device = await navigator.bluetooth.requestDevice(options)
      return this.device
    } catch(e) {
      alert(e.message)
    }
  }

  async connectToServer () {
    this.server = await this.device.gatt.connect()
  }

  async getService (service) {
    this.selectedService = await this.server.getPrimaryService(service)
    return this.selectedService
  }

  async getServices () {
    this.services = await this.server.getPrimaryServices()
    return this.services
  }

  async getCharacteristic (char) {
    this.characteristic = await this.selectedService.getCharacteristic(char)
    return this.characteristic
  }

  async getCharacteristics () {
    return await this.selectedService.getCharacteristics()
  }

  async getValue () {
    this.currentValue = await this.characteristic.readValue()
    return this.currentValue
  }

  async writeValue(data) {
    await this.characteristic.writeValue(data)
  }

  startLEScan(options) {
    this.bluetooth.requestLEScan(options)
  }
}
