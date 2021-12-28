global.fetch = require('node-fetch')
const AWSCognito = require('amazon-cognito-identity-js')

var getPool = async (poolId, clientId) => {
    return new AWSCognito.CognitoUserPool({
        UserPoolId: poolId,
        ClientId: clientId
    })
}

// attributes is an array of JSON objects - [{"name":"email", "value":"test_user@test.com"}]
var getAttrList = async (attributes) => {
    return new Promise((resolve, reject) => {
        try {
            let attributeList = []
            attributes.map((item) => {
                let attribute = {
                    Name: item.name,
                    Value: item.value
                }
                attributeList.push(new AWSCognito.CognitoUserAttribute(attribute))
            })
            resolve(attributeList)
        } catch (ex) {
            reject(ex)
        }
    })
}

var signIn = async (credentials, poolId, clientId, attributes) => {
    try{
        var userPool = await getPool(poolId, clientId)
        var attributeList = (attributes === undefined || attributes.length == 0) ? [] : await getAttrList(attributes)
        
        return new Promise((resolve,reject)=> {
            userPool.signUp(credentials.username, credentials.password, attributeList, null, function(err, result){
                if (err) {
                    reject(err || JSON.stringify(err))
                }
                else{
                    resolve(result)
                }
            })
        })
    }
    catch(ex){
        throw ex
    }

}

module.exports = {
    signIn
}