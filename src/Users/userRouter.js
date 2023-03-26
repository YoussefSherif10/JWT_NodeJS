const express = require('express')
const router = express.Router()
const userController = require('./userController')

router.get('/', (req, res) => {
        try {
                const userData = req.claims;
                console.log(userData);
                if (!userData.email)
                        return res.status(400).send("user email not available");
                userController.findUser(userData.email, (error, result) => {
                        if (error)
                                return res.status(400).send("error getting the user");
                        res.status(200).send(result)
                })
        } catch (e) {
                res.status(500).send("unexpected error try again");
        }
})

module.exports = router;