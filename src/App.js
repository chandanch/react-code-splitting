import React, { useState, lazy, Suspense } from 'react';
const ProductDetails = lazy(() => import('./components/ProductDetails'));

function App() {
    const [productsList, setProducts] = useState([]);

    const renderProductsList = async () => {
        const products = (
            await import(
                './data/productsData' /* webpackChunkName: "productsData" */
            )
        ).products;
        const ProductCategory = lazy(() =>
            import('./components/ProductCategory')
        );
        const productsListRender = products.map((product) => {
            return (
                <li key={product.name}>
                    {product.name} -- ${product.price}
                    <ProductCategory category={'Food'} />
                </li>
            );
        });
        setProducts(productsListRender);
    };

    return (
        <div className="App">
            <h1> React Code Splitting</h1>
            <hr />
            <h2>Products List</h2>
            <button onClick={renderProductsList}>Show Products</button>
            <ul>{productsList.length > 0 ? productsList : ''}</ul>
            <Suspense fallback={<p>Loading...</p>}>
                <ProductDetails />
            </Suspense>
        </div>
    );
}

export default App;
