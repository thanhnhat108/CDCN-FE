<template>
  <div>
    <el-table
      :data="
        beans.slice(
          (this.currentPage - 1) * this.pagesize,
          (this.currentPage - 0) * this.pagesize
        )
      "
    >
      <el-table-column prop="book.id" label="Book ID" />
      <el-table-column prop="book.title" label="Book Title" />
      <el-table-column prop="book.genre[0].name" label="Book Genre" />
      <el-table-column prop="id" label="Rating ID" />
      <el-table-column prop="rating" label="Rating Scores" />
      <el-table-column prop="user.id" label="User ID" />
      <el-table-column prop="user.username" label="Username" />
      <!-- <el-table-column prop="recipient" label="recipient" /> -->
      <!-- <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-position"
            v-show="scope.row.status === 'waitDelivery'"
            @click="handleDeliver(scope.$index, scope.row)"
            >Ship
          </el-button>
        </template>
      </el-table-column> -->
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
  name: "MyRating",
  data() {
    return {
      uri: "/ratingbyuser",
      beans: [],
      total: 0,
      currentPage: 1,
      pagesize: 8,
    };
  },
  created() {
    this.getRatingByUserID(JSON.parse(sessionStorage.user).id);
  },
  watch: {
    $route() {
      // this.refresh();
      this.getRatingByUserID(JSON.parse(sessionStorage.user).id);
    },
  },
  methods: {
    refresh() {
      // let keyword = this.$route.query.keyword;
      // let url = this.uri + "?keyword=" + keyword;
      let url = "/book?offset=0&limit=10";
      this.axios
        .get(url, {
          title: this.$route.query.keyword,
          offset: 0,
          limit: 10,
        })
        .then((response) => {
          this.beans = response.data;
          // eslint-disable-next-line no-console
          console.log(response);
          // eslint-disable-next-line no-console
          console.log(response.data[0].genre[0].name);
        });
    },
    handleSkip(id) {
      this.$router.push({
        path: "/book",
        query: {
          id: id,
        },
      });
    },
    getRatingByUserID(id) {
      let url = "http://localhost:8000/ratingbyuser/" + id;
      this.axios.get(url).then((response) => {
        this.beans = response.data;
        // eslint-disable-next-line no-console
        console.log(this.beans);
        // eslint-disable-next-line no-console
        // console.log(response.data[0].genre[0].name);
        this.total = this.beans.length;
      });
    },
    handleCurrentChange() {
      // eslint-disable-next-line no-console
      console.log(this.currentPage);
    },
  },
};
</script>

<style scoped></style>
