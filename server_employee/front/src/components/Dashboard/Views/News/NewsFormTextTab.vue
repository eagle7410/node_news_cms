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
        computed: {
            _storeNewsOne () {
                return this.$store.state.newsOne;
            },
            _storeLang() {
                return this._storeNewsOne[this.tabId];
            },
            title: {
                get: function () {
                    return this._storeLang.title
                },
                set: function (value) {
                    this._setProp('title', value);
                }
            },
            text: {
                get: function () {
                    return this._storeLang.text
                },
                set: function (value) {
                    this._setProp('text', value);
                }
            },
            text_prev: {
                get: function () {
                    return this._storeLang.text_prev
                },
                set: function (value) {
                    this._setProp('text_prev', value);
                }
            },
        },
        methods : {
            _setProp (prop, val) {
                this.$store.commit('setTextProp', {
                    lang : this.tabId,
                    prop,
                    val
                })
            }
        },
        props: {
            tabId: String,
            tabLabel: String,
            titleLabel: String,
            textLabel: String,
            textPrevLabel: String,
        }
    }
</script>

<style>
    .md-tabs-navigation > .md-active {
        background: #ab47bc;
        color: #fff;
    }
</style>
