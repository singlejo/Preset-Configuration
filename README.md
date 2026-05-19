Microservice 1: Preset Configuration

Description: 
This microservice handles the users configuration settings and allows other programs to save the current settings as named presets, validate these configurations making sure all required fields are filled out, and retreiving a list or specific preset data.


How to REQUEST Data:
To retreive a specific preset from this microservice, we send an HTTP POST request to save that endpoint with the preset name and specific required fields.

Example Call:
const goodOrder = {
    name:"Thai Tea"
    settings:{
        name: "Thai Tea"
        sugarLevel: 'Less'
        iceLevel: regular'
    }
};

const response = await fetch(url,{
    method: "POST",
    headers: {'Content-Type": 'application/json'}
    body: JSON.stringify(goodOrder)
});

How to RECVIEVE Data:
When the microservice finish processing a request, it returns an HTTP response containing a JSON message. It checks the status code to see if the data was receieved succesfully or not. (200 being succesful and 400 meaning it was a bad request)

Example Call:
async function receivePresetData() {

    const response = await fetch("http://localhost:5000/api/presets");
    const receivedData = await response.json();

    if (response.status === 200) {
        console.log("Successfully received presets:", receivedData.data);
        // Output: ["Thai Tea"]
    } else {
        console.error("Failed to receive data:", receivedData.message);
    }
}

UML Sequence Diagram
TEST 1:
Users -> Web Server: Trigger savePreset()
Web Server -> Server: POST /api/presets/save\nBody: {name: "Failed_Order", settings: {drink:"Matcha"}}

Server -> Server: Validate rquest body\n(check name, drink, sugar, icelevel)

Missing Feilds:
Server -> Web Server: 404 Bad Request\n{status:'error", message: "Invalid Request"}
Web Server -> User: Displays Error Message


TEST 2:
User -> Web Server: Trigger SavePreset()
Web Server -> Server: POST /api/presets/save\nBody: {name:"Thai Tea", settings:{drink:"Thai Tea", sugarlevel:"Less", icelevel:"Regular"}}

Server -> Server: Validate Request body\n(check name, drink, sugar, icelevel)

Valid Request:
Server -> storage: storage[name] = settings
Storage -> server: stored succefully
server -> Web Server: 200 OK\n{status:"success", message:"Preset saved"}
Web Server -> User: Displays success message

TEST 3:
User -> Web Server: Trigger Fetch Presets
Web Server -> Server: GET/api/presets

Server -> Storage: Read Object.keys(storage)
Storage -> Server: ['Thai Tea']

Server -> Web Server: 200  OK\n{status:"success", data:["Thai Tea"]}

Web Server -> User: Display preset list# Preset-Configuration
