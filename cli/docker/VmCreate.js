// Libs
const ConsoleColor  = require('console-color');
const ConsolePrompt = require('console-prompt-eagle');
const nodeCmd       = require('node-cmd');
const fs            = require('fs');
const {promisify}   = require('util');


class VmCreate {
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

		let outListImages  = await this.shell.get('docker images');
		this.log.info(outListImages);

		const  defImageName = 'node_cms_new_clients';
		let imageName = await this.prompt.ask(`Enter image name [${defImageName}]`);
		imageName = imageName.replace(/\n/g, '') || defImageName;

		let outListVms  = await this.shell.get('docker ps --all');
		this.log.info(outListVms);

		const  defVmName = 'node_cms_new_clients1';

		let name = await this.prompt.ask(`Enter vm name [${defVmName}]`);
		name = name.replace(/\n/g, '') || defVmName;

		let portBind = await this.prompt.ask(`Enter bind port`);
		portBind = portBind.replace(/\n/g, '') || defVmName;

		const {port} = require('../../configs/clients');

		await this.shell.get(`docker run --name ${name} -p ${portBind}:${port}  -d ${imageName}`);
		outListVms  = await this.shell.get('docker ps');

		this.log.info(outListVms);

		this.log.success(`Vm ${name}. Build Ok...`);
	}

	async createEmployee () {
		this.log.warn(`This method not implement`)
	}

	static renderDockerFileClient () {
		const {port} = require('../../configs/clients');

		return `
			FROM node
			#RUN apt-get update && apt-get install
			RUN mkdir -p /usr/src/app
			WORKDIR /usr/src/app
			ADD . .
			RUN npm i npm@latest -g && npm install pm2 -g && npm install
			EXPOSE ${port}
			CMD [ "/usr/local/bin/pm2-docker", "start", "./server_clients/processes.json" ]
		`
	}
}

module.exports = VmCreate;

//
