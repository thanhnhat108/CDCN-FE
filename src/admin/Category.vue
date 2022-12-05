<template>
  <div>
    <div>
      <el-dialog
        title="CategoryEdit"
        :visible.sync="dialogFormVisible"
        center
        width="20%"
      >
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-tag v-model="form.id" v-show="false" />
          </el-form-item>
          <el-form-item label="Category pictures">
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
                Only jpg/png files can be uploaded, and no more than 500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="Category Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAdd">Sure</el-button>
          <el-button @click="handleCancel">Cancel</el-button>
        </div>
      </el-dialog>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        style="margin-bottom: 30px"
        @click="handleOpen"
        >Add category
      </el-button>
    </div>
    <div>
      <el-table :data="category">
        <el-table-column prop="id" label="Category ID" />
        <el-table-column prop="name" label="Category Name" />
        <el-table-column prop="image" label="Category pictures">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.image"
              fit="fill"
            />
          </template>
        </el-table-column>
        <el-table-column label="operate">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >edit
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-col :span="24">
        <el-pagination
          background
          layout="total,prev,pager,next"
          :page-size="5"
          :pager-count="5"
          @current-change="handleCurrentChange"
          :total="total"
          :current-page="pageNum"
        />
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      uri: "genre",
      total: 0,
      pageNum: 0,
      category: [],
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
      },
      fileList: [],
    };
  },

  created() {
    // this.list(1);
    this.getCategory();
  },

  methods: {
    list(pageNum) {
      let url = this.uri + "?pageNum=" + pageNum;
      this.axios.get(url).then((response) => {
        this.category = response.data.content;
        this.total = response.data.totalElements;
      });
    },
    getCategory() {
      let url = this.uri;
      this.axios.get(url).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        this.category = response.data;
        this.total = this.category.length;
        // console.log();
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.list(val);
    },
    handleOpen() {
      this.form.id = "";
      this.form.name = "";
      this.fileList = [];
      this.dialogFormVisible = true;
    },
    handleEdit($index, row) {
      this.form = row;
      this.fileList = [];
      this.dialogFormVisible = true;
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
    },
    handleAdd() {
      let formData = new FormData();
      formData.append("name", this.form.name);
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
          this.category.splice($index, 1);
          this.handleCurrentChange(1);
        }
      });
    },
  },
};
</script>

<style scoped></style>
