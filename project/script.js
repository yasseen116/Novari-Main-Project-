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

const products = [
    {
        id: 1,
        title: "Knitted Crewneck",
        price: 49.99,
        image: "images/product1.jpg",
        hoverImage: "images/product1-alt.jpg"
    },
    {
        id: 2,
        title: "Leather Jacket",
        price: 129.99,
        image: "images/leather-jacket.jpg",
        hoverImage: "images/leather-jacket-alt.jpg"
    },
    {
        id: 3,
        title: "Pants",
        price: 59.99,
        image: "images/pants.jpg",
        hoverImage: "images/pants-alt.jpg"
    }
];

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = products
        .map(
            (product) => `
            <div class="col-md-4">
                <div class="card product-card">
                    <div class="product-image-container">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
                        <img src="${product.hoverImage}" class="card-img-top product-image hover-image" alt="${product.title} - Alternate View">
                        <i class="fas fa-heart favorite-icon" onclick="addToFavorites(${product.id})"></i>
                    </div>
                    <div class="card-body text-center">
                        <h5 class="product-title">${product.title}</h5>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <select class="form-select mb-3 size-select">
                            <option value="" disabled selected>Select Size</option>
                            <option value="S">Small (S)</option>
                            <option value="M">Medium (M)</option>
                            <option value="L">Large (L)</option>
                        </select>
                        <button class="btn btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `
        )
        .join("");
}

// Function to add a product to favorites
function addToFavorites(productId) {
    const favoriteIcon = document.querySelector(`.favorite-icon[onclick="addToFavorites(${productId})"]`);
    favoriteIcon.classList.toggle("active"); // Toggle the favorite state
    const product = products.find((p) => p.id === productId);
    if (favoriteIcon.classList.contains("active")) {
        console.log(`Added to favorites: ${product.title}`);
        alert(`Added to favorites: ${product.title}`);
    } else {
        console.log(`Removed from favorites: ${product.title}`);
        alert(`Removed from favorites: ${product.title}`);
    }
}

// Function to add a product to the cart
function addToCart(productId) {
    const sizeSelect = document.querySelector(`.size-select[onchange="addToCart(${productId})"]`);
    const selectedSize = sizeSelect.value;

    if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
    }

    const product = products.find((p) => p.id === productId);
    console.log(`Added to cart: ${product.title} (Size: ${selectedSize})`);
    alert(`Added to cart: ${product.title} (Size: ${selectedSize})`);
}

// Fetch and display products for the current page
if (window.location.pathname.includes("index.html")) {
    displayProducts(products, "featured-products");
} else if (window.location.pathname.includes("shop.html")) {
    displayProducts(products, "all-products");
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