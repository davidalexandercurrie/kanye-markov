const app = require('express')();
const axios = require('axios');
let RiTa = require('rita');
let arr = [];
markov = RiTa.markov(2);
let output;
for (let i = 0; i < 1000; i++) {
  axios.get('https://api.kanye.rest/').then(function (response) {
    // handle success
    arr.push(response.data.quote);
    if (arr.length === 1000) {
      run();
    }
  });
}

async function run() {
  markov.addText(arr.join(' '));
  output = await markov.generate(1);
  console.log(output);
}

app.get('/', function (req, res) {
  run();
  res.send(output);
});

app.listen(3000);
