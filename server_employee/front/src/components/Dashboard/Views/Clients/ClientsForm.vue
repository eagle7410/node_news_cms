<template>
    <div class="client-form">
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

        <button type="submit" @click.prevent="save" class="btn btn-primary pull-right">
            {{__t('Save')}}
        </button>
    </div>
</template>

<script>
    import {isEmail} from '../../../../utils/validators'
    import {fullPath} from '../../../../routes/paths'

    let utilPass;

    if (process.env.NODE_ENV === 'development') {
        utilPass = require('../../../../../../../utils/password')
    }

    if (process.env.NODE_ENV === 'production') {
        utilPass = require('../../../../utils/password')
    }

    export default {
        name: 'NewsForm',
        computed: {
            _store() {
                return this.$store.state.clientOne;
            },
            email: function () {
                return this._store.email
            },
            name: {
                get: function () {
                    return this._store.name
                },
                set: function (value) {
                    this.$store.commit('setName', value);
                }
            },
            surname: {
                get: function () {
                    return this._store.surname;
                },
                set: function (value) {
                    this.$store.commit('setSurname', value);
                }
            },
            password: {
                get: function () {
                    return this._store.password;
                },
                set: function (value) {
                    this.$store.commit('setPassword', value);
                }
            },
            repeat: {
                get: function () {
                    return this._store.repeat;
                },
                set: function (value) {
                    this.$store.commit('setRepeat', value);
                }
            },
            _id: function () {
                return this._store._id;
            }
        },

        methods: {
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

                return true;
            },

            _noticeAboutErrorSave(data) {
                console.error('Error save client ', data);
                this.notifyError(this.__t('Error in save client'));
            },

            async save() {
                if (!this._validate()) {
                    return false;
                }

                this.formData._id = this._id;

                try {
                    let result = await this.$api.clientSave(this.formData);

                    if (!result.success) {
                        return this._noticeAboutErrorSave(result);
                    }

                    this.$store.commit('clearOneClient');
                    this.$router.push(fullPath.clients);

                    return true;

                } catch (e) {
                    this._noticeAboutErrorSave(e);
                }
            }
        },
        data() {
            return {
                formData: {},
                movies: []
            }
        },
    }
</script>
