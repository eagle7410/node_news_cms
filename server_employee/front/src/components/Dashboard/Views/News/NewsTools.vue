<template>
    <span>
        <a class="btn btn-success" @click.prev="handlerAdd">{{__t('Add')}}</a>
    </span>
</template>

<script>
    export default {
        name: 'NewsTools',
        methods : {
            handlerAdd () {
                this.$router.push('news-add')
            }
        }
    }
</script>
