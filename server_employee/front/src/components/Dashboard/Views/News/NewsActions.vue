<template>
    <div class="actions">
        <button v-if="!entry.is_active" :title="__t('Activate')" class="action btn btn-success"><i class="icon fa fa-check-circle"></i></button>
        <button v-if="entry.is_active" :title="__t('Deactivate')" class="action btn btn-danger"><i class="icon fa fa-ban"></i></button>
        <button :title="__t('Edit')" class="action btn btn-info"><i class="icon fa fa-pencil"></i></button>
    </div>
</template>

<script>
	export default {
		name: 'NewsActions',
        props: {
            entry : Object,
        },
        methods: {
            activate() {

            },
            deactivate() {

            },
            edit() {

            },
        },
	}
</script>

<style scoped>

</style>
