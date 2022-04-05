<template>
    <!-- 菜单 -->
    <div style="width: 100%; height: 100%; margin: 0px">
        <el-container>
            <!-- 头部 -->
            <el-header
                style="width: 100%; height: 8vh; background-color: #545c64"
            >
                <div style="margin-left: 20px; float: left; height: 8vh">
                    <br />
                    <el-avatar :size="50" :src="this.userInfo.avatar" />
                    &nbsp;
                    <label
                        style="
                            color: rgb(43, 233, 91);
                            position: relative;
                            bottom: 20px;
                        "
                    >
                        {{ this.userInfo.nick_name }}
                    </label>
                </div>
                <br />
                <label style="font-size: 30px; color: #ffffff; top: 2vh">
                    电商管理后台
                </label>
            </el-header>
            <!-- 内容 -->
            <el-container>
                <el-aside
                    width="250px"
                    style="background-color: #545c64; color: #fff"
                >
                <!-- 菜单 -->
                    <el-menu
                        style="height: 92vh; width: 250px"
                        :unique-opened="true"
                        active-text-color="#ffd04b"
                        background-color="#545c64"
                        text-color="#fff"
                        :default-openeds="['1']"
                    >
                        <el-sub-menu index="1">
                            <template #title> 品牌管理 </template>
                            <el-menu-item
                                index="1-1"
                                @click="Goto('BrandShow')"
                                >品牌展示</el-menu-item
                            >
                            <el-menu-item
                                index="1-2"
                                @click="Goto('BrandAdd')"
                                >新建品牌</el-menu-item
                            >
                           
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title> 商品管理 </template>
                            <el-menu-item
                                index="2-1"
                                @click="Goto('AssetsApply')"
                                >资产申请</el-menu-item
                            >
                            <el-menu-item
                                index="2-2"
                                @click="Goto('AssetsaddApply')"
                                >资产添加</el-menu-item
                            >
                            <el-menu-item
                                index="2-3"
                                @click="Goto('Fixedassets')"
                                >固定资产</el-menu-item
                            >
                            <el-menu-item
                                index="2-4"
                                @click="Goto('MeetingnewApply')"
                                >会议新增</el-menu-item
                            >
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title> 其他管理 </template>
                            <el-menu-item
                                index="3-1"
                                @click="Goto('Announcementmanagement')"
                                >公告管理</el-menu-item
                            >
                            <el-menu-item index="3-2" @click="Goto('')"
                                >年假管理</el-menu-item
                            >
                            <el-menu-item
                                index="3-3"
                                @click="Goto('Maintenancemanagement')"
                                >维护管理</el-menu-item
                            >
                        </el-sub-menu>
                        <el-sub-menu index="4">
                            <template #title> 分类管理 </template>
                            <el-menu-item
                                index="4-1"
                                @click="Goto('ClassifyShow')"
                                >分类列表</el-menu-item
                            >
                            <el-menu-item index="4-2" @click="Goto('')"
                                >添加分类</el-menu-item
                            >
                            <el-menu-item
                                index="4-3"
                                @click="Goto('Maintenancemanagement')"
                                >维护管理</el-menu-item
                            >
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <!-- 显示页面 -->
                <el-main style="width: 100%; height: 100%">
                    <!-- 占位符--点击加载之后的页面 -->
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rCode: "",
            authCode: "",
            asotr: {},
            userInfo: {},
            firstName: "",
            lastName: "",
            login: {
                Login_userid: "", // 支付宝用户id
                Login_account: "", // 用户账号
                Login_pwd: "", //用户密码
                Login_name: "", //支付宝名称
                Login_avatar: "", //用户头像
                Login_state: 1, //状态
            },
        };
    },
    mounted() {
        this.userInfo.avatar = this.$route.query.avatar;
        this.userInfo.nick_name = this.$route.query.nick_name;
        if (this.$route.query.auth_code != undefined) {
            this.RequestUserCode();
        }
    },
    methods: {
        //跳转页面
        Goto(val) {
            this.$router.push(val);
        },
        //授权获取信息
        RequestUserCode() {
            this.$axios({
                url: "http://www.iotabp.top/api/app/login/request-user-code",
                method: "post",
                params: {
                    rCode: this.$route.query.auth_code,
                },
            }).then((r) => {
                console.log(r);
                this.asotr = r.data.alipay_system_oauth_token_response;
                this.RequestAlipayUserInfo();
            });
        },
        //根据授权获取用户信息
        RequestAlipayUserInfo() {
            this.$axios({
                url: "http://www.iotabp.top/api/app/login/user-info",
                method: "get",
                params: {
                    authCode: this.asotr.access_token,
                },
            }).then((r) => {
                console.log(r);
                this.userInfo = r.data.alipay_user_info_share_response;
                if (this.userInfo.nick_name == undefined) {
                    this.userInfo.nick_name = "无昵称";
                    console.log(this.userInfo);
                }
                this.firstName = this.userInfo.nick_name.substr(0, 1);
                this.lastName = this.userInfo.nick_name.substr(1);
                this.QueryExistUser();
            });
        },
        //查询账户是否存在
        QueryExistUser() {
            this.$axios({
                url: "http://www.iotabp.top/api/ExistUser",
                method: "get",
                params: {
                    userid: this.userInfo.user_id,
                },
            }).then((r) => {
                if (r.data == 1) {
                    this.$message.success("登录成功");
                } else if (r.data == 0) {
                    //赋值
                    this.login.Login_userid = this.userInfo.user_id;
                    this.login.Login_account = this.userInfo.user_id;
                    this.login.Login_pwd = "123456";
                    this.login.Login_name = this.userInfo.nick_name;
                    this.login.Login_avatar = this.userInfo.avatar;
                    //注册账户
                    this.$axios({
                        url: "http://www.iotabp.top/api/AddLogin",
                        method: "post",
                        data: this.login,
                    }).then((r) => {
                        if (r.data == 1) {
                            this.$message.success(
                                "当前用户为新用户，已为您自动创建账户"
                            );
                            setTimeout(() => {
                                this.$message.success(
                                    "创建的默认账户为：" +
                                        this.login.Login_account +
                                        ",默认密码为：123456"
                                );
                            }, 10);
                        }
                    });
                }
            });
        },
        //---------------
    },
};
</script>