const express  = require('express');
const app  = express();
const PORT = 3001 | process.env.PORT;


app.get('/' , (req, res) => {
    return res.json({
        message : 'server'
    })
})


app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
}) 