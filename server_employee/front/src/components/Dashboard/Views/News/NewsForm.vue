<template>
    <div class="news-form">
        <md-datepicker v-model="publish_at">
            <label>{{__t('publish_at')}}</label>
        </md-datepicker>

        <auto-compile
            :list="authors"
            :label="__t('author')"
            :placeholder="__t('author')"
            v-model="author"
        ></auto-compile>

        <md-tabs>
            <text-tab
                tabId='en'
                :tabLabel="__t('In English')"
                :titleLabel='__t("title")'
                :textLabel="__t('Text')"
                :textPrevLabel="__t('Preliminary text (max length 250 symbols)')"
            ></text-tab>
            <text-tab
                tabId='ru'
                :tabLabel="__t('In Russian')"
                :titleLabel='__t("title")'
                :textLabel="__t('Text')"
                :textPrevLabel="__t('Preliminary text (max length 250 symbols)')"
            ></text-tab>
        </md-tabs>

        <button type="submit" @click.prevent="save" class="btn btn-primary pull-right">
            {{__t('Save')}}
        </button>
    </div>
</template>

<script>
    import TextTab from './NewsFormTextTab'
    import AutoCompile from '../../../UIComponents/AutoCompile'

    export default {
        name: 'NewsForm',
        components: {
            TextTab,
            AutoCompile
        },
        computed: {
            _storeNewsOne () {
                return this.$store.state.newsOne;
            },
            authors: function () {
                return this._storeNewsOne.authors
            },
            author: {
                get: function () {
                    return this._storeNewsOne.author
                },
                set: function (value) {
                    this.$store.commit('setAuthor', value);
                }
            },
            publish_at : {
                get : function() {
                    return this._storeNewsOne.publish_at;
                },
                set : function(value) {
                    this.$store.commit('setPublish_at', value);
                }
            }
        },
        methods: {
            _validate () {
                this.notifyError('zzz');
                return false;
            },
            save () {
                if (!this._validate()) {
                    return false;
                }
            }
        }
    }
</script>
