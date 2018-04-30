import groups from '../../../constants/groups';
const GlobalMixins = {
    install(Vue) {
        Vue.mixin({

            computed : {
                authPhrases : function () {
                    return this.$store.state.auth.phrases;
                },
                columnsInStore() {
                    return this._store.columns
                },
                steepInStore() {
                    return this._store.steep
                },
                pageSizeInStore() {
                    return this._store.pageSize
                },
                countPagesInStore() {
                    return this._store.countPages
                },
                currentPageInStore() {
                    return this._store.currentPage
                },
                setCurrentPageInStore() {
                    return this._store.setCurrentPage
                },
                loadPageInStore() {
                    return this._store.loadPage
                },
                isAdmin () {
                    const userGroups = this.$store.state.auth.user.groups;

                    if (!userGroups) {
                        return false;
                    }
                    return userGroups.includes(groups.admin);
                },
                isModerator () {
                    const userGroups = this.$store.state.auth.user.groups;

                    if (!userGroups) {
                        return false;
                    }
                    return userGroups.includes(groups.moderator);
                },
                isContent () {
                    const userGroups = this.$store.state.auth.user.groups;

                    if (!userGroups) {
                        return false;
                    }
                    return userGroups.includes(groups.content);
                },
                isRoot () {
                    const userGroups = this.$store.state.auth.user.groups;

                    if (!userGroups) {
                        return false;
                    }
                    return userGroups.includes(groups.root);
                },
                isEmployee () {
                    const userGroups = this.$store.state.auth.user.groups;

                    if (!userGroups) {
                        return false;
                    }
                    return userGroups.includes(groups.employee);
                }

            },

            methods : {
                __t : function (mess, insert = null) {
                    mess = this.authPhrases[mess] || mess;

                    if (insert) {
                        for (let label in insert) {
                            mess = mess.replace(new RegExp(`{${label}}`, 'g'), insert[label]);
                        }
                    }

                    return mess;
                },
                notifyError(mess, positionV = 'center') {
                    this.$notify({
                        message: mess,
                        horizontalAlign: positionV,
                        icon: 'error',
                        type: 'danger'
                    })
                },
                notifyOk(mess, positionV = 'center') {
                    this.$notify({
                        message: mess,
                        horizontalAlign: positionV,
                        icon: 'notifications',
                        type: 'success'
                    })
                }
            }
        })
    }
}

export default GlobalMixins
