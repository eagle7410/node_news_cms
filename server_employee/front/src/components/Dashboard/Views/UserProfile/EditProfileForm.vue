<template>
    <box :title="__t('Edit Profile')" :description="__t('Complete your profile')">
        <form>
            <div class="row">
                <div class="col-md-8">
                    <fg-input type="email"
                              label="Email"
                              placeholder="Email"
                              :disabled="true"
                              :value="email">
                    </fg-input>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <fg-input type="text"
                              :label='__t("First Name")'
                              :placeholder='__t("First Name")'
                              v-model="user.name">
                    </fg-input>
                </div>
                <div class="col-md-6">
                    <fg-input type="text"
                              :label='__t("Last Name")'
                              :placeholder='__t("Last Name")'
                              v-model="user.surname">
                    </fg-input>
                </div>
            </div>

            <button type="submit" @click.prevent="updateProfile" class="btn btn-primary pull-right">
                {{__t('Update Profile')}}
            </button>
            <div class="clearfix"></div>
        </form>
    </box>
</template>
<script>
    let that;

    export default {
        computed: {
            _storeAuth: () => that.$store.state.auth,
            email: () => that._storeAuth.email,
            user: () => that._storeAuth.user
        },

        methods: {
            async updateProfile() {
                try {
                    const result = await this.$api.profileUpdate({
                        name : this.user.name,
                        surname : this.user.surname
                    });

                    if (!result) {
                        return this.notifyError(this.__t('Error updated'));
                    }

                    this.notifyOk(this.__t('Success updated'));

                } catch (e) {
                    console.error('Error update profile', e);
                    this.notifyError(this.__t('Error updated'));
                }
            }
        },

        created() {
            that = this
        }
    }

</script>
