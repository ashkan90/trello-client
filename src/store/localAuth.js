import router from "@/router";

const actions = {
  async login({ dispatch }, { valid, user }) {
    if (valid) {
      dispatch(
        "auth/authenticate",
        {
          strategy: "local",
          ...user
        },
        { root: true }
      )
        .then(() => router.push("/boards"))
        .catch(e => console.error("Auth error!..", e));
    }
  }
};

export default {
  namespaced: true,
  actions
};
