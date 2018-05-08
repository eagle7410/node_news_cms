<template>
    <div :class="sidebarClasses"
         :data-color="backgroundColor"
         :data-image="backgroundImage"
         :style="sideStyle"
         :data-active-color="activeColor"
    >
        <div class="logo">
            <a :href="appClientHome" class="simple-text" target="_blank">
               {{appClientName}}
            </a>
        </div>
        <div class="sidebar-wrapper">

            <slot></slot>

            <top-menu css="nav nav-mobile-menu"></top-menu>
            <ul :class="navClasses">
                <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
                <router-link v-for="(link,index) in sidebarLinks" :to="link.path" tag="li" :ref="link.name">
                    <a>
                        <i v-if="link.icon && link.icon.substr(0, 3) === 'fa '" :class="link.icon"></i>
                        <i v-if="link.icon && link.icon.substr(0, 3) !== 'fa '" class="material-icons">{{link.icon}}</i>
                        <p>{{link.name}}</p>
                    </a>
                </router-link>
            </ul>
        </div>
        <div class="sidebar-background" :style="backgroundImage"></div>
    </div>
</template>
<script>
    import TopMenu from '../../components/Dashboard/Layout/DashboartLayout/TopMenu'

    export default {
        components : {
            TopMenu
        },
        props: {
            type: {
                type: String,
                default: 'sidebar',
                validator: (value) => {
                    let acceptedValues = ['sidebar', 'navbar']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            backgroundColor: {
                type: String,
                default: 'purple',
                validator: (value) => {
                    let acceptedValues = ['purple', 'black', 'darkblue']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            activeColor: {
                type: String,
                default: 'success',
                validator: (value) => {
                    let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
                    return acceptedValues.indexOf(value) !== -1
                }
            }
        },
        computed: {
            sidebarLinks() {
                return this.$root.sidebarLinks || [];
            },
            sidebarClasses() {
                if (this.type === 'sidebar') {
                    return 'sidebar'
                } else {
                    return 'collapse navbar-collapse off-canvas-sidebar'
                }
            },
            navClasses() {
                if (this.type === 'sidebar') {
                    return 'nav'
                } else {
                    return 'nav navbar-nav'
                }
            },
            /**
             * Styles to animate the arrow near the current active sidebar link
             * @returns {{transform: string}}
             */
            arrowMovePx() {
                return this.linkHeight * this.activeLinkIndex
            },
            _storeAuth () {
                return this.$store.state.auth
            },
            appClientName () {
                return this._storeAuth.appClientName
            },
            appClientHome () {
                return this._storeAuth.appClientHome
            }
        },
        data() {
            const bgImage = 'static/img/sidebar-1.jpg';

            return {
                backgroundImage: bgImage,
                sideStyle: {
                    backgroundImage: `url(${bgImage})`,
                },
                linkHeight: 60,
                activeLinkIndex: 0,

                windowWidth: 0,
                isWindows: false,
                hasAutoHeight: false
            }
        },
        methods: {
            findActiveLink() {
                this.sidebarLinks.find((element, index) => {
                    let found = element.path === this.$route.path
                    if (found) {
                        this.activeLinkIndex = index
                    }
                    return found
                })
            }
        },
        mounted() {
            this.findActiveLink()
        },
        watch: {
            $route: function (newRoute, oldRoute) {
                this.findActiveLink()
            }
        }
    }

</script>
<style>
    .nav-item.active > .nav-item {
        background: none;
    }

</style>
