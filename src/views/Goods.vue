<template>
  <div>
    商品名称:<el-input v-model="Name" style="width: 200px" />&nbsp;&nbsp;&nbsp;
    分类:<el-input
      v-model="Classification"
      style="width: 200px"
    />&nbsp;&nbsp;&nbsp; 销售价:<el-input
      v-model="SalePrice"
      style="width: 200px"
    /><br /><br />
    市场价:<el-input
      v-model="MarketPrice"
      style="width: 200px"
    />&nbsp;&nbsp;&nbsp; 库存:<el-input
      v-model="Sku"
      style="width: 200px"
    />&nbsp;&nbsp;&nbsp; 上架:<el-input
      v-model="Shelves"
      style="width: 200px"
    /><br /><br />
    类型:<el-input v-model="Type" style="width: 200px" />&nbsp;&nbsp;&nbsp;
    商品编码:<el-input v-model="Id" style="width: 200px" />&nbsp;&nbsp;&nbsp;

    <el-button type="primary" @click="show">查询</el-button>

    <el-table
      ref="multipleTableRef"
      :data="Goods"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="goods_Name" label="商品名称" />
      <el-table-column property="goods_Classification" label="分类" />
      <el-table-column property="goods_SalePrice" label="销售价" />
      <el-table-column property="goods_MarketPrice" label="市场价" />
      <el-table-column property="goods_Sku" label="库存" />
      <el-table-column property="goods_Shelves" label="上架" />
      <el-table-column property="goods_Type" label="类型" />
      <el-table-column property="id" label="商品编码" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button type="text" @click="Delete(scope.row.id)">删除</el-button>
          <el-button type="text" @click="Update(scope.$index)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->

    <el-button type="text" @click="dialogTableVisible = true"
      >open a Table nested Dialog</el-button
    >

    <el-dialog v-model="dialogTableVisible" title="Shipping address">
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Goods: [{}],
      Name: "",
      Classification: "",
      SalePrice: "",
      MarketPrice: "",
      Sku: "",
      Shelves: 1,
      Type: "",
      Id: "",
      AddGoods: {
        goods_Img: "",
        goods_Name: "",
        goods_Classification: "",
        goods_SalePrice: "",
        goods_MarketPrice: "",
        goods_Sku: "",
        goods_Shelves: 0,
        goods_Type: "",
        goods_Coding: "1",
      },
      dialogTableVisible: false,
    };
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      this.$axios({
        url: "http://localhost:44328/api/app/goods-services/book",
        method: "get",
        params: {
          Goods_Name: this.Name,
          Goods_Classification: this.Classification,
          Goods_SalePrice: this.SalePrice,
          Goods_MarketPrice: this.MarketPrice,
          Goods_Sku: this.Sku,
          Goods_Shelves: this.Shelves,
          Goods_Type: this.Type,
          Goods_Coding: this.Id,
        },
      }).then((res) => {
        this.Goods = res.data;
      });
    },
    Delete(id) {
      this.$axios({
        url: "http://localhost:44328/api/GoodsDel?id=" + id,
        method: "get",
      }).then((res) => {
        if (res.data > 0) {
          alert("删除失败");
        } else {
          alert("删除成功");
          this.show();
        }
      });
    },
    dialogFormVisible: {},
  },
};
</script>
