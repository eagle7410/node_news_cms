<template>
    <div class="contact-us full-screen">
        <nav class="navbar navbar-ct-default" role="navigation-demo">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <toggle-navigation></toggle-navigation>
                    <router-link v-if="isAuth" :to="homePath" class="navbar-brand">{{__t('profile')}}</router-link>
                    <router-link v-else  to="/" class="navbar-brand">{{__t($store.state.app.phrases.sing_in)}}</router-link>
                </div>

            </div>
            <!-- /.container-->
        </nav>
        <div class="wrapper wrapper-full-page section content">
            <side-bar v-if="isAuth" type="sidebar" :sidebar-links="$sidebar.sidebarLinks"></side-bar>
            <div class="">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 text-center">
                            <h2 class="title text-danger">{{__t('404 Not Found')}}</h2>
                            <h2 class="title">{{__t('Oops! It seems that this page does not exist.')}}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {fullPath} from '../../routes/paths'
    import ToggleNavigation from '../Tools/ToggleNavigation'

    export default {
        components :{
            ToggleNavigation
        },
        computed: {
            homePath() {
                return {path : fullPath.profile};
            },
            isAuth () {
                return this.$store.state.auth.token;
            }
        },
    }

</script>
<style scoped>
    .navbar-ct-default {
        margin-bottom: -2px;
    }
</style>
