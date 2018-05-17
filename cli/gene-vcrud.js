const {ConsoleColorLog} = require('./libs/console-color');
const fs          = require('fs');
const log         = new ConsoleColorLog();
const {promisify} = require('util');
const writter     = promisify(fs.writeFile);
const reader      = promisify(fs.readFile);

// Get params
let name;
let to1Up = ((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase());

process.argv.map(arg => {

	if (arg.includes('-n=')) {
		name = arg.trim().replace('-n=', '');
	}
});

if (!name) {
	log.error('Need set name. Example use: node ./cli/gene-vcrud.js -n=employees');
	process.exit();
}

let className = name.split('-').map(to1Up).join('');
const pathBase = `${__dirname}/../server_employee/front/src`;


const showMessages = () => {
	log.warn(`Need set path. to ${pathBase}/routes/routes fullPath.${className}, fullPath.${className}Add, ${className}Edit`);
	log.warn(`Add translate.`);
	log.warn(`Check $api ${name}.`);
	log.warn(`ADD in top menu server_employee/modules/left-menu.js .`);
};

const isNewPath = (path) => {
	if (fs.existsSync(path)) {
		throw new Error(`${path} exists`)
	}
};
const createApiModule = async () => {
	let dirApiStore = `${pathBase}/plugins/ApiProvider/controllers`;
	let dirApiStoreModule = `${dirApiStore}/${name}.js`;
	let dirApiStoreIndex = `${dirApiStore}/index.js`;

	isNewPath(dirApiStoreModule);
	await writter(dirApiStoreModule, templates().api);

	let index = await reader(dirApiStoreIndex);

	await writter(
		dirApiStoreIndex,
		index.toString()
			.replace('//End import', `import ${className} from './${name}.js'\n//End import`)
			.replace('//Modules', `//Modules\n    ${className},`)
	);

	return true;
};
const createComponents = async () => {
	let dirComp = `${pathBase}/components/Dashboard/Views/${className}`;

	isNewPath(dirComp);

	fs.mkdirSync(dirComp);

	let tpls = templates();

	await writter(`${dirComp}/${className}.vue`, tpls.list);
	await writter(`${dirComp}/${className}Actions.vue`, tpls.actions);
	await writter(`${dirComp}/${className}Add.vue`, tpls.add);
	await writter(`${dirComp}/${className}Edit.vue`, tpls.edit);
	await writter(`${dirComp}/${className}Filters.vue`, tpls.filters);
	await writter(`${dirComp}/${className}Form.vue`, tpls.form);
	await writter(`${dirComp}/${className}Tools.vue`, tpls.tools);

	return true;
};

const createStore = async () => {
	let dirStore = `${pathBase}/store`;
	let dirStoreModules = `${dirStore}/modules`;
	let dirStoreModuleStore = `${dirStoreModules}/${name}.js`;
	let dirStoreModuleStoreOne = `${dirStoreModules}/${name}-one.js`;

	let tpls = templates();

	isNewPath(dirStoreModuleStore);
	await writter(dirStoreModuleStore, tpls.store);

	isNewPath(dirStoreModuleStoreOne);
	await writter(dirStoreModuleStoreOne, tpls.storeOne);

	let storeIndex = await reader(`${dirStore}/store.js`);

	await writter(
		`${dirStore}/store.js`,
		storeIndex.toString()
			.replace('// End modules', `import ${className} from './modules/${name}'\n// End modules`)
			.replace('modules: {', `modules: {\n        ${className},`)
			.replace('// End modules', `import ${className}One from './modules/${name}-one'\n// End modules`)
			.replace('modules: {', `modules: {\n        ${className}One,`)
	);

	return true;
};

const IhaHaHa = async () => {
	try {

		await createComponents();
		await createStore();
		await createApiModule();

		showMessages();
		log.success(`Success generate vue crud ${name}.`);
		process.exit();
	} catch (e) {

		log.error(`Error generate vue crud ${name}`, e);
		process.exit();

	}
};

IhaHaHa();

function templates() {
	let list = `<template>
    <page>
        <div class="row">
            <div class="col-md-12 col-lg-11">
                <material-table
                    :title="__t('${name}')"
                    :data="list"
                    :columns="columnsInStore"
                    :tools="tools"
                    :filters="filters"
                    :custom="custom"
                    :is-use-pagination="true"
                    :steep="steepInStore"
                    :count-pages="countPagesInStore"
                    :current-page="currentPageInStore"
                    :set-current-page="setCurrentPageInStore"
                >
                </material-table>
            </div>
        </div>
    </page>
</template>

<script>
    import MaterialTable from '../../../UIComponents/MaterialTable'
    import ShowStatus from '../../../UIComponents/ShowStatus'
    import ${className}Tools from './${className}Tools'
    import ${className}Actions from './${className}Actions'
    import ${className}Filters from './${className}Filters'

    export default {
        name: 'Clients',
        components: {
            MaterialTable,
            ${className}Tools,
        },
        data() {
            return {
                filters : {
                    component : ${className}Filters
                },
                custom: {
                    is_active : {
                        component: ShowStatus,
                        props : {
                            store : 'is_active'
                        }
                    },
                    actions : {
                        component: ${className}Actions
                    }
                }
            }
        },
        computed: {
            tools() {
                return {
                    component: ${className}Tools,
                    props: []
                }
            },
            _store() {
                return this.$store.state.${className};
            },

            list() {
                return this._store.list.map(row => {
                    row = {...row};
                    const dateFormat = 'd-m-y h:i';
                    row.created_at = new Date(row.created_at).toStringByFormat(dateFormat);
                    row.updated_at = new Date(row.updated_at).toStringByFormat(dateFormat);

                    return row;
                });
            }
        },
        created() {
            this.$store.dispatch(this.setCurrentPageInStore, {
                page : 0,
                app  : this
            });
        }
    }
</script>`;
	const edit = `<template>
    <page>
        <box :title="__t('${name}-edit')">
            <div class="row">
                <div class="col-md-10">
                    <${name}-form></${name}-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import {fullPath} from '../../../../routes/paths';
    import ${className}Form from './${className}Form'

    export default {
        name: '${className}Edit',
        components: {
            ${className}Form,
        },
        computed: {
            _store() {
                return this.$store.state.${className}One;
            }
        },
        async created() {
            let id;

            try {
                id = this.$route.query.id;

                if (!id) {
                    throw new Error(\`Not fount ${name} id in $route.query \`);
                }

                let {row} = await this.$api.get${className}ById(id);

                if (!row || !row._id) {
                    throw new Error(\`Bad response data \${JSON.stringify(row)}\`);
                }

                this.$store.commit('set${className}ForEdit', row);

                return true;

            } catch (e) {
                console.error(\`Error get ${name} by id -> \${id}\`, e);
                this.notifyError(this.__t('Error load ${name}'));
                this.$router.push(fullPath.${className});
            }
        }
    }
</script>
`;
	const add = `<template>
    <page>
        <box :title="__t('${name}-add')">
            <div class="row">
                <div class="col-md-10">
                    <${name}-form></${name}-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import ${className}Form from './${className}Form'
    export default {
        name: '${className}Add',
        components: {
            ${className}Form
        },
        created () {
            this.$store.commit('clearOne${className}');
        }
    }
</script>

<style scoped>
    .card {
        padding: 10px;
    }
</style>
`;
	const form = `<template>
    <div class="${name}-form">
        <div class="row" v-if="!_id">
            <div class="col-lg-6">
                for new
            </div>
        </div>
       
        <button type="submit" @click.prevent="save" class="btn btn-primary">
            {{__t('Save')}}
        </button>
    </div>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: '${className}Form',
        computed: {
            _store() {
                return this.$store.state.${className}One;
            },
            _id: function () {
                return this._store._id;
            },
           
        },

        methods: {
        	// TODO: Back Maybe not need.
        	_setProp(prop, val) {
                this.$store.commit('setProp${className}', {val, prop});
            },
            _validate() {
            	// TODO: Back No implement _validate
                throw new Error('No implement _validate')
            },

            _noticeAboutErrorSave(data) {
                console.error('Error save ${name} ', data);
                this.notifyError(this.__t('Error in save ${name}'));
            },

            async save() {
                if (!this._validate()) {
                    return false;
                }

                this.formData._id = this._id;

                try {
                    let result = await this.$api.${className}Save(this.formData);

                    if (!result.success) {
                        return this._noticeAboutErrorSave(result);
                    }

                    this.$store.commit('clearOne${className}');
                    this.$router.push(fullPath.${className});

                    return true;

                } catch (e) {
                    this._noticeAboutErrorSave(e);
                }
            }
        },
        data() {
            return {
                formData: {},
            }
        },
    }
</script>\n
`;
	const tools = `<template>
    <span>
        <a class="btn btn-success" @click.prev="handlerAdd">{{__t('Add')}}</a>
    </span>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: '${className}Tools',
        methods : {
            handlerAdd () {
                this.$router.push(fullPath.${className}Add)
            }
        }
    }
</script>
`;
	const filters = `<template>
    <div class="filters_block">
        <button class="btn" v-if="isOpen" @click.prev="handelApply">
            <i class="fa fa-cog fa-spin load" v-if="loadPage"></i> {{__t('Apply')}}
        </button>
        <a @click.prev="toggleShowForm" class="filter-switcher">{{labelToggleFilters}}</a>
        <form :class="cssClassForm">
            <div class="row">

                <div class="col-md-3">
                    <md-field>
                        <span id="byActivationLabel" class="filters filters_label">{{__t('By activation')}}</span>
                        <md-select v-model="is_active" id="byActivation">
                            <md-option :value="-1">{{__t('all')}}</md-option>
                            <md-option :value="0">{{__t('isNoActivate')}}</md-option>
                            <md-option :value="1">{{__t('isActivate')}}</md-option>
                        </md-select>
                    </md-field>
                </div>
             
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        name: '${className}Filters',
        computed: {
            labelToggleFilters: function () {
                return this.__t(this.isOpen ? this.labelClose : this.labelOpen);
            },
            cssClassForm: function () {
                return 'filters ' + (this.isOpen ? '' : 'hide');
            },
            _store() {
                return this.$store.state.${className}
            },
            loadPage() {
                return this._store.loadPage
            },
            is_active: {
                get: function () {
                    return this._store.filters.is_active;
                },
                set: function (value) {
                    this.$store.commit('setFilterIsActive${className}', value);
                }
            }
        },

        methods: {
            handelApply() {
                this.$store.dispatch(this.setCurrentPageInStore, {
                    page: 0,
                    app: this
                });
            },
            toggleShowForm: function () {
                this.isOpen = !this.isOpen
            }
        },

        data() {
            return {
                isOpen: false,
                labelOpen: 'Show filters',
                labelClose: 'Hide filters'
            }
        }
    }
</script>

<style scoped>
    .filter-switcher {
        cursor: pointer;
    }

    .md-field .md-theme-default {
        background-color: none !important;
    }

    .load {
        color: yellow;
        font-size: 32px;
    }

</style>
`;
	const actions = `<template>
    <div class="actions">
        <button @click="edit" :title="__t('Edit')" class="action btn btn-info">
            <i class="icon fa fa-pencil"></i>
        </button>

        <button @click="activate" :title="__t('Activate')" class="action btn btn-success">
            <i class="icon fa fa-check-circle"></i>
        </button>

    </div>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: '${className}Actions',
        props: {
            entry: Object,
        },
        methods: {
            handlerError(err, mess) {
                console.error(mess, err);
                this.notifyError(mess);
            },
            async activate () {
                if (!confirm(this.__t('You are sure?'))) {
                    return false;
                }

                try {
                    let response = await this.$api.${className}Activate(this.entry._id);
                    this.$store.commit('update${className}', response.row);
                    this.notifyOk(this.__t('${className} is active'));

                } catch (e) {
                    this.handlerError(e, this.__t('Error activate ${className}'))
                }
            },
            edit() {
                this.$router.push({path: fullPath.${className}Edit, query: {id: this.entry._id}})
            },
        },
    }
</script>
`;
	// store filters.is_active
	const store = `export default {
	// TODO: Back implement
    state: {
        columns: [
            'is_active',
            'updated_at',
            'updated_by',
            'created_at',
            'created_by',
            'actions'
        ],
        list : [],
        steep: 2,
        pageSize: 15,
        countPages: 0,
        currentPage: 0,
        countTotal : 0,
        setCurrentPage: 'setCurrentPage${className}',
        loadPage: 0,
        filters : {
            is_active  : -1,
        }
    },
    mutations: {
        update${className} (state, row) {
            for (let index in state.list) {
                if (state.list[index]._id === row._id) {
                    state.list[index] = row;
                    state.list = [].concat(state.list);
                    break;
                }
            }
        },
        set${className}ByPage(state, data) {
            state.list = data.docs;
            state.currentPage = data.currentPage;
            state.countPages = data.countPages;
            state.countTotal = data.countTotal;
            state.loadPage = 0;
        },
        loadRun${className} (state) {
            state.loadPage = 1;
        },
        loadStop${className} (state) {
            state.loadPage = 0;
        },
        setFilterIsActive${className} (state, value) {
            state.filters.is_active = value;
        }
    },
    actions: {
        async setCurrentPage${className}({commit, state}, {page, app}) {
            try {

                commit('loadRun${className}');

                let data = await app.$api.${className}({
                    page,
                    pageSize   : state.pageSize,
                    is_active  : state.filters.is_active,

                });

                commit('set${className}ByPage', data)

            } catch (err) {

                commit('loadStop${className}');

                console.error('$api.${className} err', err);
                app.notifyError(app.__t('Error get ${className}'));
            }

        }
    }
}
`;
	const storeOne = `const initial = {
    _id : null,
};
export default {
    state: {...initial},
    mutations: {
        setProp${className}(state, {prop, val}) {
            state[prop] = val;
        },
        clearOne${className}(state) {
            Object.assign(state, initial);
        },
        set${className}ForEdit(state, row) {
            Object.keys(initial).map(prop => { state[prop] = row[prop] });
        }

    }
}\n`;

	const api = `import {get, save} from '../../../utils/req';
const controller = '${name}';

export default {
    async ${className}(data = {}) {
        return await this._send(get, controller + '/all_by_page', data);
    },
    async ${className}Save(row) {
        return await this._send(save, controller + '/save', row);
    },
    async ${className}Activate(id) {
        return await this._send(save, controller + '/activate', {id});
    },
    async get${className}ById(id) {
        return await this._send(get, controller + '/one', {id});
    }
};
`;
	return {
		api,
		list,
		edit,
		add,
		form,
		tools,
		filters,
		actions,
		storeOne,
		store
	};
}
