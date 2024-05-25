async function dataFetch(endPoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endPoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export { dataFetch };