# WeatherApp 🌤️

WeatherApp é uma aplicação web simples de previsão do tempo que utiliza HTML, CSS e JavaScript para exibir informações meteorológicas em tempo real, como temperatura, umidade, velocidade do vento, e cobertura de nuvens. Este projeto foi desenvolvido com o intuito de aprimorar habilidades de manipulação de APIs e testes unitários.

## Tecnologias Utilizadas

- **HTML5**: Estrutura do conteúdo da aplicação.
- **CSS3**: Estilização e layout responsivo.
- **JavaScript (ES6)**: Lógica da aplicação e manipulação do DOM.
- **APIs Externas**:
  - **OpenCage API**: Para converter coordenadas geográficas em nomes de cidades.
  - **OpenWeatherMap API**: Para obter dados meteorológicos detalhados.
- **Jest**: Framework de testes para realizar testes unitários em JavaScript.

## Funcionalidades

- **Previsão Meteorológica em Tempo Real**: A aplicação obtém a localização do usuário via geolocalização e exibe as condições meteorológicas atuais.
- **Busca por Cidades**: O usuário pode pesquisar o clima de uma cidade específica através de uma barra de busca.
- **Atualização Automática**: Os dados meteorológicos são atualizados automaticamente a cada 60 segundos.
- **Relógio em Tempo Real**: Exibe a hora atual na interface do usuário.

## Estrutura do Projeto

weatherApp/ 
 # Diretório com testes unitários 
 ├── __tests__/
 │ └── weather.test.js 
 ├── css/ 
 │ └── style.css # Estilos da aplicação 
 ├── js/ 
 │ └── script.js # Lógica principal da aplicação 
 ├── index.html # Página principal 
 ├── jest.config.js # Configuração do Jest 
 ├── .gitignore # Arquivos ignorados pelo Git 
 ├── package.json # Configuração do projeto e dependências 
 └── README.md # Documentação do projeto

## Instalação e Configuração

1. **Clone o Repositório**:

	```bash
	git clone https://github.com/andressaagapito/weatherApp.git
	cd weatherApp

2. **Instale as Dependências**

	npm install

3. **Configurações de chave API**

	OpenCage API: Registre-se em OpenCage para obter uma chave de API.
	OpenWeatherMap API: Registre-se em OpenWeatherMap para obter uma chave de API.
	Substitua as variáveis OPEN_CAGE_API_KEY e OPENWEATHERMAP_API_KEY em script.js com suas respectivas chaves de API.

## Execução do Projeto
Para executar o projeto, basta abrir o arquivo index.html em seu navegador. Isso pode ser feito de duas formas:

Clique duas vezes no arquivo index.html.
Ou, caso tenha o Live Server instalado no VSCode, clique com o botão direito em index.html e selecione Open with Live Server.

## Testes
Testes Unitários com Jest
Os testes unitários foram implementados utilizando o framework Jest para validar funcionalidades específicas da aplicação, garantindo que a lógica principal funcione corretamente.

**Como Executar os Testes**
Para rodar os testes, execute o seguinte comando no terminal:
npm test

## Estrutura dos Testes
Cada função foi testada para cobrir diferentes cenários:

getCityName:
Retorna o nome da cidade quando os dados da API estão presentes.
Retorna "Cidade desconhecida" quando a cidade não é encontrada.
updateWeatherUI:

Atualiza os elementos do DOM corretamente com dados meteorológicos simulados.

## Hospedagem
O projeto está hospedado no GitHub. Você pode acessar a aplicação aqui.

## Contribuição
Contribuições são bem-vindas! Se você tem sugestões ou encontrou algum problema, sinta-se à vontade para abrir uma issue ou enviar um pull request.
