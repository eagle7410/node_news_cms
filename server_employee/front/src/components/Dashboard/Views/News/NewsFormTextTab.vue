<template>
    <md-tab :id="'tab-' + tabId" :md-label="tabLabel">
        <p>
            <fg-input type="text"
                      :placeholder='titleLabel'
                      :label='titleLabel'
                      v-model="title"
            ></fg-input>
        </p>
        <p>
            <label>{{textPrevLabel}}</label>
            <vue-editor v-model="text_prev"></vue-editor>
        </p>
        <p>
            <label>{{textLabel}}</label>
            <vue-editor v-model="text"></vue-editor>
        </p>
    </md-tab>
</template>

<script>
    import {VueEditor} from 'vue2-editor'

    export default {
        name: 'NewsFormTextTab',
        components: {
            VueEditor
        },
        props: {
            tabId: String,
            tabLabel: String,
            titleLabel: String,
            textLabel: String,
            textPrevLabel: String,
        },
        data() {
            return {
                text: '',
                title: '',
                text_prev: '',
            }
        }
    }
</script>

<style>
    .md-tabs-navigation > .md-active {
        background: #ab47bc;
        color: #fff;
    }
</style>
