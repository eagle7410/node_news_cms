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

/**
 * Build directory tree.
 */
class TreeView {
	constructor () {
		this.tree = {};
		this.exclude = [];
		this.root = null;
		this.scanRules = null;
	}

	/**
	 * Build tree object for directory.
	 *
	 * @param {string} dir Directory for scan.
	 * @param {object} rules Rules for build tree.
	 * @param {array}  exclude Regexp for exclude files (Directory is file).
	 *
	 * @returns {Promise<boolean>}
	 */
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

	/**
	 * Build tree object for directory.
	 *
	 * @param {string} dir
	 * @param {object} treeDir
	 *
	 * @returns {Promise<void>}
	 * @private
	 */
	async _scanDir (dir, treeDir) {
		let stats, path, rule, isExclude;

		for (let file of await readdir(dir)) {
			isExclude = false;

			this.exclude.map(regexp => { if (regexp.test(file)) isExclude = true; });

			if (isExclude) continue;

			path  = dir + '/' + file;
			stats = fs.lstatSync(path);

			if (stats.isFile()) {
				treeDir[file] = {isFile : true, path};
				continue;
			}

			treeDir[file] = {isDir : true, childs : {}, path};

			if (this.scanRules[file]) {
				rule = this.scanRules[file];

				if (rule.isOnlyName) {
					if (!rule.isUsePath) continue;
				}
			}

			await this._scanDir(path, treeDir[file].childs);
		}
	}

	toContent(description) {
		return this._printChildren(`Root folder`, '', this.tree, description);
	}

	_printChildren (result, base, childs, description) {
		for (let i = 0, keys = Object.keys(childs), len = keys.length; i < len; i++) {
			let  name = keys[i],
				data = childs[name],
				desc = '',
				symbol, before;

			if (i === len -1) {
				symbol = '└';
				before = '   ';
			} else {
				symbol = '├';
				before = '│   ';
			}

			description.map(iter => {
				// TODO: clear
				console.log('data.path', data.path);
				if (iter.regExp.test(data.path)) {
					desc = iter.text;
				}
			});

			result += `\n${base}${symbol}── ${name} ${desc}`;

			if (data.isDir) {
				result = this._printChildren(result, base + before, data.childs, description);
			}
		}

		return result;
	}
}

module.exports = TreeView;
