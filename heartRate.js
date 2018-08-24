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

  async startHeartRateMeasurementNotifications() {
    const service = await this.device.gatt.getPrimaryService(0x180D);
    const characteristic = await service.getCharacteristic(0x2A37); 
    await characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', handleNotifications);
  }

  async stopHeartRateMeasurementNotifications() {
    const service = await this.device.gatt.getPrimaryService(0x180D);
    const characteristic = await service.getCharacteristic(0x2A37); 
    await characteristic.stopNotifications();
    characteristic.removeEventListener('characteristicvaluechanged', handleNotifications);
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
  
  function handleNotifications(event) {
  let value = event.target.value;
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  log('> ' + a.join(' '));
}
  
  
}


var webAnalyzer = new WebAnalyzer();

document.getElementById('startbutton').addEventListener('click', async event => {
  try {
    await webAnalyzer.request();
    await webAnalyzer.connect();
    await startHeartRateMeasurementNotifications();
  } catch(error) {
    console.log(error);
  }
});