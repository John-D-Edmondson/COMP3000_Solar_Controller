# Solar Panel Tilt Controller API

This is final year computing project for Plymouth University, overseen by Joseph Ross.

The aim is to provide a simple and cheap software solution to increase the energy output of solar panels.

Solar panels that can tilt in dual axis toward the sun produce ~50% more electricity than fixed panels by always facing the greatest iridescence. The power generated on fixed panels is predominantly produced during the day when energy needs are fewer, necessitating expensive (and loss inducing) storage requirements. A dual axis panel increases the energy production during peak demand increasing local usage (greater efficiency vs exporting to the national grid, or storage).


![A Graph of Electricity Demand vs Solar Power Output](https://www.solarquotes.com.au/wp-content/uploads/2018/09/winter_electric_demand_nsw_sml-1.jpg)

There is a possibility of having individual computer controllers on each panel, which could be programmed with best angles to move the panel to the appropriate angle, but this would need to be individually programmed and if ever moved would require reprogramming. If there are many individual controllers, then the cost and time increases significantly.

Instead I am proposing an API which will provide a simple and cheap controller the information to tilt to the correct angle. The controller will have a gps sensor and internet connection to send a request to the API. The API will provide the correct tilt angle in return, which the controller will be able to tilt the panel.

A high level summary of the ecosystem is provided below

![image](https://github.com/John-D-Edmondson/COMP3000_Solar_Controller/assets/86296142/d7cc0ec0-1805-4d18-a14a-7b48ac42f965)

