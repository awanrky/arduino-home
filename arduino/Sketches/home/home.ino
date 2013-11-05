#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561.h>

class TMP36
{
    public:
    int pin;                 // analog - 10mV / degree C with a 500mV offset (offset to allow for negative temperatures)
    float suppliedVoltage;   // 3.3 or 5.0 (depending on voltage supplied to sensor)
    int readingDelay;        // takes two readings, with delay in between, to see if readings become more consistent

    int analogReading;

    TMP36(int analogPin, float voltagePin, int delay)
    {
        pin = analogPin;
        suppliedVoltage = voltagePin;
        readingDelay = delay;
    };

    void setReading(int reading)
    {
        analogReading = reading;
    }

    void takeReading()
    {
        analogReading = analogRead(pin);
        delay(readingDelay);
        analogReading = analogRead(pin);
    }

    float voltage()
    {
        return analogReading * suppliedVoltage / 1024.0;
    }

    float celcius()
    {
        return (voltage() - 0.5) * 100;
    }

    float fahrenheit()
    {
        return (celcius() * 9.0 / 5.0) + 32.0;
    }

    void toSerial()
    {
        Serial.print("TMP36--volts: ");
        Serial.print(voltage());
        Serial.print(", Degrees C: ");
        Serial.print(celcius());
        Serial.print(", Degrees Fahreinheit: ");
        Serial.print(fahrenheit());
        Serial.println(".");
    }
};

class Cd5PhotoCell
{
    public:
    int pin;
    int reading;

    Cd5PhotoCell(int analogPin)
    {
        pin = analogPin;
    }

    void takeReading()
    {
        reading = analogRead(pin);
    }

    void toSerial()
    {
        Serial.print("Cd5 Photo Cell--");
        Serial.println(reading);
    }
};

class TSL2561
{
    void initialize(uint8_t address, int32_t id)
    {
        i2cAddress = address;
        sensorId = id;
        tsl = new Adafruit_TSL2561(address, id);

        /* You can also manually set the gain or enable auto-gain support */
        // tsl->setGain(TSL2561_GAIN_1X);      /* No gain ... use in bright light to avoid sensor saturation */
        // tsl->setGain(TSL2561_GAIN_16X);     /* 16x gain ... use in low light to boost sensitivity */
        tsl->enableAutoGain(true);          /* Auto-gain ... switches automatically between 1x and 16x */

        /* Changing the integration time gives you better sensor resolution (402ms = 16-bit data) */
        tsl->setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS);      /* fast but low resolution */
//        tsl->setIntegrationTime(TSL2561_INTEGRATIONTIME_101MS);  /* medium resolution and speed   */
//        tsl->setIntegrationTime(TSL2561_INTEGRATIONTIME_402MS);  /* 16-bit data but slowest conversions */

        initialized = false;
        if(tsl->begin())
        {
            initialized = true;
        }
    }

    void getLuminosity()
    {
        broadband = 0;
        infrared = 0;

        tsl->getLuminosity(&broadband, &infrared);
    }

    public:
    uint8_t i2cAddress;
    int32_t sensorId;

    Adafruit_TSL2561 * tsl;
    bool initialized;
    sensors_event_t event;

    uint16_t broadband;
    uint16_t infrared;

    TSL2561(uint8_t address, int32_t id)
    {
        initialize(address, id);
    }

    TSL2561(uint8_t address)
    {
        initialize(address, 2112);
    }

    TSL2561()
    {
        initialize(TSL2561_ADDR_FLOAT, 2112);
    }

    bool takeReading()
    {
        if(!initialized) { return false; }
        tsl->getEvent(&event);
    }

    int getLux()
    {
        return event.light;
    }

    int getInfrared()
    {
        getLuminosity();
        return infrared;
    }

    int getBroadband()
    {
        getLuminosity();
        return broadband;
    }

    void toSerial()
    {
        Serial.print("TSL2561--Lux: ");
        Serial.print(getLux());
        Serial.print(", Broadband: ");
        Serial.print(getBroadband());
        Serial.print(", Infrared: ");
        Serial.print(getInfrared());
        Serial.println(".");
    }
};

TMP36 * tmp36;
Cd5PhotoCell * cd5PhotoCell;
TSL2561 * tsl2561;

void setup()
{
    Serial.begin(57600);

    cd5PhotoCell = new Cd5PhotoCell(0);
    tmp36 = new TMP36(1, 5.0, 100);
    tsl2561 = new TSL2561();
}

void loop()
{
    tmp36->takeReading();
    tmp36->toSerial();

    cd5PhotoCell->takeReading();
    cd5PhotoCell->toSerial();

    tsl2561->takeReading();
    tsl2561->toSerial();

    Serial.println();

    delay(5000);
}


