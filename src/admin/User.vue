<template>
  <div>
    <el-table
      :data="
        bean.slice(
          (this.currentPage - 1) * this.pagesize,
          (this.currentPage - 0) * this.pagesize
        )
      "
    >
      <el-table-column prop="id" label="User ID" />
      <el-table-column prop="username" label="Username" />
      <el-table-column prop="firstname" label="First Name" />
      <el-table-column prop="lastname" label="Last Name" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="date_joined" label="Date Joined" />
    </el-table>
    <div class="block">
      <!-- <span class="demonstration">All combined</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 200, 300, 400]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      uri: "users",
      bean: [],
      total: 0,
      currentPage: 1,
      pagesize: 10,
    };
  },

  created() {
    // this.list(1);
    this.getUsers();
  },

  methods: {
    list(pageNum) {
      let url = this.uri + "?pageNum=" + pageNum;
      this.axios.get(url).then((response) => {
        this.bean = response.data.content;
        this.total = response.data.totalElements;
      });
    },
    getUsers() {
      let url = "http://localhost:8000/user";
      // eslint-disable-next-line no-console
      console.log(url);
      this.axios.get("http://localhost:8000/user").then((response) => {
        this.bean = response.data;
        // eslint-disable-next-line no-console
        console.log(this.bean);
        this.total = this.bean.length;
      });
    },
    // handleCurrentChange(val) {
    //   this.pageNum = val;
    //   this.list(val);
    // },
    handleCurrentChange() {
      // eslint-disable-next-line no-console
      console.log(this.currentPage);
    },
  },
};
</script>

<style scoped></style>
