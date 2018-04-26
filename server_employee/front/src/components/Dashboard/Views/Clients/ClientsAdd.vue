<template>
    <page>
        <box :title="__t('client-add')">
            <div class="row">
                <div class="col-md-10">
                    <clients-form></clients-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import ClientsForm from './ClientsForm'
    export default {
        name: 'Client',
        components: {
            ClientsForm
        },
        created () {
            this.$store.commit('clearOneClient');
        }
    }
</script>

<style scoped>
    .card {
        padding: 10px;
    }
</style>
