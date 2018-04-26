<template>
    <span>
        <a class="btn btn-success" @click.prev="handlerAdd">{{__t('Add')}}</a>
    </span>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: 'ClientsTools',
        methods : {
            handlerAdd () {
                this.$router.push(fullPath.clientAdd)
            }
        }
    }
</script>
