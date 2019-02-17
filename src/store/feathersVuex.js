import feathersVuex from "feathers-vuex";
import feathersClient from "../feathers-client";

const { auth, FeathersVuex, service } = feathersVuex(feathersClient, { idField: "_id" });

export default {
  auth,
  FeathersVuex,
  service
};
