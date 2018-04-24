<template>
    <div class="card" :class="{'card-plain': isPlain}">
        <div class="card-header" data-background-color="purple">
            <slot name="header">
                <h4 class="title">
                    <component v-if="tools"
                               :is="tools.component"
                               v-bind="tools.props"
                    ></component>
                    {{title}}
                </h4>
                <p class="category">{{subTitle}}</p>
                <component v-if="filters"
                           :is="filters.component"
                           v-bind="filters.props"
                ></component>
            </slot>
        </div>
        <div class="card-content table-responsive">
            <table class="table" :class="tableClass">
                <thead>
                <th v-for="column in columns">{{__t(column)}}</th>
                </thead>
                <tbody>
                <tr v-if="data.length" v-for="item in data">
                    <td v-for="column in columns" v-if="hasValue(item, column)">
                        <component v-if="hasCustom(column)"
                                   :is="custom[column].component"
                                   v-bind="custom[column].props || []"
                                   :entry="item"
                        ></component>
                        <span v-else>{{itemValue(item, column)}}</span>
                    </td>
                </tr>
                <tr v-if="!data.length">
                    <td :colspan="columns.length">{{__t('No data')}}</td>
                </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="columns.length">
                            <pagination></pagination>
                        </td>

                    </tr>
                </tfoot>
            </table>

        </div>
    </div>
</template>
<script>
    import Pagination from './MaterialTablePagination'

    export default {
        components : {
            Pagination
        },
        props: {
            columns: Array,
            custom: {
                type : Object,
                default : null
            },
            data: Array,
            type: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            subTitle: {
                type: String,
                default: ''

            },
            filters: {
                type: Object,
                default: null
            },
            tools: {
                type: Object,
                default: null
            }
        },
        computed: {
            tableClass() {
                return `table-${this.type}`
            },
            isPlain() {
                return this.type === 'plain'
            }
        },
        methods: {
            hasCustom (column) {
              return (this.custom && this.custom[column] && this.custom[column].component) || false;
            },
            hasValue(item, column) {
                return item[column.toLowerCase()] !== 'undefined'
            },
            itemValue(item, column) {
                return item[column.toLowerCase()]
            }
        }
    }

</script>
<style>

</style>
