const url = "http://localhost:5000/api/presets";

async function savePreset() {
     console.log("[Test 1] Testing validation (missing sugar/ice levels");
     const badOrder = {
        name: "Failed_Order",
        settings: {drink: "Matcha"}
     };

     const response1 = await fetch(`${url}/save`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(badOrder)
     });

     const data1 = await response1.json();
     console.log(`Status: ${response1.status}, | Response:`, data1);
     console.log(response1.status === 400 ? "Validation test passed" : "Validation test failed");

     console.log(" ");

     console.log("[Test 2] Testing successful preset saving:");
        const goodOrder = {
            name: "Thai Tea",
            settings: {drink: "Thai Tea", sugarlevel: "Less", icelevel: "Regular"}
        };

    const response2 = await fetch(`${url}/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(goodOrder)
    });

    const data2 = await response2.json();
    console.log(`Status: ${response2.status}, | Response:`, data2);
    console.log(response2.status === 200 ? "Preset saving test passed" : "Preset saving test failed");

    console.log(" ");
    
    console.log("[Test 3] Testing retrieving saved presets:");
    const response3 = await fetch(url);
    const data3 = await response3.json();
    console.log(`Status: ${response3.status}, | Response:`, data3);

    if (data3.data && data3.data.includes("Thai Tea")) {
        console.log("Preset retrieval test passed");
    }else{
        console.log("Preset retrieval test failed");
    }
}

savePreset();