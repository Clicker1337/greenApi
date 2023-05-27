import axios from "axios";
import {makeAutoObservable} from "mobx";
import {IMessage} from "../other/interfaces/IMessage";
import Api from '../other/endPoints/Api';

export interface IChatHistory {
    chatId: string;
    count: number;
}

export interface ISendMessage {
    message: string;
}

export interface INotification {
    receiptId: number;
    body: {
        typeWebhook: string;
        timestamp: number;
        chatId: string;
        messageData: {
            typeMessage: string;
            textMessageData: {
                textMessage: string;
            }
            extendedTextMessageData: {
                text: string;
            }
        }
        senderData: {
            chatId: string;
        }
    };
}

export default class greenApiService {
    idInstance = '';
    apiTokenInstance = '';
    isAuth = false;
    chatId = '';

    constructor() {
        makeAutoObservable(this);
    }

    setIdInstance(idInstance: string) {
        this.idInstance = idInstance;
    }

    setApiToken(apiTokenInstance: string) {
        this.apiTokenInstance = apiTokenInstance;
    }

    setAuth() {
        this.isAuth = !this.isAuth;
    }

    setChatId(id: string) {
        this.chatId = id + '@c.us';
    }

    async fetchChatHistory({count}: IChatHistory) {
        const data = await axios.post<IMessage[]>(
            Api.HOST + Api.WA_INSTANCE + this.idInstance + Api.CHAT_HISTORY + this.apiTokenInstance,
            {
                chatId: this.chatId,
                count,
            },
        );
        return data;
    }

    async fetchSendMessage({message}: ISendMessage) {
        const data = await axios.post(
            Api.HOST + Api.WA_INSTANCE + this.idInstance + Api.SEND_MESSAGES + this.apiTokenInstance, 
            {
                chatId: this.chatId,
                message,
            },
        );
        return data;
    }

    async fetchGetNotification() {
        try {
            const response = await axios.get<INotification>(
                Api.HOST + Api.WA_INSTANCE + this.idInstance + Api.GET_NOTIFICATION + this.apiTokenInstance)

            if (response.data && response.data.receiptId) {
                await axios.delete(Api.HOST + Api.WA_INSTANCE + this.idInstance + Api.DELETE_NOTIFICATION + this.apiTokenInstance + '/' + response.data.receiptId);
            }

            return response.data;
        } catch (error) {
            console.error('Ошибка при получении уведомления', error);
        }
    }
}