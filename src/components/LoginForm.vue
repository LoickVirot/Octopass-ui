<template>
  <div class="login-form">
    <h1>Login</h1>
    <transition name="slide-fade">
      <div class="alert-error" v-show="errorLogin" >Can't connect this account. Please check your username and password</div>
    </transition>
    <div class="form">
      <div class="form-control">
        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">
      </div>
      <button v-on:click="loginClick">Login</button>
      <p>
        Does not have an account ?
        <router-link :to="{ name: 'RegisterForm'}">Create one !</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      errorLogin: false,
      username: '',
      password: ''
    }
  },
  methods: {
    async loginClick () {
      try {
        await this.$octopassSdk.getAuthenticator().login(this.username, this.password)
        this.$router.push({path: '/'})
      } catch (err) {
        console.error(err)
        this.errorLogin = true
      }
    }
  }
}
</script>

<style>

.form .form-control input {
  border-bottom: 0;
}

.form .form-control input:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.form .form-control input:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid #EAEAEA;
}

.alert-error {
  background: #f2b880;
  color: #70563d;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
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
