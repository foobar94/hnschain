const {NodeClient, WalletClient} = require('hs-client');
var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://admin:na@ds133762.mlab.com:33262/hnschain-test', { useNewUrlParser: true });
var BlockSchema = require('../models/block');
var lastBlockHeight = {height: 0};

const clientOptions = {
  network: 'testnet',
  port: 13037,
  apiKey: 'bikeshed'
};

const client = new NodeClient(clientOptions);


//what I want to do:
//start at blockHeight 0: 
//call RPC getblockbyHeight from 0 to current block and stoere in database
//once at current block call every half a second and if it's a new block store it in the database.
var Block = connection.model('Block', BlockSchema);
var storeBlocks = function storeBlock(height) {
		(async () => {
			try {
				const result = await client.execute('getblockbyheight', [ height, true, true ]);
				var currentBlock = new Block({
					hash: result.hash,
					height: result.height,
					numTransactions: result.tx.length,
					time: result.time,
					bits: result.bits,
					previous: result.previousblockhash,
					merkleRoot: result.merkleroot
				}); 
				currentBlock.save(function (err) {
					if (err) { 
						console.log(err);
					} else {
						console.log('saved');
						lastBlockHeight.height = currentBlock.height;
						storeBlock(height + 1)
					}
				});
			} catch(err) {
				console.log('waiting');
				setTimeout(storeBlock, 15000, height );
			}
		})();
};

//this is temporary should move this and put it in server since it's reading and not crawling
var getLastBlocks = function getLastBlocks(next) {
	console.log(lastBlockHeight + ' in blockCrawlwer getLastBlocks');
	Block.find().sort({'height': 'desc'}).limit(5).exec(function(err, data) {
		console.log(data);
		next(data);
	});
};

module.exports.lastBlockHeight = lastBlockHeight;
module.exports.blockSync = storeBlocks;
module.exports.lastBlocks = getLastBlocks;