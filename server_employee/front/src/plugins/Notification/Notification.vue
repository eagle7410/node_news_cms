<template>
  <div
    @click="close()"
    data-notify="container"
    class="col-xs-11 col-sm-4 alert open alert-with-icon"
    role="alert"
    :class="[verticalAlign, horizontalAlign, alertType]"
    :style="customPosition"
    data-notify-position="top-center">
    <button
      type="button"
      aria-hidden="true"
      class="close"
      data-notify="dismiss"
      @click="close">×
    </button>
    <i data-notify="icon" class="material-icons">{{icon}}</i>
    <span data-notify="message" v-html="message"></span>
  </div>
</template>
<script>
  export default {
    name: 'notification',
    props: {
      message: String,
      icon: {
          type :String,
          default : 'notifications'
      },
      verticalAlign: {
        type: String,
        default: 'top'
      },
      horizontalAlign: {
        type: String,
        default: 'left'
      },
      type: {
        type: String,
        default: 'info'
      },
      timeout: {
        type: Number,
        default: 5000
      },
      timestamp: {
        type: Date,
        default: () => new Date()
      }
    },
    data () {
      return {
        elmHeight: 0
      }
    },
    computed: {
      hasIcon () {
        return this.icon && this.icon.length > 0
      },
      alertType () {
        return `alert-${this.type}`
      },
      customPosition () {
        let initialMargin = 20
        let alertHeight = this.elmHeight + 10
        let sameAlertsCount = this.$notifications.state.filter((alert) => {
          return alert.horizontalAlign === this.horizontalAlign && alert.verticalAlign === this.verticalAlign && alert.timestamp <= this.timestamp
        }).length
        let pixels = (sameAlertsCount - 1) * alertHeight + initialMargin
        let styles = {}
        if (this.verticalAlign === 'top') {
          styles.top = `${pixels}px`
        } else {
          styles.bottom = `${pixels}px`
        }
        return styles
      }
    },
    methods: {
      close () {
        this.$emit('on-close', this.timestamp)
      }
    },
    mounted () {
      this.elmHeight = this.$el.clientHeight - this.defTop
      if (this.timeout) {
        setTimeout(this.close, this.timeout)
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "../../assets/sass/md/variables";

  .alert {
    z-index: 100;
    cursor: pointer;
    position: fixed;

    &.center {
      left: 0px;
      right: 0px;
      margin: 0 auto;
    }
    &.left {
      left: 20px;
    }
    &.right {
      right: 20px;
    }

  }

</style>
