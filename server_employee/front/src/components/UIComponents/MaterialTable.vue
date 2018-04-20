<template>
    <div class="card" :class="{'card-plain': isPlain}">
        <div class="card-header" data-background-color="purple">
            <slot name="header">
                <h4 class="title">{{title}}</h4>
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
                <th v-for="column in columns">{{column}}</th>
                </thead>
                <tbody>
                <tr v-if="data.length" v-for="item in data">
                    <td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
                </tr>
                <tr v-if="!data.length">
                    <td :colspan="columns.length">No data</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
  export default {
    props: {
      columns: Array,
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
      filters : {
          type : Object,
          default : null
      }
    },
    computed: {
      tableClass () {
        return `table-${this.type}`
      },
      isPlain () {
        return this.type === 'plain'
      }
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      }
    }
  }

</script>
<style>

</style>
