# Solar Panel Tilt Controller API

This is final year computing project for Plymouth University, overseen by Joseph Ross.

The aim is to provide a simple and cheap software solution to increase the energy output of solar panels.

Solar panels that can tilt in dual axis toward the sun produce ~50% more electricity than fixed panels by always facing the greatest iridescence. The power generated on fixed panels is predominantly produced during the day when energy needs are fewer, necessitating expensive (and loss inducing) storage requirements. A dual axis panel increases the energy production during peak demand increasing local usage (greater efficiency vs exporting to the national grid, or storage).


![A Graph of Electricity Demand vs Solar Power Output](https://www.solarquotes.com.au/wp-content/uploads/2018/09/winter_electric_demand_nsw_sml-1.jpg)

There is a possibility of having individual computer controllers on each panel, which could be programmed with best angles to move the panel to the appropriate angle, but this would need to be individually programmed and if ever moved would require reprogramming. If there are many individual controllers, then the cost and time increases significantly.

Instead I am proposing an API which will provide a simple and cheap controller the information to tilt to the correct angle. The controller will have  internet connection to send a request to the API. The API will provide the correct tilt angle in return, which the controller will be able to tilt the panel.

A high level summary of the ecosystem is provided below


![image](https://github.com/John-D-Edmondson/COMP3000_Solar_Controller/assets/86296142/1d0bceaf-21cc-4a9a-b88e-d640b3a567bf)


As the image shows the product is built as a series of microservices that work together to provide the required functionality.

# Running the system

The files for the Raspberry Pi are provided in the root of this directory. (firstTestodServos.py and servoservices.py). The Raspberry Pi used during development was the Pi Zero 2 using Debian with Raspberry Pi Desktop OS. The Pi can have a headless installation if desired. Connect the Pi to the local Wifi network and run the firstTestOfServos.py after copying bot files across. The Pi will send requests via http to localhost port 8080. The python files have a solar panels apikey coded in.

The Api for the Pi is located in the path COMP3000_Solar_Controller\NodeServer\app and to run use 'node app.js' within this folder. The server will spin up and connect the Atlas MongoDB, and print confirmation to the console. 

To run the user and panel management server go to \COMP3000_Solar_Controller\NodeAPI and enter 'npm start'. This will connect to Atlas MongoDB and allow the user management webapp to work correctly.

Finally for the webapp go to \COMP3000_Solar_Controller\react-front-end\src and use 'npm start'.

The database has a number of solar panels, but the Pi is linked to the following serial 65a8011b9c9e370eee0f6ceb, so for experimentation please use this.
