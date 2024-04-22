#set up servo
import RPi.GPIO as GPIO
import time

## create instance of a servo
def servo_setup(pin, frequency):
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(pin, GPIO.OUT)
    servo = GPIO.PWM(pin, frequency)
    servo.start(0)
    print("servo setup")
    return servo

## test servo functioning
def servo_test(servo):
    print('Moving to 180 degrees in 15 degree increments')
    duty = 2
    while duty <= 12:
        servo.ChangeDutyCycle(duty)
        time.sleep(0.3)
        servo.ChangeDutyCycle(0)
        time.sleep(0.7)
        duty = duty + 1
    print('servo at 180 degrees')
    time.sleep(1)
    print('Moving to 0 degrees in 30 degree increments')
    duty = 12
    while duty >= 2:
        servo.ChangeDutyCycle(duty)
        time.sleep(0.3)
        servo.ChangeDutyCycle(0)
        time.sleep(0.7)
        duty -= 1.67
    ## Ensure servo at 0 degrees
    servo.ChangeDutyCycle(2)
    time.sleep(0.3)
    servo.ChangeDutyCycle(0)
    time.sleep(0.5)
    print('test complete')
    
## move servo to an angle

def servo_move_to_angle(servo, angle_str):
    try:
        angle = float(angle_str)
        if 0 <= angle <= 180:
            duty = angle / 18 + 2
            servo.ChangeDutyCycle(duty)
            time.sleep(0.5)  # Adjust sleep time as needed
            servo.ChangeDutyCycle(0)
            time.sleep(0.5)
            print(f"Moved servo to angle {angle} degrees")
        else:
            print("Angle must be between 0 and 180 degrees")
    except ValueError:
        print("Invalid angle. Please provide a valid numeric angle between 0 and 180 degrees.")


def servo_cleanup(servo=None):
    if servo is not None:
        servo.stop()
    GPIO.cleanup()
