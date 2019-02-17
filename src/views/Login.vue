<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form 
        v-if="!loading" 
        v-model="valid" 
        @submit.prevent="login({ valid, user })" 
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
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { notEmptyRules } from "@/validators";

export default {
  data(vm) {
    return {
      valid: false,
      user: {
        username: "",
        password: ""
      },
      notEmptyRules,
      confirmPasswordRule: [val => val === vm.user.password || "Password doesnt match."]
    };
  },
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" })
  },
  methods: {
    ...mapActions("auth", ["authenticate"]),
    ...mapActions("localAuth", ["login"]),
  }
};
</script>
