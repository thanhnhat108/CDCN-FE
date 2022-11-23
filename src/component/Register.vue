<template>
  <div>
    <el-form
      :model="user"
      ref="user"
      rules="rules"
      label-position="left"
      label-width="0px"
      class="page"
    >
      <h3 class="title">Register new user</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="user.name"
          auto-complete="off"
          placeholder="your username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="text"
          v-model="user.password"
          auto-complete="off"
          placeholder="your password"
        />
      </el-form-item>

      <el-form-item prop="password2">
        <el-input
          type="password"
          v-model="user.repeatPassword"
          auto-complete="off"
          placeholder="repeat your password"
        />
      </el-form-item>
      <el-checkbox v-model="checked">remember password</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%" @click="handleRegistry"
          >Register</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Username must not be empty"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Password must not be empty"));
      } else {
        if (this.user.repeatPassword !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Repeat Password must not be empty"));
      } else if (value !== this.user.password) {
        callback(new Error("Password & Repeat password must be the same!"));
      } else {
        callback();
      }
    };
    return {
      uri: "/api/register",
      user: {
        username: "",
        password: "",
        // repeatPassword: "",
      },
      checked: false,
      rules: {
        username: [{ validator: checkName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repeatPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleRegistry() {
      this.$refs["user"].validate((valid) => {
        if (valid) {
          this.axios
            .post(this.uri, {
              username: this.user.name,
              password: this.user.password,
            })
            .then((response) => {
              if (response.data === "Register oke") {
                this.$message("Register successfully");
                this.$router.push("/login");
              } else {
                this.$alert("Username exist，change your username", "info", {
                  confirmButtonText: "ok",
                });
                this.$refs["form"].resetFields();
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.page {
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
