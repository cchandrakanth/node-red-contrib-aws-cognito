const clearStatus = (node) => {
    node.status({})
}

const successStatus = (node, message) => {
    node.status({
        fill: "green",
        shape: "dot",
        text: message
    });
}

const infoStatus = (node, message) => {
    node.status({
        fill: "blue",
        shape: "ring",
        text: message
    });
}

const warningStatus = (node, message) => {
    node.status({
        fill: "yellow",
        shape: "dot",
        text: message
    });
}

const errorStatus = (node, message) => {
    node.status({
        fill: "red",
        shape: "dot",
        text: message
    });
}

const handleException = (errMsg, node, msg) => {

    node.status({
        fill: "red",
        shape: "ring",
        text: errMsg
    });
    node.error(errMsg, msg)
}

module.exports = {
    clearStatus,
    successStatus,
    errorStatus,
    infoStatus,
    warningStatus,
    handleException
}
