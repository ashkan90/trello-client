<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
      	<v-form
        v-if="!loading"
      	v-model="valid"
      	@submit.prevent="signUp"
      	@keydown.prevent.enter="">
      	  <v-text-field
      	    v-model="user.username"
      	    :rules="notEmptyRules"
      	    required
      	    label="Username"
      	  ></v-text-field>
      	  <v-text-field
      	  	v-model="user.password"
      	  	:rules="notEmptyRules"
      	    label="Password"
      	    type="password"
      	    required
      	  ></v-text-field>
      	  <v-btn type="submit" :disabled="!valid">Login</v-btn>
      	</v-form>
        <v-progress-circular 
        v-else
        :size="70" 
        :width="7" 
        indeterminate 
        color="primary">
        </v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(vm) {
  	return {
  	  valid: false,
  	  user: {
  	  	username: '',
  	  	password: '',
  	  },
  	  notEmptyRules: [val => !!val || 'Cannot be empty!'],
  	  confirmPasswordRule: [val => val === vm.user.password || 'Password doesnt match.'],
  	};
  },
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
    ...mapActions('auth', ['authenticate'])
  },
  methods: {
  	login() {
  	  if (this.valid) {
  	  	this.authenticate({
  	  	  strategy: 'local',
  	  	  username: this.user.username,
  	  	  password: this.user.password
  	  	}).then(() => {
  	  		// logged in
  	  	})
  	  }
  	},
  },
};
</script>