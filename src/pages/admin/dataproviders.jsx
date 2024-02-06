import jsonServerProvider from 'ra-data-json-server';
import restProvider from 'ra-data-simple-rest';

const dataProviderRest = restProvider('http://localhost:3000');
const dataProviderJson = jsonServerProvider('http://localhost:8000');
console.log('superDataProvider - update', dataProviderRest, dataProviderJson);

export const superDataProvider = {
    ...dataProviderJson,

    update: (resource, params) => {
        console.log('superDataProvider - update', resource, params);

        if (resource === 'users') {
            
            return dataProviderRest.update(resource, params);
        }

        return dataProviderJson.update(resource, params);
    }
}
