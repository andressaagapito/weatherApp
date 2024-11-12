// Chave da API OpenCage e OPENWEATHER
const OPEN_CAGE_API_KEY = "9957cc6fe06740309461172d9071119c";
const OPENWEATHERMAP_API_KEY = "0bacc5fa613ce3baf718d94bad020bf2";

// Função para atualizar o relógio em tempo real
function updateClock() {
  document.querySelector(
    ".hour"
  ).textContent = `Hora: ${new Date().toLocaleTimeString()}`;
}

// Chame a função updateClock a cada segundo
setInterval(updateClock, 1000);

// Função principal que executa a lógica completa
async function loadWeatherData() {
  try {
    const position = await getUserLocation();
    const { latitude, longitude } = position.coords;

    await fetchAndDisplayWeather(latitude, longitude);
    setInterval(async () => {
      await fetchAndDisplayWeather(latitude, longitude);
    }, 60000);
  } catch (error) {
    console.error("Erro ao carregar dados meteorológicos:", error);
    document.querySelector(".city").textContent = "Erro ao carregar dados";
  }
}

// Função para obter e exibir dados do tempo de acordo com a localização
async function fetchAndDisplayWeather(lat, lon, cityName = null) {
  try {
    const city = cityName || (await getCityName(lat, lon));
    const weatherData = await getWeatherData(lat, lon);
    updateWeatherUI(city, weatherData);
  } catch (error) {
    console.error("Erro ao buscar dados meteorológicos:", error);
    document.querySelector(".city").textContent = "Erro ao carregar dados";
  }
}

// Função para obter a localização do usuário
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation não é suportado pelo navegador."));
    }
  });
}

// Função para obter o nome da cidade usando a API OpenCage
async function getCityName(lat, lon) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPEN_CAGE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const cityComponent =
      data.results[0].components.city ||
      data.results[0].components.town ||
      data.results[0].components.village;
    return cityComponent || "Cidade desconhecida";
  } else {
    throw new Error("Não foi possível encontrar o nome da cidade.");
  }
}

// Função para obter os dados do tempo usando a API OPENWEATHERMAP
async function getWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Função para atualizar a interface com os dados mais recentes
function updateWeatherUI(city, data) {
  const formattedCity = city
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  document.querySelector(".city").textContent = formattedCity;

  if (data && data.main) {
    const temperature = Math.round(data.main.temp - 273.15);
    const tempMin = Math.round(data.main.temp_min - 273.15);
    const tempMax = Math.round(data.main.temp_max - 273.15);

    // Atualiza a temperatura atual, mínima e máxima
    document.getElementById("temperature").textContent = `${temperature}°C`;
    document.getElementById("temperature-min").textContent = `${tempMin}°C`;
    document.getElementById("temperature-max").textContent = `${tempMax}°C`;

    // Adicionando os dados adicionais
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const clouds = data.clouds.all;

    // Atualiza os elementos HTML com os novos dados
    document.getElementById(
      "wind-description"
    ).textContent = `${windSpeed} m/s`;
    document.getElementById("humidity").textContent = `${humidity}`;
    document.getElementById("clouds").textContent = `${clouds}%`;
  } else {
    console.error("Estrutura de dados inesperada:", data);
  }
}

// Função para buscar dados do tempo com o nome da cidade
async function loadWeatherDataByCity(cityName) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${OPEN_CAGE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      await fetchAndDisplayWeather(lat, lng, cityName);
    } else {
      alert("Cidade não encontrada");
    }
  } catch (error) {
    console.error("Erro ao buscar dados meteorológicos:", error);
    document.querySelector(".city").textContent = "Erro ao carregar dados";
  }
}

// Função para inicializar os eventos e carregar a aplicação
function initializeApp() {
  // Inicializar a aplicação ao carregar a página
  loadWeatherData();

  // Função de busca de cidade para a barra de busca
  function searchCity() {
    const cityInput = document.getElementById("city-input").value;
    if (cityInput) {
      loadWeatherDataByCity(cityInput);
    }
  }

  // Adicione o evento de escuta ao input de cidade para enviar ao pressionar Enter
  document
    .getElementById("city-input")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Evita o comportamento padrão do Enter
        searchCity(); // Chama a função de busca
      }
    });
}

// Chame `initializeApp` quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", initializeApp);
