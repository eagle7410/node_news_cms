<template>
    <div class="filters_block">
        <button class="btn" v-if="isOpen" @click.prev="handelApply">
            <i class="fa fa-cog fa-spin load" v-if="loadPage"></i> {{__t('Apply')}}
        </button>
        <a @click.prev="toggleShowForm" class="filter-switcher">{{labelToggleFilters}}</a>
        <form :class="cssClassForm">
            <div class="row">

                <div class="col-md-4">
                    <md-field>
                        <span id="byActivationLabel" class="filters filters_label">{{__t('By reading')}}</span>
                        <md-select v-model="readAt" id="byUnread">
                            <md-option :value="-1">{{__t('all')}}</md-option>
                            <md-option :value="0">{{__t('No reading')}}</md-option>
                            <md-option :value="1">{{__t('Reading')}}</md-option>
                        </md-select>
                    </md-field>
                </div>

            </div>
        </form>
    </div>

</template>

<script>
    export default {
        name: 'NotificationsFilters',
        computed: {
            labelToggleFilters: function () {
                return this.__t(this.isOpen ? this.labelClose : this.labelOpen);
            },
            cssClassForm: function () {
                return 'filters ' + (this.isOpen ? '' : 'hide');
            },
            _store() {
                return this.$store.state.Notifications
            },
            loadPage() {
                return this._store.loadPage
            },
            readAt: {
                get: function () {
                    return this._store.filters.read_at;
                },
                set: function (value) {
                    this.$store.commit('setFilterReadAtNotifications', value);
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
