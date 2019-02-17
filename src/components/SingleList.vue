<template>
  <v-card
    @dragover="setDroppingList($event, list)"
    :class="{ 'green lighten-4': droppingList == list }"
  >
    <v-card-title primary-title>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="headline">{{ list.name }}</div>
          <v-list v-if="cardsByListId[list._id]">
            <v-list-tile v-for="card in cardsByListId[list._id]" :key="card._id">
              <v-list-tile-content
                draggable="true"
                @dragstart="startDragingCard(card)"
                @dragend="dropCard()"
              >
                <v-list-tile-title v-html="card.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <create-card
        :user="user"
        :createActivity="createActivity"
        :listId="list._id"
        :boardId="$route.params.id"
      ></create-card>
    </v-card-actions>
  </v-card>
</template>

<script>
import CreateCard from "@/components/CreateCard";

export default {
  props: [
    "list",
    "setDroppingList",
    "droppingList",
    "cardsByListId",
    "startDragingCard",
    "dropCard",
    "createActivity",
    "user"
  ],
  components: {
    CreateCard
  }
};
</script>
