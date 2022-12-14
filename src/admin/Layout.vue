<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <div>
          <img src="../assets/logo.png" width="55px" height="55px" />
        </div>
        <el-menu :default-active="1" router>
          <el-menu-item index="/admin">
            <i class="el-icon-menu" />
            <span slot="title">Category management</span>
          </el-menu-item>
          <el-menu-item index="/admin/product">
            <i class="el-icon-goods" />
            <span slot="title">Book management</span>
          </el-menu-item>
          <el-menu-item index="/admin/rating">
            <i class="el-icon-s-data" />
            <span slot="title">Rating management</span>
          </el-menu-item>
          <el-menu-item index="/admin/user">
            <i class="el-icon-user" />
            <span slot="title">User Management</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right">
          <el-link
            href=""
            type="primary"
            icon="el-icon-help"
            style="margin: 20px"
            >Github</el-link
          >
          <span>Hello Administrator</span>
          <el-dropdown>
            <i class="el-icon-setting" />
            <el-dropdown-menu>
              <el-dropdown-item @click.native="logout"
                >sign out</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <template>
            <router-view />
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Layout",
  created() {
    if (!sessionStorage.getItem("master")) {
      this.$router.push("/admin/login");
    }
  },
  methods: {
    logout() {
      this.$confirm("confirm exit?", {})
        .then(() => {
          sessionStorage.removeItem("master");
          this.$router.push("/admin/login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #e9eef3;
}
</style>
