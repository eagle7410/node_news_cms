<template>
    <div class="card">
        <div class="card-header" data-background-color="purple">
            <h4 class="title">{{phrases.sing_in}}</h4>
        </div>
        <div class="card-content">
            <form>
                <div class="row">
                    <div class="col-md-12">
                        <fg-input type="email"
                                  :label="phrases.email"
                                  :placeholder="phrases.email"
                                  v-model="email">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <fg-input type="password"
                                  :label="phrases.password"
                                  :placeholder="phrases.password"
                                  v-model="pass">
                        </fg-input>
                    </div>
                </div>


                <button type="submit" @click.prevent="singIn" class="btn btn-primary pull-right">{{phrases.try}}
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {fullPath} from '../../../../routes/paths'

    export default {
        computed: {
            _storeAuth: function () {
                return this.$store.state.auth
            },
            phrases: function () {
                return this.$store.state.app.phrases
            },
            email: {
                get: function () {
                    return this._storeAuth.email
                },
                set: function (value) {
                    return this.$store.commit('setEmail', value)
                }
            },
            pass: {
                get: function () {
                    return this._storeAuth.password
                },
                set: function (value) {
                    return this.$store.commit('setPass', value)
                }
            }
        },
        methods: {
            _error(mess) {
                if (typeof mess !== 'string') {
                    return console.error('Login unknow error', mess);
                }

                this.notifyError(mess);
            },
            async singIn() {
                if (!this.email) {
                    return this._error('Email is require')
                }

                if (!this.pass) {
                    return this._error('Password is require')
                }

                try {
                    let res = await this.$api.auth({email: this.email, password: this.pass});

                    if (res.code) {
                        return this._error(res.message);
                    }

                    this.$store.commit('setDataAfterLogin', res);

                    this.$root.sidebarLinks = res.leftMenu || [];

                    Vue.prototype.$material.locale = this._storeAuth.phrases.locale;

                    this.$router.push(fullPath.profile);

                } catch (e) {
                    this._error(e);
                }
            }
        }
    }
</script>
