import jsonServerProvider from 'ra-data-json-server';
import restProvider from 'ra-data-simple-rest';

const dataProviderRest = restProvider('https://five5-08t6.onrender.com/');
const dataProviderJson = jsonServerProvider('https://five5-08t6.onrender.com/');
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
