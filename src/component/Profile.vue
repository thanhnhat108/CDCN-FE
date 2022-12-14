<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="First name">
      <el-input v-model="form.firstname"></el-input>
    </el-form-item>
    <el-form-item label="Last name">
      <el-input v-model="form.lastname"></el-input>
    </el-form-item>
    <el-form-item label="Email Address">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Status">
      <el-input v-model="form.status"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
      <el-button @click="$router.go(-1)">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="js">
export default {
  name: "profile",
  data() {
    return {
      form: {
        username: "None",
        firstname: "None",
        lastname: "None",
        email: "None",
        status: "User",
      },
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(sessionStorage);
    // let id = this.$route.query.id;
    let id = JSON.parse(sessionStorage.user);
    id = id.id;
    // eslint-disable-next-line no-console
    console.log("id:", id);
    let url = "http://localhost:8000/user/" + id;
    // eslint-disable-next-line no-console
    console.log("url:", url);
    this.axios.get(url).then((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
      //   let result = response.data;
      //   this.form.username = result.username;
      this.form.username = response.data.username;
      this.form.firstname = response.data.first_name;
      this.form.lastname = response.data.last_name;
      this.form.email = response.data.email;
      if (response.data.is_staff) this.form.status = "Staff";
      // eslint-disable-next-line no-console
      console.log(this.form);
    });
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line no-console
      console.log("submit!");
    },
    handleCancel() {
      // this.$router.push("/");
    },
  },
};
</script>
