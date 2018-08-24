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

  
  
  var myCharacteristic;
  
  async startHeartRateMeasurementNotifications() {
	const service = await server.getPrimaryService(0x180D);
    myCharacteristic = await service.getCharacteristic(0x2A37);
    await myCharacteristic.startNotifications();

    log('> Notifications started');
    myCharacteristic.addEventListener('characteristicvaluechanged',
        handleNotifications);
  } catch(error) {
    log('Argh! ' + error);
  }
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
	await webAnalyzer.startHeartRateMeasurementNotifications();
    /* Do something with webAnalyzer... */
  } catch(error) {
    console.log(error);
  }
});