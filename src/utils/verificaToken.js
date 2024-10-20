export function isTokenValid( returnInfo ) {
    const token = localStorage.getItem('authToken');
    const expirationDate = localStorage.getItem('tokenExpiration');

    // Verifica se o token existe e se não expirou
    if (token && expirationDate) {
        const validDate = new Date().getTime() < expirationDate;
        // return validDate
        if (validDate) {
            if(returnInfo){
                return decodeJWT(token)
            }else{
                return token
            }
        }

    }

    return false;
}

export function decodeJWT(token) {
    // Divide o token em suas três partes
    const parts = token.split('.');

    // Verifica se o token possui três partes
    if (parts.length !== 3) {
        throw new Error('Token inválido!');
    }

    // A parte do meio é o payload (dados do token)
    const payload = parts[1];

    // Decodifica a string base64 para obter o JSON
    const decodedPayload = atob(payload);

    // Analisa o JSON para um objeto JavaScript
    try {
        return JSON.parse(decodedPayload);
    } catch (e) {
        throw new Error('Falha ao analisar o payload JSON');
    }
}

//essa aqui é pra deslogar o user
export function clearExpiredToken() {
    if (!isTokenValid()) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        console.log('Token expirado foi removido.');
    }
}