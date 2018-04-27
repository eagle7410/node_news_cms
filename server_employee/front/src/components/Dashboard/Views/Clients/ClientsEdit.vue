<template>
    <page>
        <box :title="`${__t('clients-edit')}: ${email}`">
            <div class="row">
                <div class="col-md-10">
                    <clients-form></clients-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import {fullPath} from '../../../../routes/paths';
    import ClientsForm from './ClientsForm'

    export default {
        name: 'ClientsEdit',
        components: {
            ClientsForm,
        },
        computed: {
            _store() {
                return this.$store.state.clientOne;
            },
            email: function () {
                return this._store.email
            },
        },
        async created() {
            let id;

            try {
                id = this.$route.query.id;

                if (!id) {
                    throw new Error(`Not fount client id in $route.query `);
                }

                let {client} = await this.$api.getClientById(id);

                if (!client || !client._id) {
                    throw new Error(`Bad response data ${JSON.stringify(client)}`);
                }

                this.$store.commit('setClientForEdit', client);

                return true;

            } catch (e) {
                console.error(`Error get client by id -> ${id}`, e);
                this.notifyError(this.__t('Error load client'));
                this.$router.push(fullPath.clients);
            }

        }
    }
</script>

<style scoped>

</style>
