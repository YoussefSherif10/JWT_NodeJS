const express = require('express')
const router = express.Router();
const authController = require('./authController')

router.post('/register', (req, res) => {
        try {
                const {name, email, password} = req.body;
                if (!(name, email, password))
                        return res.status(400).send('required inputs are missing');

                const userDetails = {
                        name, email, password
                }

                authController.registerUser(userDetails, (error, result) => {
                        if (error)
                                return res.status(400).send({"ERROR": error});
                        return res.status(201).send(result);
                })

        } catch (e) {
                res.status(500).send({"ERROR": "Unexpected error try again"});
        }
})

router.post('/login', (req, res) => {
        try {
                const {email, password} = req.body;
                if (!(email && password))
                        return res.status(400).send('required inputs are missing');
                authController.loginUser({email, password}, (err, results) => {
                        if (err)
                                return res.status(401).send({"ERROR": "Invalid email or password"});
                        return res.status(200).send({"STATUS": "OK", data:results});
                })
        } catch (e) {
                res.status(500).send({"ERROR": "Unexpected error try again"});
        }
})

module.exports = router;