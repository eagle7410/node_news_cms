<template>
    <div :class="cssClassMain">
        <label v-if="label" class="control-label">
            {{label}}
        </label>
        <input class="form-control border-input" v-bind="$props"
               @input="$emit('input',$event.target.value)">
    </div>
</template>
<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'text'
            },
            label: String,
            name: String,
            disabled: Boolean,
            placeholder: String,
            value: [String, Number],
            isLabelFloating: {
                type: Boolean,
                default: true
            }
        },
        computed : {
            cssClassMain () {
                return this.isLabelFloating
                    ? 'form-group label-floating'
                    : 'form-group';
            }
        }
    }

</script>
<style>

</style>
