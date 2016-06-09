// Simple LED blink

const int led = LED_BUILTIN;

void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(38400);

}

void loop() {
   if (Serial.available()) {
    int incomingByte = Serial.read();
    Serial.println("Recieved "+ String(incomingByte));
    if(incomingByte==48)
    {
      digitalWrite(led, LOW);
    }
    if(incomingByte==49)
    {
      digitalWrite(led, HIGH);
    }
   }
}


