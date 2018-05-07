<template>
    <page>
        <box :title="__t('notifications-add')">
            <div class="row">
                <div class="col-md-10">
                    <notifications-form></notifications-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import NotificationsForm from './NotificationsForm'
    export default {
        name: 'NotificationsAdd',
        components: {
            NotificationsForm
        },
        created () {
            this.$store.commit('clearOneNotifications');
        }
    }
</script>

<style scoped>
    .card {
        padding: 10px;
    }
</style>
