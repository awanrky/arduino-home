//
// +3.3V <> sensor <> 10K Ohm Resistor & Digitial Pin  
// 10K Ohm Resistor <> Ground


// this constant won't change:
const int  buttonPin = 2;    // the pin that the pushbutton is attached to
int buttonState;

void setup() {
  // initialize the button pin as a input:
  pinMode(buttonPin, INPUT);
  // initialize serial communication:
  Serial.begin(9600);
}


void loop() {
  // read the pushbutton input pin:
  buttonState = digitalRead(buttonPin);
    if (buttonState == HIGH) {
      Serial.println("on");
    } 
    else {
      // if the current state is LOW then the button
      // wend from on to off:
      Serial.println("off"); 
    }
  }
  
