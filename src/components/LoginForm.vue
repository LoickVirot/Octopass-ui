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
  display: block;
  width: 100%;
  border-radius: 0;
  border: 1px solid #EAEAEA;
  border-bottom: 0;
  padding: 10px;
  box-sizing: border-box;
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

.form button {
  background: #4e7ad9;
  font-size: 1em;
  border: 0;
  border-radius: 5px;
  padding: 7px 15px;;
  color: #FFFFFF;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  display: inline-block;
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
