

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
        Serial.print(", ");
        Serial.print(celcius());
        Serial.print(" deg C, ");
        Serial.print(fahrenheit());
        Serial.println(" deg F.");
    }
};

TMP36 * tmp36;

void setup()
{
    Serial.begin(9600);

    tmp36 = new TMP36(1, 5.0, 100);
}

void loop()
{
//    tmp36->setReading(analogRead(tmp36->pin));

    tmp36->takeReading();
    tmp36->toSerial();
  
    delay(1000);
}


