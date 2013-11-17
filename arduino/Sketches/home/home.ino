
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561.h>
#include <aisa_TSL2561.h>
#include <aisa_Cd5PhotoCell.h>
#include <aisa_TMP36.h>
#include <aisa_DHT.h>

const String dataSeparator = ",";
const String dataTypeTerminator = ":";

aisa_TMP36 * tmp36;
aisa_Cd5PhotoCell * cd5PhotoCell;
aisa_TSL2561 * tsl2561;
aisa_DHT * dht;

void setup()
{
    Serial.begin(57600);

    cd5PhotoCell = new aisa_Cd5PhotoCell("cd5", 0);
    tmp36 = new aisa_TMP36("tmp36", 1, 5.0, 100);
    tsl2561 = new aisa_TSL2561("tsl2561");

    dht = new aisa_DHT("dht", 5, DHT22);
}

void sendDataSeparator() 
{
    Serial.print(dataSeparator);
}

void sendDataType(String type) 
{
    Serial.print(type);
    Serial.print(dataTypeTerminator);
}

void sendSensorName(String name) 
{
    sendData(name);
}

void sendSensorPinName(String name)
{
    sendData(name);
}

void sendData(String data)
{
    Serial.print(data);
    sendDataSeparator();
}

void sendData(float data)
{
    Serial.print(data);
    sendDataSeparator();
}

void sendData(int data) 
{
    Serial.print(data);
    sendDataSeparator();
}

void sendDataEnd(int data) 
{
    Serial.println(data);
}

void sendTmp36Data() 
{
    sendDataType("TMP36");
    sendSensorName(tmp36->getSensorName());
    sendSensorPinName(tmp36->getPinName());
    sendData(tmp36->getVoltage());
    sendDataEnd(tmp36->getCelcius(false));
}

void sendTsl2561Data()
{
    sendDataType("TSL2561");
    sendSensorName(tsl2561->getSensorName());
    sendSensorPinName(tsl2561->getPinName());
    sendData(tsl2561->getSensorId());
    sendData(tsl2561->getLux());
    sendData(tsl2561->getBroadband());
    sendDataEnd(tsl2561->getInfrared(false));
}

void sendDhtData()
{
    sendDataType("DHT");
    sendSensorName(dht->getSensorName());
    sendSensorPinName(dht->getPinName());
    sendData(dht->getTemperature());
    sendDataEnd(dht->getHumidity());
}

void sendCd5PhotoCellData()
{
    sendDataType("Cd5");
    sendSensorName(cd5PhotoCell->getSensorName());
    sendSensorPinName(cd5PhotoCell->getPinName());
    sendDataEnd(cd5PhotoCell->getReading());
}

void loop()
{
    sendTmp36Data();

    sendCd5PhotoCellData();

    sendTsl2561Data();

    sendDhtData();

    delay(5000);
}





