const express = require('express');
const app = express();

app.use(express.json());

const storage = {};

app.post('/api/presets/save',(req,res) => {
    const { name,settings } = req.body;

    if (!name || !settings || !settings.drink|| !settings.sugarlevel|| !settings.icelevel) {
        return res.status(400).json({
            status: "error",
            message: "Invalid request: missing name or settings",
        });
    }

    storage[name] = settings;
    
    return res.status(200).json({
        status: "success",
        message: `Preset '${name}' saved successfully`,
    });
});


app.get('/api/presets',(req,res) => {
    const presetName = Object.keys(storage);
    return res.status(200).json({
        status: "success",
        data: presetName
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
 