<template>
    <li>
        <a @click.prev="handlerClick" class="dropdown-toggle" data-toggle="dropdown"
           :title="title"
        >
            <i class="material-icons">{{materialIcon}}</i>
            <p class="hidden-lg hidden-md">{{title}}</p>
        </a>
    </li>
</template>

<script>
    export default {
        name: 'NavButton',
        props: {
            materialIcon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: 'NO NAME'
            },
            handlerClick: {
                type: Function,
                default: () => {
                }
            }
        }
    }
</script>
