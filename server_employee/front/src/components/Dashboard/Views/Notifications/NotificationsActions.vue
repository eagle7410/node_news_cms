<template>
    <div class="actions">
        <button @click="edit" :title="__t('Edit')" class="action btn btn-info">
            <i class="icon fa fa-pencil"></i>
        </button>

        <button @click="activate" :title="__t('Activate')" class="action btn btn-success">
            <i class="icon fa fa-check-circle"></i>
        </button>

    </div>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: 'NotificationsActions',
        props: {
            entry: Object,
        },
        methods: {
            handlerError(err, mess) {
                console.error(mess, err);
                this.notifyError(mess);
            },
            async activate () {
                if (!confirm(this.__t('You are sure?'))) {
                    return false;
                }

                try {
                    let response = await this.$api.NotificationsActivate(this.entry._id);
                    this.$store.commit('updateNotifications', response.row);
                    this.notifyOk(this.__t('Notifications is active'));

                } catch (e) {
                    this.handlerError(e, this.__t('Error activate Notifications'))
                }
            },
            edit() {
                this.$router.push({path: fullPath.NotificationsEdit, query: {id: this.entry._id}})
            },
        },
    }
</script>
