#include <SPI.h>
#include <Ethernet.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085.h>
#include <aisa_BMP180.h>
#include <aisa_ethernet.h>
#include <string.h>

byte mac[] = {0x90, 0xA2, 0xDA, 0x0E, 0xF6, 0x8E};

IPAddress server(192,168,13,14);

//EthernetClient client;

aisa_ethernet * ethernet;

aisa_BMP180 * bmp;

const String arduinoName = "indoor_environment";

void setup()
{
    Serial.begin(57600);

    Serial.print(F("initializing..."));

    ethernet = new aisa_ethernet(mac);

    if(!ethernet->initialize())
    {
        Serial.println(F("Failed to configure ethernet"));
        while(1){}
    }

    delay(1000);

    bmp = new aisa_BMP180(arduinoName);

    Serial.println(F("done"));
}

void loop()
{
    takeBmp180Reading();

    delay(60000);
}


void takeBmp180Reading()
{
    char parameters[110];

    Serial.print(F("BMP180:"));

    float degreesCelcius = bmp->getDegreesCelcius();
    float hectoPascals = bmp->getHectoPascals();
    float altitudeInMeters = bmp->getAltitudeInMeters();

    char degreesCelciusBuffer[15];
    char hectoPascalsBuffer[15];
    char altitudeInMetersBuffer[15];

    dtostrf(degreesCelcius, 1, 2, degreesCelciusBuffer);
    dtostrf(hectoPascals, 1, 2, hectoPascalsBuffer);
    dtostrf(altitudeInMeters, 1, 2, altitudeInMetersBuffer);

    int contentLength = sprintf(parameters,
        "{\"sensorName\": \"outside-deck\", \"degreesCelcius\": %s, \"hectoPascals\": %s, \"altitudeInMeters\": %s}",
        degreesCelciusBuffer,
        hectoPascalsBuffer,
        altitudeInMetersBuffer);

    if (ethernet->post(server, 1337, "/api/v1/arduino-home/bmp180", parameters))
    {
        Serial.println(F(" Created"));
    }
    else
    {
        Serial.println(F(" error"));
    }
}