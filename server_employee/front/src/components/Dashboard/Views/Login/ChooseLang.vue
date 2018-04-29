<template>
    <div>
        <h4>
            <a v-for="language in langs"
               :class="language === lang ? 'lang':'lang lang-info' "
               @click.prev="change(language)"
            >{{phrases[language] || language}}</a>
        </h4>
    </div>
</template>

<script>
    export default {
        name: 'ChooseLang',
        computed: {
            _store() {
                return this.$store.state.app;
            },
            langs() {
                return this._store.langs;
            },
            lang() {
                return this._store.lang;
            },
            phrases () {
                return this._store.phrases;
            },
        },
        methods: {
            async change(language) {
                window.localStorage.setItem('lang', language);

                let res = await this.$api.init();

                this.$store.commit('setPhrases', res.phrases);
                this.$store.commit('setLangs', res.langs);
                this.$store.commit('setLang', res.lang);
            }
        },
    }
</script>

<style scoped>
     .lang-info {
        color: #00bcd4
    }
    .lang {
        margin: 0 5px;
    }
</style>
