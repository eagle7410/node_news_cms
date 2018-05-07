<template>
    <div class="card card-stats">
        <div class="card-header" :data-background-color="color">
            <i :class="icon"></i>
        </div>

        <div class="card-content">
            <h3 class="title">{{title}}</h3>
            <p class="category">{{category}}</p>
        </div>
        <div class="card-footer">
            <div class="stats">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'stats-card',
        props: {
            category : {
                type : String,
                default : ''
            },
            title : {
                type : [String, Number],
                default : ''
            },
            icon: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: 'orange'
            }
        }
    }

</script>
<style scoped>

</style>
