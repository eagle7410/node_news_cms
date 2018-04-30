<template>
    <nav class="navbar navbar-transparent navbar-absolute">
        <div class="container-fluid">
            <div class="navbar-header">
                <toggle-navigation></toggle-navigation>
                <breadcrumbs></breadcrumbs>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <nav-button :handlerClick="handlerDash" :title="__t('dashboard')" material-icon="dashboard"></nav-button>
                    <drop-down>
                        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="material-icons">notifications</i>
                            <span class="notification">5</span>
                            <p class="hidden-lg hidden-md">Notifications</p>
                        </a>
                        <li><a href="#">Mike John responded to your email</a></li>
                        <li><a href="#">You have 5 new tasks</a></li>
                        <li><a href="#">You're now friend with Andrew</a></li>
                        <li><a href="#">Another Notification</a></li>
                        <li><a href="#">Another One</a></li>
                    </drop-down>
                    <nav-button :handlerClick="handlerProfile" :title="__t('profile')" material-icon="person"></nav-button>
                    <nav-button :handlerClick="handlerLogout" :title="__t('logout')" material-icon="power_settings_new"></nav-button>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    import NavButton from './NavButton'
    import Breadcrumbs from '../../../Tools/Breadcrumbs'
    import ToggleNavigation from '../../../Tools/ToggleNavigation'
    import {fullPath} from '../../../../routes/paths';

    export default {
        components: {
            NavButton,
            Breadcrumbs,
            ToggleNavigation
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
            handlerProfile() {
            	this.$router.push(fullPath.profile);
            },
            handlerDash() {
                this.$router.push(fullPath.dashboard);
            },
            handlerLogout() {
                this.$router.push(fullPath.logout);
            },
            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1)
            },
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
