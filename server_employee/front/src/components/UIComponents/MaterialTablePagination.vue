<template>
    <div v-if="countPages > 1">
        <span class="decs">
            {{__t('Current')}} {{currentPage + 1}} {{__t('from')}} {{countPages}}
        </span>
        <span>
            <ul class="pagination">

                <li v-if="isShowExtend">
                    <a @click.prev="clickFirst()"><i class="material-icons">first_page</i></a>
                </li>

                <li v-if="isShowExtend"><a @click.prev="nextLeft()"><i class="material-icons">chevron_left</i></a></li>

                <li class="disabled" v-if="isShowExtend && currentPage > steep"><a @click.prev="">...</a></li>

                <li v-for="index in countLi"
                    :class="getCssClass(start + index)"
                >
                    <a @click.prev="handlerClick(start + index)">{{start + index}}</a>
                </li>

                <li class="disabled" v-if="isShowExtend && currentPage < (countPages - steep)"><a @click.prev="">...</a></li>

                <li class="waves-effect" v-if="isShowExtend">
                    <a @click.prev="nextRight()"><i class="material-icons">chevron_right</i></a>
                </li>

                <li v-if="isShowExtend">
                    <a @click.prev="clickLast()"><i class="material-icons">last_page</i></a>
                </li>
            </ul>
        </span>
    </div>
</template>
<script>
    export default {
        props: {
            steep: {
                type: Number,
                default: 2,
                validator: value => value > 0
            },
            countPages: {
                type: Number,
                default: 0
            },
            currentPage: {
                type: Number,
                default: 0
            },
            setCurrentPage: {
                type: String,
                default: '',
            },
            loadPage : {
                type : Number,
                default : -1
            }
        },
        computed: {
            isShowExtend () {
                return this.countPages > this.countLi
            },
            countLi() {
                let calCount = 2 * this.steep + 1;

                if (calCount > this.countPages) {
                    return this.countPages;
                }

                return calCount
            },
            start() {
                let diff = this.currentPage - this.steep;

                if (diff < 0) {
                    return 0;
                }

                if (this.currentPage + this.steep >= this.countPages - 1) {
                    return this.countPages - (2 * this.steep + 1);
                }

                return this.currentPage - this.steep;
            }
        },
        methods: {
            setPage(page) {
                this.$store.dispatch(this.setCurrentPage, {
                    page : page,
                    app  : this
                });
            },
            getCssClass(index) {
                return (index - 1) === this.currentPage ? 'active' : 'waves-effect';
            },
            handlerClick(page) {
                this.setPage(page - 1);
            },
            clickFirst() {
                if (this.currentPage !== 0) {
                    this.setPage(0);
                }
            },
            clickLast() {
                if (this.currentPage !== this.countPages - 1) {
                    this.setPage(this.countPages - 1);
                }
            },
            nextLeft() {
                if (this.currentPage >= 1) {
                    this.setPage(this.currentPage - 1);
                }

            },
            nextRight() {
                if (this.currentPage < this.countPages - 1) {
                    this.setPage(this.currentPage + 1);
                }
            }

        },
    }

</script>
<style scoped>
    .decs {
        position: relative;
        bottom: 38px;
    }

    a {
        color: #ab47bc !important;
        font-weight: bold;
    }

    .active > a {
        position: relative;
        background: #ab47bc !important;
        border: #4caf50 5px solid !important;
        top: -6px;
        color: #fff !important;
        font-size: 18px;
    }

    .material-icons {
        font-size: 18px;
    }
</style>
