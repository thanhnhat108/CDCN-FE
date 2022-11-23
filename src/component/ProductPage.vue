<template>
  <div>
    <el-row :gutter="40" style="text-align: center">
      <el-col span="6" :offset="2">
        <el-image
          :src="bean.photourl"
          lazy="true"
          fit="fill"
          style="height: 368px; width: 260px"
        />
      </el-col>
      <el-col span="15">
        <el-descriptions title="Book Details" :column="1" border>
          <el-descriptions-item
            label="ID"
            label-class-name="my-label"
            content-class-name="my-content"
            >{{ this.bean.id }}</el-descriptions-item
          >
          <el-descriptions-item label="Title">{{
            this.bean.title
          }}</el-descriptions-item>
          <el-descriptions-item label="Genre">{{
            this.bean.genre[0].name
          }}</el-descriptions-item>

          <el-descriptions-item label="Average Rating">
            <!-- <el-tag size="small">School</el-tag> -->
            <el-rate
              v-model="value"
              :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
              show-text
              show-score
              text-color="#ff9900"
              score-template="{value} points"
              disabled
            >
            </el-rate>
          </el-descriptions-item>
          <el-descriptions-item label="Rating Count">{{
            this.ratingCount
          }}</el-descriptions-item>
          <el-descriptions-item label="My Rating">
            <!-- <el-tag size="small">School</el-tag> -->
            <el-rate
              v-model="myvalue"
              :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
              show-text
              show-score
              text-color="#ff9900"
              score-template="{value} points"
              @change="updateRating()"
            >
            </el-rate>
          </el-descriptions-item>

          <!-- <el-descriptions-item
            label="Address"
            :content-style="{ 'text-align': 'right' }"
            >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
            Province</el-descriptions-item
          > -->
        </el-descriptions>
        <div span="3"></div>
        <el-button @click="$router.go(-1)">Cancel</el-button>
        <el-row> </el-row>
      </el-col>
    </el-row>
    <!-- <el-row style="text-align: center; margin-top: 50px">
      <el-col span="12" :offset="6">
        <el-collapse>
          <el-collapse-item title="Comment" style="text-align: left">
            <template slot="title">
              <i class="el-icon-copy-document" />{{ bean.reviewCount }}Review
              Count
            </template>
            <el-card v-for="item in review" :key="item.key">
              <el-tag>{{ item.user.name }}</el-tag>
              <p>{{ item.content }}</p>
              <el-tag type="info" style="text-align: right">{{
                item.createTime | formatDate
              }}</el-tag>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { formatDate } from "../store/formatDate";
// import StarRating from "vue-star-rating";
export default {
  name: "ProductPage",
  components: {
    // StarRating,
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  data() {
    return {
      uri: "http://localhost:8000/book?id=",
      bean: [],
      review: [],
      num: 1,
      activeNames: ["1"],
      value: 3.7,
      myvalue: 0,
      ratingCount: 0,
      isRated: false,
      id: 0,
      idRating: 0,
    };
  },
  created() {
    this.id = this.$route.query.id;
    // eslint-disable-next-line no-console
    // console.log("id:", id);
    let url = this.uri + this.id;
    // eslint-disable-next-line no-console
    // console.log("url:", url);
    this.axios.get(url).then((response) => {
      let result = response.data;
      this.bean = result[0];
      // eslint-disable-next-line no-console
      // console.log(this.bean);
    });
    // call api to get avg rating
    try {

      url = "http://localhost:8000/ratingavg/" + this.id;
      // eslint-disable-next-line no-console
      // console.log("url:", url);
      this.axios.get(url).then((response) => {
        let result = response.data;
        this.value = result[0].avg_rating.toFixed(1);
        this.ratingCount = result[0].rating_count;
        // this.bean = result[0];
        // eslint-disable-next-line no-console
        // console.log(this.value, this.ratingCount);
      });
      //Call api get user rating
      let user = sessionStorage.user;
      // eslint-disable-next-line no-console
      console.log(JSON.parse(user).id);
      url =
        "http://localhost:8000/ratingbyuserbook/" +
        JSON.parse(user).id +
        "/" +
        this.id;
    } catch(error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    // url = "http://localhost:8000/rating/" + this.idRating
    // eslint-disable-next-line no-console
    console.log(url);
    try {
      this.axios.get(url).then((response) => {
        let result = response.data;
        this.myvalue = result[0].rating;
        // eslint-disable-next-line no-console
        console.log(this.myvalue);
        this.isRated = true;
        this.idRating = result[0].id;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  methods: {
    updateRating() {
      if (!this.isRated) {
        //create new rating
        let url = "http://localhost:8000/rating";
        this.axios
          .post(url, {
            user: JSON.parse(sessionStorage.user).id,
            book: this.id,
            rating: this.myvalue,
          })
          .then((response) => {
            let result = response.data;
            this.myvalue = result[0].rating;
            // eslint-disable-next-line no-console
            console.log(this.myvalue);
            this.isRated = true;
          });
      } else {
        // update rating
        // let url =
        //   "http://localhost:8000/ratingbyuserbook/" +
        //   JSON.parse(sessionStorage.user).id +
        //   "/" +
        //   this.id;
        let url = "http://localhost:8000/rating/" + this.idRating;
        // eslint-disable-next-line no-console
        console.log(url);
        // eslint-disable-next-line no-console
        console.log("id rating:", this.idRating);
        let newrating = {
          rating: parseInt(this.myvalue),
        };
        // eslint-disable-next-line no-console
        // console.log(newrating);
        this.axios.patch(url, newrating);
        // .then((response) => {
        //   let result = response.data;
        //   this.myvalue = result[0].rating;
        //   // eslint-disable-next-line no-console
        //   console.log(this.myvalue);
        //   this.isRated = true;
        // });
      }
      // this.myvalue = value;
      // eslint-disable-next-line no-console
      console.log(this.myvalue);
      // return this.myvalue;
    },
    handleBuy() {
      if (!sessionStorage.getItem("user")) {
        this.$router.push("/login");
      } else {
        let pid = this.bean.id;
        let url = "buy?pid=" + pid + "&num=" + this.num;
        this.axios.get(url).then((response) => {
          let oiid = response.data;
          this.$router.push({
            path: "/confirm",
            query: {
              oiid: oiid,
            },
          });
        });
      }
    },
    handleAdd() {
      if (!sessionStorage.getItem("user")) {
        this.$router.push("/login");
      }
      let pid = this.bean.id;
      let url = "addCart?pid=" + pid + "&num=" + this.num;
      this.axios.get(url).then((response) => {
        let result = response.data;
        if (200 == result.code) {
          this.$message("Added to cart");
        }
      });
    },
  },
};
</script>

<style scoped>
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
</style>
