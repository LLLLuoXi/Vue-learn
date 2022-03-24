<template>
  <transition :name="transitionName">
    <div class="toast" :class="toastClasses" v-show="show">
      <div class="toast-icon">
        <component :is="toastIcon"></component>
      </div>
      <div class="toast-content">
        <div class="toast-title">{{ toastTitle }}</div>
        <div class="toast-message">{{ message }}</div>
      </div>
      <button @click="$emit('hide')" class="toast-button">&times;</button>
    </div>
  </transition>
</template>

<script>
import IconSuccess from "./IconSuccess.vue";
import IconWarning from "./IconWarning.vue";
import IconError from "./IconError.vue";
export default {
  name: "Toast",
  emits: ["hide"],
  data: () => ({
    timeout: null,
  }),
  watch: {
    show() {
      console.log("watch show");
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.$emit("hide");
      }, 3000);
    },
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "success",
      validator: function (value) {
        return ["success", "warning", "error"].indexOf(value) !== -1;
      },
    },
    position: {
      type: String,
      default: "top-left",
    },
  },
  computed: {
    transitionName() {
      const transitions = {
        "top-left": "ltr",
        "bottom-left": "ltr",
        "top-right": "rtl",
        "bottom-right": "rtl",
      };
      return transitions[this.getPosition];
    },
    toastType() {
      return `toast-${this.getType}`;
    },
    toastIcon() {
      return `icon-${this.getType}`;
    },
    getType() {
      return ["success", "warning", "error"].indexOf(this.type) === -1
        ? "success"
        : this.type;
    },
    toastTitle() {
      return this.title
        ? this.title
        : this.type.charAt(0).toUpperCase() + this.type.slice(1);
    },
    getPosition() {
      return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(
        this.position
      ) === -1
        ? "bottom-right"
        : this.position;
    },
    toastClasses() {
      return [this.toastType, this.getPosition];
    },
  },
  components: { IconError, IconSuccess, IconWarning },
  methods: {},
};
</script>

<style scoped lang="less">
.toast {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  box-shadow: 1px 5px 10px -5px rgba(0, 0, 0, 0.2);
  position: relative;
  &::before {
    content: "";
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &-success {
    background-color: #ecfdf5;
    .toast-icon svg {
      fill: #ecfdf5;
    }
    &::before,
    .toast-icon {
      background-color: #34d399;
    }
  }
  &-warning {
    background-color: #fffebd;
    .toast-icon svg {
      fill: #fffbeb;
    }
    &::before,
    .toast-icon {
      background-color: #f59e0b;
    }
  }
  &-error {
    background-color: #fef2f2;
    .toast-icon svg {
      fill: #f3f2f2;
    }
    &::before,
    .toast-icon {
      background-color: #ef4444;
    }
  }
  .toast-icon {
    // background-color: #34d399;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    padding: 7px;
    svg {
      // fill: #ecfdf5;
    }
  }
  .toast-content {
    flex: 1;
    margin: 0 1rem;
  }
  .toast-title {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .toast-message {
    font-size: 14px;
    color: #6b7280;
  }
  .toast-button {
    width: 1.5em;
    height: 1.5em;
    border: none;
    padding: 0;
    color: #9ca3af;
    opacity: 0.7;
    background: transparent;
    cursor: pointer;
    font-size: 1.5em;
    &:hover {
      opacity: 1;
    }
  }

  &.bottom-left {
    position: fixed;
    left: 20px;
    bottom: 40px;
  }
  &.top-left {
    position: fixed;
    left: 20px;
    top: 40px;
  }
  &.bottom-right {
    position: fixed;
    right: 20px;
    bottom: 40px;
  }
  &.top-right {
    position: fixed;
    right: 20px;
    top: 40px;
  }
}
.rtl-enter-active,
.rtl-leave-active,
.ltr-enter-active,
.ltr-leave-active {
  transition: all 0.5s ease-in-out;
}
.rtl-enter-from,
.rtl-leave-to {
  transform: translateX(100%);
}
.ltr-enter-from,
.ltr-leave-to {
  transform: translateX(-100%);
}
.rtl-leave-to,
.ltr-leave-to {
  opacity: 0;
}
</style>
