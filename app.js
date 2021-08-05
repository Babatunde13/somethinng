const express = require('express')
const { createUser, getUsers, getUserByUsername } = require('./database/user')
const app = express()


app.get('/create-user', async (req, res) => {
    const {
        userName, firstName, lastName, email, password, role, confirm_password
    } = req.query
    console.log({
        userName, firstName, lastName, email, password, role, confirm_password
    })
    const response = await createUser(
        userName, firstName, lastName, email, password, role, confirm_password
    )

    res.json(response)
})

app.get('/users', async (req, res) => {
    res.json(await getUsers())
})

app.get('/users/:userName', async (req, res) => {
    const { userName } = req.params
    const result = await getUserByUsername(userName)
    if (!result) return res.status(404).json({message: "Not found"})
    res.json(await getUserByUsername(userName))
})


app.listen(3000, () => console.log('app listening on port 3000'))