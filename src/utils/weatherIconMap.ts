export const weatherIconMap: Record<number, { day: string; night: string }> = {
    // гроза
    200: { day: 'thunderstorms-day-rain.svg', night: 'thunderstorms-night-rain.svg' },
    201: { day: 'thunderstorms-day-rain.svg', night: 'thunderstorms-night-rain.svg' },
    202: { day: 'thunderstorms-day-extreme-rain.svg', night: 'thunderstorms-night-extreme-rain.svg' },
    210: { day: 'thunderstorms-day.svg', night: 'thunderstorms-night.svg' },
    211: { day: 'thunderstorms-day.svg', night: 'thunderstorms-night.svg' },
    212: { day: 'thunderstorms-day-extreme.svg', night: 'thunderstorms-night-extreme.svg' },
    221: { day: 'thunderstorms-day.svg', night: 'thunderstorms-night.svg' },
    230: { day: 'thunderstorms-day-extreme-rain.svg', night: 'thunderstorms-night-extreme-rain.svg' },
    231: { day: 'thunderstorms-day-rain.svg', night: 'thunderstorms-night-rain.svg' },
    232: { day: 'thunderstorms-day-extreme-rain.svg', night: 'thunderstorms-night-extreme-rain.svg' },

    // морось
    300: { day: 'drizzle.svg', night: 'extreme-night-drizzle.svg' },
    301: { day: 'overcast-day-drizzle.svg', night: 'overcast-night-drizzle.svg' },
    302: { day: 'partly-cloudy-day-drizzle.svg', night: 'partly-cloudy-night-drizzle.svg' },
    310: { day: 'rain.svg', night: 'rain.svg' },
    311: { day: 'overcast-day-rain.svg', night: 'overcast-night-rain.svg' },
    312: { day: 'thunderstorms-day-rain.svg', night: 'thunderstorms-night-rain.svg' },
    313: { day: 'extreme-day-drizzle.svg', night: 'extreme-night-drizzle.svg' },
    314: { day: 'overcast-day-drizzle.svg', night: 'overcast-night-drizzle.svg' },
    321: { day: 'drizzle.svg', night: 'extreme-night-drizzle.svg' },

    // дождь
    500: { day: 'rain.svg', night: 'rain.svg' },
    501: { day: 'overcast-day-rain.svg', night: 'overcast-night-rain.svg' },
    502: { day: 'extreme-day-rain.svg', night: 'extreme-night-rain.svg' },
    503: { day: 'thunderstorms-day-rain.svg', night: 'thunderstorms-night-rain.svg' },
    504: { day: 'thunderstorms-day-extreme-rain.svg', night: 'thunderstorms-night-extreme-rain.svg' },
    511: { day: 'sleet.svg', night: 'extreme-night-sleet.svg' },
    520: { day: 'rain.svg', night: 'rain.svg' },
    521: { day: 'overcast-day-rain.svg', night: 'overcast-night-rain.svg' },
    522: { day: 'extreme-day-rain.svg', night: 'extreme-night-rain.svg' },
    531: { day: 'thunderstorms-overcast-rain.svg', night: 'thunderstorms-night-overcast-rain.svg' },

    // снег
    600: { day: 'snow.svg', night: 'snow.svg' },
    601: { day: 'snow.svg', night: 'snow.svg' },
    602: { day: 'extreme-day-snow.svg', night: 'extreme-night-snow.svg' },
    611: { day: 'sleet.svg', night: 'extreme-night-sleet.svg' },
    612: { day: 'sleet.svg', night: 'extreme-night-sleet.svg' },
    613: { day: 'sleet.svg', night: 'extreme-night-sleet.svg' },
    615: { day: 'sleet.svg', night: 'extreme-night-sleet.svg' },
    616: { day: 'sleet.svg', night: 'extreme-night-sleet.svg' },
    620: { day: 'snow.svg', night: 'snow.svg' },
    621: { day: 'snow.svg', night: 'snow.svg' },
    622: { day: 'extreme-day-snow.svg', night: 'extreme-night-snow.svg' },

    // атмосферные явления
    701: { day: 'mist.svg', night: 'mist.svg' },
    711: { day: 'smoke.svg', night: 'smoke.svg' },
    721: { day: 'haze-day.svg', night: 'haze-night.svg' },
    731: { day: 'dust.svg', night: 'dust.svg' },
    741: { day: 'fog-day.svg', night: 'fog-night.svg' },
    751: { day: 'dust.svg', night: 'dust.svg' },
    761: { day: 'dust.svg', night: 'dust.svg' },
    762: { day: 'dust.svg', night: 'dust.svg' },
    771: { day: 'wind.svg', night: 'wind.svg' },
    781: { day: 'tornado.svg', night: 'tornado.svg' },

    // ясно
    800: { day: 'clear-day.svg', night: 'clear-night.svg' },

    // облака
    801: { day: 'partly-cloudy-day.svg', night: 'partly-cloudy-night.svg' },
    802: { day: 'cloudy.svg', night: 'cloudy.svg' },
    803: { day: 'overcast-day.svg', night: 'overcast-night.svg' },
    804: { day: 'overcast-day.svg', night: 'overcast-night.svg' },
};
