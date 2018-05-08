<template>
    <ul :class="css">
        <nav-button v-if="isAdmin" :handlerClick="handlerDash" :title="__t('dashboard')" material-icon="dashboard"></nav-button>
        <li class="dropdown" @click.prev="handlerNotify">
            <a class="dropdown-toggle btn-rotate" data-toggle="dropdown" href="javascript:void(0)">
                <i class="material-icons">notifications</i>
                <span class="notification" v-if="countUnread > 0">{{countUnread}}</span>
                <p class="hidden-lg hidden-md">{{ __t('notifications') }}</p>
            </a>
        </li>
        <nav-button :handlerClick="handlerProfile" :title="__t('profile')" material-icon="person"></nav-button>
        <nav-button :handlerClick="handlerLogout" :title="__t('logout')" material-icon="power_settings_new"></nav-button>
    </ul>
</template>

<script>
    import {fullPath} from '../../../../routes/paths';

	export default {
		name: "TopMenu",
        props : {
		    css : {
		        type : String,
                default : 'nav navbar-nav navbar-right'
            }
        },
        computed: {
            _storeNotify () {
                return this.$store.state.Notifications;
            },
            countUnread () {
                return this._storeNotify.countUnread;
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
            }
        }
	}
</script>

<style scoped>

</style>
