"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _config=require("./config"),_Errors=require("./errors/Errors"),_utils=_interopRequireDefault(require("./helpers/utils"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var AUTHENTICATOR_CONTEXT_ERROR=_config.AppConfig.AUTHENTICATOR_CONTEXT_ERROR,DEFAULT_POLLING_DELAY=_config.AppConfig.DEFAULT_POLLING_DELAY,DEFAULT_POLLING_ATTEMPTS=_config.AppConfig.DEFAULT_POLLING_ATTEMPTS,FLOW_TYPE={implicitFlow:"implicit",authorizationCodeFlow:"authorization",deviceFlow:"device",ROPC:"ropc"},AuthenticatorContext=/*#__PURE__*/function(){function a(b){if(_classCallCheck(this,a),!b)throw new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"Oauth parameter is required");this.oauth=b,this.config=this.oauth.getConfig(),this.config.flowType===FLOW_TYPE.implicitFlow&&(this.token=this._fetchToken())}return _createClass(a,[{key:"_fetchToken",value:function _fetchToken(){return this.oauth.fetchToken()}},{key:"_isAuthenticated",value:function _isAuthenticated(a){return this.oauth.isAuthenticated(a)}},{key:"_handleResponse",value:function _handleResponse(a,b){return this.oauth.handleResponse(a,b)}/**
	 * The Authenticator object provides properties and methods to view
	 * device information and remove methods
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"authenticators",value:function authenticators(a){var b=a||this.token;if(!b)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"token is a required parameter"));var c="".concat(this.config.tenantUrl,"/v1.0/authenticators");return this._handleResponse({method:"GET",url:c},b)}/**
	 * @function initiateAuthenticator
	 * Initiates a new authenticator that the client can or enter manually using a mobile device.
	 * This method returns base64 encoded data representing a QR code.
	 * @param {object} dataObj containing a user friendly name for the registration.
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"initiateAuthenticator",value:function initiateAuthenticator(a,b){if(2>arguments.length&&this.config.flowType!==FLOW_TYPE.implicitFlow)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"initiateAuthenticator(dataObj, token), 2 parameters are required "+arguments.length+" were given"));if(!a)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"dataObj cannot be null"));var c={},d="?qrcodeInResponse=",e="".concat(this.config.tenantUrl,"/v1.0/authenticators/initiation");a.hasOwnProperty("qrcodeInResponse")&&!0===a.qrcodeInResponse&&(d="".concat(d,"true"),e="".concat(e).concat(d),c.accept="image/png");var f=b||this.token;return c={method:"POST",url:e,data:{owner:a.owner||null,clientId:this.config.registrationProfileId,accountName:a.accountName||"Default Account"}},this._handleResponse(c,f)}/**
	 * @function createVerification function creates a transaction and sends a push notification to the associated authenticator.
	 * @param {string} authenticatorId Creates a new verification for the registered authenticator.
	 * @param {object} formData  a JSON payload that specifies the verification transaction data
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"createVerification",value:function createVerification(a,b,c){if(3>arguments.length&&this.config.flowType!==FLOW_TYPE.implicitFlow)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"createVerification(authenticatorId, formData, token), 3 parameters are required "+arguments.length+" were given"));if(!b)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"formData is a required parameter"));var d=c||this.token,e="".concat(this.config.tenantUrl,"/v1.0/authenticators/").concat(a,"/verifications"),f={transactionData:{message:b.txMessage||" ",originIpAddress:b.originIpAddress||" ",originUserAgent:b.originUserAgent||" ",additionalData:b.txAdditionalData},pushNotification:{title:b.title||" ",send:b.send,message:b.pushMessage||" "},authenticationMethods:[{id:b.methodId,methodType:"signature"}],logic:"OR",expiresIn:b.expires||120};return this._handleResponse({method:"POST",url:e,data:f},d)}/**
	 * @function viewVerifications Retrieve the list of verification transactions.
	 * @param {string} authenticatorId The authenticator registration identifier.
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"viewVerifications",value:function viewVerifications(a,b){if(2>arguments.length&&this.config.flowType!==FLOW_TYPE.implicitFlow)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"viewVerifications(authenticatorId, token), 2 parameters are required "+arguments.length+" were given"));var c=b||this.token,d="".concat(this.config.tenantUrl,"/v1.0/authenticators/").concat(a,"/verifications");return this._handleResponse({method:"GET",url:d},c)}/**
	 * @function viewVerification Retrieve a specific verification transaction that is associated with an authenticator registration.
	 * @param {string} authenticatorId The authenticator registration identifier.
	 * @param {string} transactionId The verification transaction identifier.
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"viewVerification",value:function viewVerification(a,b,c){if(3>arguments.length&&this.config.flowType!==FLOW_TYPE.implicitFlow)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"viewVerification(authenticatorId, transactionId, token), 3 parameters are required "+arguments.length+" were given"));var d=c||this.token,e="".concat(this.config.tenantUrl,"/v1.0/authenticators/").concat(a,"/verifications/").concat(b);return this._handleResponse({method:"GET",url:e},d)}/**
	 * @function pollVerification recursive function that polls a given transaction id for a state change
	 * @param {string} authenticatorId authenticator id
	 * @param {object} transactionId transaction id
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 * @param {object} delay delay between polls
	 * @param {object} attempts how many times to poll
	 */},{key:"pollVerification",value:function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c,d,e,f){var g,h,i,j,k;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:g=d,h=f||DEFAULT_POLLING_ATTEMPTS,i=e||DEFAULT_POLLING_DELAY,j=!1;case 4:if(!(0<h)){a.next=22;break}return a.prev=5,a.next=8,this.viewVerification(b,c,d);case 8:if(k=a.sent,k.token&&(j=!0,g=k.token),"PENDING"===k.response.state&&"SENDING"===k.response.state){a.next=12;break}return a.abrupt("return",Promise.resolve({state:k.response.state,token:j?g:null}));case 12:return a.next=14,_utils.default.sleep(i);case 14:a.next=19;break;case 16:return a.prev=16,a.t0=a["catch"](5),a.abrupt("return",Promise.reject(a.t0));case 19:h--,a.next=4;break;case 22:return a.abrupt("return",Promise.reject(new _Errors.VerifyError("number of polling attempts exceeded")));case 23:case"end":return a.stop();}},a,this,[[5,16]])}));return function pollVerification(){return a.apply(this,arguments)}}()/**
	 * @function enabled function to update attributes of a specific authenticator registration for
	 * IBM Verify instances or custom mobile authenticators that are built from the IBM Verify SDK.
	 * @param {string} authenticatorId Id of authenticated device
	 * @param {boolean} enabled boolean to enable/disable enrolled method
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"enabled",value:function enabled(a,b,c){if(3>arguments.length&&this.config.flowType!==FLOW_TYPE.implicitFlow)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"enabled(authenticatorId, enabled, token), 3 parameters are required "+arguments.length+" were given"));var d=c||this.token,e="".concat(this.config.tenantUrl,"/v1.0/authenticators/").concat(a);return this._handleResponse({method:"PATCH",url:e,data:[{path:"/enabled",value:b,op:"replace"}],contentType:"application/json-patch+json"},d)}/**
	 * @function deleteAuthenticator function to delete a specific authenticator registration for IBM Verify instances or
	 * custom mobile authenticators that are built from the IBM Verify SDK.
	 * @param {string} authenticatorId Id of authenticated device to be deleted.
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"deleteAuthenticator",value:function deleteAuthenticator(a,b){if(2>arguments.length&&this.config.flowType!==FLOW_TYPE.implicitFlow)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"deleteAuthenticator(authenticatorId, token), 2 parameters are required "+arguments.length+" were given"));var c=b||this.token,d="".concat(this.config.tenantUrl,"/v1.0/authenticators/").concat(a);return this._handleResponse({method:"DELETE",url:d,data:!1},c)}/**
	 * @function methodEnabled Gets or sets the current status of the method.
	 * @param {string} id The signature enrollment identifier
	 * @param {boolean} enabled Enable / Disable enrolled signature method.
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"methodEnabled",value:function methodEnabled(a,b,c){if(3>arguments.length&&this.config.flowType!==FLOW_TYPE.implicitFlow)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"methodEnabled(id, enabled, token), 3 parameters are required "+arguments.length+" were given"));var d=c||this.token,e="".concat(this.config.tenantUrl,"/v1.0/authnmethods/signatures/").concat(a);return this._handleResponse({method:"PATCH",url:e,data:[{path:"/enabled",value:b,op:"replace"}],contentType:"application/json-patch+json"},d)}/**
	 * @function methods Gets an array of method objects containing all the enrolled methods for a given authenticator.
	 * @param {string} authenticatorId unique ID of registered authenticator
	 * @param {object} tokenObj containing access_token, refresh_token ...
	 */},{key:"methods",value:function methods(a,b){if(2>arguments.length&&this.config.flowType!==FLOW_TYPE.implicitFlow)return Promise.reject(new _Errors.VerifyError(AUTHENTICATOR_CONTEXT_ERROR,"methods(authenticatorId, token), 2 parameters are required "+arguments.length+" were given"));var c=b||this.token,d=encodeURIComponent("attributes/authenticatorId=\"".concat(a,"\"")),e="".concat(this.config.tenantUrl,"/v1.0/authnmethods/signatures?search=").concat(d);return this._handleResponse({method:"GET",url:e},c)}}]),a}(),_default=AuthenticatorContext;exports.default=_default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BdXRoZW50aWNhdG9yQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJBVVRIRU5USUNBVE9SX0NPTlRFWFRfRVJST1IiLCJBcHBDb25maWciLCJERUZBVUxUX1BPTExJTkdfREVMQVkiLCJERUZBVUxUX1BPTExJTkdfQVRURU1QVFMiLCJGTE9XX1RZUEUiLCJpbXBsaWNpdEZsb3ciLCJhdXRob3JpemF0aW9uQ29kZUZsb3ciLCJkZXZpY2VGbG93IiwiUk9QQyIsIkF1dGhlbnRpY2F0b3JDb250ZXh0Iiwib2F1dGgiLCJWZXJpZnlFcnJvciIsImNvbmZpZyIsImdldENvbmZpZyIsImZsb3dUeXBlIiwidG9rZW4iLCJfZmV0Y2hUb2tlbiIsImZldGNoVG9rZW4iLCJpc0F1dGhlbnRpY2F0ZWQiLCJvcHRpb25zIiwiaGFuZGxlUmVzcG9uc2UiLCJ0b2tlbk9iaiIsIlByb21pc2UiLCJyZWplY3QiLCJwYXRoIiwidGVuYW50VXJsIiwiX2hhbmRsZVJlc3BvbnNlIiwibWV0aG9kIiwidXJsIiwiZGF0YU9iaiIsImFyZ3VtZW50cyIsImxlbmd0aCIsInFyY29kZVBhcmFtIiwiaGFzT3duUHJvcGVydHkiLCJxcmNvZGVJblJlc3BvbnNlIiwiYWNjZXB0IiwiZGF0YSIsIm93bmVyIiwiY2xpZW50SWQiLCJyZWdpc3RyYXRpb25Qcm9maWxlSWQiLCJhY2NvdW50TmFtZSIsImF1dGhlbnRpY2F0b3JJZCIsImZvcm1EYXRhIiwidHJhbnNhY3Rpb25EYXRhIiwibWVzc2FnZSIsInR4TWVzc2FnZSIsIm9yaWdpbklwQWRkcmVzcyIsIm9yaWdpblVzZXJBZ2VudCIsImFkZGl0aW9uYWxEYXRhIiwidHhBZGRpdGlvbmFsRGF0YSIsInB1c2hOb3RpZmljYXRpb24iLCJ0aXRsZSIsInNlbmQiLCJwdXNoTWVzc2FnZSIsImF1dGhlbnRpY2F0aW9uTWV0aG9kcyIsImlkIiwibWV0aG9kSWQiLCJtZXRob2RUeXBlIiwibG9naWMiLCJleHBpcmVzSW4iLCJleHBpcmVzIiwidHJhbnNhY3Rpb25JZCIsImRlbGF5IiwiYXR0ZW1wdHMiLCJfdG9rZW5PYmoiLCJfYXR0ZW1wdHMiLCJfZGVsYXkiLCJ0b2tlblJlZnJlc2hlZCIsInZpZXdWZXJpZmljYXRpb24iLCJwYXlsb2FkIiwicmVzcG9uc2UiLCJzdGF0ZSIsInJlc29sdmUiLCJ1dGlscyIsInNsZWVwIiwiZW5hYmxlZCIsInZhbHVlIiwib3AiLCJjb250ZW50VHlwZSIsImVuY29kZWRWYWx1ZSIsImVuY29kZVVSSUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6ImtpQ0FNQ0EsQ0FBQUEsMkIsQ0FHR0MsaUIsQ0FISEQsMkIsQ0FDQUUscUIsQ0FFR0QsaUIsQ0FGSEMscUIsQ0FDQUMsd0IsQ0FDR0YsaUIsQ0FESEUsd0IsQ0FHS0MsU0FBUyxDQUFHLENBQ2pCQyxZQUFZLENBQUUsVUFERyxDQUVqQkMscUJBQXFCLENBQUUsZUFGTixDQUdqQkMsVUFBVSxDQUFFLFFBSEssQ0FJakJDLElBQUksQ0FBRSxNQUpXLEMsQ0FXWkMsb0IseUJBQ0wsV0FBWUMsQ0FBWixDQUFtQixDQUNsQiwyQkFBSSxDQUFDQSxDQUFMLENBQ0MsS0FBTSxJQUFJQyxvQkFBSixDQUFnQlgsMkJBQWhCLENBQTZDLDZCQUE3QyxDQUFOLENBRUQsS0FBS1UsS0FBTCxDQUFhQSxDQUpLLENBS2xCLEtBQUtFLE1BQUwsQ0FBYyxLQUFLRixLQUFMLENBQVdHLFNBQVgsRUFMSSxDQU1kLEtBQUtELE1BQUwsQ0FBWUUsUUFBWixHQUF5QlYsU0FBUyxDQUFDQyxZQU5yQixHQU9qQixLQUFLVSxLQUFMLENBQWEsS0FBS0MsV0FBTCxFQVBJLENBU2xCLEMsc0VBRWEsQ0FDYixNQUFPLE1BQUtOLEtBQUwsQ0FBV08sVUFBWCxFQUNQLEMsMERBRWdCRixDLENBQU8sQ0FDdkIsTUFBTyxNQUFLTCxLQUFMLENBQVdRLGVBQVgsQ0FBMkJILENBQTNCLENBQ1AsQyx3REFFZUksQyxDQUFTSixDLENBQU8sQ0FDL0IsTUFBTyxNQUFLTCxLQUFMLENBQVdVLGNBQVgsQ0FBMEJELENBQTFC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QUFNLEtBQUtaLE1BQUwsQ0FBWWEsU0FBbEIsMENBQTREOEIsQ0FBNUQsQ0FONEIsQ0FrQnBDLE1BQU8sTUFBSzdCLGVBQUwsQ0FYTyxDQUNiQyxNQUFNLENBQUUsT0FESyxDQUViQyxHQUFHLENBQUVKLENBRlEsQ0FHYlksSUFBSSxDQUFFLENBQUMsQ0FDTlosSUFBSSxDQUFFLFVBREEsQ0FFTm9ELEtBQUssQ0FBRUQsQ0FGRCxDQUdORSxFQUFFLENBQUUsU0FIRSxDQUFELENBSE8sQ0FRYkMsV0FBVyxDQUFFLDZCQVJBLENBV1AsQ0FBOEIvRCxDQUE5QixDQUNQLENBRUQ7Ozs7NENBS1EwQixDLENBQWlCcEIsQyxDQUFVLENBQ2xDLEdBQXVCLENBQW5CLENBQUFTLFNBQVMsQ0FBQ0MsTUFBVixFQUF3QixLQUFLbkIsTUFBTCxDQUFZRSxRQUFaLEdBQXlCVixTQUFTLENBQUNDLFlBQS9ELENBQ0MsTUFBT2lCLENBQUFBLE9BQU8sQ0FBQ0MsTUFBUixDQUFlLEdBQUlaLG9CQUFKLENBQWdCWCwyQkFBaEIsQ0FBNkMsOERBQWdFOEIsU0FBUyxDQUFDQyxNQUExRSxDQUFtRixhQUFoSSxDQUFmLENBQVAsQ0FGaUMsR0FLOUJoQixDQUFBQSxDQUFLLENBQUdNLENBQVEsRUFBSSxLQUFLTixLQUxLLENBTTlCZ0UsQ0FBWSxDQUFHQyxrQkFBa0Isd0NBQWdDdkMsQ0FBaEMsT0FOSCxDQU85QmpCLENBQUksV0FBTSxLQUFLWixNQUFMLENBQVlhLFNBQWxCLGlEQUFtRXNELENBQW5FLENBUDBCLENBYWxDLE1BQU8sTUFBS3JELGVBQUwsQ0FMTyxDQUNiQyxNQUFNLENBQUUsS0FESyxDQUViQyxHQUFHLENBQUVKLENBRlEsQ0FLUCxDQUE4QlQsQ0FBOUIsQ0FDUCxDLGtCQUdhTixvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGluZGVudCAqL1xuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgVmVyaWZ5RXJyb3IgfSBmcm9tICcuL2Vycm9ycy9FcnJvcnMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vaGVscGVycy91dGlscyc7XG5cbmNvbnN0IHtcblx0QVVUSEVOVElDQVRPUl9DT05URVhUX0VSUk9SLFxuXHRERUZBVUxUX1BPTExJTkdfREVMQVksXG5cdERFRkFVTFRfUE9MTElOR19BVFRFTVBUU1xufSA9IEFwcENvbmZpZztcblxuY29uc3QgRkxPV19UWVBFID0ge1xuXHRpbXBsaWNpdEZsb3c6ICdpbXBsaWNpdCcsXG5cdGF1dGhvcml6YXRpb25Db2RlRmxvdzogJ2F1dGhvcml6YXRpb24nLFxuXHRkZXZpY2VGbG93OiAnZGV2aWNlJyxcblx0Uk9QQzogJ3JvcGMnXG59O1xuXG4vKipcbiAqIEF1dGhlbnRpY2F0b3JDb250ZXh0IGhhbmRsZXMgYWxsIHJlcXVlc3RzIGluIHJlZ2FyZHMgdG8gYXV0aGVudGljYXRvcnMsIHN1Y2hcbiAqIGFzIHRoZSBJQk0gVmVyaWZ5IG1vYmlsZSBhcHBsaWNhdGlvblxuICovXG5jbGFzcyBBdXRoZW50aWNhdG9yQ29udGV4dCB7XG5cdGNvbnN0cnVjdG9yKG9hdXRoKSB7XG5cdFx0aWYgKCFvYXV0aCkge1xuXHRcdFx0dGhyb3cgbmV3IFZlcmlmeUVycm9yKEFVVEhFTlRJQ0FUT1JfQ09OVEVYVF9FUlJPUiwgJ09hdXRoIHBhcmFtZXRlciBpcyByZXF1aXJlZCcpO1xuXHRcdH1cblx0XHR0aGlzLm9hdXRoID0gb2F1dGg7XG5cdFx0dGhpcy5jb25maWcgPSB0aGlzLm9hdXRoLmdldENvbmZpZygpO1xuXHRcdGlmICh0aGlzLmNvbmZpZy5mbG93VHlwZSA9PT0gRkxPV19UWVBFLmltcGxpY2l0Rmxvdykge1xuXHRcdFx0dGhpcy50b2tlbiA9IHRoaXMuX2ZldGNoVG9rZW4oKTtcblx0XHR9XG5cdH1cblxuXHRfZmV0Y2hUb2tlbigpIHtcblx0XHRyZXR1cm4gdGhpcy5vYXV0aC5mZXRjaFRva2VuKCk7XG5cdH1cblxuXHRfaXNBdXRoZW50aWNhdGVkKHRva2VuKSB7XG5cdFx0cmV0dXJuIHRoaXMub2F1dGguaXNBdXRoZW50aWNhdGVkKHRva2VuKTtcblx0fVxuXG5cdF9oYW5kbGVSZXNwb25zZShvcHRpb25zLCB0b2tlbikge1xuXHRcdHJldHVybiB0aGlzLm9hdXRoLmhhbmRsZVJlc3BvbnNlKG9wdGlvbnMsIHRva2VuKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgQXV0aGVudGljYXRvciBvYmplY3QgcHJvdmlkZXMgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0byB2aWV3XG5cdCAqIGRldmljZSBpbmZvcm1hdGlvbiBhbmQgcmVtb3ZlIG1ldGhvZHNcblx0ICogQHBhcmFtIHtvYmplY3R9IHRva2VuT2JqIGNvbnRhaW5pbmcgYWNjZXNzX3Rva2VuLCByZWZyZXNoX3Rva2VuIC4uLlxuXHQgKi9cblx0YXV0aGVudGljYXRvcnModG9rZW5PYmopIHtcblx0XHRsZXQgdG9rZW4gPSB0b2tlbk9iaiB8fCB0aGlzLnRva2VuO1xuXHRcdGlmICghdG9rZW4pIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVmVyaWZ5RXJyb3IoQVVUSEVOVElDQVRPUl9DT05URVhUX0VSUk9SLCAndG9rZW4gaXMgYSByZXF1aXJlZCBwYXJhbWV0ZXInKSk7XG5cdFx0fVxuXHRcdGxldCBwYXRoID0gYCR7dGhpcy5jb25maWcudGVuYW50VXJsfS92MS4wL2F1dGhlbnRpY2F0b3JzYDtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHR1cmw6IHBhdGhcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHRoaXMuX2hhbmRsZVJlc3BvbnNlKG9wdGlvbnMsIHRva2VuKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gaW5pdGlhdGVBdXRoZW50aWNhdG9yXG5cdCAqIEluaXRpYXRlcyBhIG5ldyBhdXRoZW50aWNhdG9yIHRoYXQgdGhlIGNsaWVudCBjYW4gb3IgZW50ZXIgbWFudWFsbHkgdXNpbmcgYSBtb2JpbGUgZGV2aWNlLlxuXHQgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGJhc2U2NCBlbmNvZGVkIGRhdGEgcmVwcmVzZW50aW5nIGEgUVIgY29kZS5cblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGFPYmogY29udGFpbmluZyBhIHVzZXIgZnJpZW5kbHkgbmFtZSBmb3IgdGhlIHJlZ2lzdHJhdGlvbi5cblx0ICogQHBhcmFtIHtvYmplY3R9IHRva2VuT2JqIGNvbnRhaW5pbmcgYWNjZXNzX3Rva2VuLCByZWZyZXNoX3Rva2VuIC4uLlxuXHQgKi9cblx0aW5pdGlhdGVBdXRoZW50aWNhdG9yKGRhdGFPYmosIHRva2VuT2JqKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyICYmIHRoaXMuY29uZmlnLmZsb3dUeXBlICE9PSBGTE9XX1RZUEUuaW1wbGljaXRGbG93KSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFZlcmlmeUVycm9yKEFVVEhFTlRJQ0FUT1JfQ09OVEVYVF9FUlJPUiwgJ2luaXRpYXRlQXV0aGVudGljYXRvcihkYXRhT2JqLCB0b2tlbiksIDIgcGFyYW1ldGVycyBhcmUgcmVxdWlyZWQgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHdlcmUgZ2l2ZW4nKSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFkYXRhT2JqKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFZlcmlmeUVycm9yKEFVVEhFTlRJQ0FUT1JfQ09OVEVYVF9FUlJPUiwgJ2RhdGFPYmogY2Fubm90IGJlIG51bGwnKSk7XG5cdFx0fVxuXG5cdFx0bGV0IG9wdGlvbnMgPSB7fTtcblx0XHRsZXQgcXJjb2RlUGFyYW0gPSAnP3FyY29kZUluUmVzcG9uc2U9Jztcblx0XHRsZXQgcGF0aCA9IGAke3RoaXMuY29uZmlnLnRlbmFudFVybH0vdjEuMC9hdXRoZW50aWNhdG9ycy9pbml0aWF0aW9uYDtcblxuXHRcdGlmIChkYXRhT2JqLmhhc093blByb3BlcnR5KCdxcmNvZGVJblJlc3BvbnNlJykgJiYgZGF0YU9iai5xcmNvZGVJblJlc3BvbnNlID09PSB0cnVlKSB7XG5cdFx0XHRxcmNvZGVQYXJhbSA9IGAke3FyY29kZVBhcmFtfXRydWVgO1xuXHRcdFx0cGF0aCA9IGAke3BhdGh9JHtxcmNvZGVQYXJhbX1gO1xuXHRcdFx0b3B0aW9ucy5hY2NlcHQgPSAnaW1hZ2UvcG5nJztcblx0XHR9XG5cblx0XHRsZXQgdG9rZW4gPSB0b2tlbk9iaiB8fCB0aGlzLnRva2VuO1xuXHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdHVybDogcGF0aCxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0b3duZXI6IGRhdGFPYmoub3duZXIgfHwgbnVsbCxcblx0XHRcdFx0Y2xpZW50SWQ6IHRoaXMuY29uZmlnLnJlZ2lzdHJhdGlvblByb2ZpbGVJZCxcblx0XHRcdFx0YWNjb3VudE5hbWU6IGRhdGFPYmouYWNjb3VudE5hbWUgfHwgJ0RlZmF1bHQgQWNjb3VudCdcblx0XHRcdH1cblx0XHR9O1xuXHRcdHJldHVybiB0aGlzLl9oYW5kbGVSZXNwb25zZShvcHRpb25zLCB0b2tlbik7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gY3JlYXRlVmVyaWZpY2F0aW9uIGZ1bmN0aW9uIGNyZWF0ZXMgYSB0cmFuc2FjdGlvbiBhbmQgc2VuZHMgYSBwdXNoIG5vdGlmaWNhdGlvbiB0byB0aGUgYXNzb2NpYXRlZCBhdXRoZW50aWNhdG9yLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXV0aGVudGljYXRvcklkIENyZWF0ZXMgYSBuZXcgdmVyaWZpY2F0aW9uIGZvciB0aGUgcmVnaXN0ZXJlZCBhdXRoZW50aWNhdG9yLlxuXHQgKiBAcGFyYW0ge29iamVjdH0gZm9ybURhdGEgIGEgSlNPTiBwYXlsb2FkIHRoYXQgc3BlY2lmaWVzIHRoZSB2ZXJpZmljYXRpb24gdHJhbnNhY3Rpb24gZGF0YVxuXHQgKiBAcGFyYW0ge29iamVjdH0gdG9rZW5PYmogY29udGFpbmluZyBhY2Nlc3NfdG9rZW4sIHJlZnJlc2hfdG9rZW4gLi4uXG5cdCAqL1xuXHRjcmVhdGVWZXJpZmljYXRpb24oYXV0aGVudGljYXRvcklkLCBmb3JtRGF0YSwgdG9rZW5PYmopIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMgJiYgdGhpcy5jb25maWcuZmxvd1R5cGUgIT09IEZMT1dfVFlQRS5pbXBsaWNpdEZsb3cpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVmVyaWZ5RXJyb3IoQVVUSEVOVElDQVRPUl9DT05URVhUX0VSUk9SLCAnY3JlYXRlVmVyaWZpY2F0aW9uKGF1dGhlbnRpY2F0b3JJZCwgZm9ybURhdGEsIHRva2VuKSwgMyBwYXJhbWV0ZXJzIGFyZSByZXF1aXJlZCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgd2VyZSBnaXZlbicpKTtcblx0XHR9XG5cblx0XHRpZiAoIWZvcm1EYXRhKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFZlcmlmeUVycm9yKEFVVEhFTlRJQ0FUT1JfQ09OVEVYVF9FUlJPUiwgJ2Zvcm1EYXRhIGlzIGEgcmVxdWlyZWQgcGFyYW1ldGVyJykpO1xuXHRcdH1cblxuXHRcdGxldCB0b2tlbiA9IHRva2VuT2JqIHx8IHRoaXMudG9rZW47XG5cdFx0bGV0IHBhdGggPSBgJHt0aGlzLmNvbmZpZy50ZW5hbnRVcmx9L3YxLjAvYXV0aGVudGljYXRvcnMvJHthdXRoZW50aWNhdG9ySWR9L3ZlcmlmaWNhdGlvbnNgO1xuXG5cdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHR0cmFuc2FjdGlvbkRhdGE6IHtcblx0XHRcdFx0bWVzc2FnZTogZm9ybURhdGEudHhNZXNzYWdlIHx8ICcgJyxcblx0XHRcdFx0b3JpZ2luSXBBZGRyZXNzOiBmb3JtRGF0YS5vcmlnaW5JcEFkZHJlc3MgfHwgJyAnLFxuXHRcdFx0XHRvcmlnaW5Vc2VyQWdlbnQ6IGZvcm1EYXRhLm9yaWdpblVzZXJBZ2VudCB8fCAnICcsXG5cdFx0XHRcdGFkZGl0aW9uYWxEYXRhOiBmb3JtRGF0YS50eEFkZGl0aW9uYWxEYXRhXG5cdFx0XHR9LFxuXHRcdFx0cHVzaE5vdGlmaWNhdGlvbjoge1xuXHRcdFx0XHR0aXRsZTogZm9ybURhdGEudGl0bGUgfHwgJyAnLFxuXHRcdFx0XHRzZW5kOiBmb3JtRGF0YS5zZW5kLFxuXHRcdFx0XHRtZXNzYWdlOiBmb3JtRGF0YS5wdXNoTWVzc2FnZSB8fCAnICdcblx0XHRcdH0sXG5cdFx0XHRhdXRoZW50aWNhdGlvbk1ldGhvZHM6IFt7XG5cdFx0XHRcdGlkOiBmb3JtRGF0YS5tZXRob2RJZCxcblx0XHRcdFx0bWV0aG9kVHlwZTogJ3NpZ25hdHVyZSdcblx0XHRcdH1dLFxuXHRcdFx0bG9naWM6ICdPUicsXG5cdFx0XHRleHBpcmVzSW46IGZvcm1EYXRhLmV4cGlyZXMgfHwgMTIwXG5cdFx0fTtcblxuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHR1cmw6IHBhdGgsXG5cdFx0XHRkYXRhOiBkYXRhXG5cdFx0fTtcblxuXHRcdHJldHVybiB0aGlzLl9oYW5kbGVSZXNwb25zZShvcHRpb25zLCB0b2tlbik7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gdmlld1ZlcmlmaWNhdGlvbnMgUmV0cmlldmUgdGhlIGxpc3Qgb2YgdmVyaWZpY2F0aW9uIHRyYW5zYWN0aW9ucy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGF1dGhlbnRpY2F0b3JJZCBUaGUgYXV0aGVudGljYXRvciByZWdpc3RyYXRpb24gaWRlbnRpZmllci5cblx0ICogQHBhcmFtIHtvYmplY3R9IHRva2VuT2JqIGNvbnRhaW5pbmcgYWNjZXNzX3Rva2VuLCByZWZyZXNoX3Rva2VuIC4uLlxuXHQgKi9cblx0dmlld1ZlcmlmaWNhdGlvbnMoYXV0aGVudGljYXRvcklkLCB0b2tlbk9iaikge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMiAmJiB0aGlzLmNvbmZpZy5mbG93VHlwZSAhPT0gRkxPV19UWVBFLmltcGxpY2l0Rmxvdykge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBWZXJpZnlFcnJvcihBVVRIRU5USUNBVE9SX0NPTlRFWFRfRVJST1IsICd2aWV3VmVyaWZpY2F0aW9ucyhhdXRoZW50aWNhdG9ySWQsIHRva2VuKSwgMiBwYXJhbWV0ZXJzIGFyZSByZXF1aXJlZCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgd2VyZSBnaXZlbicpKTtcblx0XHR9XG5cblx0XHRsZXQgdG9rZW4gPSB0b2tlbk9iaiB8fCB0aGlzLnRva2VuO1xuXHRcdGxldCBwYXRoID0gYCR7dGhpcy5jb25maWcudGVuYW50VXJsfS92MS4wL2F1dGhlbnRpY2F0b3JzLyR7YXV0aGVudGljYXRvcklkfS92ZXJpZmljYXRpb25zYDtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHR1cmw6IHBhdGhcblx0XHR9O1xuXHRcdHJldHVybiB0aGlzLl9oYW5kbGVSZXNwb25zZShvcHRpb25zLCB0b2tlbik7XG5cdH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uIHZpZXdWZXJpZmljYXRpb24gUmV0cmlldmUgYSBzcGVjaWZpYyB2ZXJpZmljYXRpb24gdHJhbnNhY3Rpb24gdGhhdCBpcyBhc3NvY2lhdGVkIHdpdGggYW4gYXV0aGVudGljYXRvciByZWdpc3RyYXRpb24uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhdXRoZW50aWNhdG9ySWQgVGhlIGF1dGhlbnRpY2F0b3IgcmVnaXN0cmF0aW9uIGlkZW50aWZpZXIuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2FjdGlvbklkIFRoZSB2ZXJpZmljYXRpb24gdHJhbnNhY3Rpb24gaWRlbnRpZmllci5cblx0ICogQHBhcmFtIHtvYmplY3R9IHRva2VuT2JqIGNvbnRhaW5pbmcgYWNjZXNzX3Rva2VuLCByZWZyZXNoX3Rva2VuIC4uLlxuXHQgKi9cblx0dmlld1ZlcmlmaWNhdGlvbihhdXRoZW50aWNhdG9ySWQsIHRyYW5zYWN0aW9uSWQsIHRva2VuT2JqKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzICYmIHRoaXMuY29uZmlnLmZsb3dUeXBlICE9PSBGTE9XX1RZUEUuaW1wbGljaXRGbG93KSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFZlcmlmeUVycm9yKEFVVEhFTlRJQ0FUT1JfQ09OVEVYVF9FUlJPUiwgJ3ZpZXdWZXJpZmljYXRpb24oYXV0aGVudGljYXRvcklkLCB0cmFuc2FjdGlvbklkLCB0b2tlbiksIDMgcGFyYW1ldGVycyBhcmUgcmVxdWlyZWQgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHdlcmUgZ2l2ZW4nKSk7XG5cdFx0fVxuXG5cdFx0bGV0IHRva2VuID0gdG9rZW5PYmogfHwgdGhpcy50b2tlbjtcblx0XHRsZXQgcGF0aCA9IGAke3RoaXMuY29uZmlnLnRlbmFudFVybH0vdjEuMC9hdXRoZW50aWNhdG9ycy8ke2F1dGhlbnRpY2F0b3JJZH0vdmVyaWZpY2F0aW9ucy8ke3RyYW5zYWN0aW9uSWR9YDtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHR1cmw6IHBhdGhcblx0XHR9O1xuXHRcdHJldHVybiB0aGlzLl9oYW5kbGVSZXNwb25zZShvcHRpb25zLCB0b2tlbik7XG5cdH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uIHBvbGxWZXJpZmljYXRpb24gcmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgcG9sbHMgYSBnaXZlbiB0cmFuc2FjdGlvbiBpZCBmb3IgYSBzdGF0ZSBjaGFuZ2Vcblx0ICogQHBhcmFtIHtzdHJpbmd9IGF1dGhlbnRpY2F0b3JJZCBhdXRoZW50aWNhdG9yIGlkXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB0cmFuc2FjdGlvbklkIHRyYW5zYWN0aW9uIGlkXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB0b2tlbk9iaiBjb250YWluaW5nIGFjY2Vzc190b2tlbiwgcmVmcmVzaF90b2tlbiAuLi5cblx0ICogQHBhcmFtIHtvYmplY3R9IGRlbGF5IGRlbGF5IGJldHdlZW4gcG9sbHNcblx0ICogQHBhcmFtIHtvYmplY3R9IGF0dGVtcHRzIGhvdyBtYW55IHRpbWVzIHRvIHBvbGxcblx0ICovXG5cdGFzeW5jIHBvbGxWZXJpZmljYXRpb24oYXV0aGVudGljYXRvcklkLCB0cmFuc2FjdGlvbklkLCB0b2tlbk9iaiwgZGVsYXksIGF0dGVtcHRzKSB7XG5cdFx0bGV0IF90b2tlbk9iaiA9IHRva2VuT2JqO1xuXHRcdGxldCBfYXR0ZW1wdHMgPSBhdHRlbXB0cyB8fCBERUZBVUxUX1BPTExJTkdfQVRURU1QVFM7XG5cdFx0bGV0IF9kZWxheSA9IGRlbGF5IHx8IERFRkFVTFRfUE9MTElOR19ERUxBWTtcblxuXHRcdGxldCB0b2tlblJlZnJlc2hlZCA9IGZhbHNlO1xuXG5cdFx0d2hpbGUgKF9hdHRlbXB0cyA+IDApIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGxldCBwYXlsb2FkID0gYXdhaXQgdGhpcy52aWV3VmVyaWZpY2F0aW9uKGF1dGhlbnRpY2F0b3JJZCwgdHJhbnNhY3Rpb25JZCwgdG9rZW5PYmopO1xuXG5cdFx0XHRcdC8vIHRva2VuIHdhcyByZWZyZXNoZWRcblx0XHRcdFx0aWYgKHBheWxvYWQudG9rZW4pIHtcblx0XHRcdFx0XHR0b2tlblJlZnJlc2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0X3Rva2VuT2JqID0gcGF5bG9hZC50b2tlbjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vICdQRU5ESU5HJyBpcyBkZWZhdWx0IHZhbHVlXG5cdFx0XHRcdGlmIChwYXlsb2FkLnJlc3BvbnNlLnN0YXRlICE9PSAnUEVORElORycgfHwgcGF5bG9hZC5yZXNwb25zZS5zdGF0ZSAhPT0gJ1NFTkRJTkcnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN0YXRlOiBwYXlsb2FkLnJlc3BvbnNlLnN0YXRlLCB0b2tlbjogdG9rZW5SZWZyZXNoZWQgPyBfdG9rZW5PYmogOiBudWxsIH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YXdhaXQgdXRpbHMuc2xlZXAoX2RlbGF5KTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cblx0XHRcdF9hdHRlbXB0cy0tO1xuXHRcdH1cblxuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVmVyaWZ5RXJyb3IoJ251bWJlciBvZiBwb2xsaW5nIGF0dGVtcHRzIGV4Y2VlZGVkJykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvbiBlbmFibGVkIGZ1bmN0aW9uIHRvIHVwZGF0ZSBhdHRyaWJ1dGVzIG9mIGEgc3BlY2lmaWMgYXV0aGVudGljYXRvciByZWdpc3RyYXRpb24gZm9yXG5cdCAqIElCTSBWZXJpZnkgaW5zdGFuY2VzIG9yIGN1c3RvbSBtb2JpbGUgYXV0aGVudGljYXRvcnMgdGhhdCBhcmUgYnVpbHQgZnJvbSB0aGUgSUJNIFZlcmlmeSBTREsuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhdXRoZW50aWNhdG9ySWQgSWQgb2YgYXV0aGVudGljYXRlZCBkZXZpY2Vcblx0ICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkIGJvb2xlYW4gdG8gZW5hYmxlL2Rpc2FibGUgZW5yb2xsZWQgbWV0aG9kXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB0b2tlbk9iaiBjb250YWluaW5nIGFjY2Vzc190b2tlbiwgcmVmcmVzaF90b2tlbiAuLi5cblx0ICovXG5cdGVuYWJsZWQoYXV0aGVudGljYXRvcklkLCBlbmFibGVkLCB0b2tlbk9iaikge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMyAmJiB0aGlzLmNvbmZpZy5mbG93VHlwZSAhPT0gRkxPV19UWVBFLmltcGxpY2l0Rmxvdykge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBWZXJpZnlFcnJvcihBVVRIRU5USUNBVE9SX0NPTlRFWFRfRVJST1IsICdlbmFibGVkKGF1dGhlbnRpY2F0b3JJZCwgZW5hYmxlZCwgdG9rZW4pLCAzIHBhcmFtZXRlcnMgYXJlIHJlcXVpcmVkICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyB3ZXJlIGdpdmVuJykpO1xuXHRcdH1cblxuXHRcdGxldCB0b2tlbiA9IHRva2VuT2JqIHx8IHRoaXMudG9rZW47XG5cdFx0bGV0IHBhdGggPSBgJHt0aGlzLmNvbmZpZy50ZW5hbnRVcmx9L3YxLjAvYXV0aGVudGljYXRvcnMvJHthdXRoZW50aWNhdG9ySWR9YDtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BBVENIJyxcblx0XHRcdHVybDogcGF0aCxcblx0XHRcdGRhdGE6IFt7XG5cdFx0XHRcdHBhdGg6ICcvZW5hYmxlZCcsXG5cdFx0XHRcdHZhbHVlOiBlbmFibGVkLFxuXHRcdFx0XHRvcDogJ3JlcGxhY2UnXG5cdFx0XHR9XSxcblx0XHRcdGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbi1wYXRjaCtqc29uJ1xuXHRcdH07XG5cblx0XHRyZXR1cm4gdGhpcy5faGFuZGxlUmVzcG9uc2Uob3B0aW9ucywgdG9rZW4pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvbiBkZWxldGVBdXRoZW50aWNhdG9yIGZ1bmN0aW9uIHRvIGRlbGV0ZSBhIHNwZWNpZmljIGF1dGhlbnRpY2F0b3IgcmVnaXN0cmF0aW9uIGZvciBJQk0gVmVyaWZ5IGluc3RhbmNlcyBvclxuXHQgKiBjdXN0b20gbW9iaWxlIGF1dGhlbnRpY2F0b3JzIHRoYXQgYXJlIGJ1aWx0IGZyb20gdGhlIElCTSBWZXJpZnkgU0RLLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXV0aGVudGljYXRvcklkIElkIG9mIGF1dGhlbnRpY2F0ZWQgZGV2aWNlIHRvIGJlIGRlbGV0ZWQuXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB0b2tlbk9iaiBjb250YWluaW5nIGFjY2Vzc190b2tlbiwgcmVmcmVzaF90b2tlbiAuLi5cblx0ICovXG5cdGRlbGV0ZUF1dGhlbnRpY2F0b3IoYXV0aGVudGljYXRvcklkLCB0b2tlbk9iaikge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMiAmJiB0aGlzLmNvbmZpZy5mbG93VHlwZSAhPT0gRkxPV19UWVBFLmltcGxpY2l0Rmxvdykge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBWZXJpZnlFcnJvcihBVVRIRU5USUNBVE9SX0NPTlRFWFRfRVJST1IsICdkZWxldGVBdXRoZW50aWNhdG9yKGF1dGhlbnRpY2F0b3JJZCwgdG9rZW4pLCAyIHBhcmFtZXRlcnMgYXJlIHJlcXVpcmVkICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyB3ZXJlIGdpdmVuJykpO1xuXHRcdH1cblxuXHRcdGxldCB0b2tlbiA9IHRva2VuT2JqIHx8IHRoaXMudG9rZW47XG5cdFx0bGV0IHBhdGggPSBgJHt0aGlzLmNvbmZpZy50ZW5hbnRVcmx9L3YxLjAvYXV0aGVudGljYXRvcnMvJHthdXRoZW50aWNhdG9ySWR9YDtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0XHR1cmw6IHBhdGgsXG5cdFx0XHRkYXRhOiBmYWxzZVxuXHRcdH07XG5cdFx0cmV0dXJuIHRoaXMuX2hhbmRsZVJlc3BvbnNlKG9wdGlvbnMsIHRva2VuKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gbWV0aG9kRW5hYmxlZCBHZXRzIG9yIHNldHMgdGhlIGN1cnJlbnQgc3RhdHVzIG9mIHRoZSBtZXRob2QuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgc2lnbmF0dXJlIGVucm9sbG1lbnQgaWRlbnRpZmllclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWQgRW5hYmxlIC8gRGlzYWJsZSBlbnJvbGxlZCBzaWduYXR1cmUgbWV0aG9kLlxuXHQgKiBAcGFyYW0ge29iamVjdH0gdG9rZW5PYmogY29udGFpbmluZyBhY2Nlc3NfdG9rZW4sIHJlZnJlc2hfdG9rZW4gLi4uXG5cdCAqL1xuXHRtZXRob2RFbmFibGVkKGlkLCBlbmFibGVkLCB0b2tlbk9iaikge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMyAmJiB0aGlzLmNvbmZpZy5mbG93VHlwZSAhPT0gRkxPV19UWVBFLmltcGxpY2l0Rmxvdykge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBWZXJpZnlFcnJvcihBVVRIRU5USUNBVE9SX0NPTlRFWFRfRVJST1IsICdtZXRob2RFbmFibGVkKGlkLCBlbmFibGVkLCB0b2tlbiksIDMgcGFyYW1ldGVycyBhcmUgcmVxdWlyZWQgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHdlcmUgZ2l2ZW4nKSk7XG5cdFx0fVxuXG5cdFx0bGV0IHRva2VuID0gdG9rZW5PYmogfHwgdGhpcy50b2tlbjtcblx0XHRsZXQgcGF0aCA9IGAke3RoaXMuY29uZmlnLnRlbmFudFVybH0vdjEuMC9hdXRobm1ldGhvZHMvc2lnbmF0dXJlcy8ke2lkfWA7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQQVRDSCcsXG5cdFx0XHR1cmw6IHBhdGgsXG5cdFx0XHRkYXRhOiBbe1xuXHRcdFx0XHRwYXRoOiAnL2VuYWJsZWQnLFxuXHRcdFx0XHR2YWx1ZTogZW5hYmxlZCxcblx0XHRcdFx0b3A6ICdyZXBsYWNlJ1xuXHRcdFx0fV0sXG5cdFx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24tcGF0Y2granNvbidcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHRoaXMuX2hhbmRsZVJlc3BvbnNlKG9wdGlvbnMsIHRva2VuKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gbWV0aG9kcyBHZXRzIGFuIGFycmF5IG9mIG1ldGhvZCBvYmplY3RzIGNvbnRhaW5pbmcgYWxsIHRoZSBlbnJvbGxlZCBtZXRob2RzIGZvciBhIGdpdmVuIGF1dGhlbnRpY2F0b3IuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhdXRoZW50aWNhdG9ySWQgdW5pcXVlIElEIG9mIHJlZ2lzdGVyZWQgYXV0aGVudGljYXRvclxuXHQgKiBAcGFyYW0ge29iamVjdH0gdG9rZW5PYmogY29udGFpbmluZyBhY2Nlc3NfdG9rZW4sIHJlZnJlc2hfdG9rZW4gLi4uXG5cdCAqL1xuXHRtZXRob2RzKGF1dGhlbnRpY2F0b3JJZCwgdG9rZW5PYmopIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIgJiYgdGhpcy5jb25maWcuZmxvd1R5cGUgIT09IEZMT1dfVFlQRS5pbXBsaWNpdEZsb3cpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVmVyaWZ5RXJyb3IoQVVUSEVOVElDQVRPUl9DT05URVhUX0VSUk9SLCAnbWV0aG9kcyhhdXRoZW50aWNhdG9ySWQsIHRva2VuKSwgMiBwYXJhbWV0ZXJzIGFyZSByZXF1aXJlZCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgd2VyZSBnaXZlbicpKTtcblx0XHR9XG5cblx0XHRsZXQgdG9rZW4gPSB0b2tlbk9iaiB8fCB0aGlzLnRva2VuO1xuXHRcdGxldCBlbmNvZGVkVmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoYGF0dHJpYnV0ZXMvYXV0aGVudGljYXRvcklkPVwiJHthdXRoZW50aWNhdG9ySWR9XCJgKTtcblx0XHRsZXQgcGF0aCA9IGAke3RoaXMuY29uZmlnLnRlbmFudFVybH0vdjEuMC9hdXRobm1ldGhvZHMvc2lnbmF0dXJlcz9zZWFyY2g9JHtlbmNvZGVkVmFsdWV9YDtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHR1cmw6IHBhdGhcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHRoaXMuX2hhbmRsZVJlc3BvbnNlKG9wdGlvbnMsIHRva2VuKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdXRoZW50aWNhdG9yQ29udGV4dDtcbiJdfQ==