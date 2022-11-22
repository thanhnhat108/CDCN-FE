<template>
  <el-row style="margin-bottom: 20px">
    <div>
      <el-col :span="24" style="background: #545e6a">
        <div style="text-align: right">
          <el-dropdown
            v-if="loginStatus"
            trigger="click"
            style="margin-right: 20px"
          >
            <!-- <span style="color: #409eff"></span> -->
            <!-- <el-button type="text" @click="backhome()">Home</el-button> -->
            <el-button type="text"
              >Hello {{ username }}
              <el-dropdown-menu>
                <el-dropdown-item @click.native="handleViewProfile"
                  >My Profile</el-dropdown-item
                >
                <el-dropdown-item @click.native="handleRating"
                  >My Rating</el-dropdown-item
                >
                <el-dropdown-item @click.native="logout"
                  >Log out</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-button>
          </el-dropdown>
          <el-button type="text" @click="handleSkip" v-else
            >Login/Register</el-button
          >
          <!-- <el-button type="text">Personal Center</el-button>
          <el-button type="text">Shopping Center</el-button>
          <el-button type="text">Customer Care</el-button>
          <el-button type="text">Download App</el-button> -->
        </div>
      </el-col>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      loginStatus: sessionStorage.getItem("user"),
      username: "",
      id: 0,
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(sessionStorage.getItem("user"));
    this.username = JSON.parse(sessionStorage.user).username;
    this.id = this.$route.query.id;
  },
  methods: {
    handleSkip() {
      this.$router.push("/login");
    },
    handleViewProfile() {
      // let id = sessionStorage.getItem()
      // id =
      this.$router.push({
        path: "/user",
        query: {
          id: this.id,
        },
      });
    },
    backhome() {
      this.$router.push("/");
    },
    handleRating() {
      // let id = sessionStorage.getItem()
      // id =
      this.$router.push({
        path: "/ratingbyuser",
        query: {
          id: this.id,
        },
      });
    },
    logout() {
      this.$confirm("Do you want to logout?", {})
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.go(0);
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped></style>
