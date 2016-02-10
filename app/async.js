exports = (typeof window === 'undefined') ? global : window;

var ajaxClient = (function() {
	var xMLHttpRequest = null;
	return {
		setXmlClient: function(){
			xMLHttpRequest = new XMLHttpRequest();
		},
		getXmlClient: function() {
			return xMLHttpRequest;
		}
	}
})();

var sortType = (function() {
	return {
		alphabetical: function() {
			return function(a, b) {
				const A = a.toLowerCase();
				const B = b.toLowerCase();
				if (A < B) {
					return -1;
				} else if (A > B) {
					return  1;
				} else {
					return 0;
				}
			}
		}
	}
})();

exports.asyncAnswers = {
	async : function(value) {
		return new Promise(function resolvePromise(resolve, reject) {
			resolve(value);
		})
	},

	manipulateRemoteData : function(url) {
		return new Promise(function resolvePromise(resolve, reject) {
			ajaxClient.setXmlClient();
			var xmlClient = ajaxClient.getXmlClient();
			xmlClient.onreadystatechange = function() {
				if(xmlClient.readyState === 4 && xmlClient.status === 200) {
					var parsedResponse = JSON.parse(xmlClient.response);

					var names = [];
					for (var i = 0, length = parsedResponse.people.length; i < length; i++) {
						names.push(parsedResponse.people[i].name);
					};

					resolve(names.sort(sortType.alphabetical()));
				}  
			};
			xmlClient.open('GET', url, true);
			xmlClient.send('');
		})
	},
};
