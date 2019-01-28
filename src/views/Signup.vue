<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
      	<v-form 
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
      	    v-model="user.displayName"
      	    :rules="notEmptyRules"
      	    required
      	    label="Display name"
      	  ></v-text-field>
      	  <v-text-field
      	  	v-model="user.password"
      	  	:rules="notEmptyRules"
      	    label="Password"
      	    type="password"
      	    required
      	  ></v-text-field>
      	  <v-text-field
      	  	v-model="user.confirmPassword"
      	  	:rules="confirmPasswordRule"
      	    label="Confirm password"
      	    type="password"
      	    required
      	  ></v-text-field>
      	  <v-text-field
      	  	v-model="user.imageUrl"
      	  	:rules="notEmptyRules"
      	    label="Image URL"
      	    required
      	  ></v-text-field>
      	  <v-btn type="submit" :disabled="!valid">Sign Up</v-btn>
      	</v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  data(vm){
  	return {
  	  valid: false,
  	  user: {
  	  	username: '',
  	  	confirmPassword: '',
  	  	password: '',
  	  	displayName: '',
  	  	imageUrl: ''
  	  },
  	  notEmptyRules: [(val) => !!val || 'Cannot be empty!'],
  	  confirmPasswordRule: [(val) => val === vm.user.password || 'Password doesnt match.']
  	}
  },
  methods: {
  	signUp(){
  	  if (this.valid) {
  	  	const { User } = this.$FeathersVuex
  	  	const user = new User(this.user)
  	  	user.create()
  	  }
  	}
  }
}
</script>
