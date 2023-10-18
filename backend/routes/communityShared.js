const express = require("express");
const Post = require("../models/Posts");

const communitySharedRouter = express.Router();
communitySharedRouter.post("/sharewithcommunity", async (req, resp) => {
    let data = new Post(req.body);
    let result = await data.save();
    resp.send(result);
});

module.exports = communitySharedRouter;
