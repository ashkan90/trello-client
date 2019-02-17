<template>
  <v-card>
    <v-card-title class="column">
      <div class="headline">Create new List</div>
      <div>
        <v-form
          v-if="!creatingList"
          v-model="validList"
          @submit.prevent="onCreate"
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
</template>

<script>
import { notEmptyRules } from "@/validators";

export default {
  props: ["creatingList", "createList"],
  data() {
    return {
      validList: false,
      list: {
        name: "",
        order: 0,
        archived: false
      },
      notEmptyRules
    };
  },

  methods: {
    async onCreate() {
      if (this.validList) {
        await this.createList(this.list);
        this.list = await {
          name: "",
          order: 0,
          archived: false
        };
      }
    }
  }
};
</script>
