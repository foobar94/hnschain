const {NodeClient, WalletClient} = require('hs-client');
const {Network} = require('hsd');
const network = Network.get('regtest');

// network type derived from hsd object, client object stores API key
const clientOptions = {
  network: network.type,
  port: network.rpcPort,
  apiKey: 'api-key'
}

const client = new NodeClient(clientOptions);

(async () => {
  const clientinfo = await client.getInfo();
  console.log(clientinfo);
})();
