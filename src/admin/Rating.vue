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
      <!-- <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left">
            <el-form-item label="Book ID">
              <span>{{ scope.row.book }}</span>
            </el-form-item>
            <el-form-item label="Id Rating">
              <span>{{ scope.row.id }}</span>
            </el-form-item>
            <el-form-item label="Rating Scores">
              <span>{{ scope.row.rating }}</span>
            </el-form-item>
            <el-form-item label="Id User">
              <span>{{ scope.row.user }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column prop="id" label="Rating ID" />
      <el-table-column prop="book.id" label="Book ID" />
      <el-table-column prop="book.title" label="Book Title" />
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
    <!-- <el-col :span="24">
      <el-pagination
        background
        layout="total,prev,pager,next"
        :page-size="5"
        :pager-count="5"
        :hide-on-single-page="value"
        @current-change="handleCurrentChange"
        :total="total"
        :current-page="pageNum"
      />
    </el-col> -->
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
  name: "Rating",
  data() {
    return {
      uri: "rating",
      // pageNum: 0,
      bean: [],
      total: 0,
      currentPage: 1,
      pagesize: 10,
    };
  },
  mounted() {
    // this.list(1);
    this.getRatings();
  },
  methods: {
    list(pageNum) {
      let url = this.uri + "?pageNum=" + pageNum;
      this.axios.get(url).then((response) => {
        this.bean = response.data.content;
        this.total = response.data.totalElements;
      });
    },
    getRatings() {
      let url = "http://localhost:8000/rating";
      this.axios.get(url).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        this.bean = response.data;
        this.total = response.data.length;
        // eslint-disable-next-line no-console
        console.log(this.bean);
      });
    },
    // handleCurrentChange(val) {
    //   this.pageNum = val;
    //   this.list(val);
    // },
    handleDeliver($index, row) {
      let url = this.uri + "/" + row.id;
      this.axios.put(url).then((response) => {
        if (0 != response.data.length) {
          this.handleCurrentChange(1);
        }
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
