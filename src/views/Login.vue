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
                        style="
                            position: relative;
                            left: 30px;
                            top: 7px;
                            float: left;
                            margin-bottom: 15px;
                        "
                        >sign up for a new account. </el-button
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
            baseUrl: "http://localhost:7438/api/",
            loginImg: "../assets/login.png",
            UserInfoData: {
                userName: "",
                userPass: "",
            },
        };
    },
    methods: {
        Login() {
            this.$axios({
                url: this.baseUrl + "Login",
                method: "post",
                data: this.UserInfoData,
            }).then((res) => {
                if (res.data == 0) {
                    window.sessionStorage.removeItem("token");
                    this.$message.warning("登录失败");
                } else {
                    //存储当前登录人的账号密码
                    window.sessionStorage["account"] =
                        this.UserInfoData.userName;
                    window.sessionStorage["password"] =
                        this.UserInfoData.userPass;
                    //存储token
                    window.sessionStorage.removeItem("token");
                    window.sessionStorage["token"] = "Bearer " + res.data;
                    this.$message.success("登录成功");
                    this.$router.push("Menu");
                }
                console.log(res.data);
            });
        },
        //---------------
    },
};
</script>

<style>
.father{
width:100%;
height:100%;
display:relative;
}
.son{
position:absolute;
top:0;
right:0;
bottom:0;
left:0;
margin:auto;
}
#home {
    width: 100%;
    height: 100vh;
    background: url("../assets/login.png") center center no-repeat;
    background-size: 100% 100%;
    position: fixed;
}
</style>