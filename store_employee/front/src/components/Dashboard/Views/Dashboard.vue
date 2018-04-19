<template>
    <div class="content">
        <div class="container-fluid">
            <div>
                <div class="row">
                    <div class="col-lg-2 col-md-8 col-sm-8">
                        <stats-card color="green">
                            <i slot="icon" class="fa fa-users"></i>
                            <div slot="title">
                                <p class="category">Count clients</p>
                                <h3 class="title">20</h3>
                            </div>
                            <div slot="footer">
                                <a>update</a>
                            </div>
                        </stats-card>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <chart-card id="dailySales"
                                    :chart-data="dailySalesChart.data"
                                    :chart-options="dailySalesChart.options">
                            <div slot="title">
                                <h4 class="title">Daily Sales</h4>
                                <p class="category"><span class="text-success"><i class="fa fa-long-arrow-up"></i> 55%  </span>
                                    increase in today sales.</p>
                            </div>
                            <span slot="footer">
                                <i class="material-icons">access_time</i> updated 4 minutes ago
                            </span>
                        </chart-card>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-8">
                        <chart-card color="orange"
                                    chart-type="Bar"
                                    id="emailSubscriptions"
                                    :chart-data="emailSubscriptionsChart.data"
                                    :chart-options="emailSubscriptionsChart.options"
                                    :responsive-options="emailSubscriptionsChart.responsiveOptions">
                            <div slot="title">
                                <h4 class="title">Email Subscriptions</h4>
                                <p class="category">Last Campaign Performance</p>
                            </div>
                            <span slot="footer">
                                <i class="material-icons">access_time</i> campaign sent 2 days ago
                            </span>
                        </chart-card>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
    import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'

    export default {
        components: {
            StatsCard,
            ChartCard
        },
        /**
         * Chart data used to render stats, charts. Should be replaced with server data
         */
        data () {
            return {
                dailySalesChart: {
                    data: {
                        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                        series: [
                            [12, 17, 7, 17, 23, 18, 38]
                        ]
                    },
                    options: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: 0,
                        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
                    }
                },
                completedTasksChart: {
                    data: {
                        labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
                        series: [
                            [230, 750, 450, 300, 280, 240, 200, 190]
                        ]
                    },
                    options: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: 0,
                        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
                    }
                },
                emailSubscriptionsChart: {
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        series: [
                            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

                        ]
                    },
                    options: {
                        axisX: {
                            showGrid: false
                        },
                        low: 0,
                        high: 1000,
                        chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    responsiveOptions: [
                        ['screen and (max-width: 640px)', {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: (value) => value[0]
                            }
                        }]
                    ]
                }

            }
        }
    }

</script>
<style>

</style>
