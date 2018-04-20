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


                <button type="submit" @click.prevent="singIn" class="btn btn-primary pull-right">{{phrases.try}}</button>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</template>
<script>
    import {auth} from '../../../../apis/auth'

    let that

    export default {
        computed: {
            _storeAuth: () => that.$store.state.auth,
            phrases   : () => that.$store.state.app.phrases,

            email: {
                get: () => that._storeAuth.email,
                set: (value) => that.$store.commit('setEmail', value)
            },
            pass: {
                get: () => that._storeAuth.password,
                set: (value) => that.$store.commit('setPass', value)
            }
        },
        methods: {
            _error (mess) {
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
            singIn () {
                if (!that.email) {
                    return that._error('Email is require')
                }

                if (!that.pass) {
                    return that._error('Password is require')
                }

                auth({email: that.email, password: that.pass})
                    .then(res => {

                        if (!res.success) {
                            return false
                        }

                        that.$store.commit('setToken', res.token)

                        that.$router.push('/admin/dashboard');
                    })
                    .catch(that._error)
            }
        },

        created: function () {
            that = this
        }
    }

</script>
<style>

</style>
