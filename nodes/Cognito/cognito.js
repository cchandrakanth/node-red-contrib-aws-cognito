const Utils = require('../utils')
const CognitoUtils = require('./cognito_utils')

module.exports = function (RED) {
    function Cognito(config) {
        RED.nodes.createNode(this, config)
        this.name = config.name
        this.username = config.username
        this.password = config.password
        this.pool = config.pool
        this.client = config.client
        this.attributes = config.attributes
        var node = this

        this.on('input', async (msg) => {
            try {
                var credentails = {}
                credentails.username = node.username || msg.username
                credentails.password = node.password || msg.password
                var poolId = node.pool || msg.poolId
                var clientId = node.client || msg.clientId
                var attributes = JSON.parse(node.attributes || msg.attr)
                msg.payload = await CognitoUtils.signIn(credentails, poolId,clientId, attributes)
                node.send(msg)
                Utils.successStatus(node, `User created: ${msg.payload.user.getUsername()}`)
            } catch (e) {
                Utils.handleException(e.message, node, msg)
            }
        })

    }

    RED.nodes.registerType("cognito", Cognito)
}