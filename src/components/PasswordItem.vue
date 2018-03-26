<template>
    <li class="password-item" v-on:click="clickItem">
      <transition name="slide-fade">
        <span>{{ name }}</span>
      </transition>
    </li>
</template>

<script>
export default {
  props: ['password'],
  data: () => {
    return {
      name: ''
    }
  },
  methods: {
    async clickItem () {
      // Decode password
      try {
        let passwordObject = await this.$octopassSdk.getPasswordManager().getPassword(this.password.id)
        let pass = await this.$octopassSdk.getPasswordManager().decodePassword('Test', passwordObject)
        console.log('Mot de passe: ' + pass)
        this.name = 'Copied in your clipboard!'
        setTimeout(() => {
          this.name = this.getPasswordName()
        }, 3000)
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
  padding: 10px 0;
  background: #FFFFFF;
  border-bottom: 1px solid #EAEAEA;
  cursor: pointer;
  transition: .2s ease padding;
}

.password-item:hover {
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
