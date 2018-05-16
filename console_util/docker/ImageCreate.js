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

			default:
				this.log.error(`Type ${type} not in list :(`);
		}
	}

	async createClient () {
		const dockerFilePath = `${__dirname}/runtime/DockerfileClients`;

		let name = await this.prompt.ask('Enter image name [node_cms_new_clients]');
		name = name.replace(/\n/g, '') || 'node_cms_new_clients';

		this.spinner.setSpinnerTitle(`%s Build image ${name}`);
		this.spinner.start();

		await this.writter(dockerFilePath, ImageCreate.renderDockerFileClient());

		let outBuild = await this.shell.get(`docker build -t ${name} ${__dirname} --file ${dockerFilePath}`);
		let outList  = await this.shell.get('docker images');

		this.spinner.stop();

		console.log(`${outBuild}\n${outList}\n`);

		this.log.success(`Image ${name}. Build Ok...`);
	}

	async createEmployee () {
		this.log.warn(`This method not implement`)
	}

	static renderDockerFileClient () {
		const {port} = require('../../configs/clients');

		return `
			FROM node
			#RUN apt-get update && apt-get install nano
			WORKDIR /usr/src/app
			COPY . .
			RUN npm install pm2 -g && npm install
			EXPOSE ${port}
			CMD [ "npm", "run", "pm-start-clients" ]
		`
	}
}

module.exports = ImageCreate;

