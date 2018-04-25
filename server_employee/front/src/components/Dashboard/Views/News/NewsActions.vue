<template>
    <div class="actions">
        <button @click="activate" v-if="!entry.is_active" :title="__t('Activate')" class="action btn btn-success"><i
            class="icon fa fa-check-circle"></i></button>
        <button @click="deactivate" v-if="entry.is_active" :title="__t('Deactivate')" class="action btn btn-danger"><i
            class="icon fa fa-ban"></i></button>
        <button @click="edit" :title="__t('Edit')" class="action btn btn-info"><i class="icon fa fa-pencil"></i>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'NewsActions',
        props: {
            entry: Object,
        },
        methods: {
            handlerError(err, mess) {
                console.log(mess, err);
                this.notifyError(mess);
            },
            async changeActive(isActive) {

                if (!confirm(this.__t('You are sure?'))) {
                    return false;
                }

                try {
                    let response = await this.$authApi.newsSetActive(this.entry._id, isActive);
                    this.$store.commit('updateNews', response.news);
                    this.notifyOk(this.__t('News has updated the status of activity'));

                } catch (e) {
                    this.handlerError(e, this.__t('Error news activate'))
                }
            },
            activate() {
                this.changeActive(true);
            },
            deactivate() {
                this.changeActive(false);
            },
            edit() {

            },
        },
    }
</script>

<style scoped>

</style>
