<template>
    <div class="actions">
        <button @click="edit" :title="__t('Edit')" class="action btn btn-info">
            <i class="icon fa fa-pencil"></i>
        </button>

        <button @click="activate" :title="`${__t('Activate')} / ${__t('Deactivate')}`" :class="cssClassActive">
            <i class="icon fa fa-check-circle" v-if="!entry.is_active"></i>
            <i class="icon fa fa-ban" v-if="entry.is_active"></i>
        </button>

        <button @click="remove" v-if="!entry.is_deleted" :title="__t('Delete')" class="action btn btn-danger">
            <i class="icon fa fa fa-user-times"></i>
        </button>

        <button @click="restore" v-if="entry.is_deleted" :title="__t('Restore')" class="action btn btn-success">
            <i class="icon fa fa fa-user-plus"></i>
        </button>

    </div>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: 'EmployeesActions',
        props: {
            entry: Object,
        },
        computed: {
            cssClassActive() {
                return 'action btn ' + (this.entry.is_active ? 'btn-danger' : 'btn-success');
            }
        },
        methods: {
            async changeDelete(isDelete) {
                if (!confirm(this.__t('You are sure?'))) {
                    return false;
                }

                try {
                    let response = await this.$api.EmployeesSetDelete(this.entry._id, isDelete);
                    this.$store.commit('updateEmployees', response.row);
                    this.notifyOk(this.__t('Employee delete or restore ok'));

                } catch (e) {
                    this.handlerError(e, this.__t('Error delete/restore'))
                }
            },
            remove() {
                this.changeDelete(true);
            },
            restore() {
                this.changeDelete(false);
            },
            handlerError(err, mess) {
                console.error(mess, err);
                this.notifyError(mess);
            },
            async activate () {
                if (!confirm(this.__t('You are sure?'))) {
                    return false;
                }

                try {
                    let response = await this.$api.EmployeesActivate(this.entry._id);
                    this.$store.commit('updateEmployees', response.row);
                    this.notifyOk(this.__t('Employees is active/inactive'));

                } catch (e) {
                    this.handlerError(e, this.__t('Error activate Employees'))
                }
            },
            edit() {
                this.$router.push({path: fullPath.EmployeesEdit, query: {id: this.entry._id}})
            },
        },
    }
</script>
