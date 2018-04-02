<template>
    <li class="password-item" v-on:click="clickItem">
      <div class="clickable">
        <transition name="slide-fade">
          <span>{{ name }}</span>
        </transition>
      </div>
      <transition name="slide-fade">
        <password-modal
          v-if="modalOpened"
          :password="password"
          :visible.sync="modalOpened"
        >
          </password-modal>
      </transition>
    </li>
</template>

<script>
import PasswordModal from './utils/PasswordModal.vue'

export default {
  props: ['password'],
  data: () => {
    return {
      name: '',
      modalOpened: false
    }
  },
  components: {
    PasswordModal
  },
  methods: {
    async clickItem () {
      try {
        this.modalOpened = true
      } catch (err) {
        console.log(err)
      }
    },
    getPasswordName () {
      return this.password.serviceName
    }
  },
  created () {
    this.name = this.getPasswordName()
  }
}
</script>

<style>
.password-item {
  list-style: none;
  background: #FFFFFF;
  border-bottom: 1px solid #EAEAEA;
}

.password-item .clickable {
  padding: 10px 0;
  cursor: pointer;
  transition: .2s ease padding;
}

.password-item .clickable:hover {
  padding: 15px 0;
  transition: .2s ease padding;
}

.password-item:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.password-item:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
