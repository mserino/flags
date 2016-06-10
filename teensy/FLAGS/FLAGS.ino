#include <Servo.h>
//
Servo myservo;
int pos = 90; 
int lightLevel;
bool servoRunning = false;

const int led = LED_BUILTIN;
const int reflectiveLED = 17;

int skipCounter = 0;


//int pos = 0;

void setup() {
  pinMode(led, OUTPUT);
  pinMode(reflectiveLED, OUTPUT);
  digitalWrite(reflectiveLED, HIGH);
  Serial.begin(38400);
  myservo.attach(10);
  myservo.write(pos);

}

void loop() {
   if (Serial.available()) {
    int incomingByte = Serial.read()-48;
    Serial.println("Recieved "+ String(incomingByte));
    if(incomingByte>0)
    {
      digitalWrite(led, HIGH);
      pos = 87;
      servoRunning = true;
      skipCounter = incomingByte;
      myservo.write(pos);
      delay(100);
    }


//    
//    if(incomingByte==48)
//    {
//      digitalWrite(led, LOW);
//      pos = 90;
//      myservo.write(pos);
//    }
//    if(incomingByte==49)
//    {
//      digitalWrite(led, HIGH);
//      pos = 87;
//      servoRunning = true;
//      myservo.write(pos);
//      delay(100);
//
//    }

   }

   lightLevel = analogRead(6);

   if(servoRunning && lightLevel < 800)
   {
      skipCounter = skipCounter -1;

      if(skipCounter<1)
      {
         pos = 90;
        digitalWrite(led, LOW);
        servoRunning = false;
        myservo.write(pos);
      }
      delay(100);
    
   }
   
 
}


