// Install required packages:
// npm install @stomp/stompjs sockjs-client

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const BarcodeDisplay = () => {
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://192.168.10.9:8080/ws"),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      client.subscribe("/topic/barcodes", (message) => {
        setBarcode(message.body);
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div>
      <h2>Scanned Barcode:</h2>
      <p>{barcode}</p>
    </div>
  );
};

export default BarcodeDisplay;
