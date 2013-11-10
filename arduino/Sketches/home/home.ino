
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561.h>
#include <aisa_TSL2561.h>
#include <aisa_Cd5PhotoCell.h>
#include <aisa_TMP36.h>
#include <aisa_DHT.h>

aisa_TMP36 * tmp36;
aisa_Cd5PhotoCell * cd5PhotoCell;
aisa_TSL2561 * tsl2561;
aisa_DHT * dht;

void setup()
{
    Serial.begin(57600);

    cd5PhotoCell = new aisa_Cd5PhotoCell(0);
    tmp36 = new aisa_TMP36(1, 5.0, 100);
    tsl2561 = new aisa_TSL2561();

    dht = new aisa_DHT(5, DHT22);
}

void loop()
{
    tmp36->takeReading();
    tmp36->toSerial();

    cd5PhotoCell->takeReading();
    cd5PhotoCell->toSerial();

    tsl2561->takeReading();
    tsl2561->toSerial();

    dht->toSerial();

    Serial.println();

    delay(5000);
}



