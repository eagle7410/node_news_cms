<template>
    <page>
        <box :title="__t('news-edit')">
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
		name: 'NewsEdit',
        components: {
            NewsForm
        },
        created () {
            this.$store.commit('clearOneNews');
        }
	}
</script>

<style scoped>

</style>
