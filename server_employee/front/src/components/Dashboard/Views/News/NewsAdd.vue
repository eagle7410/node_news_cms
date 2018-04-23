<template>
    <page>
        <box :title="__t('news-add')">
            <div class="row">
                <div class="col-md-10">
                    <news-form></news-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import NewsForm from './NewsForm'

    export default {
        name: 'NewsAdd',
        components: {
            NewsForm
        },
        mounted () {
            this.$store.commit('clearOneNews');
        }
    }
</script>

<style scoped>
    .card {
        padding: 10px;
    }
</style>
