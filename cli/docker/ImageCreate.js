// Libs
const ConsoleColor  = require('console-color');
const ConsolePrompt = require('console-prompt-eagle');
const nodeCmd       = require('node-cmd');
const fs            = require('fs');
const {promisify}   = require('util');


class ImageCreate {
	constructor ({spinner}) {
		this.log     = new ConsoleColor();
		this.prompt  = new ConsolePrompt();
		this.spinner = spinner;
		this.writter = promisify(fs.writeFile);
		this.shell   = {
			get : promisify(nodeCmd.get),
			run : promisify(nodeCmd.run),
		};
	}

	async run () {
		let type = await this.prompt.ask('Select what image you want create [1 -> client, 2 -> employee]');
		type = Number(type.replace(/[^0-9]/, ''));

		switch (type) {

			case 1 :
				await this.createClient();
				break;

			case 2 :
				await this.createEmployee();
				break;

			default:
				this.log.error(`Type ${type} not in list :(`);
		}
	}

	async createClient () {
		const dockerFilePath = `${__dirname}/runtime/DockerfileClients`;

		let name = await this.prompt.ask('Enter image name [node_cms_new_clients]');
		name = name || 'node_cms_new_clients';

		this.spinner.setSpinnerTitle(`%s Build image ${name}`);
		this.spinner.start();

		await this.writter(dockerFilePath, ImageCreate.renderDockerFileClient());

		let outBuild = await this.shell.get(`cd ${ (__dirname).replace(/\s/g, '\\ ') }/../../ && docker build -t ${name} . --file ${ dockerFilePath.replace(/\s/g, '\\ ') }`);
		let outList  = await this.shell.get('docker images');

		this.spinner.stop();

		console.log(`${outBuild}\n${outList}\n`);

		this.log.success(`Image ${name}. Build Ok...`);
	}

	async createEmployee () {
		const dockerFilePath = `${__dirname}/runtime/DockerfileEmployee`;
		const defaultImageName = 'node_cms_new_employee';

		let name = await this.prompt.ask(`Enter image name [${defaultImageName}]`);
		name = name || defaultImageName;

		this.spinner.setSpinnerTitle(`%s Build image ${name}`);
		this.spinner.start();

		await this.writter(dockerFilePath, ImageCreate.renderDockerFileEmployee());

		let outBuild = await this.shell.get(`cd ${ (__dirname).replace(/\s/g, '\\ ') }/../../ && docker build -t ${name} . --file ${ dockerFilePath.replace(/\s/g, '\\ ') }`);
		let outList  = await this.shell.get('docker images');

		this.spinner.stop();

		console.log(`${outBuild}\n${outList}\n`);

		this.log.success(`Image ${name}. Build Ok...`);
	}

	static renderDockerFileEmployee () {
		const {port} = require('../../configs/employee');

		return `
			FROM node
			RUN wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz
			RUN tar vxf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz 
			RUN cp wkhtmltox/bin/wk* /bin/ 
			RUN mkdir -p /usr/src/app
			WORKDIR /usr/src/app
			ADD . .
			RUN npm i npm@latest -g && npm install pm2 -g && npm install
			EXPOSE ${port}
			CMD [ "/usr/local/bin/pm2-docker", "start", "./server_employee/processes.json" ]
		`
	}

	static renderDockerFileClient () {
		const {port} = require('../../configs/clients');

		return `
			FROM node
			#RUN apt-get update && apt-get install nano
			RUN mkdir -p /usr/src/app
			WORKDIR /usr/src/app
			ADD . .
			RUN npm i npm@latest -g && npm install pm2 -g && npm install
			EXPOSE ${port}
			CMD [ "/usr/local/bin/pm2-docker", "start", "./server_clients/processes.json" ]
		`
	}
}

module.exports = ImageCreate;
