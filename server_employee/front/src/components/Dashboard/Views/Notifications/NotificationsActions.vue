<template>
    <div class="actions">
        <button v-if="!entry.read_at" @click="read" :title="__t('Read')" class="action btn btn-success">
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
            async read () {
                try {
                    let response = await this.$api.NotificationsRead(this.entry._id);
                    this.$store.commit('updateNotifications', response.row);
                    this.$store.commit('setCountUnreadNotify', response.countUnread);

                } catch (e) {
                    this.handlerError(e, this.__t('Error set date read Notifications'))
                }
            }
        },
    }
</script>
