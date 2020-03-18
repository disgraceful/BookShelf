import { ServiceFactory } from "../services/serviceFactory";
const userService = ServiceFactory.get("user");
export default {
    data() {
        return {
            avaliableStatus: [
                { text: "Not reading", status: "not reading", handler: this.removeBook },
                { text: "Reading", status: "reading", handler: this.addToUserCollection },
                { text: "2Read", status: "2read", handler: this.addToUserCollection },
                { text: "Finished", status: "finished", handler: this.activateFinish },
                { text: "Stopped", status: "stopped", handler: this.addToUserCollection }
            ]
        }
    },
    methods: {
        getStatusHandler(status) {
            const res = this.avaliableStatus.find(item => item.status === status);
            if (res) return res.handler;
            else return null;
        },

        isLegitStatus(status) {
            return this.avaliableStatus.some(item => item.status === status);
        },

        handleCollection(status) {
            console.log(status);
            const statusHandler = this.getStatusHandler(status);
            console.log(statusHandler);
            if (!statusHandler) return;
            statusHandler(status);
        },

        async removeBook(status) {
            if (this.book.userData.status === status) return;
            try {
                const result = await userService.removeFromUserCollection(this.user.token, this.book.id);
                console.log(result);
                if (result) this.book.userData = result.userData;
            } catch (error) {
                console.log(error);
                this.error = error.body;
            }
        },

        async addToUserCollection(status) {
            if (!this.isLegitStatus(status) || this.book.userData.status === status) return;
            try {
                const result = await userService.addToUserCollection(this.user.token, this.book, status);
                console.log(result);
                this.book.userData.status = result.userData.status;
            } catch (error) {
                console.log(error);
                this.error = error.body;
            }
        },

        activateFinish() {
            this.finishDialog = true;
        },

        async finishBook(eventBook) {
            try {
                this.finishDialog = false;
                this.book = eventBook;
                this.book.userData.pagesRead = this.book.pages;
                return await this.addToUserCollection("finished");
            } catch (error) {
                console.log(error);
                this.error = error.body;
            }
        }
    },

}