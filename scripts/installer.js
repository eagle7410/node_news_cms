const fs          = require('fs');
const path        = require('path');
const {promisify} = require('util');
const mkdir       = promisify(fs.mkdir);
const readdir     = promisify(fs.readdir);
const write       = promisify(fs.writeFile);
const exists      = promisify(fs.exists);
const copyFile    = promisify(fs.copyFile);

const MAIN_NODE_MODULES   = `${__dirname}/node_modules`;
const ORIGIN_PATH         = `${MAIN_NODE_MODULES}/node_news_cms`;
const ORIGIN_NODE_MODULES = `${ORIGIN_PATH}/node_modules`;

let log, prompt, spinner;

void async function install() {
	await baseCopy();
	await initConsoleUtil();

	log.success('Initial ok ...');

	spinner.setSpinnerTitle(`%s Copy main structure`);
	spinner.start();

	await mainCopy();

	spinner.stop(true);
	log.info('[OK]Copy main structure');

	await gruntLogsCopy();
	log.info('[OK]Copy grunt logs');
	await gruntConfigsCopy();
	log.info('[OK]Copy grunt configs');

	await configurationPackageJson();

	await configurationDatabaseConnect();

	spinner.stop(true);
	log.warn(`Need custom configs clients.json and employee.json, email.json`);
	log.warn(`Use npm install in ${__dirname}`);
	log.info(`For set first user use migation or node ./cli/add-admin-employee.js`);
	log.warn(`If you change jwt need rebuild front :)`);

	log.success('Install ... OK');

	process.exit();

}();



async function configurationPackageJson() {
	const isExistPackage = await exists(`${__dirname}/package.json`);

	if (!isExistPackage) {
		return await newPackageJson();
	}

	await mergePackageJson();
}

async function mergePackageJson() {
	let packageInfoSource = require(`${ORIGIN_PATH}/package.json`);
	let packageInfoTarget = require(`${__dirname}/package.json`);

	if (!packageInfoTarget.scripts || !Object.keys(packageInfoTarget.scripts).length) {
		packageInfoTarget.scripts = packageInfoSource.scripts;
	} else {
		for (let [name, cmd] of Object.entries(packageInfoSource.scripts)) {
			if (['postinstall', 'test'].includes(name)) continue;
			packageInfoTarget.scripts[name] = cmd;
		}
	}

	log.info('[OK]mergePackageJson| Merge scripts');

	if (!packageInfoTarget.contributors) {
		packageInfoTarget.contributors = [];
	}

	packageInfoTarget.contributors.push({
		"name": "Igor Stcherbina",
		"email": "verycooleagle@gmail.com"
	});

	if (!packageInfoTarget.engines) {
		packageInfoTarget.engines = {};
	}

	if (!packageInfoTarget.engines.node) {
		packageInfoTarget.engines.node = packageInfoSource.engines.node;
	} else {
		log.warn('mergePackageJson| engines.node >=8.11.2');
	}

	if (!packageInfoTarget.devDependencies) {
		packageInfoTarget.devDependencies = packageInfoSource.devDependencies;
	} else {
		for (let [dep, version] of Object.entries(packageInfoSource.devDependencies)) {
			log.info(`mergePackageJson| devDependencies| ${dep} -> ${version}`);
			packageInfoTarget.devDependencies[dep] = version;
		}
	}

	log.info('[OK]mergePackageJson| Merge devDependencies');

	if (!packageInfoTarget.dependencies) {
		packageInfoTarget.dependencies = packageInfoSource.dependencies;
	} else {
		for (let [dep, version] of Object.entries(packageInfoSource.dependencies)) {
			log.info(`mergePackageJson| dependencies| Set ${dep} -> ${version}`);
			packageInfoTarget.dependencies[dep] = version;
		}
	}

	log.info('[OK]mergePackageJson| Merge dependencies');

	if (packageInfoTarget.dependencies.node_news_cms) {
		delete packageInfoTarget.dependencies.node_news_cms;
	}
	if (packageInfoTarget.devDependencies.node_news_cms) {
		delete packageInfoTarget.devDependencies.node_news_cms;
	}

	await write(`${__dirname}/package.json`, JSON.stringify(packageInfoTarget, null, '\t'));

	log.info('[OK]Create package.json');
}
async function newPackageJson() {
	let packageInfo = require(`${ORIGIN_PATH}/package.json`);

	delete packageInfo.scripts.postinstall;

	delete packageInfo.repository;
	log.info('Add to package.json repository example  "repository": { "type": "git", "url": "git+https://github.com/eagle7410/node_news_cms.git"},');

	packageInfo.keywords = [];
	log.info('Add to package.json keywords');

	delete packageInfo.bugs;
	log.info('Add to package.json bugs link example "bugs": {"url": "https://github.com/eagle7410/node_news_cms/issues"},');

	packageInfo.homepage = '';
	log.info('Add to package.json homepage example "homepage": "https://github.com/eagle7410/node_news_cms#readme"');

	packageInfo.author = '';
	log.info('Add to package.json author example "author": "Igor Stcherbina <verycooleagle@gmail.com> (http://github.com/eagle7410)",');

	if (!packageInfo.contributors) {
		packageInfo.contributors = [];
	}

	packageInfo.contributors.push({
		"name": "Igor Stcherbina",
		"email": "verycooleagle@gmail.com"
	});

	packageInfo.name = path.basename(__dirname);

	await write(`${__dirname}/package.json`, JSON.stringify(packageInfo, null, '\t'));

	log.info('[OK]Create package.json');
}

async function configurationDatabaseConnect() {
	let drive           = null;
	let defaultPort     = 8080;
	let defaultDb       = 'node_news';
	let defaulthost     = '127.0.0.1';
	let defaultUsername = 'root';
	let defaultPassword = 'Password';
	let select      = null;

	while (drive === null) {
		select = await prompt.ask(`Select database drive [1: mongo, 2: mysql, 3: pgsql, 4: exit ]`);

		switch (Number(select)) {
			case 1: drive = 'mongo'; defaultPort = 27017; break;
			case 2: drive = 'mysql'; defaultPort = 3306;  break;
			case 3: drive = 'pgsql'; defaultPort = 5432;  break;
			case 4:
				log.error('You exit from intaller. Need be manual correct config database and set first user');
				process.exit();
				break;
			default :
				drive = null;
		}
	}

	let port = await prompt.ask(`Enter port [${defaultPort}]`);
	port = port || defaultPort;

	let host = await prompt.ask(`Enter host [${defaulthost}]`);
	host = host || defaulthost;

	let database = await prompt.ask(`Enter host [${defaultDb}]`);
	database = database || defaultDb;

	let username = await prompt.ask(`Enter db user [${defaultUsername}]`);
	username = username || defaultUsername;

	let password = await prompt.ask(`Enter db password [${defaultPassword}]`);
	password = password || defaultPassword;


	let config = {port, host, database, username, password};

	if (drive === 'mongo') {
		let authDB = await prompt.ask(`Enter auth db`);

		if (authDB.length) {
			config.authDB = authDB;
		}
	}

	const configPath = `${__dirname}/configs/database.json`;
	let   allConfig  = require(configPath);

	allConfig.drive  = drive;
	allConfig[drive] = config;

	await write(configPath, JSON.stringify(allConfig, null, '\t'));

}

async function gruntLogsCopy() {
	if (!fs.existsSync(`${__dirname}/logs`)) {
		await mkdir(`${__dirname}/logs`);
	}
}

async function gruntConfigsCopy() {
	await copy(`${ORIGIN_PATH}/configs_example`, `${__dirname}/configs`)
}

async function mainCopy() {
	try {
		for (let dir of ['classes', 'cli', 'constants', 'middleware', 'migration', 'models', 'modules', 'server_clients', 'server_employee', 'test', 'utils'])
			await copy(`${ORIGIN_PATH}/${dir}`, `${__dirname}/${dir}`)

		for (let file of [
				'.dockerignore',
				'.gitignore',
				'build-struct-descripation.js',
				'client-app.jpg',
				'emp-app-after-auth.jpg',
				'emp-start-page.jpg',
				'LICENSE.md',
				'README.md',
				'struct-descrition.md',
				'webpack.config.js'
			]) {
			if (!fs.existsSync(`${__dirname}/${file}`)) {
				await copyFile(`${ORIGIN_PATH}/${file}`, `${__dirname}/${file}`)
			}

		}

	} catch (e) {
		log.error(e);
	}
}

async function initConsoleUtil() {
	const ConsoleLog     = require('console-color');
	const ConsolePrompt  = require('console-prompt-eagle');
	const ConsoleSpinner = require('cli-spinner').Spinner;

	log     = new ConsoleLog();
	spinner = new ConsoleSpinner();
	prompt  = new ConsolePrompt();
	spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
}

async function baseCopy () {

	try {
		for (let dir of ['console-color', 'console-prompt-eagle', 'cli-spinner'])
			await copy(`${ORIGIN_PATH}/scripts/util/${dir}`, `${MAIN_NODE_MODULES}/${dir}`, true);

	} catch (e) {
		console.error(e);
	}
}

async function copy(dirSource, dirTarget, isShowLog = false) {
	let isTargetExist = await exists(dirTarget);

	if (!isTargetExist) {
		await await mkdir(dirTarget);
	}

	await copyDir(dirSource, dirTarget, isShowLog);
}

async function copyDir (dirSource, dirTarget, isShowLog) {

	if (isShowLog) console.log(`copy ${dirSource} -> ${dirTarget}`);

	let pathSource, pathTarget, stats;

	for (let file of await readdir(dirSource)) {

		pathSource = dirSource + '/' + file;
		pathTarget = dirTarget + '/' + file;

		stats = fs.lstatSync(pathSource);

		if (stats.isDirectory()) {
			if (file === 'node_modules') {
				spinner.stop(true);
				log.warn(`Use npm i in ${dirTarget}`);
				spinner.start(true);
				continue;
			}

			if (!fs.existsSync(pathTarget)) {
				await mkdir(pathTarget);
			}

			await copyDir(pathSource, pathTarget);

			continue;
		}

		await copyFile(pathSource, pathTarget);
	}
}
