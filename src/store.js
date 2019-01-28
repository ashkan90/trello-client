import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const { auth, FeathersVuex, service } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  plugins: [
    service('users', {
      instanceDefaults: {
      	username: '',
  	  	password: '',
  	  	displayName: '',
  	  	imageUrl: '',
      },
    }),
  	auth({ userService: 'users' }),
  ],
});
