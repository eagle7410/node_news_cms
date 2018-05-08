<template>
    <nav class="navbar navbar-transparent navbar-absolute">
        <div class="container-fluid">
            <div class="navbar-header">
                <toggle-navigation></toggle-navigation>
                <breadcrumbs></breadcrumbs>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <nav-button v-if="isAdmin" :handlerClick="handlerDash" :title="__t('dashboard')" material-icon="dashboard"></nav-button>
                    <li class="dropdown" @click.prev="handlerNotify">
                        <a class="dropdown-toggle btn-rotate" data-toggle="dropdown" href="javascript:void(0)">
                            <i class="material-icons">notifications</i>
                            <span class="notification" v-if="countUnread > 0">{{countUnread}}</span>
                        </a>
                    </li>
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
            _storeNotify () {
                return this.$store.state.Notifications;
            },
            countUnread () {
                return this._storeNotify.countUnread;
            },
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
            handlerNotify () {
                this.$router.push(fullPath.Notifications)
            },
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
