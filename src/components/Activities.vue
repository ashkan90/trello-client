<template>
  <v-navigation-drawer absolute clipped right floating class=" grey lighten-3">
    <div class="ma-2">
      <h2 class="display-1">Activities</h2>
    </div>
    <v-list two-line>
      <template v-for="activity in activitiesByDate">
        <v-list-tile avatar :key="activity._id" @click="">
          <v-list-tile-action>
            <v-icon color="green">local_activity</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <!--v-list-tile-title v-text="activityUser"></v-list-tile-title-->
            <v-tooltip bottom>
              <template #activator="data">
                <v-list-tile-sub-title
                  v-on="data.on"
                  v-html="activity.text"
                ></v-list-tile-sub-title>
              </template>
              <span v-html="activity.text"></span>
            </v-tooltip>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["activitiesByDate"]
};
</script>
