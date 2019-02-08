<template>
  <v-content>
    <h1>DSFLKLDSŞF</h1>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap align-center>
          <v-progress-circular v-if="creating" :size="70" :width="7" indeterminate color="primary">
          </v-progress-circular>
          <v-flex sm3 v-for="(board, i) in boards" :key="i">
            <v-card>
              <v-card-title primary-title>
                <div class="headline">{{ board.name }}</div>
              </v-card-title>
              <v-img :src="board.background" :lazy-src="board.background" height="300px"> </v-img>
              <v-card-actions>
                <v-btn color="primary" :to="{ name: 'board', params: { id: board._id } }">Go</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex sm3>
            <v-card>
              <v-card-title class="column">
                <div class="headline">Create new Board</div>
                <div>
                  <v-form
                    v-if="!creating"
                    v-model="valid"
                    @submit.prevent="createBoard"
                    @keydown.prevent.enter
                  >
                    <v-text-field
                      label="Name"
                      v-model="board.name"
                      :rules="notEmptyRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="label"
                      v-model="board.background"
                      :rules="notEmptyRules"
                      required
                    ></v-text-field>
                    <v-btn type="submit" :disabled="!valid">Create Board</v-btn>
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
      valid: false,
      board: {
        name: "",
        background: ""
      },
      notEmptyRules: [val => !!val || "Cannot be empty!"]
    };
  },
  mounted() {
    this.findBoards({ query: {} }).then(res => {
      const boards = res.data || res;
    });
  },
  computed: {
    ...mapState("boards", {
      loading: "isFindPending",
      creating: "isCreatePending"
    }),
    ...mapState("auth", { user: "payload" }),
    ...mapGetters("boards", { findBoardsInStore: "find" }),
    boards() {
      return this.findBoardsInStore({
        query: {
          ownerId: this.user.userId
        }
      }).data;
    }
  },
  methods: {
    ...mapActions("boards", { findBoards: "find" }),
    createBoard() {
      // Create new record
      if (this.valid) {
        const { Board } = this.$FeathersVuex;
        const board = new Board(this.board);
        board.save();
      }
    }
  }
};
</script>
