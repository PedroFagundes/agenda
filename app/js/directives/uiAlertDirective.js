angular.module("listaTelefonica").directive("uiAlert", function() {
	return {
		templateUrl: "view/alert.html",
		replate: true,
		restrict: "AE",
		scope: {
			title: "@",
			message: "="
		}
	};
});