<template>
    <page>
        <div class="row">
            <div class="col-sm-4">
                <stats-card
                    color="green"
                    icon="fa fa-users"
                    :category="__t('Count clients')"
                    :title="countClients"
                >
                    <div slot="footer">
                            <span :class="getCssClassByVal(countClientsToday)">
                                {{getLabelByVal(countClientsToday)}} {{ __t('today') }}
                            </span>
                    </div>
                </stats-card>
            </div>
            <div class="col-sm-4">
                <stats-card
                    color="orange"
                    icon="fa fa-newspaper-o"
                    :category="__t('Count news')"
                    :title="countNews"
                >
                    <div slot="footer">
                            <span :class="getCssClassByVal(countNewsToday)">
                                {{getLabelByVal(countNewsToday)}} {{ __t('today') }}
                            </span>
                    </div>
                </stats-card>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">
                <chart-card id="chartClients"
                            chart-type="Bar"
                            :chart-data="chartClients"
                            :chart-options="defOptions"
                            :responsive-options="responsiveOptions">
                    >
                    <div slot="title"><h4 class="title">{{ __t('clients') }}</h4></div>
                </chart-card>
            </div>

        </div>

        <div class="row">
            <div class="col-md-8">
                <chart-card id="chartNews"
                            color="orange"
                            chart-type="Bar"
                            :chart-data="chartNews"
                            :chart-options="defOptions"
                            :responsive-options="responsiveOptions">
                    >
                    <div slot="title"><h4 class="title">{{ __t('news') }}</h4></div>
                </chart-card>
            </div>
        </div>
    </page>
</template>

<script>
    import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
    import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'

    export default {
        components: {
            StatsCard,
            ChartCard
        },
        async created() {
            let data = await this.$api.dashInit();

            data.chartNews = this.toChartData(data.chartNews);
            data.chartClients = this.toChartData(data.chartClients);

            this.$store.commit('setDashData', data);

        },
        methods: {
            toChartData(data) {
                let result = {
                    labels: [],
                    series: []
                };

                let startDate = new Date(data.dateRun);

                for (let i = 0; i < 8; i++) {
                    let buff = new Date(startDate.getTime());
                    buff.setDate(buff.getDate() + i);
                    result.labels.push(buff.toStringByFormat());
                    result.series.push(data.stats[buff.toStringByFormat('y-m-d')] || 0);
                }

                return result;
            },
            getCssClassByVal(val) {
                return Number(val) > 0 ? 'text-success' : 'text-danger';
            },
            getLabelByVal(val) {
                return Number(val) > 0 ? `+ ${val}` : '0';
            }
        },
        computed: {
            _store() {
                return this.$store.state.dash;
            },
            countClients() {
                return this._store.countClients;
            },
            countClientsToday() {
                return this._store.countClientsToday;
            },
            countNews() {
                return this._store.countNews;
            },
            countNewsToday() {
                return this._store.countNewsToday;
            },
            chartNews() {
                const {labels, series} = this._store.chartNews;
                return {labels, series: [series]};
            },
            chartClients() {
                const {labels, series} = this._store.chartClients;
                return {labels, series: [series]};
            },
            defOptions() {
                return {
                    axisX: {
                        showGrid: false
                    },
                    low: 0,
                    high: 5,
                    onlyInteger: true,
                    chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
            responsiveOptions() {
                return [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 10,
                        axisX: {
                            labelInterpolationFnc: (value) => value[0]
                        }
                    }]
                ];
            }
        }
    }

</script>
