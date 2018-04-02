<template>
  <div class="password-modal">
    <h1>Please enter your password</h1>
    <p>This is the only thing that can retrieve your password</p>
    <input type="password" v-model="userPassword" placeholder="Please type here your password"/>
    <button v-on:click="uncryptPassword">{{ buttonLabel }}</button>
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
export default {
  props: ['password', 'visible'],
  data () {
    return {
      userPassword: '',
      errorMessage: '',
      buttonLabel: 'Get my password'
    }
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
        console.log('Mot de passe: ' + pass)
        this.buttonLabel = 'Copied!'
        setTimeout(() => {
          this.$emit('update:visible', false)
        }, 3000)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
