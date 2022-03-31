<template>
    <div>
        <el-avatar :size="50" :src="this.userInfo.avatar" />
        <label>{{ this.userInfo.nick_name }}</label>
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
        };
    },
    mounted() {
        this.RequestUserCode();
    },
    methods: {
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
        QueryExistUser() {},
        //---------------
    },
};
</script>