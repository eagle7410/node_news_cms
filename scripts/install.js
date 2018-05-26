const fs = require('fs');
const {promisify} = require('util');
const copyFile = promisify(fs.copyFile);

void async function install() {
	await copyFile(`${__dirname}/installer.js`, `${__dirname}/../../../installer.js`);
	console.log('The end');
}();
