<template>
    <div class="employees-form">
        <div class="row" v-if="!_id">
            <div class="col-lg-6">
                <fg-input type="text"
                          :label="__t('email')"
                          :placeholder="__t('email')"
                          v-model="email"
                ></fg-input>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <fg-input type="text"
                          :label="__t('name')"
                          :placeholder="__t('name')"
                          v-model="name"
                ></fg-input>
            </div>
            <div class="col-lg-6">
                <fg-input type="text"
                          :label="__t('surname')"
                          :placeholder="__t('surname')"
                          v-model="surname"
                ></fg-input>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6">
                <fg-input type="password"
                          :label="__t('password')"
                          :placeholder="__t('The password must have a number and a capital letter and at least 8 characters (A,..z0..9)')"
                          v-if="!_id"
                          v-model="password"
                ></fg-input>
            </div>
            <div class="col-lg-6">
                <fg-input type="password"
                          :label="__t('repeat')"
                          :placeholder="__t('repeat')"
                          v-if="!_id"
                          v-model="repeat"
                ></fg-input>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <md-field>
                    <label>{{__t('groups')}}</label>
                    <md-select v-model="groups" id="groups" multiple>
                        <md-option v-for="(label, gr) in groupList" :value="gr">{{__t(label)}}</md-option>
                    </md-select>
                </md-field>
            </div>
        </div>

        <button type="submit" @click.prevent="save" class="btn btn-primary">
            {{__t('Save')}}
        </button>
    </div>
</template>

<script>
    import {isEmail} from '../../../../utils/validators'
    import {fullPath} from '../../../../routes/paths'

    let utilPass = require('../../../../utils/password');

    export default {
        name: 'EmployeesForm',
        computed: {
            _storeAuth() {
                return this.$store.state.auth;
            },
            _store() {
                return this.$store.state.EmployeesOne;
            },
            groupList: function () {
                return this._storeAuth.groupList;
            },
            _id: function () {
                return this._store._id;
            },
            groups:{
                get: function () {
                    return this._store.groups
                },
                set: function (val) {
                    this._setProp('groups', val);
                }
            },
            email:{
                get: function () {
                    return this._store.email
                },
                set: function (val) {
                    this._setProp('email', val);
                }
            },
            name: {
                get: function () {
                    return this._store.name
                },
                set: function (val) {
                    this._setProp('name', val);
                }
            },
            surname: {
                get: function () {
                    return this._store.surname;
                },
                set: function (val) {
                    this._setProp('surname', val);
                }
            },
            password: {
                get: function () {
                    return this._store.password;
                },
                set: function (val) {
                    this._setProp('password', val);
                }
            },
            repeat: {
                get: function () {
                    return this._store.repeat;
                },
                set: function (val) {
                    this._setProp('repeat', val);
                }
            },
        },

        methods: {
            _setProp(prop, val) {
                this.$store.commit('setPropEmployees', {val, prop});
            },
            _validate() {
                if (!isEmail(this.email)) {
                    this.notifyError(this.__t('Field `{field}`. Must be email', {field: 'email'}));

                    return false;
                }

                this.formData.email = this.email;

                if (!this.name) {
                    this.notifyError(this.__t('Field `{field}`. Is required.', {field: this.__t('name')}));

                    return false;
                }

                this.formData.name = this.name;

                if (!this.surname) {
                    this.notifyError(this.__t('Field `{field}`. Is required.', {field: this.__t('surname')}));

                    return false;
                }

                this.formData.surname = this.surname;

                if (!this._id) {
                    if (!this.password) {
                        this.notifyError(this.__t('Field `{field}`. Is required.', {field: this.__t('password')}));
                        return false;
                    }

                    if (!utilPass.validatePass(this.password)) {
                        this.notifyError(this.__t('The password must have a number and a capital letter and at least 8 characters (A,..z0..9)'));
                        return false;
                    }

                    if (this.repeat !== this.password) {
                        this.notifyError(this.__t('Bad confirmation password'));
                        return false;
                    }

                    this.formData.password = this.password;
                }

                if (!this.groups.length) {
                    this.notifyError(this.__t('No set groups.'));
                    return false;
                }

                this.formData.groups = this.groups;

                return true;

            },

            _noticeAboutErrorSave(data) {
                console.error('Error save employees ', data);
                this.notifyError(this.__t('Error in save employees'));
            },

            async save() {
                if (!this._validate()) {
                    return false;
                }

                this.formData._id = this._id;

                try {
                    let result = await this.$api.EmployeesSave(this.formData);

                    if (!result.success) {
                        return this._noticeAboutErrorSave(result);
                    }

                    this.$store.commit('clearOneEmployees');
                    this.$router.push(fullPath.Employees);

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
</script>
