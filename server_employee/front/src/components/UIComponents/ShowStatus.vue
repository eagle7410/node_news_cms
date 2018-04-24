<template>
    <div>
        <i v-if="status" class="fa fa-check-circle"></i>
        <i v-else class="fa fa-ban"></i>
    </div>
</template>

<script>
    export default {
        props: {
            entry : Object,
            store : String
        },
        computed: {
            status() {
                return this.entry[this.store];
            }
        },
    }
</script>

<style scoped>
    .fa {
        font-size: 24px;
    }

    .fa-check-circle {
        color: #4caf50
    }

    .fa-ban {
        color: #f44336;
    }
</style>
