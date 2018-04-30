<template>
    <div class="actions">
        <button @click="activate"
                v-if="(isAdmin || isModerator) && !entry.is_active"
                :title="__t('Activate')"
                class="action btn btn-success"><i
            class="icon fa fa-check-circle"></i></button>
        <button @click="deactivate"
                v-if="(isAdmin || isModerator) && entry.is_active"
                :title="__t('Deactivate')" class="action btn btn-danger"><i
            class="icon fa fa-ban" v-if=""></i></button>
        <button @click="edit"
                v-if="isAdmin || isContent"
                :title="__t('Edit')"
                class="action btn btn-info"><i class="icon fa fa-pencil"></i>
        </button>
    </div>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

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
                    let response = await this.$api.newsSetActive(this.entry._id, isActive);
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
                this.$router.push({path: fullPath.newsEdit, query: {id: this.entry._id}})
            },
        },
    }
</script>

<style scoped>

</style>
