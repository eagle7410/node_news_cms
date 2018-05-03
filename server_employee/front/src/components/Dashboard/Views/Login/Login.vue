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
    import FormLogin from './FormLogin'
    import ChooseLang from './ChooseLang'

    export default {
        components: {
            FormLogin,
            ChooseLang
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
