<template>
    <span>
        <a class="btn btn-info" @click.prev="handlerExcel" v-if="isAdmin">
            <i class="fa fa-upload" aria-hidden="true"></i>
            <i class="fa fa-file-excel-o" aria-hidden="true"></i>
            {{__t('excel')}}
        </a>
        <a class="btn btn-info" @click.prev="handlerPdf" v-if="isAdmin">
            <i class="fa fa-upload" aria-hidden="true"></i>
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            {{__t('pdf')}}
        </a>
        <a class="btn btn-success" @click.prev="handlerAdd" v-if="isAdmin || isContent">{{__t('Add')}}</a>
    </span>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: 'NewsTools',
        methods : {
            handlerAdd () {
                this.$router.push(fullPath.newsAdd)
            },
            handlerPdf () {
                window.open(this.$api.srcLink('news/news-to-pdf'), '_blank');
            },
            handlerExcel () {
                window.open(this.$api.srcLink('news/news-to-excel'), '_blank');
            }
        }
    }
</script>
