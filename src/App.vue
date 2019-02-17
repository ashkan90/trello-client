<template>
  <v-app app>
    <app-navbar :user="user" :userObj="userObj" :logout="logout"></app-navbar>

    <v-content class="hide-overflow">
      <router-view />
    </v-content>
    <v-footer :fixed="false" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import AppNavbar from "@/components/AppNavbar";

export default {
  name: "App",
  components: {
    AppNavbar
  },
  computed: {
    ...mapState("auth", { user: "payload" }),
    ...mapGetters("users", { userObj: "current" })
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
