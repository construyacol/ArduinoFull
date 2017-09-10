int ledpin = 13;
int pos;



void setup(){
Serial.begin(9600);
pinMode(ledpin, OUTPUT);

}

void loop(){
while(Serial.available()==0);

int val = Serial.read();

if(val == '1'){

Serial.println("ledON");
digitalWrite(ledpin, HIGH);

}
else if(val == '0'){

Serial.println("Apagado00");
digitalWrite(ledpin, LOW);


}else if(val == '3'){

Serial.println("Mensaje1");

Serial.println("Mensaje2");




for(int i=0;i<50;i++){
     parpadea();
  }
}
}

void parpadea(){
  digitalWrite(ledpin, HIGH);
delay(40);
digitalWrite(ledpin, LOW);
delay(40);
  
  }
