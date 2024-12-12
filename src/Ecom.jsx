import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import CategoryFilter from "./CategoryFilter";

function Ecom() {
    const [products, setProducts] = useState([]); // Ensure products is initialized to an empty array
    const [categories, setCategories] = useState([]);
    const [searchterm, setSearchterm] = useState("");
    const [sortorder, setSortorder] = useState("asc");
    const [selectedcategory, setSelectedcategory] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));

        fetch('http://localhost:8080/api/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchterm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortorder(event.target.value);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedcategory(categoryId ? Number(categoryId) : null);
    };

    const filteredProducts = products
    .filter((product) => {
        return (selectedcategory ? product.category.id === selectedcategory : true)
        && product.name.toLowerCase().includes(searchterm.toLowerCase());
    })
    .sort((a,b) => {
        if(sortorder === "asc"){
            return a.price - b.price;
        }else{
            return b.price - a.price;
        }
    });

    return (
        <div className="container">
            <h1 className="my-4">Product Catalog</h1>
            <div className="row align-items-center mb-4">
                <div className="col-md-3 col-sm-12 mb">
                    <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
                </div>
                <div className="col-md-5 col-sm-12 mb-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for products"
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="col-md-4 col-sm-12 mb-2">
                    <select className="form-control" onChange={handleSortChange}>
                        <option value="asc">Sort by price: Low to High</option>
                        <option value="desc">Sort by price: High to Low</option>
                    </select>
                </div>
            </div>
            <div>
                {filteredProducts.length ? (
                    <ProductList products={filteredProducts} /> // Pass filteredProducts as a prop
                ) : (
                    <p>No products to display</p>
                )}
            </div>
        </div>
    );
}

export default Ecom;
