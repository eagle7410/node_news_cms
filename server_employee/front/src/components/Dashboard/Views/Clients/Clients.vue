<template>
    <page>
        <div class="row">
            <div class="col-md-12 col-lg-11">
                <material-table
                    :title="__t('clients')"
                    :data="clients"
                    :columns="columnsInStore"
                    :tools="tools"
                    :custom="custom"
                    :is-use-pagination="true"
                    :steep="steepInStore"
                    :count-pages="countPagesInStore"
                    :current-page="currentPageInStore"
                    :set-current-page="setCurrentPageInStore"
                >
                </material-table>
            </div>
        </div>
    </page>
</template>

<script>
    import MaterialTable from '../../../UIComponents/MaterialTable'
    import FiltersClients from './FiltersClients'
    import ShowStatus from '../../../UIComponents/ShowStatus'
    import ClientsTools from './ClientsTools'
    import ClientsActions from './ClientsActions'

    export default {
        name: 'Clients',
        components: {
            MaterialTable,
            FiltersClients,
            ClientsTools,
        },
        data() {
            return {
                custom: {
                    is_active : {
                        component: ShowStatus,
                        props : {
                            store : 'is_active'
                        }
                    },
                    is_deleted : {
                        component: ShowStatus,
                        props : {
                            store : 'is_deleted'
                        }
                    },
                    actions : {
                        component: ClientsActions
                    }
                }
            }
        },
        computed: {
            tools() {
                return {
                    component: ClientsTools,
                    props: []
                }
            },
            _store() {
                return this.$store.state.clients;
            },

            clients() {
                return this._store.clients.map(client => {
                    client = {...client};
                    const dateFormat = 'd-m-y h:i';
                    client.created_at = new Date(client.created_at).toStringByFormat(dateFormat);
                    client.updated_at = new Date(client.updated_at).toStringByFormat(dateFormat);

                    if (client.confirm_at) {
                        client.confirm_at = new Date(client.confirm_at).toStringByFormat(dateFormat);
                    }

                    return client;
                });
            }
        },
        created() {
            this.$store.dispatch(this.setCurrentPageInStore, {
                page : 0,
                app  : this
            });
        }
    }
</script>

<style scoped>

</style>
