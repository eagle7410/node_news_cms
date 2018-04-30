<template>
    <div class="card">
        <div class="card-header" data-background-color="purple"
             v-if="title || description"
        >
            <h4 class="title" v-if="title">{{title}}</h4>
            <p class="category" v-if="description">{{description}}</p>
        </div>
        <div class="card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Box',
        props : {
            title : String,
            description : String
        }
    }
</script>

<style scoped>

</style>
