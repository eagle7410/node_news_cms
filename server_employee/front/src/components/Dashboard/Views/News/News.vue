<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <material-table
                        :title="__t('news')"
                        :data="news"
                        :columns="columns"
                        :tools="tools"
                    >
                    </material-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NewsTools from './NewsTools'
    import MaterialTable from '../../../UIComponents/MaterialTable'

    export default {
        name: 'News',
        components: {
            MaterialTable,
            NewsTools
        },
        computed: {
            tools () {
                return {
                    component : NewsTools,
                    props : []
                }
            },
            _storeNews() {
                return this.$store.state.news
            },

            news() {
                return this._storeNews.news;
            },
            columns() {
                return this._storeNews.columns
            }
        },
        async mounted() {
            try {
                let news = await this.$authApi.news();
                this.$store.commit('setNews', news)
            } catch (err) {
                console.error('$authApi.news err', err)
            }
        }

    }
</script>

<style scoped>

</style>
