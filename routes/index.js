var express = require('express');
var router = express.Router();
const superagent = require('superagent');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/nCov19', function(req, res, next) {
  superagent.get('https://api.thevirustracker.com/free-api')
  .query({ 'countryTotal': 'VN' })
  .end((err, response) => {
      if (err) { return console.log(err); }
      res.send(pasersJSON(response.body))
      res.end();

  }); 
});
function pasersJSON(data){
  let vn_data_json = data.countrydata[0],
  vn_data = {};
  vn_data.info = vn_data_json.info.source;
  vn_data.total = vn_data_json.total_cases;
  vn_data.total_new_cases_today= vn_data_json.total_new_cases_today;
  vn_data.total_active_cases = vn_data_json.total_active_cases;
  vn_data.rank = vn_data_json.total_danger_rank;
  vn_data.total_serious_cases = vn_data_json.total_serious_cases;

  return vn_data;
}
module.exports = router;
