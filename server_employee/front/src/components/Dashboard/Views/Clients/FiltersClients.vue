<template>
    <div>
        <a @click.prev="toggleShowForm">{{labelToggleFilters}}</a>
        <form :class="cssClassForm">
            <div class="row">
                <div class="col-md-3">
                    <fg-input type="text"
                              label="ClientId"
                              placeholder="ClientId"
                              v-model="clientId"
                    >
                    </fg-input>
                </div>
                <div class="col-md-3">
                    <fg-input type="text"
                              label="CampaignId"
                              placeholder="CampaignId"
                              v-model="campaignId"
                    >
                    </fg-input>
                </div>
            </div>
        </form>
    </div>

</template>

<script>

    export default {
        name: 'FiltersClients',
        props: {
            type: String
        },
        computed: {
            labelToggleFilters: function () {
                return this.isOpen ? this.labelClose : this.labelOpen
            },
            cssClassForm: function () {
                return this.isOpen ? '' : 'hide'
            },
            _storeNews () {
                return this.$store.state.clients
            },
            _filters () {
                return this._storeNews[`filters_${this.type}`]
            },
            clientId: {
                get: function () {
                    return this._filters.uid
                },
                set: function (value) {
                    this.$store.commit('setClientFilterUid', {
                        type: this.type,
                        value
                    })
                }
            },
            campaignId: {
                get: function () {
                    return this._filters.campaign_id
                },
                set: function (value) {
                    this.$store.commit('setClientFilterCampaign', {
                        type: this.type,
                        value
                    })
                }
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
                labelClose: 'Hide filters'
            }
        }
    }
</script>

<style scoped>

</style>
