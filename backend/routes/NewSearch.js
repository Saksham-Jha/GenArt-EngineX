const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();
const newSearchRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);
newSearchRouter.get("/newsearch/:title", async (req, res) => {
    try {
        const { title } = req.params;
        const response = await openai.createImage({
            prompt: title,
            n: 1,
            size: "1024x1024",
        });
        const image_url = response.data.data[0].url;
        // console.log(image_url);
        cloudinary.uploader.upload(image_url, (err, result) => {
            res.send(JSON.stringify({ url: result.url }));
        })
    } catch (error) {
        res.status(500).send(error?.response.data.error.message);
    }
})
module.exports = newSearchRouter;






// const express = require("express");
// const dotenv = require("dotenv");
// const cloudinary = require('cloudinary').v2;
// const { Configuration, OpenAIApi } = require("openai");

// dotenv.config();
// const newSearchRouter = express.Router();

// cloudinary.config({
//     cloud_name: "dxav2dfrw",
//     api_key: "386342617772899",
//     api_secret: "nhcrJpe3jR6gAfhblrZCHjGg8AE"
// });

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configuration);
// newSearchRouter.post("/newsearch", async (req, res) => {
//     try {
//         const { title } = req.body;
//         const response = await openai.createImage({
//             prompt: title,
//             n: 1,
//             size: "1024x1024",
//         });
//         const image_url = response.data.data[0].url;
//         // console.log(image_url);
//         cloudinary.uploader.upload(image_url, (err, result) => {
//             res.send(result.url);
//             // res.status(200).json({ url: result.url });
//         })
//     } catch (error) {
//         res.status(500).send(error?.response.data.error.message);
//     }
// })
// module.exports = newSearchRouter;