const yelp = require('yelp-fusion');
const clientId = process.env.CLIENT_ID;
const secretKey = process.env.SECRET;

let controller = {};

controller.taco = (req, res) => {
  yelp.accessToken(clientId, secretKey).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search({
      categories: 'mexican,tacos',
      location: `${req.params.lat}, ${req.params.long}`,
      radius: 2000,
      open_now: true
    })
    .then((results) => {
      res.json(results.jsonBody.businesses);
    })
    .catch((err) => {
      console.log('ERROR: ', err);
    });
  });
}

module.exports = controller;
