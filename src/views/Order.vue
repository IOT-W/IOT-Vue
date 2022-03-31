<template>
    <div>
        <el-table
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="order_Type" label="下单类型" width="180" />
            <el-table-column
                prop="order_Members"
                label="下单会员"
                width="180"
            />
            <el-table-column
                prop="order_Consignee"
                label="收货人"
                width="180"
            />
            <el-table-column prop="order_State" label="订单状态" width="180" />
            <el-table-column prop="order_PayWay" label="支付方式" width="180" />
            <el-table-column
                prop="order_AfterState"
                label="售后状态"
                width="180"
            />
            <el-table-column prop="order_Number" label="商品数量" width="180" />
            <el-table-column
                prop="order_TotalMoney"
                label="总金额"
                width="180"
            />
            <el-table-column
                prop="order_CopeMoney"
                label="应付金额"
                width="180"
            />
            <el-table-column
                prop="order_DateTime"
                label="下单时间"
                width="180"
            />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                        size="small"
                        type="danger"
                        @click="Delete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Order: [{}],
        };
    },
    created() {
        this.show();
    },
    methods: {
        show() {
            this.$axios({
                url: "",
                method: "get",
            }).then((res) => {
                this.Order = res.data;
            });
        },
        Delete() {
            this.$axios({
                url: "",
                method: "post",
            }).then((res) => {
                if (res.data > 0) {
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
            });
        },
    },
};
</script>
