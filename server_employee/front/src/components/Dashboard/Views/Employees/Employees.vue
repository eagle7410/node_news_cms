<template>
    <page>
        <div class="row">
            <div class="col-md-12 col-lg-11">
                <material-table
                    :title="__t('employees')"
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
    import ShowStatus from '../../../UIComponents/ShowStatus'
    import EmployeesTools from './EmployeesTools'
    import EmployeesActions from './EmployeesActions'
    import EmployeesFilters from './EmployeesFilters'
    import EmployeesShowGroup from './EmployeesShowGroup'

    export default {
        name: 'Clients',
        components: {
            MaterialTable,
            EmployeesTools,
        },
        data() {
            return {
                filters : {
                    component : EmployeesFilters
                },
                custom: {
                    is_active : {
                        component: ShowStatus,
                        props : {
                            store : 'is_active'
                        }
                    },
                    groups : {
                        component : EmployeesShowGroup
                    },
                    actions : {
                        component: EmployeesActions
                    }
                }
            }
        },
        computed: {
            tools() {
                return {
                    component: EmployeesTools,
                    props: []
                }
            },
            _store() {
                return this.$store.state.Employees;
            },

            list() {
                return this._store.list.map(row => {
                    row = {...row};
                    const dateFormat = 'd-m-y h:i';
                    row.created_at = new Date(row.created_at).toStringByFormat(dateFormat);
                    row.updated_at = new Date(row.updated_at).toStringByFormat(dateFormat);

                    return row;
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
