#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561.h>
#include <aisa_TSL2561.h>
#include <aisa_Cd5PhotoCell.h>
#include <aisa_TMP36.h>
#include <aisa_DHT.h>

// headers for the wifi module
#include <Adafruit_CC3000.h>
#include <ccspi.h>
#include <SPI.h>
#include <string.h>
#include "utility/debug.h"
#include "config.h"

//const String dataSeparator = ",";
//const String dataTypeTerminator = ":";

const String arduinoName = "outside-deck";

const int LOOP_DELAY = 1000;

Adafruit_CC3000 cc3000 = Adafruit_CC3000(ADAFRUIT_CC3000_CS, ADAFRUIT_CC3000_IRQ, ADAFRUIT_CC3000_VBAT, SPI_CLOCK_DIVIDER);

//aisa_TMP36 * tmp36;
//aisa_Cd5PhotoCell * cd5PhotoCell;
//aisa_TSL2561 * tsl2561;
//aisa_DHT * dht;

void setup()
{
    Serial.begin(115200);

      Serial.println(F("\nInitializing wifi..."));
      if (!cc3000.begin())
      {
        Serial.println(F("Couldn't initialize wifi! Check your wiring?"));
        while(1);
      }

//    cd5PhotoCell = new aisa_Cd5PhotoCell(arduinoName, 0);
//    tmp36 = new aisa_TMP36(arduinoName, 1, 5.0, 100);
//    tsl2561 = new aisa_TSL2561(arduinoName);
//    dht = new aisa_DHT(arduinoName, 5, DHT22);


    Serial.print("Free RAM: "); Serial.println(getFreeRam(), DEC);
}

void sendTmp36Data()
{
//    sendDataType("TMP36");
//    sendSensorName(tmp36->getSensorName());
//    sendSensorPinName(tmp36->getPinName());
//    sendData(tmp36->getVoltage());
//    sendDataEnd(tmp36->getCelcius(false));
}

void sendTsl2561Data()
{
//    sendDataType("TSL2561");
//    sendSensorName(tsl2561->getSensorName());
//    sendSensorPinName(tsl2561->getPinName());
//    sendData(tsl2561->getSensorId());
//    sendData(tsl2561->getLux());
//    sendData(tsl2561->getBroadband());
//    sendDataEnd(tsl2561->getInfrared(false));
}

void sendDhtData()
{
//    sendDataType("DHT");
//    sendSensorName(dht->getSensorName());
//    sendSensorPinName(dht->getPinName());
//    sendData(dht->getTemperature());
//    sendDataEnd(dht->getHumidity());
}

void sendCd5PhotoCellData()
{
//    sendDataType("Cd5");
//    sendSensorName(cd5PhotoCell->getSensorName());
//    sendSensorPinName(cd5PhotoCell->getPinName());
//    sendDataEnd(cd5PhotoCell->getReading());
}

void loop()
{
    if (connectToAp())
    {
        sendTmp36Data();

        sendCd5PhotoCellData();

        sendTsl2561Data();

        sendDhtData();

        testConnect();

        disconnectFromAp();

    }
    else
    {
        Serial.println(F("Failed to connect to AP!"));
    }

    delay(LOOP_DELAY);
}


bool connectToAp()
{
    if (!cc3000.connectToAP(WLAN_SSID, WLAN_PASS, WLAN_SECURITY))
    {
        return false;
    }

    Serial.println(F("Connected to AP!"));

    /* Wait for DHCP to complete */
    Serial.println(F("Request DHCP"));
    while (!cc3000.checkDHCP())
    {
        delay(100); // ToDo: Insert a DHCP timeout!
    }

    /* Display the IP address DNS, Gateway, etc. */
    while (! displayConnectionDetails()) {
        delay(1000);
    }
    return true;
}

void disconnectFromAp()
{
    cc3000.disconnect();
    Serial.println(F("\n\nDisconnected from AP"));
}

void getIpAddress(uint32_t *ip)
{
	*ip = (uint32_t)REST_API_SERVER_OCTET_1 << 24;
	*ip += (uint32_t)REST_API_SERVER_OCTET_2 << 16;
	*ip += (uint32_t)REST_API_SERVER_OCTET_3 << 8;
	*ip += REST_API_SERVER_OCTET_4;
}

bool testConnect()
{
    uint32_t ip;
   getIpAddress(&ip);
   Adafruit_CC3000_Client www = cc3000.connectTCP(ip, REST_API_SERVER_PORT);
   if (www.connected()) {
     www.fastrprint(F("GET "));
     www.fastrprint("/");
     www.fastrprint(F(" HTTP/1.1\r\n"));
     www.fastrprint(F("Host: ")); www.fastrprint("gadfly"); www.fastrprint(F("\r\n"));
     www.fastrprint(F("\r\n"));
     www.println();
   } else {
     Serial.println(F("Connection failed"));
     return false;
   }

   Serial.println(F("-------------------------------------"));

   /* Read data until either the connection is closed, or the idle timeout is reached. */
   unsigned long lastRead = millis();
   while (www.connected() && (millis() - lastRead < IDLE_TIMEOUT_MS)) {
     while (www.available()) {
       char c = www.read();
//       Serial.print(c);
       lastRead = millis();
     }
   }
   www.close();
   Serial.println(F("-------------------------------------"));
   return true;
}


/**************************************************************************/
/*!
    @brief  Tries to read the IP address and other connection details
*/
/**************************************************************************/
bool displayConnectionDetails(void)
{
  uint32_t ipAddress, netmask, gateway, dhcpserv, dnsserv;

  if(!cc3000.getIPAddress(&ipAddress, &netmask, &gateway, &dhcpserv, &dnsserv))
  {
    Serial.println(F("Unable to retrieve the IP Address!\r\n"));
    return false;
  }
  else
  {
    Serial.print(F("\nIP Addr: ")); cc3000.printIPdotsRev(ipAddress);
    Serial.print(F("\nNetmask: ")); cc3000.printIPdotsRev(netmask);
    Serial.print(F("\nGateway: ")); cc3000.printIPdotsRev(gateway);
    Serial.print(F("\nDHCPsrv: ")); cc3000.printIPdotsRev(dhcpserv);
    Serial.print(F("\nDNSserv: ")); cc3000.printIPdotsRev(dnsserv);
    Serial.println();
    return true;
  }
}
