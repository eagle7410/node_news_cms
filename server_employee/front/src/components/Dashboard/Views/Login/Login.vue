<template>
    <div class="container">
        <div class="row">
            <div class="col-md-5 col-lg-offset-2">
                <notifications></notifications>
                <login-form></login-form>
            </div>
        </div>
    </div>
</template>
<script>
    import LoginForm from './LoginForm'

    export default {
        components: {
            LoginForm
        },
        created () {
            this.$store.commit('reset');
        }
    }

</script>
<style scoped>
    .container {
        padding: 140px;
    }
</style>
