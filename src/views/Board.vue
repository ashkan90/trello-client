<template>
  <div>
    <v-layout row>
      <v-flex xs9>
        <v-container fluid grid-list-lg>
          <v-slide-y-transition mode="out-in">
            <v-layout>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-progress-circular
                    v-if="loadingBoard || creatingList"
                    :size="70"
                    :width="7"
                    indeterminate
                    color="primary"
                  >
                  </v-progress-circular>
                  <v-flex xs12>
                    <h2 class="display-1">{{ board.name }}</h2>
                  </v-flex>
                  <v-flex sm3 v-for="(list, i) in lists" :key="i">
                    <single-list
                      :list="list"
                      :setDroppingList="onSetDroppingList"
                      :droppingList="droppingList"
                      :cardsByListId="cardsByListId"
                      :startDragingCard="startDragingCard"
                      :dropCard="dropCard"
                      :createActivity="createActivity"
                      :user="user"
                    ></single-list>
                  </v-flex>
                  <v-flex sm3>
                    <create-list :creatingList="creatingList" :createList="createList">
                    </create-list>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-slide-y-transition>
        </v-container>
      </v-flex>
      <v-flex xs3>
        <activities :activitiesByDate="activitiesByDate"></activities>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import CreateList from "@/components/CreateList";
import SingleList from "@/components/SingleList";
import Activities from "@/components/Activities";

export default {
  components: {
    CreateList,
    SingleList,
    Activities
  },
  data() {
    return {
      board: {}
    };
  },

  mounted() {
    this.getBoard(this.$route.params.id);

    this.findLists({
      query: {
        boardId: this.$route.params.id
      }
    });

    this.findCards({
      query: {
        boardId: this.$route.params.id
      }
    });

    this.findActivities({
      query: {
        boardId: this.$route.params.id
      }
    });
  },

  methods: {
    ...mapMutations("board", ["setDroppingList", "startDragingCard"]),
    ...mapActions("boards", { getBoard: "get" }),
    ...mapActions("lists", { findLists: "find" }),
    ...mapActions("cards", { findCards: "find" }),
    ...mapActions("activities", { findActivities: "find" }),
    async createList(list) {
      const { List } = this.$FeathersVuex;
      list.boardId = this.$route.params.id;
      const newList = new List(list);

      await newList.save();
      await this.createActivity(
        `<b>${this.user.displayname}</b> created list <b>${newList.name}</b>`
      );
    },
    async createActivity(text) {
      const { Activity } = this.$FeathersVuex;
      const activity = new Activity();
      activity.text = text;
      activity.userId = this.user._id;
      activity.boardId = this.$route.params.id;
      await activity.save();
    },

    startDragingCard(card) {
      this.setDraggingCard(card);
    },
    onSetDroppingList(event, list) {
      this.setDroppingList(list);
      event.preventDefault();
    },
    async dropCard() {
      if (this.droppingList) {
        if (this.draggingCard.listId !== this.droppingList._id) {
          const fromList = this.lists.find(list => list._id === this.draggingCard.listId);
          const toList = this.lists.find(list => list._id === this.droppingList._id);
          this.draggingCard.listId = this.droppingList._id;
          await this.draggingCard.save();
          await this.createActivity(
            `**${this.user.displayname}** moved card **${this.draggingCard.title}** from **${
              fromList.name
            }** to **${toList.name}**`
          );
        }
      }
      this.setDraggingCard(null);
      this.setDroppingList(null);
    }
  },

  computed: {
    ...mapState("", ["droppingList", "draggingCard"]),
    ...mapState("boards", {
      loadingBoard: "isGetPending",
      boardsError: "errorOnGet"
    }),
    ...mapState("lists", {
      loadingLists: "isFindPending",
      creatingList: "isCreatePending",
      listsError: "errorOnfind"
    }),
    ...mapGetters("lists", { findListsInStore: "find" }),
    ...mapState("cards", { cardsError: "errorOnfind" }),
    ...mapGetters("cards", { findCardsInStore: "find" }),
    ...mapGetters("users", { getUser: "get" }),
    ...mapGetters("users", { user: "current" }),
    ...mapGetters("activities", { findActivitiesInStore: "find" }),
    activities() {
      return this.findActivitiesInStore({
        query: {
          boardId: this.$route.params.id
        }
      }).data;
    },

    activityUser() {
      return this.getUser(this.user._id).displayname;
    },

    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id
        }
      }).data;
    },

    cards() {
      return this.findCardsInStore({
        query: {
          boardId: this.$route.params.id
        }
      }).data;
    },

    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || [];
        byId[card.listId].push(card);
        return byId;
      }, {});
    },

    activitiesByDate() {
      return this.activities.slice().reverse();
    }
  }
};
</script>
