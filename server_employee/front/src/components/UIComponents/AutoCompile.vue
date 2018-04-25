<template>
    <div>
        <li class="dropdown" :class="{open:isOpen}" @click="toggleDropDown"
            v-click-outside="closeDropDown"
            @blur="closeDropDown"
        >
            <fg-input type="text"
                      :placeholder='placeholder'
                      :label='label'
                      @input="$emit('input',val)"
                      v-model="val"
                      :is-label-floating="!Boolean(val.length)"
            ></fg-input>
            <ul class="dropdown-menu">
                <li v-for="item in filterList">
                    <a @click.prev="setVal(item)">{{item.show}}</a>
                </li>
            </ul>
        </li>
    </div>
</template>

<script>
    export default {
        name: 'AutoCompile',
        props: {
            list: {
                type: Array,
                default: []
            },
            label : {
                type: String,
                default : ''
            },
            countShow: {
                type: Number,
                default: 15
            },
            placeholder : {
                type: String,
                default : ''
            },
            value : String
        },
        data() {
            return {
                val: '',
                isOpen : false
            };
        },
        computed: {
            filterList() {
                let showList = [];

                for (let item of this.list) {
                    if (item.show.includes(this.val)) {
                        showList.push(item);
                    }

                    if (showList.length > this.countShow) {
                        break;
                    }
                }

                return showList;
            }
        },
        methods: {
            toggleDropDown () {
                this.isOpen = !this.isOpen;
            },
            closeDropDown () {
                this.isOpen = false;
            },
            setVal (item) {
                this.val = item.val;
            }
        },
        created () {
            this.val = this.value;
        }
    }
</script>

<style scoped>
    .dropdown {
        list-style-type: none;
    }
</style>
