<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn flat :to="{ name: 'login' }">Login</v-btn>
        <v-btn flat :to="{ name: 'signup' }">Sign Up</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer :fixed="false" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState("auth", { user: "payload" }),
    ...mapGetters("users", { userObj: "current" }),
  },
  methods: {
    ...mapActions("auth", { authLogout: "logout" }),
    logout() {
      this.authLogout().then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
