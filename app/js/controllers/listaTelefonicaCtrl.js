angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarOperadoras = function () {
		$http.get('http://localhost:8000/operadoras').then(function (response) {
			$scope.operadoras = response.data;
		}, function (response) {
			console.log('Erro ao adquirir os dados');
		});
	}

	var carregarContatos = function () {
		$http.get('http://localhost:8000/contatos/').then(function (response) {
			$scope.contatos = response.data;
			// coloca o objeto operadora respectivo a cada objeto contato
			$scope.contatos.filter(function (contato) {
				contato.operadora = $scope.operadoras.find(function (operadora) {
					return operadora.pk == contato.operadora;
				});
			});
		}, function (response) {
			$scope.message = "Aconteceu um problema: " + response.status + ' - ' + response.statusText;
		});
	}

	$scope.adicionarContato = function (contato) {
		// permitir requisições da mesma origem
		$http.defaults.headers.post["Content-Type"] = "text/plain";

		contato.operadora = contato.operadora.pk;

		$http.post('http://localhost:8000/contatos/', contato).then(function (response) {
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
		}, function (response) {
			console.log('Erro ao adquirir os dados');
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