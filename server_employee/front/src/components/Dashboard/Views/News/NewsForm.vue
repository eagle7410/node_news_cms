<template>
    <div class="news-form">
        <md-datepicker v-model="selectedDate">
            <label>{{__t('publish_at')}}</label>
        </md-datepicker>

        <auto-compile
            :list="authors"
            :label="__t('author')"
            :placeholder="__t('author')"
        ></auto-compile>

        <md-tabs>
            <text-tab
                tabId='english'
                :tabLabel="__t('In English')"
                :titleLabel='__t("title")'
                :textLabel="__t('Text')"
                :textPrevLabel="__t('Preliminary text (max length 250 symbols)')"
            ></text-tab>
            <text-tab
                tabId='russian'
                :tabLabel="__t('In Russian')"
                :titleLabel='__t("title")'
                :textLabel="__t('Text')"
                :textPrevLabel="__t('Preliminary text (max length 250 symbols)')"
            ></text-tab>
        </md-tabs>

        <button type="submit" @click.prevent="updateProfile" class="btn btn-primary pull-right">
            {{__t('Update Profile')}}
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

        },
        data() {
            return {
                selectedDate: new Date(),
                authors: [
                    {
                        val: 'a1@fads.com',
                        show: '1 Igor Stcherbina (a1@fads.com)'
                    },
                    {
                        val: 'a2@fads.com',
                        show: '2 Igor Stcherbina (a12@fads.com)'
                    },
                    {
                        val: 'a3@fads.com',
                        show: '3 Igor Stcherbina (a3@fads.com)'
                    },
                    {
                        val: 'a4@fads.com',
                        show: '4 Igor Stcherbina (a4@fads.com)'
                    }
                ]
            };
        }
    }
</script>
