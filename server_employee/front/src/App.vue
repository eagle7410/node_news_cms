<template>
    <div>
        <loading v-if="isLoad"></loading>
        <div v-else :class="{'nav-open': $sidebar.showSidebar}">
            <router-view></router-view>
            <!--This sidebar appears only for screens smaller than 992px-->
        </div>
    </div>

</template>

<script>
    import {init} from './apis/app';
    import Loading from './components/Tools/Loading';

    export default {
        components: {
            Loading
        },

        computed: {
            _storeApp() {
                return this.$store.state.app;
            },
            _storeAuth() {
                return this.$store.state.auth;
            },
            isLoad() {
                return this._storeApp.isLoad;
            }
        },

        methods: {
            _error(err) {
                console.error('App unknow error', err);
                alert('Server init error');
            }
        },

        created() {

            this.$api.setStore(this._storeAuth, this.$store.commit);

            init().then(res => {
                this.$store.commit('setPhrases', res.phrases);
                this.$store.commit('setLoad', false);
            })
                .catch(this._error);
        }
    }
</script>
