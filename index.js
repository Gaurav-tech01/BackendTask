const express = require("express");
const router = express.Router()
const mongoose = require('mongoose')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const axios = require('axios');
const Data = require("./model/data")
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // await Data.collection.drop()
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error while connecting" + error.message);
    }
}

connectDB();
app.use(cors())
app.use(express.json())
const options = {
    method: 'GET',
    url: 'https://api.wazirx.com/api/v2/tickers',
    params: {
        limit: 10,
        offset: 0
    }
};

axios(options)
    .then((response) => {
        let counter = 0;
        for (const property in response.data) {
            if (counter === 10) {
                break;
            }
            const newdata = new Data({
                name: response.data[property]['name'],
                last: response.data[property]['last'],
                buy: response.data[property]['buy'],
                sell: response.data[property]['sell'],
                volume: response.data[property]['volume'],
                baseunit: response.data[property]['base_unit']
            })
            newdata.save()
            counter++;
        }
    })
    .catch((error) => {
        console.log(error)
    });

app.use("/get",  router.get('/content',async (req, res) => {
    const data = await Data.find({});
    res.json(data)
 }))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});