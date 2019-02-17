<template>
  <v-flex sm12>
    <v-card>
      <v-card-title class="column justify-center text-xs-center">
        <div class="headline">Create new Card</div>
        <div>
          <v-form
            v-if="!creatingCard"
            v-model="validCard"
            @submit.prevent="createCard"
            @keydown.prevent.enter
          >
            <v-text-field
              label="Title"
              v-model="card.title"
              :rules="notEmptyRules"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!validCard">Create Card</v-btn>
          </v-form>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["listId", "boardId", "createActivity", "user"],
  data() {
    return {
      board: {},
      validCard: false,
      creatingCard: false,
      card: {
        title: "",
        members: []
      },
      notEmptyRules: [val => !!val || "Cannot be empty!"]
    };
  },

  methods: {
    async createCard() {
      if (this.validCard) {
        const { Card } = this.$FeathersVuex;

        this.card.boardId = this.boardId;
        this.card.listId = this.listId;

        const card = new Card(this.card);
        this.creatingCard = true;
        await card.save();
        this.creatingCard = false;

        this.card = {
          title: "",
          members: []
        };

        await this.createActivity(`**${this.user.displayname}** created card **${card.title}**`);
      }
    }
  }
};
</script>
