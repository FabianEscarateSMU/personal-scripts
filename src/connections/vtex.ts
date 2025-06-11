
const {
    X_VTEX_BASE_URL_ALVI,
    X_VTEX_API_KEY_ALVI,
    X_VTEX_API_TOKEN_ALVI
} = process.env;

const headers = {
    'Content-Type': 'application/json',
    'X-VTEX-API-AppKey': `${X_VTEX_API_KEY_ALVI}`,
    'X-VTEX-API-AppToken': `${X_VTEX_API_TOKEN_ALVI}`
};

export const Vtex = {
    API_BASE_URL: `${X_VTEX_BASE_URL_ALVI}/api`,
    showUrl: () => {
        console.log(`${Vtex.API_BASE_URL}`);
    },
    fetchCustomersWithAmpersand: async () => {
        const url = `${Vtex.API_BASE_URL}/dataentities/CL/search?_fields=firstName,lastName,email,document,phone,corporateName&_size=100`;
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    },
    getCustomerAndCorporateNameIdByEmail: async (email: string) => {
        const url = `${Vtex.API_BASE_URL}/dataentities/CL/search?email=${encodeURIComponent(email)}&_fields=id,userId,corporateName`;
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) {
            throw new Error(`No customer found with email: ${email}`);
        }
        return data[0];
    },
    updateCorporateName: async (userId: string, newCorporateName: string) => {
        const url = `${Vtex.API_BASE_URL}/dataentities/CL/documents/`;
        const body = JSON.stringify({ 
            userId: userId,
            corporateName: newCorporateName 
        });

        const response = await fetch(url, {
            method: 'PATCH',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} message: ${await response.text()}`);
        }

        return response.json();
    }
}