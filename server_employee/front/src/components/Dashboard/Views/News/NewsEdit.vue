<template>
    <page>
        <box :title="__t('news-edit')">
            <div class="row">
                <div class="col-md-10">
                    <news-form></news-form>
                </div>
            </div>
        </box>
    </page>
</template>

<script>
    import NewsForm from './NewsForm'
    import {fullPath} from '../../../../routes/paths';

    export default {
        name: 'NewsEdit',
        components: {
            NewsForm
        },
        async created() {
            let id;

            try {
                id = this.$route.query.id;

                if (!id) {
                    this.notifyError(this.__t('No found news id'));
                    this.$router.push(fullPath.news);
                    return false
                }

                let news = await this.$api.getNewsById(id);

                if (!news || !news._id) {
                    throw new Error(`Bad response data ${JSON.stringify(news)}`);
                }

                this.$store.commit('setNewForEdit', news);

                return true;

            } catch (e) {
                console.error(`Error get news by id -> ${id}`, e);
                this.notifyError(this.__t('Error load news'));
                this.$router.push(fullPath.news);
            }

        }
    }
</script>
