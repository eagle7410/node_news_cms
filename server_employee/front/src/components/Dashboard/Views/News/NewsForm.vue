<template>
    <div class="news-form">
        <md-datepicker v-model="publish_at" id="publish_at">
            <label>{{__t('publish_at')}}</label>
        </md-datepicker>

        <auto-compile
            :list="authors"
            :label="__t('author')"
            :placeholder="__t('author')"
            id="author"
            v-model="author"
        ></auto-compile>

        <md-tabs>
            <text-tab
                tabId='en'
                :tabLabel="__t('In English')"
                :titleLabel='__t("title (max length 250 symbols)")'
                :textLabel="__t('Text')"
            ></text-tab>
            <text-tab
                tabId='ru'
                :tabLabel="__t('In Russian')"
                :titleLabel='__t("title (max length 250 symbols)")'
                :textLabel="__t('Text')"
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
    import {isEmail, isNowOrFuture, isNotMoreLen} from '../../../../utils/validators'
    import {fullPath} from '../../../../routes/paths'

    export default {
        name: 'NewsForm',
        components: {
            TextTab,
            AutoCompile
        },
        computed: {
            _storeNewsOne() {
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
            publish_at: {
                get: function () {
                    return this._storeNewsOne.publish_at;
                },
                set: function (value) {
                    this.$store.commit('setPublish_at', value);
                }
            },
            en: function () {
                return this._storeNewsOne.en;
            },
            ru: function () {
                return this._storeNewsOne.ru;
            },
            _id : function() {
                return this._storeNewsOne._id;
            }
        },
        data() {
            return {
                news: {
                    title : {},
                    text  : {}
                }
            };
        },
        methods: {
            _validate() {
                if (!isEmail(this.author)) {
                    this.notifyError(this.__t('Field `author`. Must be email'));

                    return false;
                }

                this.news.author = this.author;

                if (!this._id && !isNowOrFuture(this.publish_at)) {
                    this.notifyError(this.__t('Field `publish_at`. Must be today or future'));

                    return false;
                }

                this.news.publish_at = this.publish_at;

                let langs = [
                    {val: 'en', label: this.__t('In English')},
                    {val: 'ru', label: this.__t('In Russian')}
                ];

                for (let lang of langs) {
                    let store = this[lang.val];

                    if (!store.title) {
                        this.notifyError(this.__t('Field `title`. Is required.') + ' ' + lang.label);

                        return false;
                    }

                    if (!isNotMoreLen(store.title)) {
                        this.notifyError(this.__t('Field `title`. More 250 symbols.') + ' ' + lang.label);

                        return false;
                    }

                    this.news.title[lang.val] = store.title;

                    if (!store.text) {
                        this.notifyError(this.__t('Field `text`. Is required.') + ' ' + lang.label);

                        return false;
                    }

                    this.news.text[lang.val] = store.text;
                }

                return true;
            },
            _noticeAboutErrorSave (data) {
                console.error('Error save news ', data);
                this.notifyError(this.__t('Error in save news'));
            },
            save() {
                if (!this._validate()) {
                    return false;
                }

                this.news._id = this._id;

                 this.$api.saveNews(this.news)
                     .then((res) => {
                         if (!res.success) {
                             return this._noticeAboutErrorSave(res);
                         }

                         this.$router.push(fullPath.news);
                         this.$store.commit('clearOneNews');

                     })
                     .catch(this._noticeAboutErrorSave);
            }
        }
    }
</script>
