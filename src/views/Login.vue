<template>
    <!-- 背景图 -->
    <div id="home">
        <div style="width: 100%; height: 100%">
            <div style="width: 60%; height: 700px; float: left">
                <label
                    style="
                        font-size: 30px;
                        color: #7590e7;
                        font-weight: 600;
                        float: left;
                        position: relative;
                        left: 20px;
                        top: 20px;
                    "
                    >BPM Manage System</label
                >
            </div>
            <div
                style="
                    border-radius: 25px;
                    margin-top: 240px;
                    margin-right: 120px;
                    background: rgba(255, 255, 255, 0.2);
                    float: right;
                    width: 27%;
                    height: auto;
                    text-align: left;
                "
            >
                <div style="margin-top: 15px">
                    <br />
                    <label
                        style="
                            font-size: 27px;
                            color: #ffffff;
                            position: relative;
                            left: 30px;
                        "
                        >Welcome To BPM Manage System !</label
                    ><br />
                    <label
                        style="
                            width: 100%;
                            font-size: 17px;
                            color: #b3b7be;
                            position: relative;
                            left: 30px;
                        "
                    >
                        Please entr your account and log in...</label
                    >
                </div>
                <div style="margin-top: 10px; width: 100%">
                    <label
                        style="
                            font-size: 16px;
                            position: relative;
                            color: #54e9ab;
                            left: 30px;
                            float: left;
                        "
                        >Account：Your name</label
                    ><br /><br />
                    <label
                        style="
                            font-size: 16px;
                            color: #54e9ab;
                            float: left;
                            position: relative;
                            bottom: 15px;
                            left: 30px;
                        "
                        >Password：The default password is ' '</label
                    ><br />
                </div>
                <div style="margin-top: 5px; margin-bottom: 15px">
                    <label
                        style="
                            position: relative;
                            left: 30px;
                            bottom: 5px;
                            color: #ffffff;
                        "
                        >Account</label
                    ><br />
                    <el-input
                        v-model="UserInfoData.userName"
                        size="large"
                        style="position: relative; left: 30px; width: 85%"
                        placeholder="Please input account"
                    >
                    </el-input
                    ><br /><br />
                    <label
                        style="
                            position: relative;
                            left: 30px;
                            bottom: 5px;
                            color: #ffffff;
                        "
                        >Password</label
                    ><br />
                    <el-input
                        v-model="UserInfoData.userPass"
                        type="password"
                        size="large"
                        style="position: relative; left: 30px; width: 85%"
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
            loginImg: "../assets/logo.png",
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
#home {
    width: 100%;
    height: 100vh;
    background: url("../assets/login.png") center center no-repeat;
    background-size: 100% 100%;
    position: fixed;
}
</style>