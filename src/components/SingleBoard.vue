<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">{{ board.name }}</div>
    </v-card-title>
    <v-img :src="board.background" :lazy-src="board.background" height="300px"> </v-img>
    <v-card-actions>
      <v-btn color="primary" :to="{ name: 'board', params: { id: board._id } }">Go</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["board"]
};
</script>
