<template>
  <v-layout v-if="userObj" row slot="header" align-center>
    <v-flex sm5 md3 hidden-xs-only>
      <strong v-text="userObj.username" class="pr-4"></strong>
    </v-flex>
    <v-flex xs4 sm2 md1>
      <v-avatar>
        <v-img :src="userObj.imageurl" :lazy.src="userObj.imageurl" alt="alt"> </v-img>
      </v-avatar>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["userObj"]
};
</script>
