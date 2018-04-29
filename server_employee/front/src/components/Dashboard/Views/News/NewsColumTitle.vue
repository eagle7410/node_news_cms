<template>
    <div>
        <div>
            <div>{{entry.title.en}}</div>
            <div class="help-block">{{__t('In English')}}</div>
            <div>{{entry.title.ru}}</div>
            <div class="help-block">{{__t('In Russian')}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NewsColumTitle',
        props: {
            entry: {
                type: Object,
            },
        }
    }
</script>

<style scoped>
    .title {

    }
</style>
