<template>
  <el-row style="text-align: center">
    <el-col :span="12" :offset="6">
      <el-divider></el-divider>
      <el-tag>Powered by</el-tag>
      <!-- <el-tag type="info" style="margin-left: 20px"
        >Reference documentation</el-tag
      > -->
      <el-link style="margin-left: 20px" :underline="false" href=""
        >Python</el-link
      >
      <el-divider direction="vertical"></el-divider>
      <el-link :underline="false" href="">Django</el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link :underline="false" href="https://cn.vuejs.org/index.html"
        >Vue</el-link
      >
      <el-divider direction="vertical"></el-divider>
      <el-link :underline="false" href="https://element.eleme.cn/#/zh-CN"
        >Element</el-link
      >
      <el-divider direction="vertical"></el-divider>
      <el-link :underline="false" href="">Github</el-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped></style>
