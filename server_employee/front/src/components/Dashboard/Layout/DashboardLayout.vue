<template>
    <div class="wrapper">

        <side-bar type="sidebar" :sidebar-links="$sidebar.sidebarLinks"></side-bar>

        <notifications></notifications>

        <div class="main-panel">
            <top-navbar></top-navbar>

            <dashboard-content @click.native="toggleSidebar"></dashboard-content>

            <content-footer></content-footer>
        </div>
    </div>
</template>

<script>
    import TopNavbar from './DashboartLayout/TopNavbar'
    import ContentFooter from './DashboartLayout/ContentFooter.vue'
    import DashboardContent from './DashboartLayout/Content.vue'
    import {fullPath} from '../../../routes/paths'

    let that;

    export default {
        computed: {
            _storeAuth: () => that.$store.state.auth,
            token: () => that._storeAuth.token
        },
        components: {
            TopNavbar,
            ContentFooter,
            DashboardContent
        },
        methods: {
            toggleSidebar () {
                if (this.$sidebar.showSidebar) {
                    this.$sidebar.displaySidebar(false)
                }
            }
        },

        created: function () {
            that = this;

            if (!that.token) {
                that.$router.push(fullPath.login);
            }
        }
    }

</script>
