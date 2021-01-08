const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,"build")));

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
	//res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

//app.listen(9000);