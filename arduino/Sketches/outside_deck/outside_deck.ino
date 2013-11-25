#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <aisa_Cd5PhotoCell.h>
#include <aisa_TMP36.h>

const String dataSeparator = ",";
const String dataTypeTerminator = ":";

const String arduinoName = "outside-deck";

aisa_TMP36 * tmp36;
aisa_Cd5PhotoCell * cd5PhotoCell;

void setup()
{
    Serial.begin(57600);

    cd5PhotoCell = new aisa_Cd5PhotoCell(arduinoName, 4);
    tmp36 = new aisa_TMP36(arduinoName, 5, 5.0, 100);
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

    delay(5000);
}
