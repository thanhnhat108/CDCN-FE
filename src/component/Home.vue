<template>
  <div>
    <div>
      <el-alert v-if="beans == ''" title="nothing" type="error"> </el-alert>
      <el-row
        style="text-align: center; margin-left: 10%; margin-right: 10%"
        :gutter="20"
      >
        <el-col
          v-for="item in beans.slice(
            (this.currentPage - 1) * this.pagesize,
            (this.currentPage - 0) * this.pagesize
          )"
          :key="item.id"
          :span="6"
          style="margin-top: 30px"
        >
          <div class="grid-content">
            <el-card
              :body-style="{ padding: '0px' }"
              style="width: 195px"
              shadow="hover"
              @click.native="handleSkip(item.id)"
            >
              <img :src="item.photourl" style="height: 276px; width: 195px" />
              <div style="text-align: center">
                <p style="font-size: 10px">{{ item.title }}</p>
                <!-- <p style="color: #9d9d9d; font-size: 15px">Genre:</p>
              <p style="color: #fb4e44; font-size: 15px">ID: {{ item.id }}</p> -->
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <div class="block" span="6" gutter="10" align="middle">
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
  </div>
</template>

<script>
// import NavBar from "./NavBar";
export default {
  name: "Home",
  data() {
    return {
      beans: [],
      total: 0,
      currentPage: 1,
      pagesize: 8,
      pics: [
        { url: require("https://img4.thuthuatphanmem.vn/uploads/2020/12/26/anh-cuon-sach-mo-ra-trong-thu-vien_051456791.jpg") },
        { url: require("https://img4.thuthuatphanmem.vn/uploads/2020/12/26/anh-cuon-sach-mo-ra-trong-thu-vien_051456791.jpg") },
        { url: require("https://img4.thuthuatphanmem.vn/uploads/2020/12/26/anh-cuon-sach-mo-ra-trong-thu-vien_051456791.jpg") },
        { url: require("https://img4.thuthuatphanmem.vn/uploads/2020/12/26/anh-cuon-sach-mo-ra-trong-thu-vien_051456791.jpg") },
        { url: require("https://img4.thuthuatphanmem.vn/uploads/2020/12/26/anh-cuon-sach-mo-ra-trong-thu-vien_051456791.jpg") },
      ],
    };
  },
  created() {
    // this.getCategory();
    this.refresh();
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    getCategory() {
      try {
        let url =
          "http://localhost:8000/recommend/" +
          JSON.parse(sessionStorage.user).id;
        this.axios.get(url).then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          // this.category = response.data;
          // this.total = length(this.category);
          // console.log();
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    handleSkip(id) {
      this.$router.push({
        path: "/book",
        query: {
          id: id,
        },
      });
    },
    refresh() {
      try {
        let url =
          "http://localhost:8000/recommend/" +
          JSON.parse(sessionStorage.user).id;
        this.axios.get(url).then((response) => {
          // eslint-disable-next-line no-console
          // console.log(response);
          this.beans = response.data;
          // eslint-disable-next-line no-console
          console.log(this.beans);
          this.total = this.beans.length;
          // eslint-disable-next-line no-console
          console.log(this.beans[0].genre[0].name);
          // eslint-disable-next-line no-console
          console.log(this.beans.length);
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        // console.log(error);
        let keyword = this.$route.query.keyword;
        let url = this.uri + "?keyword=" + keyword;
        url = "/book?offset=0&limit=10";
        this.axios
          .get(url, {
            title: "",
            offset: 0,
            limit: 10,
          })
          .then((response) => {
            this.beans = response.data;
            // eslint-disable-next-line no-console
            console.log(this.beans);
            this.total = this.beans.length;
            // eslint-disable-next-line no-console
            console.log(response.data[0].genre[0].name);
          });
      }
    },
  },
  // components: { NavBar },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
