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

       User                                Web Service                         Data Service
        │                                    │                                    │
        │─── 1. POST /api/presets/save ─────>│                                    │
        │                                    │─── 2. Evaluate Fields  ───────────>│
        │                                    │                                    │
        │                                    │◄── 3. [FAIL] Missing Parameters ───│
        │◄── 4. 400 Bad Request  ────────────│                                    │
        │                                    │                                    │
        │                                    │◄── 5. [PASS] All fields Verified ──│
        │                                    │                                    │
        │                                    │─── 6. Add the info to storage ──┐  │
        │                                    │                                   ││
        │                                    │◄──────────────────────────────────┘│
        │◄── 7. 200 Success JSON String ─────│                                    │
        │                                    │                                    │
        │────────────────────────────────────┼────────────────────────────────────│
        │                                    │                                    │
        │─── 8. GET /api/presets ───────────>│                                    │
        │                                    │─── 9. Build Array Object ─────────┐│
        │                                    │◄──────────────────────────────────┘│
        │◄── 10. 200 OK Array Directory ─────│                                    │
