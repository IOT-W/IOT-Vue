<template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="品牌名称:">
        <el-input v-model="form.bName" />
      </el-form-item>
      <el-form-item label="品牌网址:">
        <el-input v-model="form.bSite" />
      </el-form-item>
      <el-form-item label="品牌Logo:">
        <el-input v-model="form.bImg" />
      </el-form-item>
      <el-form-item label="品牌描述:">
        <el-input v-model="form.bDescribe" type="textarea" />
      </el-form-item>
      <el-form-item label="排序:">
        <el-input v-model="form.bSort" type="textarea" />
      </el-form-item>
      <el-form-item label="是否显示:">
        <el-radio-group v-model="form.bType">
          <el-radio label="是" />
          <el-radio label="否" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="BrabdAdd">保存</el-button>
      </el-form-item>
    </el-form>
  </template>
  <script>
  export default {
    data() {
      return {
        form: {
            bName: "",
            bSite: "",
            bImg: "",
            bDescribe: "",
            bSort: "",
            bType: "",
        },
      };
    },
    mounted() {
      this.BrabdAdd();
    },
    methods: {
      BrabdAdd() {
        this.$axios({
          url: "http://localhost:44328/api/app/brank-services/brank",
          method: "post",
          data: this.form,
        }).then((res) => {
          if (res.data > 0) {
            alert("添加成功");
            this.$router.push("/BrandShow");
          } else {
            alert("添加失败");
          }
        });
      },
    },
  };
  </script>
  