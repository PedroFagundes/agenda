angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, operadorasAPI, contatosAPI, serialGenerator) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarOperadoras = function () {
		operadorasAPI.getOperadoras().then(function (response) {
			$scope.operadoras = response.data;
		}, function (response) {
			$scope.error = "Não foi possível carregar os dados";
		});
	}

	var carregarContatos = function () {
		contatosAPI.getContatos().then(function (response) {
			$scope.contatos = response.data;
			// coloca o objeto operadora respectivo a cada objeto contato
			$scope.contatos.filter(function (contato) {
				contato.operadora = $scope.operadoras.find(function (operadora) {
					return operadora.pk == contato.operadora;
				});
			});
		}, function (response) {
			$scope.error = "Não foi possível carregar os dados";
		});
	}

	$scope.adicionarContato = function (contato) {
		// permitir requisições da mesma origem
		$http.defaults.headers.post["Content-Type"] = "text/plain";

		contato.serial = serialGenerator.generate();
		contato.operadora = contato.operadora.pk;

		console.log(contato);

		contatosAPI.saveContato(contato).then(function (response) {
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
		}, function (response) {
			$scope.error = "Não foi possível carregar os dados";
		});
	};
	$scope.apagarContatos = function (contatos) {
		$scope.contatos = contatos.filter(function (contato) {
			if (!contato.selecionado) return contato;
		});
	};
	$scope.isContatoSelecionado = function (contatos) {
		return $scope.contatos.some(function (contato) {
			return contato.selecionado;
		});
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	carregarOperadoras();
	carregarContatos();
});