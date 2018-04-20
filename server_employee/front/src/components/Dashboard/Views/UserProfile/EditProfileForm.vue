<template>
    <div class="card">
        <div class="card-header" data-background-color="purple">
            <h4 class="title">Edit Profile</h4>
            <p class="category">Complete your profile</p>
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
                                  label="First Name"
                                  placeholder="First Name"
                                  v-model="user.firstName">
                        </fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input type="text"
                                  label="Last Name"
                                  placeholder="Last Name"
                                  v-model="user.lastName">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="control-label"> Lamborghini Mercy, Your chick she so thirsty, I'm in that two
                                seat Lambo.</label>
                            <textarea rows="5" class="form-control border-input"
                                      placeholder="Here can be your description"
                                      v-model="user.aboutMe">

              </textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" @click.prevent="updateProfile" class="btn btn-primary pull-right">Update Profile
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</template>
<script>
    let that;

    export default {
        data () {
            return {
                user: {
                    lastName: 'Tester',
                    firstName: 'Lost'
                }
            }
        },
        computed: {
            _storeAuth: () => that.$store.state.auth,
            email: () => that._storeAuth.email
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
