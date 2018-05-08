<template>
    <div>
        <loading v-if="isLoad"></loading>
        <div v-else :class="{'nav-open': $sidebar.showSidebar}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
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

        async created() {
            try {
                this.$api.setStore(this._storeAuth, this.$store.commit);

                let res = await this.$api.init();

                this.$store.commit('setPhrases', res.phrases);
                this.$store.commit('setLangs', res.langs);
                this.$store.commit('setLang', res.lang);
                this.$store.commit('setLoad', false);

            } catch (e) {
                this._error(e);
            }
        }
    }
</script>
