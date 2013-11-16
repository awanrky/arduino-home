
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
    Serial.print("TMP36:");
    Serial.print(tmp36->getVoltage());
    Serial.print(",");
    Serial.println(tmp36->getCelcius(false));

    Serial.print("Cd5:");
    Serial.println(cd5PhotoCell->getReading());

    Serial.print("TSL2561:");
    Serial.print(tsl2561->getLux());
    Serial.print(",");
    Serial.print(tsl2561->getBroadband());
    Serial.print(",");
    Serial.println(tsl2561->getInfrared(false));

    Serial.print("DHT:");
    Serial.print(dht->getTemperature());
    Serial.print(",");
    Serial.println(dht->getHumidity());

    Serial.println();

    delay(5000);
}



