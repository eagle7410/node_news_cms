<template>
    <div class="contact-us full-screen">
        <nav class="navbar navbar-ct-default" role="navigation-demo">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#navigation-example-2">
                        <span class="sr-only">{{__t('Toggle navigation')}}</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link :to="homePath" class="navbar-brand">{{__t('profile')}}</router-link>
                </div>

            </div>
            <!-- /.container-->
        </nav>
        <div class="wrapper wrapper-full-page section content">
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

    export default {
        computed: {
            homePath() {
                return {path : fullPath.profile};
            }
        },
    }

</script>
