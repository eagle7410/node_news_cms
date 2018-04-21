<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <material-table
                        title="Clients"
                        :data="clients"
                        :columns="columns"
                    >
                    </material-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MaterialTable from '../../../UIComponents/MaterialTable'
    import FiltersClients from './FiltersClients'

    export default {
        name: 'Clients',
        components: {
            MaterialTable,
            FiltersClients
        },
        computed: {
            _storeClients () {
                return this.$store.state.clients
            },

            clients () {
                return this._storeClients.clients;
            },
            columns () {
                return this._storeClients.columns
            }
        },

        data () {
            return {}
        }
    }
</script>

<style scoped>

</style>
