class WebAnalyzer {

  constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
  }
  
  async request() {
    let options = {
      "filters": [{
		"services": [0x180D]
      }]
    };
    this.device = await navigator.bluetooth.requestDevice(options);
    if (!this.device) {
      throw "No device selected";
    }
    this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
  }
  
  async connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    await this.device.gatt.connect();
  }
  
  async readHeartRateMeasurement() {
    const service = await this.device.gatt.getPrimaryService(0x180D);
    const characteristic = await service.getCharacteristic(0x2A37);
    await characteristic.readValue();
  }

  async startHeartRateMeasurementNotifications(listener) {
    const service = await this.device.gatt.getPrimaryService(0x180D);
    const characteristic = await service.getCharacteristic(0x2A37); 
    await characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', listener);
  }

  async stopHeartRateMeasurementNotifications(listener) {
    const service = await this.device.gatt.getPrimaryService(0x180D);
    const characteristic = await service.getCharacteristic(0x2A37); 
    await characteristic.stopNotifications();
    characteristic.removeEventListener('characteristicvaluechanged', listener);
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log('Device is disconnected.');
  }
}


var webAnalyzer = new WebAnalyzer();

document.getElementById('startbutton').addEventListener('click', async event => {
  try {
    await webAnalyzer.request();
    await webAnalyzer.connect();
    /* Do something with webAnalyzer... */
  } catch(error) {
    console.log(error);
  }
});