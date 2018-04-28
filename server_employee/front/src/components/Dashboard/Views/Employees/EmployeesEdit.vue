<template>
    <page>
        <box :title="__t('employees-edit')">
            <div class="row">
                <div class="col-md-10">
                    <employees-form></employees-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import {fullPath} from '../../../../routes/paths';
    import EmployeesForm from './EmployeesForm'

    export default {
        name: 'EmployeesEdit',
        components: {
            EmployeesForm,
        },
        computed: {
            _store() {
                return this.$store.state.EmployeesOne;
            }
        },
        async created() {
            let id;

            try {
                id = this.$route.query.id;

                if (!id) {
                    throw new Error(`Not fount employees id in $route.query `);
                }

                let {row} = await this.$api.getEmployeesById(id);

                if (!row || !row._id) {
                    throw new Error(`Bad response data ${JSON.stringify(row)}`);
                }

                this.$store.commit('setEmployeesForEdit', row);

                return true;

            } catch (e) {
                console.error(`Error get employees by id -> ${id}`, e);
                this.notifyError(this.__t('Error load employees'));
                this.$router.push(fullPath.Employees);
            }
        }
    }
</script>
