<template>
  <div>
    <div>
      <el-dialog
        title="Edit item"
        :visible.sync="dialogFormVisible"
        center
        width="20%"
      >
        <el-form ref="form" :model="form" size="mini">
          <el-form-item>
            <el-tag v-model="form.id" v-show="false" />
          </el-form-item>
          <!-- <el-form-item label="Cover picture">
            <el-upload
              action=""
              auto-upload="false"
              :http-request="handleFile"
              :multiple="false"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">Click to upload</el-button>
              <div slot="tip" class="el-upload__tip">
                upload only jpg/png Only files can be uploaded and no more than
                500kb
              </div>
            </el-upload>
          </el-form-item> -->
          <el-form-item label="Title">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="Genre">
            <!-- <el-input v-model="form.author" /> -->
            <el-select v-model="form.genre" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="price">
            <el-input v-model="form.price" />
          </el-form-item>
          <el-form-item label="Discount">
            <el-input v-model="form.discount" />
          </el-form-item>
          <el-form-item label="the publisher">
            <el-input v-model="form.publisher" />
          </el-form-item>
          <el-form-item label="in stock">
            <el-input v-model="form.stock" />
          </el-form-item>
          <el-form-item label="Category ID">
            <el-input v-model="form.cid" />
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAdd">Sure</el-button>
          <el-button @click="handleCancel">Cancel</el-button>
        </div>
      </el-dialog>
      <el-select
        v-model="value"
        filterable
        @change="handleSelect"
        clearable
        @clear="handleBack"
        placeholder="Choose category"
        style="margin-bottom: 30px"
      >
        <el-option
          v-for="item in this.form.genre"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="handleOpen"
        >Adding goods
      </el-button>
    </div>
    <div>
      <el-table
        :data="
          bean.slice(
            (this.currentPage - 1) * this.pagesize,
            (this.currentPage - 0) * this.pagesize
          )
        "
      >
        <el-table-column prop="id" label="Book ID" />
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="genre[0].name" label="Category">
          <!-- <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.image"
              fit="fill"
            />
          </template> -->
        </el-table-column>
        <!-- <el-table-column prop="author" label="author" />
        <el-table-column prop="price" label="price" />
        <el-table-column prop="discount" label="Discount Information" />
        <el-table-column prop="publisher" label="the publisher" />
        <el-table-column prop="stock" label="in stock" /> -->
        <el-table-column label="operate">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >
            </el-button>
          </template>
        </el-table-column>
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
  </div>
</template>

<script>
export default {
  name: "Product",

  data() {
    return {
      uri: "products",
      total: 0,
      currentPage: 1,
      pagesize: 10,
      bean: [],
      options: [],
      category: [],
      value: "",
      dialogFormVisible: false,
      form: {
        // id: "",
        // name: "",
        // price: "",
        // author: "",
        // publisher: "",
        // discount: "",
        // stock: "",
        // cid: "",
        id: 0,
        title: "",
        genre: [],
      },
      fileList: [],
    };
  },

  mounted() {
    // this.list(1);
    // this.axios.get("category").then((response) => {
    //   this.options = response.data;
    // });
    this.getBooks();
  },

  methods: {
    list(pageNum) {
      let url = this.uri + "?pageNum=" + pageNum;
      this.axios.get(url).then((response) => {
        this.bean = response.data.content;
        this.total = response.data.totalElements;
      });
    },
    getBooks() {
      let url = "book";
      this.axios.get(url).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        this.bean = response.data;
        this.total = this.bean.length;
        // eslint-disable-next-line no-console
        console.log(this.bean);
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
    handleSizeChange() {},
    handleSelect(id) {
      let url = "categories/" + id + "/products" + "?pageNum=" + this.pageNum;
      this.axios.get(url).then((response) => {
        this.bean = response.data.content;
        this.total = response.data.totalElements;
      });
    },
    handleBack() {
      this.list(1);
    },
    handleOpen() {
      // this.form.id = "";
      // this.form.name = "";
      // this.form.price = "";
      // this.form.author = "";
      // this.form.publisher = "";
      // this.form.discount = "";
      // this.form.stock = "";
      // this.form.cid = "";
      this.form.title = this.fileList = [];
      this.dialogFormVisible = true;
    },
    handleEdit($index, row) {
      // eslint-disable-next-line no-console
      console.log(row);
      this.form.id = row.id;
      this.form.title = row.title;
      this.form.genre = JSON.parse(JSON.stringify(row.genre));
      this.fileList = [];
      this.dialogFormVisible = true;
      // eslint-disable-next-line no-console
      console.log(this.form.genre);
    },
    handleFile(response) {
      this.fileList.push(response.file);
    },
    // eslint-disable-next-line no-unused-vars
    handleExceed(files) {
      this.$message.warning(`Upload up to ${files.length} files`);
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.$ref["form"].resetFields();
      this.list(1);
    },
    handleAdd() {
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("price", this.form.price);
      formData.append("author", this.form.author);
      formData.append("publisher", this.form.publisher);
      formData.append("discount", this.form.discount);
      formData.append("stock", this.form.stock);
      formData.append("cid", this.form.cid);
      formData.append("file", this.fileList[0]);
      if (this.form.id === "") {
        this.axios.post(this.uri, formData).then((response) => {
          if (0 != response.data.length) {
            this.dialogFormVisible = false;
            this.handleCurrentChange(1);
          }
        });
      } else {
        let url = this.uri + "/" + this.form.id;
        this.axios.put(url, formData).then((response) => {
          if (0 != response.data.length) {
            this.dialogFormVisible = false;
            this.handleCurrentChange(1);
          }
        });
      }
    },
    handleDelete($index, row) {
      let url = this.uri + "/" + row.id;
      this.axios.delete(url).then((response) => {
        if (0 === response.data.length) {
          this.bean.splice($index, 1);
          this.handleCurrentChange(1);
        }
      });
    },
    getCategory() {
      let url = "http://localhost:8000/genre";
      this.axios.get(url).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        this.options = response.data;
        this.total = length(this.options);
        // console.log();
      });
    },
  },
};
</script>

<style scoped></style>
