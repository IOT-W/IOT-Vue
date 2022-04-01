<template>
    <!-- 背景图 -->
    <div id="home">
        <div style="width: 100%; height: 100%" class="father">
            <div
                class="son"
                style="
                    border-radius: 25px;
                    background: rgba(27, 33, 43, 0.2);
                    width: 460px;
                    height: 225px;
                    text-align: left;
                "
            >
                <div style="margin-top: 20px; margin-bottom: 15px">
                    <label
                        style="
                            position: relative;
                            width: 90px;
                            left: 30px;
                            bottom: 5px;
                            color: #ffffff;
                            text-align: left;
                            display: inline-block;
                        "
                        >Account：</label
                    >
                    <el-input
                        v-model="UserInfoData.userName"
                        size="large"
                        style="position: relative; left: 30px; width: 300px"
                        placeholder="Please input account"
                    >
                    </el-input
                    ><br /><br />
                    <label
                        style="
                            position: relative;
                            width: 90px;
                            left: 30px;
                            bottom: 5px;
                            color: #ffffff;
                            text-align: left;
                            display: inline-block;
                        "
                        >Password：</label
                    >
                    <el-input
                        v-model="UserInfoData.userPass"
                        type="password"
                        size="large"
                        style="position: relative; left: 30px; width: 300px"
                        placeholder="Please input password"
                    >
                    </el-input
                    ><br /><br />
                    <el-button
                        type="primary"
                        @click="Login"
                        size="large"
                        style="width: 85%; margin-left: 30px"
                        >Login
                    </el-button>
                    <label
                        style="
                            font-size: 14px;
                            color: #909399;
                            float: left;
                            margin-top: 15px;
                            margin-left: 30px;
                            margin-right: -25px;
                        "
                        >No account? You can
                    </label>
                    <el-button
                        type="text"
                        @click="JumpToAlipayLogin"
                        style="
                            position: relative;
                            left: 30px;
                            top: 7px;
                            float: left;
                            margin-bottom: 15px;
                        "
                        >Log in using Alipay. </el-button
                    ><br /><br /><br />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginImg: "../assets/login.png",
            UserInfoData: {
                userName: "",
                userPass: "",
            },
        };
    },
    methods: {
        //跳转到支付宝登录
        JumpToAlipayLogin() {
            location.href =
                "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021003125650409&scope=auth_user&redirect_uri=http://www.iotvue.xyz/Menu";
        },
        //登录
        Login() {
            this.$axios({
                url: "http://www.iotabp.top/api/Login",
                method: "get",
                params: {
                    name: this.UserInfoData.userName,
                    pwd: this.UserInfoData.userPass,
                },
            }).then((res) => {
                console.log(res.data);
                if (res.data != "") {
                    this.$router.push({
                        name: "Menu",
                        query: {
                            avatar: res.data.login_avatar,
                            nick_name: res.data.login_name,
                        },
                    });
                    this.$message.success("登录成功");
                } else {
                    this.$message.warning("登录失败");
                }
            });
        },
        //---------------
    },
};
</script>

<style>
.father {
    width: 100%;
    height: 100%;
    display: relative;
}

.son {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}

#home {
    width: 100%;
    height: 100vh;
    background: url("../assets/login.png") center center no-repeat;
    background-size: 100% 100%;
    position: fixed;
}
</style>