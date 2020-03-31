const express = require('express');
const app = express();

//app.post
app.get('/api/genres', (req, res) => {
    res.send('test');
});

//app.get

//app.put

//app.delete




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))



