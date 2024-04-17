import { connect, MqttClient } from 'mqtt';

export class ApagaraMQTT {
async run():Promise<string>{
  const client: MqttClient = connect('mqtt://54.147.21.63:1883');

// Maneja los eventos de conexión
await client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  
  // Publica un mensaje en el tópico "/prueba/+"
  client.publish('/prueba/santos', 'Apagalo oto', (err) => {
    if (err) {
      console.error('Error al publicar el mensaje:', err);
      client.end();
      return "error:"+ err
    } else {
      console.log('Mensaje publicado correctamente');
      client.end();
      return "Mensaje publicado correctamente"

    }
    
  });
});

// Maneja los eventos de error
client.on('error', (error) => {
  console.error('Error en la conexión MQTT:', error);
});
return ""
}
}
