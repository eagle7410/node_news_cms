<template>
    <div>
        <img v-if="isLoad" src="static/img/index.ring-loading-gif.svg" class="load-anime"/>
        <div v-else :class="{'nav-open': $sidebar.showSidebar}">
            <router-view></router-view>
            <!--This sidebar appears only for screens smaller than 992px-->
        </div>
    </div>

</template>

<script>
    import {init} from './apis/app';

    export default {
        computed : {
            _storeApp () {
                return this.$store.state.app;
            },
            isLoad () {
                return this._storeApp.isLoad;
            }
        },

        methods: {
            _error (err) {
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
