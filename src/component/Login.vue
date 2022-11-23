/* eslint-disable no-console */ /* eslint-disable no-console */ /*
eslint-disable no-console */
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
      <h3 class="title">Login</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="user.username"
          auto-complete="off"
          placeholder="Enter username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="user.password"
          auto-complete="off"
          placeholder="Enter password"
        />
      </el-form-item>
      <el-checkbox v-model="checked">Remember password</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%" @click="handleLogin"
          >Login</el-button
        >
      </el-form-item>
      <el-form-item
        ><el-button type="text" @click="$router.push('/register')"
          >Don't have an account yet? Click to register</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Username can not be empty"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter password"));
      } else {
        if (this.user.repeatPassword !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      uri: "/api/login",
      user: {
        username: "",
        password: "",
        id: 0,
        // repeatPassword: "",
      },
      checked: false,
      rules: {
        username: [{ validator: checkName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs["user"].validate((valid) => {
        if (valid) {
          this.axios
            .post(this.uri, {
              username: this.user.username,
              password: this.user.password,
            })
            .then(
              (response) => {
                if (response.status === 200) {
                  // eslint-disable-next-line no-console
                  // console.log(response.data);
                  this.user.id = response.data.id;

                  sessionStorage.setItem("user", JSON.stringify(this.user));
                  // eslint-disable-next-line no-console
                  console.log(JSON.parse(sessionStorage.user));
                  // sessionStorage.setItem("userid", response.data.id);
                  this.$message("login successful!");
                  // this.$router.push("/");
                  this.$router.push({
                    path: "/",
                    query: {
                      id: response.data.id,
                    },
                  });
                }
                // else {
                //   this.$alert("Incorrect username or password", "info", {
                //     confirmButtonText: "ok",
                //   });
                //   this.$refs["form"].resetFields();
                // }
              }
              // if (response.status === 400),
            )
            .catch(() => {
              this.$alert("Incorrect username or password", "info", {
                confirmButtonText: "ok",
              });
              this.$refs["form"].resetFields();
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
