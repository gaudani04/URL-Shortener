const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
    console.log("req.body:", req.body);
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({error:'url is required'})
    }
    const shortID = nanoid(8);

    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id
    });
   const allUrls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });

        return res.render("home", {
            id: shortID,
            urls: allUrls
        });
   
    // return res.render('home',{
    //     id:shortID
    // })
   
}
async function handleAnalytics (req,res) {
    const shortId = req.params.shortId;
    const ans =await URL.findOne({shortId});
    return res.json({totalClicks:ans.visitHistory.length,analytics:ans.visitHistory});

}
module.exports = {
    handleGenerateNewShortURL,
    handleAnalytics
}