<template>
  <v-content>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap align-center>
          <v-progress-circular
            v-if="loadingBoard || creatingList"
            :size="70"
            :width="7"
            indeterminate
            color="primary"
          >
          </v-progress-circular>
          <v-flex xs12>
            <h2>{{ board.name }}</h2>
          </v-flex>
          <v-flex sm3 v-for="(list, i) in lists" :key="i">
            <v-card>
              <v-card-title primary-title>
                <span class="headline">{{ list.name }}</span>
              </v-card-title>
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
        name: "",
        order: 0,
        archived: false
      },
      notEmptyRules: [val => !!val || "Cannot be empty!"]
    };
  },

  mounted() {
    this.getBoard(this.$route.params.id).then(res => {
      this.board = res.data || res;
    });

    this.findLists({
      query: {
        boardId: this.$route.params.id
      }
    }).then(res => {
      const lists = res.data || res;
    });
  },

  methods: {
    ...mapActions("boards", { getBoard: "get" }),
    ...mapActions("lists", { findLists: "find" }),
    createList() {
      if (this.validList) {
        const { List } = this.$FeathersVuex;
        this.list.boardId = this.$route.params.id;
        const list = new List(this.list);
        list.save().then(() => {
          console.log("created");
        });
        this.list = {
          name: "",
          order: 0,
          archived: false
        };
      }
    }
  },

  computed: {
    ...mapState("boards", { loadingBoard: "isGetPending" }),
    ...mapState("lists", {
      loadingLists: "isFindPending",
      creatingList: "isCreatePending"
    }),
    ...mapGetters("lists", { findListsInStore: "find" }),
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id
        }
      }).data;
    }
  }
};
</script>
