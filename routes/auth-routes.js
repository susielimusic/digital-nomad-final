const express    = require('express');
const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User       = require('../models/user-model');

const authRoutes = express.Router();

authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
  console.log('signup request received')
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 5){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "Username check went bad."});
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const aNewUser = new User({
            username:username,
            email: email,
            password: hashPass
        });
        
        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
                res.status(200).json(aNewUser);
        });
    });
});


authRoutes.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('request received')
    if (!username) {
        res.status(400).json({ message: 'Provide a valid username' });
        return;
      }

    User.findOne({ username }, (err, foundUser) => {
        if(err){
            console.log(err)
            res.status(500);
            return;
        }   
        if (foundUser) {
            console.log(foundUser)
            bcrypt.compare(password, foundUser.password).then(function(result) {
                // res == true
                if(result){
                    req.session.user = foundUser;
                    res.status(200).send(foundUser);
                }
            });
        }
    })
});


authRoutes.post('/logout', (req, res, next) => {
    
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }
        console.log('session destroyed')
    res.status(200).json( 'Log out successful!');
    })
    
});


// authRoutes.get('/loggedin', (req, res, next) => {
//     // req.isAuthenticated() is defined by passport
//     if (req.isAuthenticated()) {
//         res.status(200).json(req.user);
//         return;
//     }
//     res.status(403).json({ message: 'Unauthorized' });
// });

module.exports = authRoutes;