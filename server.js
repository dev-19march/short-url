const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser:true,
  
})
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.get('/', async (req,res)=> {
    const shortUrls = await ShortUrl.find()
res.render('index', {shortUrls:shortUrls})
})
app.post('/shortUrls', async(req,res) =>{
  await ShortUrl.create({full: req.body.fullUrl})
  res.redirect('/')
})

app.get('/:shortUrl', async (req,res) => {
  const shortUrl= await   ShortUrl.findOne({short:shortUrl})
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++

})

app.listen(process.env.PORT || 5000);





