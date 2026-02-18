const apiKey = "dbf7915af28bc6c4039f60c154924da5"; 
const els = {
    input: document.getElementById('cityInput'),
    btn: document.getElementById('searchBtn'),
    ui: document.getElementById('weatherUI'),
    loader: document.getElementById('loader'),
    error: document.getElementById('error')
};

let lastCity = localStorage.getItem('lastCity');
if (lastCity) fetchWeather(lastCity);

els.btn.addEventListener('click', () => fetchWeather(els.input.value));
els.input.addEventListener('keypress', (e) => e.key === 'Enter' && fetchWeather(els.input.value));

async function fetchWeather(city) {
    if (!city) return;
    
    toggleState('loading');
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const res = await fetch(url);
        
        if (!res.ok) throw new Error(res.status === 404 ? "City not found" : "Network error");
        
        const data = await res.json();
        updateUI(data);
        localStorage.setItem('lastCity', city);
        toggleState('success');
    } catch (err) {
        els.error.textContent = err.message;
        toggleState('error');
    }
}

function updateUI(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('desc').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;
}

function toggleState(state) {
    els.loader.style.display = state === 'loading' ? 'block' : 'none';
    els.ui.style.display = state === 'success' ? 'block' : 'none';
    els.error.style.display = state === 'error' ? 'block' : 'none';
    if(state === 'loading') els.error.style.display = 'none';
}