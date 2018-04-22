<template>
    <page>
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
    </page>
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
            _storeNews () {
                return this.$store.state.clients
            },

            clients () {
                return this._storeNews.clients;
            },
            columns () {
                return this._storeNews.columns
            }
        }
    }
</script>

<style scoped>

</style>
