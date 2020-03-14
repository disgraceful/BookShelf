export default {
    data() {
        return {
            avaliableStatus: [
                "Not reading",
                "Reading",
                "2Read",
                "Finished",
                "Stopped"
            ]
            //   avaliableStatus: [
            //     { text: "Not reading", status: "not reading" },
            //     { text: "Reading", status: "reading" },
            //     { text: "2Read", status: "2read" },
            //     { text: "Finished", status: "finished" },
            //     { text: "Stopped", status: "stopped" }
            // ]
        }
    }, computed: {
        getAvaliableStatus() {
            return this.avaliableStatus.map(
                item => item.toLowerCase()
            );
        }

    }
}