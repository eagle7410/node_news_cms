<template>
    <div v-if="$route.meta.breadcrumbs">
        <router-link v-for="crumb in $route.meta.breadcrumbs"
                    :to="{path: crumb.path}"
                    class="navbar-brand">
            {{__t(crumb.name)}}
        </router-link>

    </div>

</template>

<script>
	export default {
		name: 'Breadcrumbs'
	}
</script>

<style scoped>

</style>
