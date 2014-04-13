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

const String arduinoName = "outside-deck";

const int LOOP_DELAY = 1000;

uint32_t apiServerIpAddress;

Adafruit_CC3000 cc3000 = Adafruit_CC3000(ADAFRUIT_CC3000_CS, ADAFRUIT_CC3000_IRQ, ADAFRUIT_CC3000_VBAT, SPI_CLOCK_DIVIDER);

//aisa_TMP36 * tmp36;
//aisa_Cd5PhotoCell * cd5PhotoCell;
//aisa_TSL2561 * tsl2561;
//aisa_DHT * dht;

void setup()
{
    Serial.begin(115200);

    getIpAddress(&apiServerIpAddress);

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

//        testConnect();
        if (testPost())
        {
            Serial.println(F("Successful post"));
        }
        else
        {
            Serial.println(F("Post error"));
        }

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

bool testPost()
{
    char c;
    String readBuffer = "";
    unsigned long lastRead;
    unsigned long idleTimeoutMilliseconds = 10000;
    bool returnValue = false;
    char parameters[] = "{\"sensorName\": \"outside-deck\", \"data\": \"this is the test data\"}";

    Adafruit_CC3000_Client www = cc3000.connectTCP(apiServerIpAddress, REST_API_SERVER_PORT);
    if (!www.connected())
    {
        return returnValue;
    }

    String statusCode = "";

    Serial.println(F("Connected"));

    www.fastrprint(F("POST "));
    www.fastrprint(F("/api/v1/arduino-home/test"));
    www.fastrprint(F(" HTTP/1.1\r\n"));

    www.fastrprint(F("Host: blah\r\n"));

    www.fastrprint(USER_AGENT);

    www.fastrprint(F("Content-Type: application/x-www-form-urlencoded\r\n"));

    www.fastrprint(F("Content-Length: "));
    www.print(strlen(parameters));
    www.fastrprint(F("\r\n\r\n"));

    www.fastrprint(parameters);

    www.fastrprint(F("\r\n\r\n"));
//    www.println();

    Serial.println(F("Posted"));

    lastRead = millis();
    while (www.connected() && (millis() - lastRead < idleTimeoutMilliseconds))
    {
        while (www.available() && (millis() - lastRead < idleTimeoutMilliseconds))
        {
            c = www.read();
            lastRead = millis();
            readBuffer = readBuffer + c;
            Serial.print(c);

            if (c == '\r' || c == '\n')
            {
                if (readBuffer.substring(9, 12) == "201")
                {
                    returnValue = true;
                };
                lastRead = (millis() + idleTimeoutMilliseconds + 2);
            }
        }
    }

    www.close();
    return returnValue;
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
