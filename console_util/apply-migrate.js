const fs          = require('fs');
const {ConsoleColorLog} = require('./libs/console-color');
const log = new ConsoleColorLog();
const {promisify} = require('util');
const {drive} = require('../configs/database');


const taskTypes = {
	databaseMigration : 'databaseMigration'
};
const base = {
	type    : taskTypes.databaseMigration,
	dir     : `${__dirname}/../migration/${drive}`,
	name    : 'DatabaseMigration',
};
const tasks = {
	DatabaseMigration : {
		...base,
		ignores : [
			/(.*)test(.*)/gi,
		],
		match : [
			/(.*)/gi,
		]
	},
	DatabaseMigrationTest : {
		...base,
		name    : 'DatabaseMigrationTest',
		ignores : [],
		match : [
			/(.*)test(.*)/gi,
		]
	}
};

class ApplyMigrate {
	constructor (config = {}) {

		this._config = config;

		this._modules = {
			fs     : fs,
			logger : log
		};

		this._isUpTest = false;

		process.argv.map(arg => {
			if (arg.includes('-t=true')) {
				this._isUpTest = true;
			}
		});
	}

	async run () {

		process.env.tasks = true;

		try {

			this._modules.logger.info(`AppyMigration|Run`);


			await this._doit(this._isUpTest ? tasks.DatabaseMigrationTest : tasks.DatabaseMigration);


		} catch (e) {
			let mess = e.message ? e.message : JSON.stringify(e, null, '\t');

			if (e.stack) {
				mess += ' -> ' + JSON.stringify(e.stack);
			}

			this._modules.logger.error(`run|Error ${mess.replace(/\\n/g, '\n')}`);

			console.error(e);
		}

		process.exit(1);
	}

	async _doit (task) {
		let handelName = `handel${task.type[0].toUpperCase() + task.type.substring(1)}`;

		if (typeof this[handelName] !== "function") {
			throw new Error(`Not found handel ${handelName}`);
		}

		await this[handelName](task);
	}

	async handelDatabaseMigration (task) {
		const logPath= `${__dirname}/../logs/apply-migration.json.log`;
		let folderRedder =  promisify(fs.readdir);
		let fileReadder  =  promisify(fs.readFile);
		let fileWritter  =  promisify(fs.writeFile);
		let files = await folderRedder(task.dir);
		let execs;

		if (fs.existsSync(logPath)) {
			execs  = JSON.parse(await fileReadder(logPath));
		} else {
			execs = {};
		}

		for (let file of files) {

			let isIgnore = false;

			for (let ignore of task.ignores) {
				if (ignore.test(file)) {
					isIgnore = true;
					break;
				}
			}

			if (isIgnore) {
				this._modules.logger.info(`${task.name} | Ignore ${file}`);
				continue;
			}

			let isMatch = false;

			for (let regxep of task.match) {
				if (regxep.test(file)) {
					isMatch = true;
					break;
				}
			}

			if (isIgnore) {
				this._modules.logger.info(`${task.name} | Not match ${file}`);
				continue;
			}

			let fileName = file.replace(/(.*)\.(.*?)$/, "$1");

			if (execs[fileName]) {
				continue;
			}

			let migrate = require(`${task.dir}/${file}`);

			await migrate();

			this._modules.logger.success(`Migrate ${file} | Apply success..`);

			execs[fileName] = Date.now();
		}

		await fileWritter(logPath, JSON.stringify(execs, null, '\t'));

		return true;

	}
}

let applyMigrate = new ApplyMigrate;
applyMigrate.run();
