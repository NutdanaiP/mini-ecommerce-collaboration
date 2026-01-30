document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader'); // อ้างอิงถึง loader
    let allProducts = [];

    // 1. แสดง Loader ทันทีก่อนเริ่ม Fetch
    loader.style.display = 'block';

    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .catch(error => {
            console.error('Error:', error);
            loader.textContent = 'ไม่สามารถโหลดข้อมูลได้';
        })
        .finally(() => {
            // 2. ซ่อน Loader เมื่อ fetch เสร็จสิ้น (ไม่ว่าจะสำเร็จหรือ error)
            loader.style.display = 'none';
        });

    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        
        if (products.length === 0) {
            productList.innerHTML = '<p>ไม่พบสินค้าที่ค้นหา</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // Search Logic ปรับปรุง logic 
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => {
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });
});