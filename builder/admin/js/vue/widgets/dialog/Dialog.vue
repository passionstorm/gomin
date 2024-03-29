<template>
  <transition :name="animation">
    <div
        v-if="isActive"
        class="dialog modal is-active"
        :class="size"
        v-trap-focus="trapFocus"
        :role="ariaRole"
        :aria-modal="ariaModal">
      <div class="modal-background" @click="cancel('outside')"></div>
      <div class="modal-card animation-content">
        <header class="modal-card-head" v-if="title">
          <p class="modal-card-title">{{ title }}</p>
        </header>

        <section
            class="modal-card-body"
            :class="{ 'is-titleless': !title, 'is-flex': hasIcon }">
          <div class="media">
            <div
                class="media-left"
                v-if="hasIcon && (icon || iconByType)">
              <icon
                  :name="icon ? icon : iconByType"
                  :pack="iconPack"
                  :type="type"
                  :both="!icon"
                  size="is-large"/>
            </div>
            <div class="media-content">
              <p v-html="message"></p>

              <div v-if="hasInput" class="field">
                <div class="control">
                  <input
                      v-model="prompt"
                      class="input"
                      ref="input"
                      :class="{ 'is-danger': validationMessage }"
                      v-bind="inputAttrs"
                      @keyup.enter="confirm">
                </div>
                <p class="help is-danger">{{ validationMessage }}</p>
              </div>
            </div>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button
              v-if="showCancel"
              class="button"
              ref="cancelButton"
              @click="cancel('button')">
            {{ cancelText }}
          </button>
          <button
              class="button"
              :class="type"
              ref="confirmButton"
              @click="confirm">
            {{ confirmText }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import trapFocus from '../../directives/trapFocus';
  import {Icon, Modal} from '../index';
  import config from '../../utils/config_element';
  import {removeElement} from '../../utils';

  export default {
    name: 'VDialog',
    components: {
      Icon
    },
    directives: {
      trapFocus,
    },
    extends: Modal,
    props: {
      title: String,
      message: String,
      icon: String,
      iconPack: String,
      hasIcon: Boolean,
      type: {
        type: String,
        default: 'is-primary',
      },
      size: String,
      confirmText: {
        type: String,
        default: () => {
          return config.defaultDialogConfirmText
              ? config.defaultDialogConfirmText
              : 'OK';
        },
      },
      cancelText: {
        type: String,
        default: () => {
          return config.defaultDialogCancelText
              ? config.defaultDialogCancelText
              : 'Cancel';
        },
      },
      hasInput: Boolean, // Used internally to know if it's prompt
      inputAttrs: {
        type: Object,
        default: () => ({}),
      },
      onConfirm: {
        type: Function,
        default: () => {
        },
      },
      focusOn: {
        type: String,
        default: 'confirm',
      },
      trapFocus: {
        type: Boolean,
        default: config.defaultTrapFocus,
      },
      ariaRole: {
        type: String,
        validator: (value) => {
          return [
            'dialog',
            'alertdialog',
          ].indexOf(value) >= 0;
        },
      },
      ariaModal: Boolean,
    },
    data() {
      const prompt = this.hasInput
          ? this.inputAttrs.value || ''
          : '';
      return {
        prompt,
        isActive: false,
        validationMessage: '',
      };
    },
    computed: {
      /**
       * Icon name (MDI) based on the type.
       */
      iconByType() {
        switch (this.type) {
          case 'is-info':
            return 'information';
          case 'is-success':
            return 'check-circle';
          case 'is-warning':
            return 'alert';
          case 'is-danger':
            return 'alert-circle';
          default:
            return null;
        }
      },
      showCancel() {
        return this.cancelOptions.indexOf('button') >= 0;
      },
    },
    methods: {
      /**
       * If it's a prompt Dialog, validate the input.
       * Call the onConfirm prop (function) and close the Dialog.
       */
      confirm() {
        if (this.$refs.input !== undefined) {
          if (!this.$refs.input.checkValidity()) {
            this.validationMessage = this.$refs.input.validationMessage;
            this.$nextTick(() => this.$refs.input.select());
            return;
          }
        }
        this.onConfirm(this.prompt);
        this.close();
      },
      /**
       * Close the Dialog.
       */
      close() {
        this.isActive = false;
        // Timeout for the animation complete before destroying
        setTimeout(() => {
          this.$destroy();
          removeElement(this.$el);
        }, 150);
      },
    },
    beforeMount() {
      // Insert the Dialog component in body tag
      if (typeof window !== 'undefined') {
        this.$nextTick(() => {
          document.body.appendChild(this.$el);
        });
      }
    },
    mounted() {
      this.isActive = true;
      if (typeof this.inputAttrs.required === 'undefined') {
        this.$set(this.inputAttrs, 'required', true);
      }
      this.$nextTick(() => {
        // Handle which element receives focus
        if (this.hasInput) {
          this.$refs.input.focus();
        } else if (this.focusOn === 'cancel' && this.showCancel) {
          this.$refs.cancelButton.focus();
        } else {
          this.$refs.confirmButton.focus();
        }
      });
    },
  };
</script>