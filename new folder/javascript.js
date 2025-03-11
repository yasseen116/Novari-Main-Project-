// script.js

const API_URL = "https://jsonplaceholder.typicode.com/photos"; // Mock API

// Fetch and display products
async function fetchProducts(containerId) {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        displayProducts(products, containerId);
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById(containerId).innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}

// Display products
function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = products
        .map(
            (product) => `
            <div class="col-md-4">
                <div class="card product-card">
                    <div class="product-image-container">
                        <img src="${product.url}" class="card-img-top product-image" alt="${product.title}">
                        <img src="${product.thumbnailUrl}" class="card-img-top product-image hover-image" alt="${product.title} - Alternate View">
                    </div>
                    <div class="card-body text-center">
                        <h5 class="product-title">${product.title}</h5>
                        <p class="product-price">$49.99</p>
                        <button class="btn btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `
        )
        .join("");
}

// Add product to cart
function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    // Implement cart logic here
}

// Admin: Add product
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const product = {
        name: document.getElementById("product-name").value,
        price: document.getElementById("product-price").value,
        image: document.getElementById("product-image").value,
    };
    console.log("Adding product:", product);
    // Implement API call to add product
});

// Admin: Remove product
document.getElementById("remove-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const productId = document.getElementById("product-id").value;
    console.log(`Removing product with ID: ${productId}`);
    // Implement API call to remove product
});

// Fetch products for each page
if (window.location.pathname.includes("index.html")) {
    fetchProducts("featured-products");
} else if (window.location.pathname.includes("shop.html")) {
    fetchProducts("all-products");
}