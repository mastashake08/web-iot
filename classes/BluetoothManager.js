import { WebIOT } from './WebIOT'
export class SerialManager extends WebIOT {
  #Serial = {}
  #device = {}
  #server = {}
  #selectedService = {}
  #services = {}
  #characteristic = {}
  #currentValue = null
  constructor (callback = (event)=>{console.log(event)}, debug = false) {
    super(debug)
    navigator.Serial.getAvailability().then((available) => {
      if (available) {
        this.Serial = navigator.Serial

        this.Serial.onadvertisementreceived = callback
      } else {
        alert("Doh! Serial is not supported");
      }
    }).catch((e) => {console.log(e)});

  }

  async getDevices (options = {}) {
    return await navigator.Serial.getDevices(options)
  }
  async requestDevice (options = {acceptAllDevices: true}) {
    try {
      this.device = await navigator.Serial.requestDevice(options)
      return this.device
    } catch(e) {
      alert(e.message)
    }
  }

  async connectToServer (disconnect = (event)=>{console.log(event)}, serviceadded = (event)=>{console.log(event)}) {
    try {
      this.server = await this.device.gatt.connect()
      this.device.gattserverdisconnected = disconnect
      this.device.gatt.serviceadded = serviceadded
    } catch {
      console.log('Could not connect to server')
    }
    
  }

  async getService (service) {
    this.selectedService = await this.server.getPrimaryService(service)
    return this.selectedService
  }

  async getServices () {
    this.services = await this.server.getPrimaryServices()
    return this.services
  }

  async getCharacteristic (char, valueChanged = (event)=>{console.log(event)}) {
    this.characteristic = await this.selectedService.getCharacteristic(char)
    this.characteristic.characteristicvaluechanged = valueChanged
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

  async startLEScan(options = {acceptAllDevices: true}) {
    return await this.Serial.requestLEScan(options)
  }
}
