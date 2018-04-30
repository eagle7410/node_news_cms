<template>
    <div class="actions">
        <button @click="edit" :title="__t('Edit')" class="action btn btn-info">
            <i class="icon fa fa-pencil"></i>
        </button>

        <button @click="remove" v-if="isAdmin && !entry.is_deleted" :title="__t('Delete')" class="action btn btn-danger">
            <i class="icon fa fa fa-user-times"></i>
        </button>

        <button @click="restore" v-if="isAdmin && entry.is_deleted" :title="__t('Restore')" class="action btn btn-success">
            <i class="icon fa fa fa-user-plus"></i>
        </button>

        <button @click="activate" v-if="!entry.is_active" :title="__t('Activate')" class="action btn btn-success">
            <i class="icon fa fa-check-circle"></i>
        </button>

    </div>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: 'ClientsActions',
        props: {
            entry: Object,
        },
        methods: {
            handlerError(err, mess) {
                console.error(mess, err);
                this.notifyError(mess);
            },
            async changeDelete(isDelete) {
                if (!confirm(this.__t('You are sure?'))) {
                    return false;
                }

                try {
                    let response = await this.$api.clientSetDelete(this.entry._id, isDelete);
                    this.$store.commit('updateClient', response.client);
                    this.notifyOk(this.__t('Client delete or restore ok'));

                } catch (e) {
                    this.handlerError(e, this.__t('Error delete/restore client'))
                }
            },
            remove() {
                this.changeDelete(true);
            },
            restore() {
                this.changeDelete(false);
            },
            async activate () {
                if (!confirm(this.__t('You are sure?'))) {
                    return false;
                }

                try {
                    let response = await this.$api.clientActivate(this.entry._id);
                    this.$store.commit('updateClient', response.client);
                    this.notifyOk(this.__t('Client is active'));

                } catch (e) {
                    this.handlerError(e, this.__t('Error activate client'))
                }
            },
            edit() {
                this.$router.push({path: fullPath.clientEdit, query: {id: this.entry._id}})
            },
        },
    }
</script>
