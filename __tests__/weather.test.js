// Importa as funções do arquivo script.js
const { getCityName, getWeatherData, fetchAndDisplayWeather, updateWeatherUI } = require("../js/script");

// Mock global do fetch
global.fetch = jest.fn();

// Configura o ambiente DOM para testes
document.body.innerHTML = `
  <div class="city"></div>
  <div id="temperature"></div>
  <div id="temperature-min"></div>
  <div id="temperature-max"></div>
  <div id="wind-description"></div>
  <div id="humidity"></div>
  <div id="clouds"></div>
`;

describe("Função getCityName", () => {
  it("Deve retornar o nome da cidade corretamente", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          results: [
            { components: { city: "São Paulo", town: null, village: null } }
          ]
        })
      })
    );

    const cityName = await getCityName(-23.5505, -46.6333);
    expect(cityName).toBe("São Paulo");
  });

  it("Deve retornar 'Cidade desconhecida' se o nome da cidade não for encontrado", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: [] })
      })
    );
    const cityName = await getCityName(-23.5505, -46.6333);
    expect(cityName).toBe("Cidade desconhecida");
  });
});

describe("Função updateWeatherUI", () => {
  it("Deve atualizar os elementos do DOM com dados meteorológicos", () => {
    const mockData = {
      main: {
        temp: 298.15,
        temp_min: 295.15,
        temp_max: 300.15,
        humidity: 80,
      },
      wind: { speed: 5.5 },
      clouds: { all: 90 },
    };

    updateWeatherUI("São Paulo", mockData);

    expect(document.querySelector(".city").textContent).toBe("São Paulo");
    expect(document.getElementById("temperature").textContent).toBe("25°C");
    expect(document.getElementById("temperature-min").textContent).toBe("22°C");
    expect(document.getElementById("temperature-max").textContent).toBe("27°C");
    expect(document.getElementById("wind-description").textContent).toBe("5.5 m/s");
    expect(document.getElementById("humidity").textContent).toBe("80");
    expect(document.getElementById("clouds").textContent).toBe("90%");
  });
});
