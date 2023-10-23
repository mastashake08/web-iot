export class WebIOT {
  debug = false
  constructor(debug = false) {
    this.debug = debug
  }
  sendData (url, options = {}, type='fetch') {
      try {
        switch (type) {
          case 'fetch':
            return this.sendFetch(url, options)
            break;
          case 'beacon':
            return this.sendBeacon(url, options)
            break;
          default:
            return this.sendFetch(url, options)
        }
      } catch (e) {
        this.handleError(e)
      }
  }

  sendBeacon (url, data) {
    try {
      navigator.sendBeacon(url, data)
    } catch (e) {
      this.handleError(e)
    }
  }

  async sendFetch(url, options) {
    try {
      const res = await fetch(url, options)
      if (res.status != 200) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      } else {
        return res
      }
    } catch (e) {
      this.handleError(e)
    }
  }

  handleError (e) {
    if(this.debug) {
      alert(e.message)
      console.log(e.message)
    } else {
      throw e
    }
  }

  logData() {}
}
