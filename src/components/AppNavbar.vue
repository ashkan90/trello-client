<template>
  <v-toolbar app absolute>
    <v-toolbar-title class="headline text-uppercase">
      <span>Vuetify</span>
      <span class="font-weight-light">TRELLO CLONE</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!user">
      <v-btn flat :to="{ name: 'login' }">Login</v-btn>
      <v-btn flat :to="{ name: 'signup' }">Sign Up</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <app-avatar :userObj="userObj"></app-avatar>
      <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import AppAvatar from "@/components/AppAvatar";

export default {
  props: ["user", "logout", "userObj"],
  components: {
    AppAvatar
  }
};
</script>
