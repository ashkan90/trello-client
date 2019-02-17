<template>
  <v-content>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap align-center>
          <v-progress-circular v-if="creating" :size="70" :width="7" indeterminate color="primary">
          </v-progress-circular>
          <v-flex sm3 v-for="board in boards" :key="board._id">
            <single-board :board="board"></single-board>
          </v-flex>
          <create-board :creating="creating" :createBoard="createBoard"> </create-board>
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import CreateBoard from "@/components/CreateBoard";
import SingleBoard from "@/components/SingleBoard";

export default {
  data() {
    return {};
  },
  components: {
    CreateBoard,
    SingleBoard
  },
  mounted() {
    this.findBoards({ query: {} });
  },
  computed: {
    ...mapState("boards", {
      loading: "isFindPending",
      creating: "isCreatePending"
    }),
    ...mapState("auth", { user: "payload" }),
    ...mapGetters("boards", { findBoardsInStore: "find" }),
    boards() {
      if (this.user.userId) {
        return this.user
          ? this.findBoardsInStore({
              query: {
                ownerId: this.user.userId
              }
            }).data
          : [];
      }
    }
  },
  methods: {
    ...mapActions("boards", { findBoards: "find" }),
    async createBoard(board) {
      // Create new record
      const { Board } = this.$FeathersVuex;
      const newBoard = new Board(board);
      await newBoard.save();
    }
  }
};
</script>
