import requests
import sys
import time
import logging
from servo_service import servo_setup, servo_move_to_angle, servo_test, servo_cleanup

logging.basicConfig(filename="panel_controller.log", level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def main():
    url="http://192.168.2.249:8080/calculate-ideal-angle"
    apiKey = "Q<?!1234567890al"
    sendingData = {"apiKey": apiKey}
    sleepTime = 5
    print("running")
    servoAzimuth = servo_setup(12,50)
    servoElevation = servo_setup(11,50)
    #servo_test(servoAzimuth)
    #servo_test(servoElevation)
    servo_move_to_angle(servoElevation, 0.1)
    servo_move_to_angle(servoAzimuth, 0.1)
    logging.info('powered on')
    time.sleep(sleepTime)
    while True:
        logging.info("making request: endpoint=%s, data=%s",url, sendingData)
        try:
            response = requests.post(url, json=sendingData)
            receivedData = response.json()
            logging.info("received from server: %s", receivedData)
            print(receivedData)
            azimuth = float(receivedData['azimuth'])
            elevation = float(receivedData['elevation'])

            if azimuth < 90:
                azimuth = 90
            if azimuth > 270:
                azimuth = 270
            azimuth = azimuth - 90
            azimuth = 180 - azimuth
            if elevation > 0 and elevation < 180:
                servo_move_to_angle(servoElevation, elevation)
                time.sleep(1)
                servo_move_to_angle(servoAzimuth, azimuth)
            else:
                logging.info("request successful, but sun below horizon- elevation: %s", elevation)
        except requests.exceptions.RequestException as e:
            print("error: ",e)
            logging.error("Error making request: %s", e)
        except KeyboardInterrupt:
            servo_cleanup(servoAzimuth)
            servo_cleanup(servoElevation)
            logging.info("program exited by user input")
            print("exited by ctrlC")
            sys.exit(0)
        time.sleep(sleepTime)

if __name__ == "__main__":
    main()
servo_cleanup(servoAzimuth)
servo_cleanup(servoElevation)
logging.info("program off - came to end of script")
