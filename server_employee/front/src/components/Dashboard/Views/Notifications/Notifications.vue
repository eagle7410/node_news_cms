<template>
    <page>
        <div class="row">
            <div class="col-md-12 col-lg-11">
                <material-table
                    :title="__t('notifications')"
                    :data="list"
                    :columns="columnsInStore"
                    :tools="tools"
                    :filters="filters"
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
    import NotificationsTools from './NotificationsTools'
    import NotificationsActions from './NotificationsActions'
    import NotificationsFilters from './NotificationsFilters'

    export default {
        name: 'Clients',
        components: {
            MaterialTable,
            NotificationsTools,
        },
        data() {
            return {
                filters: {
                    component: NotificationsFilters
                },
                custom: {
                    actions: {
                        component: NotificationsActions
                    }
                }
            }
        },
        computed: {
            tools() {
                return {
                    component: NotificationsTools,
                    props: []
                }
            },
            _store() {
                return this.$store.state.Notifications;
            },

            list() {
                return this._store.list.filter(row => {
                    switch (this._store.filters.read_at) {
                        case 0:
                            return !row.read_at;
                        case 1:
                            return row.read_at;

                        default :
                            return true;
                    }
                }).map(row => {
                    row = {...row};
                    const dateFormat = 'd-m-y h:i';
                    row.created_at = new Date(row.created_at).toStringByFormat(dateFormat);

                    if (row.read_at) {
                        row.read_at = new Date(row.read_at).toStringByFormat(dateFormat);
                    }

                    return row;
                });
            }
        },
        created() {
            this.$store.dispatch(this.setCurrentPageInStore, {
                page: 0,
                app: this
            });
        }
    }
</script>
