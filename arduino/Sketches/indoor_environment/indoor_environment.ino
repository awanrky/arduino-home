#include <SPI.h>
#include <Ethernet.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085.h>
#include <aisa_BMP180.h>
#include <aisa_DHT.h>
#include <aisa_ethernet.h>
#include <string.h>

byte mac[] = {0x90, 0xA2, 0xDA, 0x0E, 0xF6, 0x8E};

IPAddress server(192,168,1,247);
int serverPort = 1337;

aisa_ethernet * ethernet;

char parameters[110];

//char * dhtJson = "{\"sensorName\": \"%s\", \"degreesCelcius\": %s, \"humidity\": %s}";

aisa_BMP180 * bmp;
//aisa_DHT * dht;

const char * arduinoName = "living-room";

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
//    dht = new aisa_DHT(arduinoName, 2);

    Serial.println(F("done"));
}

void loop()
{
    Serial.println((int)getFreeRam);
//    takeDhtReading();
    takeBmp180Reading();
    takeCd5Reading();

    delay(10000);
}

int getFreeRam(void)
{
  extern int  __bss_end;
  extern int  *__brkval;
  int free_memory;
  if((int)__brkval == 0) {
    free_memory = ((int)&free_memory) - ((int)&__bss_end);
  }
  else {
    free_memory = ((int)&free_memory) - ((int)__brkval);
  }

  return free_memory;
}

void takeCd5Reading()
{
    Serial.print("Cd5");

    int reading = analogRead(3);

    sprintf(parameters,
        "{\"sensorName\": \"living-room\", \"reading\": %d}",
        reading);

    Serial.println(parameters);

    if (ethernet->post(server, serverPort, "/api/v1/arduino-home/cd5", parameters))
    {
        Serial.println(" Created");
    }
    else
    {
        Serial.println(" unable to post");
    }
}

//void takeDhtReading()
//{
////    char parameters[110];
//
//    Serial.print("DHT:");
////
////    dht->getReading();
//    float degreesCelcius = dht->getTemperature(false);
//    float humidity = dht->getHumidity(false);
////
//    char degreesCelciusBuffer[15];
//    char humidityBuffer[15];
////
//    dtostrf(degreesCelcius, 1, 2, degreesCelciusBuffer);
//    dtostrf(humidity, 1, 2, humidityBuffer);
////
////    sprintf(parameters,
////        dhtJson,
////        arduinoName,
////        degreesCelciusBuffer,
////        humidityBuffer);
////
//    Serial.println(parameters);
//
//    if (ethernet->post(server, serverPort, "/api/v1/arduino-home/dht", parameters))
//    {
//        Serial.println(" Created");
//    }
//    else
//    {
//        Serial.println(" unable to post");
//    }
//}

void takeBmp180Reading()
{
//    char parameters[110];

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

    sprintf(parameters,
        "{\"sensorName\": \"outside-deck\", \"degreesCelcius\": %s, \"hectoPascals\": %s, \"altitudeInMeters\": %s}",
        degreesCelciusBuffer,
        hectoPascalsBuffer,
        altitudeInMetersBuffer);

    Serial.println(parameters);

    if (ethernet->post(server, serverPort, "/api/v1/arduino-home/bmp180", parameters))
    {
        Serial.println(F(" Created"));
    }
    else
    {
        Serial.println(F(" unable to post"));
    }
}