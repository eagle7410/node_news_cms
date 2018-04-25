<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 col-lg-11">
                    <material-table
                        :title="__t('news')"
                        :data="news"
                        :columns="columns"
                        :tools="tools"
                        :custom="custom"
                        :is-use-pagination="true"
                        :steep="steep"
                        :count-pages="countPages"
                        :current-page="currentPage"
                        :set-current-page="setCurrentPage"
                        :load-page="loadPage"
                    >
                    </material-table>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NewsTools from './NewsTools'
    import NewsActions from './NewsActions'
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
                    },
                    actions : {
                        component: NewsActions
                    }
                }
            }
        },
        components: {
            MaterialTable,
            NewsActions,
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
            columns() {
                return this._storeNews.columns
            },
            news() {
                return this._storeNews.news.map(news => {
                    news = {...news};
                    const dateFormat = 'd-m-y h:i';
                    news.created_at = new Date(news.created_at).toStringByFormat(dateFormat);
                    news.updated_at = new Date(news.updated_at).toStringByFormat(dateFormat);
                    news.publish_at = new Date(news.publish_at).toStringByFormat(dateFormat);

                    return news;
                });
            },
            steep() {
                return this._storeNews.steep
            },
            pageSize() {
                return this._storeNews.pageSize
            },
            countPages() {
                return this._storeNews.countPages
            },
            currentPage() {
                return this._storeNews.currentPage
            },
            setCurrentPage() {
                return this._storeNews.setCurrentPage
            },
            loadPage() {
                return this._storeNews.loadPage
            },

        },
        async created() {
            this.$store.dispatch(this.setCurrentPage, {
                page : 0,
                app  : this
            });
        }

    }
</script>

<style scoped>

</style>
