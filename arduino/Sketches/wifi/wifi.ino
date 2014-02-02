#include <Arduino.h>

//#include <Wire.h>
//#include <Adafruit_Sensor.h>
//#include <Adafruit_TSL2561.h>
//#include <aisa_TSL2561.h>
//#include <aisa_Cd5PhotoCell.h>
//#include <aisa_TMP36.h>
//#include <aisa_DHT.h>

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085.h>
#include <aisa_BMP180.h>

#include <Adafruit_CC3000.h>
#include <ccspi.h>
#include <SPI.h>
#include <string.h>
#include "utility/debug.h"

#include <aisa_CC3000.h>

#include "./config.h"

aisa_CC3000 * cc3000;
aisa_BMP180 * bmp;

String sensorName = "outside-deck";

void setup(void)
{
    Serial.begin(115200);
    Serial.println(F("Hello, CC3000!\n"));

    cc3000 = new aisa_CC3000(AISA_WIFI_IRQ, AISA_WIFI_VBAT, AISA_WIFI_CS);

    bmp = new aisa_BMP180(sensorName);

    initializeWifi();

  /* You need to make sure to clean up after yourself or the CC3000 can freak out */
  /* the next time your try to connect ... */
//  Serial.println(F("\n\nDisconnecting"));
//  cc3000->disconnect();

}

void loop(void)
{
    Serial.print("Free RAM: "); Serial.println(getFreeRam(), DEC);

    if (initializeWifi())
    {
        Serial.print("Testing POST: ");
        Serial.println(cc3000->tcpPost(192, 168, 13, 14, 1337, "/api/v1/arduino-home/invalid", "data=testdata&returnedType=blah!"));
        Serial.print("Error State: ");
        Serial.println(cc3000->getErrorState());

        takeBmp180Reading();

//        cc3000->disconnect();
    }
    delay(10000);
}

void takeBmp180Reading()
{
//    float degreesCelcius = bmp->getDegreesCelcius();
//    float hectoPascals = bmp->getHectoPascals();
//    float altitudeInMeters = bmp->getAltitudeInMeters();
//
//    String parameters = "sensorName=";
//    parameters = parameters +
//        sensorName +
//        "&degreesCelcius=" +
//        degreesCelcius +
//        "&hectoPascals=" +
//        hectoPascals +
//        "&altitudeInMeters=" +
//        altitudeInMeters;

//    Serial.println(cc3000->tcpPost(192, 168, 13, 14, 1337, "/api/v1/arduino-home/bmp180", parameters));
    Serial.print("Error State: ");
    Serial.println(cc3000->getErrorState());
}

/**************************************************************************/
/*!
    @brief  Tries to read the IP address and other connection details
*/
/**************************************************************************/
//bool displayConnectionDetails(void)
//{
//    if (cc3000->getAddress())
//    {
//        Serial.print(F("\nIP Addr: ")); Serial.print(cc3000->getIpAddressString(false));
//        Serial.print(F("\nNetmask: ")); Serial.print(cc3000->getNetmaskString(false));
//        Serial.print(F("\nGateway: ")); Serial.print(cc3000->getGatewayString(false));
//        Serial.print(F("\nDHCPsrv: ")); Serial.print(cc3000->getDhcpServerString(false));
//        Serial.print(F("\nDNSserv: ")); Serial.print(cc3000->getDnsServerString(false));
//        Serial.println();
//        return true;
//    }
//
//    Serial.println(F("Could not get IP Address"));
//    return false;
//}

bool initializeWifi()
{
    if (cc3000->checkConnected())
    {
        return true;
    }

    if (!cc3000->initialize())
    {
        Serial.println(F("couldn't initialize wifi"));
//        while(1);
        return false;
    }

    if (!cc3000->connectToNetwork(WLAN_SSID, WLAN_PASS, WLAN_SECURITY))
    {
        Serial.println(F("Could not connect to network!"));
//        while(1);
        return false;
    }

    Serial.println(F("Connected!"));

    /* Display the IP address DNS, Gateway, etc. */
//    while (! displayConnectionDetails()) {
//        delay(1000);
//    }
    return true;
}
