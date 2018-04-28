<template>
    <div class="filters_block">
        <button class="btn" v-if="isOpen" @click.prev="handelApply">
            <i class="fa fa-cog fa-spin load" v-if="loadPage"></i> {{__t('Apply')}}
        </button>
        <a @click.prev="toggleShowForm" class="filter-switcher">{{labelToggleFilters}}</a>
        <form :class="cssClassForm">
            <div class="row">

                <div class="col-md-3">
                    <md-field>
                        <span id="byActivationLabel" class="filters filters_label">{{__t('By activation')}}</span>
                        <md-select v-model="is_active" id="byActivation">
                            <md-option :value="-1">{{__t('all')}}</md-option>
                            <md-option :value="0">{{__t('isNoActivate')}}</md-option>
                            <md-option :value="1">{{__t('isActivate')}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="col-md-3">
                    <md-field>
                        <span id="byRemoveLabel" class="filters filters_label">{{__t('By remove')}}</span>
                        <md-select v-model="is_deleted" id="byRemove">
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
            _store() {
                return this.$store.state.clients
            },
            loadPage() {
                return this._store.loadPage
            },
            is_deleted: {
                get: function () {
                    return this._store.filters.is_deleted;
                },
                set: function (value) {
                    this.$store.commit('setFilterIsDeleted', value);
                }
            },
            is_active: {
                get: function () {
                    return this._store.filters.is_active;
                },
                set: function (value) {
                    this.$store.commit('setFilterIsActive', value);
                }
            }
        },

        methods: {
            handelApply() {
                this.$store.dispatch(this.setCurrentPageInStore, {
                    page: 0,
                    app: this
                });
            },
            toggleShowForm: function () {
                this.isOpen = !this.isOpen
            }
        },

        data() {
            return {
                isOpen: false,
                labelOpen: 'Show filters',
                labelClose: 'Hide filters'
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

    .load {
        color: yellow;
        font-size: 32px;
    }

</style>
