# Node.js technical test

## Fast start

Step 1. Build the project running ```npm run build```
Step 2. Start docker-compose with the command ```docker-compose up```
Step 3. Check the traffic between chargers, devices and server in the logs
Step 4. Clean the execution with the command ```docker-compose down```

## Description of the e2e environment
The e2e environment starts 8 websocket clients, four chargers, and four devices, each with a different ID. Each loader has a buffer with five * StateOfCharge * events. Some of them are well-formatted events and some were written to create an exception on the server and thus force the websocket connection to close. Each event is sent to an output buffer that sends the message to the server in order within 2 seconds of each other. When the server receives the event, it identifies the devices related to the charger, processes the message, and sends the response to the device.

The id of the chargers are set in the *docker-compose.yml* file with the environment variable *CHARGE_ID*. The id of the devices are set in similar way with the environment variable *DEVICE_ID*. The realtion between devices and chargers is defined in the file *./data/charger-document.json*

## Charger websocket client
The chargers are docker containers that run the code of a really simple websocket client that can be found in the next github repository:
https://github.com/Ferraiz/chargeWS

The chargers has a module called *messages.js* which contains a dictionar with an array of five *StateOfCharge* events per each charger id. These arrays are the ones that are stored in the delay buffers.

The steps to modify the server entries are as follows:

Step 1. Choose the device id on which you want to change the event in the message.js file
Step 2. Run docker build to create a new image on your local chargeWS machine
Step 3. Update the chargeWS image name in the server's docker-compose.yml
Step 4. Run `` `docker-compose up``` to check the result

## My way to deploy the server in AWS
If I were to deploy this service on AWS, I think I would implement it within a kubernetes cluster. The reasons are:

1. I already have it dockerized, so it would be nice to take advantage of all this work.
2. Kubernetes provides many features to scale the service in case of increased demand.
3. You can use lambda functions to implement this code, but the server must be running all the time to accept loaders and devices.
connections and a kubernetes runtime is cheaper than the runtime of a lambda function, so economically kubernetes is more efficient.