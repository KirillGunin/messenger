<template>
    <div class="wrapper-content">
        <div class="login" v-if="state.username == '' || state.username == null">
            <form class="login-form" @submit.prevent="login">
                <p class="title">Login to firechat</p>
                <input type="text" v-model="inputUserName" placeholder="name">
                <input type="submit" value="login">
            </form>
        </div>
        <div class="chat" v-else>
            <h2>Chat Vue</h2>
            <div class="user-controls">
                <p class="user-controls__item">Welcome, {{ state.username }}.</p>
                <button class="btn user-controls__item" @click.prevent="logout">Logout</button>
            </div>
            <div class="chat-content">
                <div class="message-list">
                    <div
                        v-for="message in state.messages"
                        :key="message.id"
                        :class="(message.username == state.username ? 'message-item current-user' : 'message-item')"
                    >
                        <p class="message-item__username">{{ message.username }}</p>
                        <p class="message-item__content">{{ message.content }}</p>
                    </div>
                </div>
                <div class="footer">
                    <form @submit.prevent="sendMessage" class="chat-content-form">
                        <input class="chat-content-form-item__input" type="text" v-model="inputUserMessages" placeholder="write a message">
                        <input class="chat-content-form-item__submit" type="submit" value="send">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, onMounted, ref} from 'vue';
import db from '../db';
export default {
    setup () {
        const inputUserName = ref('')
        const inputUserMessages = ref('')
        const state = reactive({
            username: '',
            messages: []
        })
        const login = () => {
            if(inputUserName.value != '' || inputUserName.value != null) {
                 state.username = inputUserName.value,
                 inputUserName.value = ''
            }
        }
        const logout = () => {
            state.username = ''
        }
        const sendMessage = () => {
            const messagesRef = db.database().ref('messages')
            if(inputUserMessages.value == '' || inputUserMessages.value == null) {
                return;
            }
            const message = {
                username: state.username,
                content: inputUserMessages.value 
            }
            messagesRef.push(message)
            inputUserMessages.value = ''
        }
        onMounted(() => {
            const messagesRef = db.database().ref('messages')

            messagesRef.on('value', payload => {
                const data = payload.val()
                let messages = []
                
                Object.keys(data).forEach(key => {
                    messages.push({
                        id: key,
                        username: data[key].username,
                        content: data[key].content
                    })
                })

                state.messages = messages 
            })
        })
        return {
            inputUserName,
            login,
            state,
            logout,
            inputUserMessages,
            sendMessage
        }
    }
}
</script>

<style lang="scss">
.login {
    margin: 0 auto;
}
.login-form {
    max-width: 500px;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0px 0px 10px 2px #dcdfe6;
    .title {
        text-align: center;
    }
}

.user-controls{
    display: flex;
    margin: 10px 0;
    justify-content: space-between;
    align-items: center;
}
.btn:hover {
    background: #e6dff6;
}
.chat-content {
    height: 500px;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px #dcdfe6;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .message-list {
        max-height: 100%;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }
    
    &-form {
        display: flex;
        height: 50px;
        &-item {
            &__input {
                margin: 0;
                padding: 0 16px;
                border-radius: 10px 0 0 10px;
            }
            &__submit { 
                width: 20%;
                margin: 0;
                padding: 0;
                border-radius: 0 10px 10px 0;
            }
        }
    }
}
.message-item {
    padding: 5px;
    &__username {
        font-size: 10px;
        margin: 5px;
    }
    &__content {
        width: min-content;
        background: #DCDFE6;
        border-radius: 15px;
        padding: 5px;
    }
    &.current-user {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
}
</style>