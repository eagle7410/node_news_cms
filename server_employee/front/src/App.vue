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
            init()
                .then(res => {
                    this.$store.commit('setPhrases', res.phrases);
                    this.$store.commit('setLoad', false);
                })
                .catch(this._error);
        }
    }
</script>
