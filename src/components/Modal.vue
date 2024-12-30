<template>
  <div class="modal position-static d-block" @click.self="close">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    isVisible() {
      return this.show;
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-sizing: border-box;

}

.modal-content {
  box-sizing: border-box;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 100%;
  position: relative;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
