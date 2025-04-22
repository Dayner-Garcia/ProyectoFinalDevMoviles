const BASE_URL = 'https://adamix.net/defensa_civil/def/';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}`);
    }

    return response.json();
}