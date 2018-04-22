<template>
    <div :class="sidebarClasses"
         :data-color="backgroundColor"
         data-image="static/img/sidebar-1.jpg"
         style="background-image: url(static/img/sidebar-1.jpg)"
         :data-active-color="activeColor">

        <div class="logo">
            <a href="http://www.creative-tim.com" class="simple-text">
                Creative Tim
            </a>
        </div>
        <div class="sidebar-wrapper">

            <slot>

            </slot>
            <ul class="nav nav-mobile-menu">
                <li><a href="#/" class="dropdown-toggle active" data-toggle="dropdown">
                    <i class="material-icons">dashboard</i>
                    <p class="hidden-lg hidden-md">Dashboard</p></a>
                </li>
                <drop-down>
                    <a slot="title" data-toggle="dropdown" class="dropdown-toggle">
                        <i class="material-icons">notifications</i>
                        <span class="notification">5</span>
                        <p class="hidden-lg hidden-md">Notifications</p>
                    </a>
                    <li><a href="#">Mike John responded to your email</a></li>
                    <li><a href="#">You have 5 new tasks</a></li>
                    <li><a href="#">You're now friend with Andrew</a></li>
                    <li><a href="#">Another Notification</a></li>
                    <li><a href="#">Another One</a></li>
                </drop-down>
                <li>
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle"><i class="material-icons">person</i>
                        <p class="hidden-lg hidden-md">Profile</p></a>
                </li>
            </ul>
            <ul :class="navClasses">
                <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
                <router-link v-for="(link,index) in sidebarLinks" :to="link.path" tag="li" :ref="link.name">
                    <a>
                        <i v-if="link.icon && link.icon.substr(0, 3) === 'fa '" :class="link.icon"></i>
                        <i v-if="link.icon && link.icon.substr(0, 3) !== 'fa '" class="material-icons">{{link.icon}}</i>
                        <p>{{link.name}}</p>
                    </a>
                </router-link>
                <!--TODO -->
                <!--<li class="nav-item active ">-->
                    <!--<a class="nav-link collapsed" data-toggle="collapse" href="#componentsExamples" aria-expanded="false">-->
                        <!--<i class="material-icons">apps</i>-->
                        <!--<p> Components-->
                            <!--<b class="caret"></b>-->
                        <!--</p>-->
                    <!--</a>-->

                    <!--<div class="collapse" id="componentsExamples" :style="{display: 'block'}">-->
                        <!--<ul class="nav">-->
                            <!--<li class="nav-item ">-->
                                <!--<a class="nav-link" href="../components/buttons.html">-->
                                    <!--<span class="sidebar-mini"> B </span>-->
                                    <!--<span class="sidebar-normal"> Buttons </span>-->
                                <!--</a>-->
                            <!--</li>-->
                            <!--<li class="nav-item active ">-->
                                <!--<a class="nav-link" href="../components/grid.html">-->
                                    <!--<span class="sidebar-mini"> GS </span>-->
                                    <!--<span class="sidebar-normal"> Grid System </span>-->
                                <!--</a>-->
                            <!--</li>-->
                            <!---->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</li>-->
            </ul>
        </div>
        <div class="sidebar-background" style="background-image: url(static/img/sidebar-1.jpg)"></div>
    </div>
</template>
<script>
    export default {
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
            }
        },
        data() {
            return {
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
