#include <SPI.h>
#include <Ethernet.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085.h>
#include <aisa_BMP180.h>
#include <string.h>

byte mac[] = {0x90, 0xA2, 0xDA, 0x0E, 0xF6, 0x8E};

IPAddress server(192,168,13,14);

EthernetClient client;

aisa_BMP180 * bmp;

const String arduinoName = "indoor_environment";

void setup()
{
    Serial.begin(57600);


    Serial.println(F("configuring ethernet..."));
    if (Ethernet.begin(mac) == 0)
    {
        Serial.println(F("Failed to configure Ethernet using DHCP"));
        while(1){}
    }

    delay(1000);
    Serial.println(F("ethernet configured."));

    bmp = new aisa_BMP180(arduinoName);

}

void loop()
{
    takeBmp180Reading();

    delay(5000);
}


void takeBmp180Reading()
{
    char parameters[110];
    char request[260];

    float degreesCelcius = bmp->getDegreesCelcius();
    float hectoPascals = bmp->getHectoPascals();
    float altitudeInMeters = bmp->getAltitudeInMeters();

    char degreesCelciusBuffer[15];
    char hectoPascalsBuffer[15];
    char altitudeInMetersBuffer[15];

    dtostrf(degreesCelcius, 1, 2, degreesCelciusBuffer);
    dtostrf(hectoPascals, 1, 2, hectoPascalsBuffer);
    dtostrf(altitudeInMeters, 1, 2, altitudeInMetersBuffer);


//    int length = sprintf(parameters, "sensorName=outside-deck&degreesCelcius=%s&hectoPascals=%s&altitudeInMeters=%s",
    int contentLength = sprintf(parameters,
        "{\"sensorName\": \"outside-deck\", \"degreesCelcius\": %s, \"hectoPascals\": %s, \"altitudeInMeters\": %s}",
        degreesCelciusBuffer,
        hectoPascalsBuffer,
        altitudeInMetersBuffer);

    Serial.println(parameters);
    Serial.print(F("Length: "));
    Serial.println(contentLength);


    int requestLength = sprintf(request,
        "POST /api/v1/arduino-home/bmp180 HTTP/1.1\r\nHost: blah\r\nUser-Agent: arduino-ethernet\r\nContent-Length: %d\r\nContent-Type: application/json\r\n\r\n%s\r\n",
        contentLength,
        parameters);

    Serial.println(F("start request -------------"));
    Serial.println(request);
    Serial.println(F("end request ---------------"));

    Serial.print(F("Request length: "));
    Serial.println(requestLength);

    if (client.connect(server, 1337))
    {
        Serial.println(F("connected to server..."));

        client.print(request);
//        client.println(F("Connection: close"));

        while(!client.available()){}

        while(client.available())
        {
            char c = client.read();
            Serial.print(c);
        }

        Serial.println();
        Serial.println();
    }
    else
    {
        Serial.println(F("unable to connect to server"));
    }
    client.stop();
    Serial.println("-----------");
}