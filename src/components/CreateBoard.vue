<template>
  <v-flex sm3>
    <v-card>
      <v-card-title class="column">
        <div class="headline">Create new Board</div>
        <div>
          <v-form
            v-if="!creating"
            v-model="valid"
            @submit.prevent="onCreate"
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
</template>

<script>
import { notEmptyRules } from "@/validators";

export default {
  props: ["creating", "createBoard"],
  data() {
    return {
      valid: false,
      board: {
        name: "",
        background: ""
      },
      notEmptyRules
    };
  },

  methods: {
    async onCreate() {
      if (this.valid) {
        await this.createBoard(this.board);
        this.board = {
          name: "",
          background: ""
        };
      }
    }
  }
};
</script>
