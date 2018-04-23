const GlobalMixins = {
    install(Vue) {
        Vue.mixin({
            computed : {
                authPhrases : function () {
                    return this.$store.state.auth.phrases;
                }
            },

            methods : {
                __t : function (mess) {
                    return this.authPhrases[mess] || mess;
                },
                notifyError(mess, positionV = 'center') {
                    this.$notify({
                        message: mess,
                        horizontalAlign: positionV,
                        icon: 'error',
                        type: 'danger'
                    })
                }
            },

            async mounted() {
                import('jquery').then(async ($) => {
                        window.jQuery = window.$ = $
                        await import('bootstrap-material-design')
                        $.material.init()
                    }
                )
            }
        })
    }
}

export default GlobalMixins
