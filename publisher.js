const mqtt = require('mqtt');

require('dotenv').config();


const clientId = 'mqttjs_' + Math.random().toString(8).substr(2, 4)

const client  = mqtt.connect(process.env.BROKER_URL, {clientId: clientId, clean: false});

console.log(process.env.BROKER_URL, 'client', clientId);

const topicName = 'teste/dia';

client.on("connect",function(connack){	
   console.log("Cliente conectado", connack);

// on client conection publish messages to the topic on the server/broker 

  const payload = {1: "Hello world", 2: "Hoje o céu está azul"}

  client.publish(topicName, JSON.stringify(payload), {qos: 1, retain: true}, (PacketCallback, err) => {
      if(err) {
          console.log(err, 'MQTT publicar pacote');
      }
  })

  //assumming messages comes in every 3 seconds to our server and we need to publish or proecess these messages
  setInterval(() => console.log("Mensagem publicada"), 3000);

})

client.on("error", function(err) {
    console.log("Error: " + err)
    if(err.code == "ENOTFOUND") {
        console.log("Erro de rede, verifique se você tem uma conexão ativa com a internet");
    }
})

client.on("close", function() {
    console.log("Conexão fechada pelo cliente");
})


client.on("reconnect", function() {
    console.log("Cliente tentando uma reconexão");
})

client.on("offline", function() {
    console.log("Cliente está offline");
})