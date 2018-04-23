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
    import {auth} from '../../../../apis/app'

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
                    return console.log('Login unknow error', mess);
                }

                this.$notify({
                    message: mess,
                    horizontalAlign: 'center',
                    icon: 'error',
                    type: 'danger'
                })
            },
            singIn() {
                if (!this.email) {
                    return this._error('Email is require')
                }

                if (!this.pass) {
                    return this._error('Password is require')
                }

                auth({email: this.email, password: this.pass})
                    .then(res => {
                        this.$store.commit('setToken', res.token);
                        this.$store.commit('setProfile', res.user);
                        this.$store.commit('setAuthPhrases', res.phrases);
                        this.$root.sidebarLinks = res.leftMenu || [];
                        this.$router.push('/admin/user-profile');
                    })
                    .catch(this._error)
            }
        }
    }

</script>
<style>

</style>
