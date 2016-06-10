#include <Servo.h>
//
Servo myservo;
int pos = 90; 
int lightLevel;
bool servoRunning = false;

const int led = LED_BUILTIN;
const int reflectiveLED = 17;


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
    int incomingByte = Serial.read();
    Serial.println("Recieved "+ String(incomingByte));
    if(incomingByte==48)
    {
      digitalWrite(led, LOW);
      pos = 90;
      myservo.write(pos);
    }
    if(incomingByte==49)
    {
      digitalWrite(led, HIGH);
      pos = 87;
      servoRunning = true;
      myservo.write(pos);
      delay(100);

    }

   }

   lightLevel = analogRead(6);

   if(servoRunning && lightLevel < 800)
   {
      pos = 90;
      digitalWrite(led, LOW);
      servoRunning = false;
      myservo.write(pos);
    
   }
   
 
}

//void loop() {
//  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
//    // in steps of 1 deg  ree
//    myservo.write(pos);              // tell servo to go to position in variable 'pos'
//    delay(1500);                       // waits 15ms for the servo to reach the position
//  }
//  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
//    myservo.write(pos);              // tell servo to go to position in variable 'pos'
//    delay(1500);                       // waits 15ms for the servo to reach the position
//  }
//}


