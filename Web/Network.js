'use strict';
const net = require('net');

var server = net.createServer();
var html = new Set();

module.exports.datahtml = html;
module.exports.receive = function () {
	server.on('connection', function (socket) {
		socket.on('data', function (data) {
			datatext = JSON.parse(data.toString('utf8'));

			html.add("<tr>" +
				`<td><span class="ID">${datatext[0]}</span></td>` +
				`<td>${datatext[1]}</td>` +
				`<td>${datatext[2]}</td>` +
				`<td><img src="/Flags/${datatext[3]}.svg" width="40" height="30"></td>` +
				`<td>${datatext[4]}</td>` +
				`<td>${datatext[5]}</td>` +
				`<td>${datatext[6]}</td>` +
				`<td>${datatext[7]}</td>` +
				`<td>${datatext[8]}</td>` +
				`<td><span class="Price">${datatext[9]}</span></td>` +
				`<td><span class="Key">${datatext[10]}</span></td>` +
				`<td><span class="Status">${datatext[11]}</span></td>` +
				"</tr>")
		});
	});

	server.listen(1337, '127.0.0.1');
}