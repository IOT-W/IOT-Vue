<template>
    <div v-if="tableData == ''">
        <el-empty description="No Data"></el-empty>
    </div>
    <div v-else>
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
            element-loading-text="Loading..." 
            @selection-change="handleSelectionChange"
            :cell-style="{ 'text-align': 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column width="60">
                <template #default="scope">
                    <img
                        :src="this.baseImgUrl + scope.row.img"
                        style="width: 50px; height: 50px"
                        alt=""
                    />
                </template>
            </el-table-column>
            <el-table-column label="商品名称">
                <template #default="scope">
                    <div
                        style="
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        "
                    >
                        {{ scope.row.title }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="颜色尺码">
                <template #default="scope">
                    <span>颜色：{{ scope.row.color }}</span
                    ><br />
                    <span>尺寸：{{ scope.row.size }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" />
            <el-table-column label="数量" width="110">
                <template #default="scope">
                    <el-input-number
                        size="mini"
                        style="width: 100px"
                        v-model="scope.row.num"
                        @change="UpdGwc(scope.row)"
                        :min="1"
                        :max="scope.row.sku"
                    />
                </template>
            </el-table-column>
            <el-table-column label="小计">
                <template #default="scope">
                    <span style="color: red"
                        >￥{{ scope.row.num * scope.row.price }}</span
                    >
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="mini" type="text">移入收藏夹</el-button>
                    <br />
                    <el-button
                        size="mini"
                        type="text"
                        @click="del(scope.row.sizeOrColorId)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
    <hr />
    <!-- 操作 -->
    <div>
        <span style="float: left">
            &emsp;
            <el-button size="mini" @click="OpenUrl('Index')" plain
                >继续购物</el-button
            >&emsp;
            <el-button size="mini" @click="EmptyAllGwc" plain
                >清空购物袋</el-button
            >&emsp;
            <el-button size="mini" @click="DelAll" plain>批量删除</el-button
            >&emsp;
        </span>
        <span style="float: right">
            <b style="font-size: 14px"
                >总计（不含运费）：<span
                    style="
                        color: red;
                        text-align: left;
                        display: inline-block;
                        width: 50px;
                    "
                    >￥{{ this.sum }}</span
                ></b
            >&emsp;&emsp;
            <el-button size="mini" @click="OpenUrl('JieShuan')" plain
                >去结算</el-button
            >&emsp;
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            baseUrl: "http://localhost:15882/api/",
            baseImgUrl: "http://localhost:15882/imgs/",
            tableData: [{}],
            loading: true,
            SelectId: "", //规格Id
            sum: 0,
        };
    },
    mounted() {
        this.GetAllGwc();
    },
    watch: {
        sum: {
            immediate: true,
            handler(newVal, oldVal) {
                console.log("监视到属性值的变化", newVal, oldVal);
            },
        },
    },
    methods: {
        //跳转页面
        OpenUrl(val) {
            this.$router.push(val);
        },
        //加载购物车
        GetAllGwc() {
            this.$axios({
                url: this.baseUrl + "GetRedis",
                method: "get",
            }).then((res) => {
                this.tableData = res.data;
                this.loading = false;
                console.log(res.data);
            });
        },
        //清空购物车
        EmptyAllGwc() {
            this.$axios({
                url: this.baseUrl + "EmptyRedis",
                method: "get",
            }).then(() => {
                this.GetAllGwc();
            });
        },
        //获取多选框ID
        handleSelectionChange(val) {
            var SelID = []; //规格Id
            this.sum = 0;
            val.forEach((element) => {
                SelID.push(element.sizeOrColorId); //规格Id放入数组
                this.sum += element.num * element.price;
            });
            this.SelectId = SelID.toString(); //转为string
            console.log(this.SelectId);
            console.log(this.SelectNumber);
        },
        //批量删除
        DelAll() {
            this.del(this.SelectId);
        },
        //删除
        del(id) {
            if (!confirm("确认删除购物车商品吗？")) {
                return;
            }

            this.$axios({
                url: this.baseUrl + "DelAllRedis?id=" + id,
                method: "get",
            }).then((res) => {
                if (res.data) {
                    this.$message.success("删除成功");
                    this.GetAllGwc();
                } else {
                    this.$message.warning("删除失败");
                }
            });
        },
        //修改购物车购买数量（num）
        UpdGwc(row) {
            this.$axios({
                url:
                    this.baseUrl +
                    "UpdRedis?id=" +
                    row.sizeOrColorId +
                    "&num=" +
                    row.num,
                method: "get",
            }).then(() => {
                this.GetAllGwc();
            });
        },
        //------
    },
};
</script>
