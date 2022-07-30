const API = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=FLqCJlOD1eO4woyVdmxIA7EQ&part=snippet&maxResults=50';

const content = null || document.getElementById('content'); // capturo el elemento del DOM donde voy a insertar el contenido
const DUrl = "video.snippet.thumbnails.high.url";

const options = { // opciones de la petición
	method: 'GET', // método de la petición
	headers: {
		'X-RapidAPI-Key': 'fcb7a22246msh1ec87a03bc09bf3p105053jsn3b07615bc535', // API KEY
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com' // HOST
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => { //función que se llama a sí misma
    try{
        const videos = await fetchData(API); // llamada a la función que hace la petición
        let view = `
        ${videos.items.map(video => ` 
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">

                    <img src="${video.snippet.thumbnails.high.url}"  
                    alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0, 4).join('')}
        `;
        content.innerHTML = view; // inserto el contenido en el elemento del DOM
    }catch (error){
        console.log(error);
    }
})();

// videos.items es un array de objetos que contiene la información de los videos
// map es un mètodo que recorre un arreglo y devuelve un nuevo arreglo