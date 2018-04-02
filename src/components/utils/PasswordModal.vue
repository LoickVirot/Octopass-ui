<template>
  <div class="password-modal" v-click-outside="closeModal">
    <div class="ask-pass" v-if="uncryptedPass === ''">
      <h1>Please enter your password</h1>
      <p>This is the only thing that can retrieve your password</p>
      <input type="password" v-model="userPassword" placeholder="Please type here your password"/>
      <button @click="uncryptPassword">Get my password</button>
    </div>
    <div class="uncrypted-pass" v-if="uncryptedPass !== ''">
      <h1>Success</h1>
      <p>Your password has been uncrypted successfully</p>
      <h3>{{ uncryptedPass }}</h3>
      <button @click="copyPassword">{{ buttonLabel }}</button>
    </div>
    <p class="alert-error" v-if="errorMessage !== ''">{{ errorMessage }}</p>
  </div>
</template>

<style>
  .password-modal {
    background: #FFFFFF;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    width: 500px;
    height: 220px;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }
</style>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  props: ['password', 'visible'],
  data () {
    return {
      userPassword: '',
      errorMessage: '',
      buttonLabel: 'Copy the password',
      uncryptedPass: ''
    }
  },
  directives: {
    ClickOutside
  },
  methods: {
    async uncryptPassword () {
      // Decode password
      try {
        let passwordObject = await this.$octopassSdk.getPasswordManager().getPassword(this.password.id)
        let pass = await this.$octopassSdk.getPasswordManager().decodePassword(this.userPassword, passwordObject)
        if (pass.length === 0) {
          this.errorMessage = 'Your password is incorrect'
          return
        }
        this.errorMessage = ''
        this.uncryptedPass = pass
      } catch (err) {
        console.log(err)
      }
    },
    copyPassword () {
      let input = document.createElement('input')
      input.type = 'text'
      input.value = this.uncryptedPass
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
      this.buttonLabel = 'Copied!'
    },
    closeModal () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
