<template>
    <div class="filters_block">
        <a @click.prev="toggleShowForm" class="filter-switcher">{{labelToggleFilters}}</a>
        <form :class="cssClassForm">
            <div class="row">
                <div class="col-md-3">
                    <md-field>
                        <span id="byActivationLabel" class="filters filters_label">{{__t('By activation')}}</span>
                        <md-select v-model="filters.is_active" id="byActivation">
                            <md-option :value="-1">{{__t('all')}}</md-option>
                            <md-option :value="0">{{__t('isNoActivate')}}</md-option>
                            <md-option :value="1">{{__t('isActivate')}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="col-md-3">
                    <md-field>
                        <span id="byRemoveLabel" class="filters filters_label">{{__t('By remove')}}</span>
                        <md-select v-model="filters.is_deleted" id="byRemove">
                            <md-option :value="-1">{{__t('all')}}</md-option>
                            <md-option :value="0">{{__t('isDeleted')}}</md-option>
                            <md-option :value="1">{{__t('isNoDeleted')}}</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        name: 'ClientsFilters',
        computed: {
            labelToggleFilters: function () {
                return this.__t(this.isOpen ? this.labelClose : this.labelOpen);
            },
            cssClassForm: function () {
                return 'filters ' + (this.isOpen ? '' : 'hide');
            },
            _store () {
                return this.$store.state.clients
            }
        },

        methods: {
            toggleShowForm: function () {
                this.isOpen = !this.isOpen
            }
        },

        data () {
            return {
                isOpen: false,
                labelOpen: 'Show filters',
                labelClose: 'Hide filters',
                filters : {
                    is_active  : -1,
                    is_deleted : -1
                }
            }
        }
    }
</script>

<style scoped>
    .filter-switcher {
        cursor: pointer;
    }
    .md-field .md-theme-default {
        background-color: none !important;
    }

</style>
