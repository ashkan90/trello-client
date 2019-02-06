<template>
  <v-content>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap align-center>
          <v-progress-circular
            v-if="creatingList"
            :size="70"
            :width="7"
            indeterminate
            color="primary"
          >
          </v-progress-circular>
          <h2>{{ board.name }}</h2>
          <v-flex sm3 v-for="(list, i) in lists" :key="i">
            <v-card>
              <v-card-title primary-title>
                <div class="headline">{{ list.name }}</div>
              </v-card-title>
              <v-img :src="list.background" :lazy-src="list.background" height="300px"> </v-img>
            </v-card>
          </v-flex>
          <v-flex sm3>
            <v-card>
              <v-card-title class="column">
                <div class="headline">Create new List</div>
                <div>
                  <v-form
                    v-if="!creatingList"
                    v-model="validList"
                    @submit.prevent="createList"
                    @keydown.prevent.enter
                  >
                    <v-text-field
                      label="Name"
                      v-model="list.name"
                      :rules="notEmptyRules"
                      required
                    ></v-text-field>
                    <v-btn type="submit" :disabled="!validList">Create List</v-btn>
                  </v-form>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      board: {},
      validList: false,
      list: {
        name: ""
      },
      notEmptyRules: [val => !!val || "Cannot be empty!"]
    };
  },
  mounted() {
    this.getBoard(this.$route.params.id).then(res => {
      this.board = res.data || res;
    });
  },
  computed: {
    ...mapState("boards", {
      loading: "isGetPending"
    })
  },
  methods: {
    ...mapActions("boards", { findBoards: "find" }),
    createList() {
      // Create new record
      if (this.valid) {
        const { List } = this.$FeathersVuex;
        const list = new List(this.list);
        list.save();
        this.list = {
          name: ""
        };
      }
    }
  }
};
</script>
