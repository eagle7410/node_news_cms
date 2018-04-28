<template>
    <page>
        <box :title="__t('employees-add')">
            <div class="row">
                <div class="col-md-10">
                    <employees-form></employees-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import EmployeesForm from './EmployeesForm'
    export default {
        name: 'EmployeesAdd',
        components: {
            EmployeesForm
        },
        created () {
            this.$store.commit('clearOneEmployees');
        }
    }
</script>

<style scoped>
    .card {
        padding: 10px;
    }
</style>
