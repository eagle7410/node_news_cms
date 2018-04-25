<template>
    <md-tab :id="'tab-' + tabId" :md-label="tabLabel">
        <p>
            <fg-input type="text"
                      :label='titleLabel'
                      v-model="title"
                      :id="`title-${tabId}`"
            ></fg-input>
        </p>
        <p>
            <label>{{textLabel}}</label>
            <vue-editor v-model="text" :id="`editor-${tabId}`"></vue-editor>
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
            }
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
        }
    }
</script>

<style>
    .md-tabs-navigation > .md-active {
        background: #ab47bc;
        color: #fff;
    }
</style>
