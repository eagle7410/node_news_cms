const fs          = require('fs');
const {promisify} = require('util');
const readdir     = promisify(fs.readdir);
const exists      = promisify(fs.exists);

const TYPE_DIRECTORY = 1;
const TYPE_FILE = 2;

const DEFAULT_EXCLUDE = [
	/node_modules/,
	/^\.(.*)/,
	/(.*)\.md/,
	/webpack.config.js/,
	/test(.*)/,
	/(.*)\.txt/,
	/package(.*)\.json/,
	/index\.(js|html)/,
	/dist/,
	/build/,
	/config/
];

class TreeView {
	constructor () {
		this.tree = {};
		this.exclude = [];
		this.root = null;
		this.scanRules = null;
	}

	async scan (dir, rules, exclude = DEFAULT_EXCLUDE) {

		if (!Array.isArray(exclude)) exclude = [exclude];

		this.exclude = exclude;
		this.scanRules = rules;

		let stats = fs.lstatSync(dir);

		if (!stats.isDirectory()) {
			throw `Path ${dir} must be directory `;
		}

		await this._scanDir(dir, this.tree);

		return true;
	}

	async _scanDir (dir, treeDir) {
		let stats;
		let path;
		let rule;
		let list = await readdir(dir);

		for (let file of list) {
			let isExclude = false;

			this.exclude.map(regexp => {
				if (regexp.test(file)) isExclude = true;
			});

			if (isExclude) continue;

			path  = dir + '/' + file;
			stats = fs.lstatSync(path);

			if (stats.isFile()) {
				treeDir[file] = {
					isFile : true,
					path
				};

				continue;
			}

			if (stats.isDirectory()) {
				treeDir[file] = {
					isDir : true,
					childs : {},
					path
				};

				if (this.scanRules[file]) {
					rule = this.scanRules[file];

					if (rule.isOnlyName) {
						if (!rule.isUsePath) continue;
					}
				}

				await this._scanDir(path, treeDir[file].childs);

				continue;
			}
		}
	}

	toContent(description) {
		let base = '├';
		let result = `Root folder`;

		result = this._printChildren(result, '', this.tree);

		return result;
	}

	_printChildren (result, base, childs) {
		for (let i = 0, keys = Object.keys(childs), len = keys.length; i < len; i++) {
			let  name = keys[i],
				data = childs[name],
				symbol,
				before;

			if (i === len -1) {
				symbol = '└';
				before = '   ';
			} else {
				symbol = '├';
				before = '│   ';
			}
			result += `\n${base}${symbol}── ${name}`;

			if (data.isDir) {
				result = this._printChildren(result, base + before, data.childs);
				continue;
			}
		}

		return result;
	}
}

module.exports = TreeView;
