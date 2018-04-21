<template>
    <div class="card">
        <div class="card-header" data-background-color="purple">
            <h4 class="title">{{__t('Edit Profile')}}</h4>
            <p class="category">{{__t('Complete your profile')}}</p>
        </div>
        <div class="card-content">
            <form>
                <div class="row">
                    <div class="col-md-4">
                        <fg-input type="email"
                                  label="Email"
                                  placeholder="Email"
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
        </div>
    </div>
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
            updateProfile () {
                alert('Your data: ' + JSON.stringify(this.user))
            }
        },

        created () {
            that = this
        }
    }

</script>
<style>

</style>
