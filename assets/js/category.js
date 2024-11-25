
const getProducts = async () => {

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return data;
}

const displayProducts = async () =>{

    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    try{
        const product = await getProducts();
        const result = product.products.map((element) => {
            return `
            <div class="product">
                <h2>${element.title}</h2>
                <img src="${element.thumbnail}"/>
            </div>
            `;
        }).join(" ");
        document.querySelector('.products .row').innerHTML = result;
    }
    catch{
        document.querySelector('.products .row').innerHTML = `<p style="color: #fff;">"error during display data</p>`;
    }
    finally{
        loader.classList.remove('active');
    }

}
displayProducts();