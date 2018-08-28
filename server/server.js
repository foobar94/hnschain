const express = require('express');
const blockCrawler = require('./blockchainCrawler/blockCrawler')
const app = express();
const port = 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/getLastBlocks', function(req, res, next) {
	console.log('inside getLastBlocks' + blockCrawler.lastBlockHeight.height);
	var tempResult = blockCrawler.lastBlocks(function(results) {
		res.send({'blocks': results});
	});
});


//rename to get currentBlockHeight
app.get('/api/getLastBlock', function(req, res, next) {
	//console.log(blockCrawler.lastBlockHeight.height);
	res.send({height:blockCrawler.lastBlockHeight.height});

});

app.listen(port, function() {
	blockCrawler.blockSync(10700);
});