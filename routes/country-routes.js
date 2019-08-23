const express = require('express');
const router = express.Router();
const Country = require('../models/country-model')

// to get all projects
router.get('/', (req, res) => {
    debugger
  Country.find({})
  .then(countries => {
      res.status(200).json(countries)
  })
  .catch(err => console.log('err' + err));

})

router.get('/random', (req, res)=>{
   

    Country.find({}).then( countries=>{
        const random = Math.floor(Math.random()*20)
        console.log(random)
        res.status(200).json(countries[random])
    })
})

// add new project
router.post('/add', (req,res) => {
    const {countryname, nomadscore, description, cost, temperature, funscore, contributed_by} = req.body;

    if(!countryname || !nomadscore || !description || !cost || !temperature, !funscore || !contributed_by) {
        res.status(400).json({
            errorMessage: "please fill in all the fields"
        })
    }

    Country.findOne({countryname : "countryname"})
    .then(country => {
        if(!country == null) {
            res.status(400).json({
                errorMessage1: "this country is already in the database"
            });
            return;
        }
        const newCountry = new Country ({
            countryname,
            nomadscore,
            description,
            cost,
            temperature,
            funscore,
            contributed_by
        })
        newCountry.save()
        .then(aNewCountry => {
            res.status(200).json(`${aNewCountry.countryname}`);
        })
        .catch(err => {
            res.status(400).json({
                message2: err + 'Saving country to DB went wrong'
            });
        });
    });
});

module.exports = router;