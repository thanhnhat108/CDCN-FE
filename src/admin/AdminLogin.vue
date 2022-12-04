/* eslint-disable no-console */ /* eslint-disable no-console */
<template>
  <div class="login-container">
    <el-form
      :model="master"
      ref="loginInfo"
      label-position="left"
      label-width="0px"
      class="login-page"
    >
      <h3 class="title">system login</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="master.name"
          auto-complete="off"
          placeholder="username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="master.password"
          auto-complete="off"
          placeholder="password"
        />
      </el-form-item>
      <el-checkbox v-model="checked">remember password</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%" @click="adminLogin"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      master: {
        name: "",
        password: "",
      },
      checked: false,
    };
  },
  methods: {
    adminLogin() {
      this.axios
        .post("/api/login", {
          username: this.master.name,
          password: this.master.password,
        })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          if (response.status === 200) {
            sessionStorage.setItem("master", this.master.name);
            this.$router.push({ path: "/admin" });
          } else {
            this.$alert("Incorrect username or password", "info", {
              confirmButtonText: "ok",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
