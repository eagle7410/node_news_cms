<template>
    <div class="container">
        <div class="row">
            <div class="col-md-5 col-lg-offset-2">
                <notifications></notifications>
                <choose-lang></choose-lang>
                <login-form></login-form>
            </div>
        </div>
    </div>
</template>
<script>
    import LoginForm from './LoginForm'
    import ChooseLang from './ChooseLang'

    export default {
        components: {
            LoginForm,
            ChooseLang
        },
        created () {
            this.$store.commit('reset');
        }
    }
</script>
