<template>
    <el-button type="success" @click="add">添加分类</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="排序" width="500" prop="sort">
      </el-table-column>
  
      <el-table-column label="分类名称" width="500" prop="cName">
      </el-table-column>
  
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
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
          url: "http://localhost:44328/api/app/point-services/point",
          method: "get",
        }).then((res) => {
          this.tableData = res.data;
        });
      },
      add() {
        this.$router.push("/Category_listingsAdd");
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
            alert(row.id)
            this.$axios({
              url: "https://localhost:44343/api/CategoryDelete",
              method: "delete",
              params: {
                id: row.id,
              },
            }).then((res) => {
              if (res.data !=null) {
                alert("删除成功");
                this.Show();
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
  
  