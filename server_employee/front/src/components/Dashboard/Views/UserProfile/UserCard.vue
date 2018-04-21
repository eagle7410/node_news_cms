<template>
    <div class="card card-profile">
        <div class="card-avatar">
            <a href="#pablo">
                <gravatar :email="email" alt="User Image" class="image" default-img="mm"></gravatar>
            </a>
        </div>

        <div class="content">
            <h4 class="card-title">{{__t('Employee avatar')}}</h4>
            <p class="card-content">
                {{__t('For change avatar use service')}} <a href="https://en.gravatar.com/">Gravatar</a>
            </p>
        </div>
    </div>
</template>
<script>
    import Gravatar from 'vue-gravatar';
    let that;

    export default {
        components : {
            Gravatar
        },
        computed: {
            _storeAuth: () => that.$store.state.auth,
            email: () => that._storeAuth.email
        },

        created () {
            that = this;
        }
    }

</script>
<style>
</style>
