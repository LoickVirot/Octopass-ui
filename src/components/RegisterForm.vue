<template>
  <div class="login-form">
    <h1>Register</h1>
    <transition name="slide-fade" mode="out-in">
      <div class="alert-error" v-if="errorRegister">Passwords not match</div>
      <div class="alert-success" v-if="successRegister">
        Congratulation ! Your account has been created.
        <router-link :to="{ name: 'LoginForm'}">Login</router-link>
      </div>
    </transition>
    <div class="form">
      <div class="form-control">
        <input type="text" placeholder="Username">
        <input type="mail" placeholder="E-mail address">
        <input type="password" v-model="password" placeholder="Password">
        <input type="password" v-model="confpass" placeholder="Confirm password">
      </div>
      <button v-on:click="loginClick">Create an account</button>
      <p>
        You already have an account ?
        <router-link :to="{ name: 'LoginForm'}">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      errorRegister: false,
      successRegister: false,
      password: '',
      confpass: ''
    }
  },
  methods: {
    loginClick () {
      if (this.password !== this.confpass) {
        this.errorRegister = true
        this.successRegister = false
      } else {
        this.errorRegister = false
        this.successRegister = true
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

.alert-success {
  background: #41B883;
  color: #F0F0E5;
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
