<template>
    <nav class="navbar navbar-transparent navbar-absolute">
        <div class="container-fluid">
            <div class="navbar-header">
                <toggle-navigation></toggle-navigation>
                <breadcrumbs></breadcrumbs>
            </div>
            <div class="collapse navbar-collapse">
               <top-menu></top-menu>
            </div>
        </div>
    </nav>
</template>
<script>
    import Breadcrumbs from '../../../Tools/Breadcrumbs'
    import ToggleNavigation from '../../../Tools/ToggleNavigation'
    import TopMenu from './TopMenu'

    export default {
        components: {
            Breadcrumbs,
            ToggleNavigation,
            TopMenu
        },
        computed: {
            routeName() {
                const {name} = this.$route;
                return this.capitalizeFirstLetter(name)
            }
        },
        data() {
            return {
                activeNotifications: false
            }
        },
        methods: {
            toggleNotificationDropDown() {
                this.activeNotifications = !this.activeNotifications
            },
            closeDropDown() {
                this.activeNotifications = false
            },
            hideSidebar() {
                this.$sidebar.displaySidebar(false)
            }
        }
    }

</script>
<style>

</style>
