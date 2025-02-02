<template>
    <div class="registration-page">
        <NavBar />
        <div class="content">
            <div class="r-title-container">
                <h2>Registration Form</h2>
                <h3>报名表</h3>
            </div>
            <div class="form-container">
                <div class="form-info">  <!-- Changed from <form-info> to <div> -->
                    <h4>McGill CSSA FALL 2024 FROSH Registration Form</h4>
                    <p>报名截止日期：周xx月xx日前</p>
                    <p>（这是一个简介区域）</p>
                    <div class="form-fields">
                        <label for="name">姓名 Name</label>
                        <input type="text" id="name" placeholder="Enter your name" />

                        <label for="email">邮箱</label>
                        <input type="email" id="email" placeholder="Enter your email" />

                        <label for="wechat">微信号</label>
                        <input type="text" id="wechat" placeholder="Enter your WeChat ID" />

                        <label>支付方式</label>
                        <div>
                            <input type="radio" id="etransfer" name="payment" value="etransfer" />
                            <label for="etransfer">E-TRANSFER TO bohan123456@hotmail.com</label>
                        </div>
                        <div>
                            <input type="radio" id="inperson" name="payment" value="inperson" />
                            <label for="inperson">当场付款</label>
                        </div>
                        <div>
                            <input type="radio" id="friends" name="payment" value="friends" />
                            <label for="friends">朋友代付</label>
                        </div>
                    </div>
                    <button type="submit" class="submit-button">提交 Submit</button>
                </div>
            </div>
            </div>
            <GradientStripe />
            <Footer />
        </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import GradientStripe from '../components/GradientStripe.vue';

export default {
    components: {
        NavBar,
        Footer,
        GradientStripe
    },
};
</script>

<style scoped>
.registration-page {
    display: flex;
    flex-direction: column;
    background-color: #3364BB;
    min-height: 150vh;
    width: 100%;
    position: relative;
}

.content {
    display: flex;
    flex: 1;
}

.r-title-container {
    position: absolute;
    top: 30%;
    left: 15%;
    transform: translate(-50%, -50%);
    width: 30vw;
    color: white;
    font-family: Raleway;
    text-align: center;
}

.form-container {
    background-color: #E3F4FF ;
    padding: 20px;
    margin-left: auto;
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.form-info {
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-fields {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.form-fields label {
    margin-top: 10px;
}

.submit-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;
}

.footer {
    z-index: 10000;
}
</style>
