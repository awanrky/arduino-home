#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085.h>
#include <aisa_BMP180.h>

const String dataSeparator = ",";
const String dataTypeTerminator = ":";

const String arduinoName = "outside-deck";

aisa_BMP180 * bmp;

void setup()
{
    Serial.begin(57600);

    bmp = new aisa_BMP180(arduinoName);
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

void sendBmp180Data()
{
    sendDataType("BMP180");
    sendSensorName(bmp->getSensorName());
    sendSensorPinName(" ");
    sendData(bmp->getDegreesCelcius());
    sendData(bmp->getHectoPascals());
    sendDataEnd(bmp->getAltitudeInMeters());
}



void loop()
{
    sendBmp180Data();

    delay(60000);
}





