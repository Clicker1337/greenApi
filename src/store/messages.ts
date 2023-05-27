import {action, makeAutoObservable} from "mobx"
import {IMessage} from "../other/interfaces/IMessage"

class Messages {
    messages: IMessage[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addMessage = action((msg: IMessage) => {
        const hasDuplicate = this.messages.some((item) => item.id === msg.id);

        if (!hasDuplicate) {
            this.messages.push(msg)
        }
    })
}

export default new Messages