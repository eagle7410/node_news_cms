<template>
    <div class="notifications-form">
        <div class="row">
            <div class="col-lg-6">
                <fg-input type="email"
                          :label="__t('subscribe')"
                          v-model="subscribe"
                          id="notify-subscribe"
                ></fg-input>
            </div>
            <div class="col-lg-4">
                <fg-input type="text"
                          :label="__t('type')"
                          v-model="type"
                          id="notify-type"
                ></fg-input>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-10">
                <fg-input type="text"
                          :label="__t('title')"
                          v-model="title"
                          id="notify-title"
                ></fg-input>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-10">
                <md-field>
                    <label>{{ __t('data') }}</label>
                    <md-textarea v-model="data"></md-textarea>
                </md-field>
            </div>
        </div>
        <button type="submit" @click.prevent="save" class="btn btn-primary">
            {{__t('Save')}}
        </button>
    </div>
</template>

<script>
    import {fullPath} from '../../../../routes/paths'
    import {isEmail, isNotMoreLen} from '../../../../utils/validators'

    export default {
        name: 'NotificationsForm',
        computed: {
            _store() {
                return this.$store.state.NotificationsOne;
            },
            _id: function () {
                return this._store._id;
            },
            subscribe: {
                get: function () {
                    return this._store.subscribe;
                },
                set: function (value) {
                    this.$store.commit('setPropNotifications', {value, prop: 'subscribe'});
                }
            },
            type: {
                get: function () {
                    return this._store.type;
                },
                set: function (value) {
                    this.$store.commit('setPropNotifications', {value, prop: 'type'});
                }
            },
            title: {
                get: function () {
                    return this._store.title;
                },
                set: function (value) {
                    this.$store.commit('setPropNotifications', {value, prop: 'title'});
                }
            },
            data: {
                get: function () {
                    return this._store.data;
                },
                set: function (value) {
                    this.$store.commit('setPropNotifications', {value, prop: 'data'});
                }
            }
        },

        methods: {
            _validate() {
                if (!isEmail(this.subscribe)) {
                    this.notifyError(this.__t('Field `{field}`. Must be email', {field:  this.__t('subscribe')}));

                    return false;
                }

                this.formData.subscribe = this.subscribe;

                if (!this.type) {
                    this.notifyError(this.__t('Field `{field}`. Is required.', {field: this.__t('type')}));

                    return false;
                }

                this.formData.type = this.type;

                if (!this.title) {
                    this.notifyError(this.__t('Field `{field}`. Is required.', {field: this.__t('title')}));

                    return false;
                }

                this.formData.title = this.title;

                if (!this.data) {
                    this.notifyError(this.__t('Field `{field}`. Is required.', {field: this.__t('data')}));

                    return false;
                }

                this.formData.data = this.data;

                return true;
            },

            _noticeAboutErrorSave(data) {
                console.error('Error save notifications ', data);
                this.notifyError(this.__t('Error in save notifications'));
            },

            async save() {
                if (!this._validate()) {
                    return false;
                }

                this.formData._id = this._id;

                try {
                    let result = await this.$api.NotificationsSave(this.formData);

                    if (!result.success) {
                        return this._noticeAboutErrorSave(result);
                    }

                    this.$store.commit('clearOneNotifications');
                    this.notifyOk(this.__t('Notification created'));

                    return true;

                } catch (e) {
                    this._noticeAboutErrorSave(e);
                }
            }
        },
        data() {
            return {
                formData: {},
            }
        },
    }
</script>

