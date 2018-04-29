<template>
    <page>
        <div class="row">
            <div class="col-md-12 col-lg-11">
                <material-table
                    :title="__t('news')"
                    :data="news"
                    :columns="columnsInStore"
                    :tools="tools"
                    :custom="custom"
                    :is-use-pagination="true"
                    :steep="steepInStore"
                    :count-pages="countPagesInStore"
                    :current-page="currentPageInStore"
                    :set-current-page="setCurrentPageInStore"
                >
                </material-table>
            </div>
        </div>
    </page>
</template>

<script>
    import NewsTools from './NewsTools'
    import NewsActions from './NewsActions'
    import NewsColumTitle from './NewsColumTitle'
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
                    title : {
                        component : NewsColumTitle
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
            _store() {
                return this.$store.state.news
            },
            news() {
                return this._store.news.map(news => {
                    news = {...news};
                    const dateFormat = 'd-m-y h:i';
                    news.created_at = new Date(news.created_at).toStringByFormat(dateFormat);
                    news.updated_at = new Date(news.updated_at).toStringByFormat(dateFormat);
                    news.publish_at = new Date(news.publish_at).toStringByFormat(dateFormat);

                    return news;
                });
            }
        },
        created() {
            this.$store.dispatch(this.setCurrentPageInStore, {
                page : 0,
                app  : this
            });
        }

    }
</script>

<style scoped>

</style>
