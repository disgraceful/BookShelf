export default {
    computed: {
        lgScreen() {
            return this.$mq === 'lg';
        },
        mdScreen() {
            return this.$mq === 'md';
        },
        smScreen() {
            return this.$mq === 'sm';
        },
        xsScreen() {
            return this.$mq === 'xs';
        }
    }
}