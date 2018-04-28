<template>
    <div>
        <div v-for="group in groups" class="btn btn-info">{{__t(group)}}</div>
    </div>
</template>

<script>
    export default {
        name: 'EmployeesShowGroup',
        props: {
            entry: Object,
        },
        computed: {
            groups() {
                return this.entry.groups;
            }
        },
    }
</script>

<style scoped>

</style>
