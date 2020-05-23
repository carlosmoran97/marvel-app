export default function(resource) {
    const resourceURI = resource.resourceURI.split('/');
    const data = {
        id: resourceURI[resourceURI.length - 1],
        name: resource.name
    };
    return data;
};