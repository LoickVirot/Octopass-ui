<template>
  <div class="password-list">
    <h1>Passwords</h1>
    <div class="error" v-if="error !== null">
      {{ error }}
    </div>
    <ul>
      <password-item
        v-for="password in passwords"
        :key="password.id"
        :password="password">
      </password-item>
    </ul>
  </div>
</template>

<script>
import PasswordItem from './PasswordItem.vue'

export default {
  data: () => {
    return {
      passwords: [],
      error: null
    }
  },
  components: {
    PasswordItem
  },
  async created () {
    if (!this.$octopassSdk.getAuthenticator().isLoggedIn()) {
      this.$router.push({path: 'login'})
    }
    try {
      this.passwords = await this.$octopassSdk.getPasswordManager().listUserPasswords()
    } catch (err) {
      this.error = 'Cannot reach server'
    }
  }
}
</script>

<style>
.password-list ul {
  padding: 0;
}

</style>
