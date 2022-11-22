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
  </div>
</template>

<script>
export default {
  name: "productPage",
  data() {
    return {
      uri: "/book",
      beans: [],
      total: 0,
      currentPage: 1,
      pagesize: 8,
    };
  },
  created() {
    this.refresh();
  },
  watch: {
    $route() {
      this.refresh();
    },
  },
  methods: {
    refresh() {
      let keyword = this.$route.query.keyword;
      // eslint-disable-next-line no-console
      console.log(keyword);
      // let url = this.uri + "?keyword=" + keyword;
      let url = `/book?title=${this.$route.query.keyword}`;
      this.axios.get(url).then((response) => {
        this.beans = response.data;
        // eslint-disable-next-line no-console
        console.log(this.beans);
        this.total = this.beans.length;
        // eslint-disable-next-line no-console
        console.log(response.data[0].genre[0].name);
      });
    },
    handleCurrentChange() {
      // eslint-disable-next-line no-console
      console.log(this.currentPage);
    },
    handleSkip(id) {
      this.$router.push({
        path: "/book",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
.grid-content { border-radius: 4px; height: 42px; }
<style scoped></style>
