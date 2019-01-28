<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-btn :to="{ name: 'signup'} ">Sign Up</v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  data() {
  	return {

  	};
  },
};
</script>
