// Nothing important, just to test some code
/*
import axios from 'axios'
axios.get(`${process.env.MARVEL_API_URL}/characters?apikey=${process.env.MARVEL_PUBLIC_KEY}`).then((value)=>{
    console.log(value);
});*/
const searchParams = {
    name: "Spider",
    comics: [1,2,3],
    stories: [1,2,3,4]
};
console.log(queryString.stringify(searchParams, {
    arrayFormat: 'comma'
}));

const callApiOnStart = () => {
    const query = queryString.stringify({
        apikey: process.env.MARVEL_PUBLIC_KEY,
        offset: 1480
    });
    const response = callApi(`characters?${query}`, Schemas.CHARACTER_ARRAY);
    response.then(value => {
        console.log(value);
    }).catch((err)=>{console.log(err.message)})
};

const callApiOnStart = () => {
    const url = "https://gateway.marvel.com:443/v1/public/characters?apikey=d87015f65201de1b95d31c9733f1e87d&offset=1480&name=?213?2132332";
    const query = queryString.parseUrl(url);
    console.log(query);
};