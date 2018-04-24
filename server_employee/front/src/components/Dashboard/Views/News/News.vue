<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <material-table
                        :title="__t('news')"
                        :data="news"
                        :columns="columns"
                        :tools="tools"
                        :custom="custom"
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
    import ShowStatus from '../../../UIComponents/ShowStatus'

    export default {
        name: 'News',
        data() {
            return {
                custom: {
                    is_active : {
                        component: ShowStatus,
                        props : {
                            store : 'is_active'
                        }
                    }
                }
            }
        },
        components: {
            MaterialTable,
            NewsTools,
            ShowStatus
        },
        computed: {
            tools() {
                return {
                    component: NewsTools,
                    props: []
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
