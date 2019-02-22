let OAuthContext = require('../../../dist').OAuthContext;
let expect       = require('chai').expect;
let config       = require("./helper").config;
let VerifyError  = require("../../../dist").VerifyError;
let AppConfig    = require("./helper").AppConfig;
let token        = require("./helper").token;

let authClient;

describe("OAuthContext - introspectToken()", () => {
    before(() => {
        authClient = new OAuthContext(config);
    })

    it("with token - chceks that response.uniqueSecurityName exists", () => {
        return authClient.introspectToken(token).then(response => {
            expect(response.response.uniqueSecurityName).to.exist;
        }).catch(error => {
            console.log(JSON.stringify(error));
            expect(error).to.not.exist;
        })
    })

    it("null token - should throw error 'Token parameter is not a valid token'", () => {
        return authClient.introspectToken(null).then(response => {
            expect(response).to.not.exist;
        }).catch(error => {
            expect(error.message).to.equal('Token parameter is not a valid token');
        })
    })

    it("invalid token (empty object) - should throw error 'Token parameter is not a valid token'", () => {
        return authClient.introspectToken({}).then(response => {
            expect(response).to.not.exist;
        }).catch(error => {
            expect(error.message).to.equal('Token parameter is not a valid token');
        })
    })
})
