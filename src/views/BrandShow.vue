<template>
    <el-button type="success" @click="add">新建品牌</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="品牌名称" width="180" prop="bName">
      </el-table-column>
  
      <el-table-column label="品牌logo" width="180" prop="bImg">
      </el-table-column>
  
      <el-table-column label="品牌网站" width="180" prop="bSite">
      </el-table-column>
  
      <el-table-column label="品牌描述" width="180" prop="bDescribe">
      </el-table-column>
  
      <el-table-column label="排序" width="180" prop="bSort">
      </el-table-column>
  
      <el-table-column label="是否显示" width="180" prop="bType">
      </el-table-column>
  
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tableData: [],
      };
    },
    mounted() {
      this.Show();
    },
    methods: {
      Show() {
        this.$axios({
          url: "http://localhost:44328/api/app/brank-services/brad",
          method: "get",
        }).then((res) => {
          console.log(res.data);
          this.tableData = res.data;
        });
      },
      add() {
        this.$router.push("/BrandAdd");
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(row) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios({
              url: "http://localhost:44328/api/app/brank-services/dele-brad?guid="+row.Guid,
              method: "post",
             
            }).then((res) => {
              if (res.data !=null) {
                alert("删除成功");
                this.Show();
              }
              else{
                alert('删除失败')
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
    },
  };
  </script>
  
  