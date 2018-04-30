<template>
    <button type="button" class="navbar-toggle" data-toggle="collapse" @click="toggleSidebar">
        <span class="sr-only">{{__t('Toggle navigation')}}</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
</template>

<script>
    export default {
        name: 'ToggleNavigation',
        methods : {
            toggleSidebar() {
                this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
            }
        }
    }
</script>
