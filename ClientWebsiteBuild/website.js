const products = [
  {
    id: 1,
    title: "Classic Black 'Cross' Hoodie",
    price: 21.99,
    originalPrice: 45.00,
    rating: 4.9,
    reviews: 214,
    category: "bestsellers",
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    description: "Classic black heavyweight fleece with white embroidered chest cross emblem. Premium pre-shrunk cotton blend."
  },
  {
    id: 2,
    title: "Heavyweight Sand Hoodie",
    price: 24.99,
    originalPrice: 48.00,
    rating: 4.8,
    reviews: 142,
    category: "bestsellers",
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80",
    description: "Warm sand colorway with tone-on-tone cross sleeve embroidery. Ultra-dense 450GSM construction."
  },
  {
    id: 3,
    title: "Vintage Grey Overhead Hoodie",
    price: 19.99,
    originalPrice: 38.00,
    rating: 4.9,
    reviews: 98,
    category: "clearance",
    badge: "CLEARANCE $19.99",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
    description: "Acid-washed vintage heather grey pullover with double-layer drawstring hood."
  },
  {
    id: 4,
    title: "Pastel Lavender Fleece",
    price: 22.99,
    originalPrice: 42.00,
    rating: 4.7,
    reviews: 87,
    category: "all",
    badge: "NEW COLOR",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    description: "Soft pastel lavender garment dyed cotton fleece with subtle chest logo."
  },
  {
    id: 5,
    title: "Deep Forest Green Pullover",
    price: 23.99,
    originalPrice: 44.00,
    rating: 4.8,
    reviews: 119,
    category: "bestsellers",
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80",
    description: "Rich forest green boxy fleece pullover featuring custom gold cross sleeve crest."
  },
  {
    id: 6,
    title: "Midnight Navy Oversized",
    price: 24.99,
    originalPrice: 46.00,
    rating: 4.9,
    reviews: 153,
    category: "bestsellers",
    badge: "HEAVYWEIGHT",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
    description: "Oversized midnight navy silhouette with drop-shoulder tailoring and fleece lining."
  },
  {
    id: 7,
    title: "Minimalist White Embroidered",
    price: 21.99,
    originalPrice: 40.00,
    rating: 4.6,
    reviews: 64,
    category: "all",
    badge: "CLEAN LOOK",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    description: "Crisp white heavy knit hoodie with black high-density cross stitching."
  },
  {
    id: 8,
    title: "Charcoal Wash Streetwear Hoodie",
    price: 22.99,
    originalPrice: 42.50,
    rating: 4.8,
    reviews: 76,
    category: "all",
    badge: "STREETWEAR",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80",
    description: "Washed charcoal stone finish with distressed ribbing and signature chest mark."
  },
  {
    id: 9,
    title: "Rust Orange Boxy Fit",
    price: 20.99,
    originalPrice: 39.00,
    rating: 4.7,
    reviews: 104,
    category: "clearance",
    badge: "STEAL",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
    description: "Earth tone rust orange hoodie in custom relaxed boxy fit with pouch pocket."
  },
  {
    id: 10,
    title: "Crimson Cross Edition",
    price: 24.99,
    originalPrice: 48.00,
    rating: 4.9,
    reviews: 188,
    category: "bestsellers",
    badge: "LIMITED DROP",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    description: "Deep crimson red heavy cotton hoodie with velvet touch cross chest crest."
  }
];

let cart = [];
let selectedHeroSize = 'M';
let selectedCategory = 'all';
let selectedItemSizes = {};

function renderProducts(query = '') {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  document.getElementById('item-count-label').textContent = filteredProducts.length;

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-sm font-bold text-slate-500 uppercase tracking-widest">No hoodies found matching your search.</p>
      </div>
    `;
    return;
  }

  filteredProducts.forEach(product => {
    const currentSize = selectedItemSizes[product.id] || 'M';

    const productHTML = `
      <div class="product-card bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between h-full relative group">
        
        <div class="relative mb-3 overflow-hidden rounded-xl bg-slate-900 aspect-[4/5]">
          <span class="absolute top-3 left-3 z-10 bg-black/90 text-amber-400 border border-amber-400/30 text-[9px] font-black px-2.5 py-1 rounded-md tracking-widest uppercase">
            ✝ ${product.badge}
          </span>
          
          <button data-action="wishlist" class="wishlist-btn absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center text-xs transition-colors shadow">
            <i class="fa-regular fa-heart"></i>
          </button>

          <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90">
          
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button data-action="quickview" data-id="${product.id}" class="bg-white text-black font-extrabold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-lg hover:bg-amber-400 transition-colors">
              Quick View
            </button>
          </div>
        </div>

        <div class="space-y-3 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1 text-amber-500 text-[10px] mb-1">
              <i class="fa-solid fa-star"></i>
              <span class="font-bold text-slate-800">${product.rating}</span>
              <span class="text-slate-400">(${product.reviews})</span>
            </div>
            <h3 class="font-black text-slate-900 text-xs uppercase tracking-wide leading-snug">${product.title}</h3>
            <p class="text-[10px] text-slate-500 font-semibold mt-0.5">Heavyweight Cotton Fleece</p>
          </div>

          <!-- Size Selector -->
          <div class="space-y-1">
            <span class="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">Size:</span>
            <div class="flex gap-1">
              ${['S', 'M', 'L', 'XL', '2XL'].map(sz => `
                <button data-action="set-size" data-id="${product.id}" data-size="${sz}" class="flex-1 py-1 rounded border text-[10px] font-bold transition-all ${sz === currentSize ? 'border-black bg-black text-white' : 'border-slate-200 text-slate-600 hover:border-black'}">
                  ${sz}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Price & CTA -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-base font-black text-slate-900">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="text-xs text-slate-400 line-through ml-1">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>

            <button data-action="add-cart" data-id="${product.id}" class="bg-black hover:bg-amber-400 hover:text-black text-white font-extrabold text-[10px] uppercase tracking-wider py-2 px-3 rounded-xl transition-all shadow flex items-center gap-1.5">
              <i class="fa-solid fa-bag-shopping"></i>
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>

      </div>
    `;

    container.innerHTML += productHTML;
  });
}

function setItemSize(productId, size) {
  selectedItemSizes[productId] = size;
  renderProducts(document.getElementById('search-input').value);
}

function selectHeroSize(size) {
  selectedHeroSize = size;
  const sizeLabels = { 'S': 'S (Small)', 'M': 'M (Medium)', 'L': 'L (Large)', 'XL': 'XL (Extra Large)', 'XXL': '2XL (Double Large)' };
  document.getElementById('selected-hero-size-label').textContent = sizeLabels[size] || `${size} (${size})`;
  
  document.querySelectorAll('.hero-size-btn').forEach(btn => {
    if (btn.dataset.size === size) {
      btn.className = 'hero-size-btn active flex-1 py-2 rounded-lg border border-black bg-black text-white font-bold text-xs transition-all';
    } else {
      btn.className = 'hero-size-btn flex-1 py-2 rounded-lg border border-slate-300 font-bold text-xs hover:border-black transition-all';
    }
  });
}

function addHeroProductToCart() {
  addToCart(1, selectedHeroSize);
}

function addToCart(productId, explicitSize = null) {
  const product = products.find(p => p.id === productId);
  const size = explicitSize || selectedItemSizes[productId] || 'M';
  const cartItemKey = `${productId}-${size}`;
  const existingItem = cart.find(item => item.cartKey === cartItemKey);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, size, cartKey: cartItemKey, quantity: 1 });
  }

  updateCartUI();
  showNotification(`Added "${product.title}" (${size}) to cart!`);
}

function updateQuantity(cartKey, delta) {
  const item = cart.find(i => i.cartKey === cartKey);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.cartKey !== cartKey);
    }
  }
  updateCartUI();
}

function updateCartUI() {
  const cartCountEl = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartCountEl.textContent = totalCount;
  subtotalEl.textContent = `$${totalSubtotal.toFixed(2)}`;
  totalEl.textContent = `$${totalSubtotal.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="text-center py-16 space-y-4">
        <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl mx-auto">
          <i class="fa-solid fa-bag-shopping"></i>
        </div>
        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">YOUR CART IS EMPTY</p>
      </div>
    `;
    return;
  }

  cartItemsList.innerHTML = cart.map(item => `
    <div class="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
      <img src="${item.image}" alt="${item.title}" class="w-16 h-20 rounded-xl object-cover bg-black">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1">
          <span class="text-[10px] font-black text-amber-500">✝</span>
          <h4 class="font-black text-xs text-slate-900 truncate uppercase tracking-wider">${item.title}</h4>
        </div>
        <p class="text-[10px] font-bold text-slate-500 uppercase mt-0.5">SIZE: <span class="text-black">${item.size}</span></p>
        <p class="text-xs text-black font-black mt-1">$${(item.price * item.quantity).toFixed(2)}</p>
        
        <div class="flex items-center gap-2 mt-2">
          <button data-action="cart-qty" data-key="${item.cartKey}" data-delta="-1" class="w-6 h-6 rounded bg-white border border-slate-300 text-slate-800 flex items-center justify-center text-xs font-bold hover:bg-black hover:text-white transition-colors">-</button>
          <span class="text-xs font-extrabold text-slate-900">${item.quantity}</span>
          <button data-action="cart-qty" data-key="${item.cartKey}" data-delta="1" class="w-6 h-6 rounded bg-white border border-slate-300 text-slate-800 flex items-center justify-center text-xs font-bold hover:bg-black hover:text-white transition-colors">+</button>
        </div>
      </div>
      <button data-action="cart-delete" data-key="${item.cartKey}" data-qty="${item.quantity}" class="text-slate-400 hover:text-red-600 text-xs p-2">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('hidden');
}

function filterCategory(category) {
  selectedCategory = category;
  
  document.querySelectorAll('[data-filter]').forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('bg-black', 'text-white');
      btn.classList.remove('text-slate-600');
    } else {
      btn.classList.remove('bg-black', 'text-white');
      btn.classList.add('text-slate-600');
    }
  });

  renderProducts(document.getElementById('search-input').value);
}

function handleSearch() {
  const query = document.getElementById('search-input').value;
  renderProducts(query);
}

function toggleWishlist(btn) {
  const icon = btn.querySelector('i');
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid', 'text-red-500');
    showNotification('Saved to wishlist!');
  } else {
    icon.classList.remove('fa-solid', 'text-red-500');
    icon.classList.add('fa-regular');
  }
}

function openQuickView(id) {
  const product = products.find(p => p.id === id);
  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-content');

  content.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
      <div class="rounded-2xl overflow-hidden bg-black aspect-[4/5]">
        <img src="${product.image}" class="w-full h-full object-cover">
      </div>
      <div class="space-y-4">
        <span class="text-xs font-black text-amber-500 uppercase tracking-widest">✝ ${product.badge}</span>
        <h3 class="text-xl font-black text-slate-900 uppercase tracking-wide leading-tight">${product.title}</h3>
        <p class="text-xs text-slate-600 font-medium">${product.description}</p>
        <div class="text-2xl font-black text-black">$${product.price.toFixed(2)}</div>
        
        <button data-action="quickview-add" data-id="${product.id}" class="w-full bg-black text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-slate-800 transition-colors">
          ADD TO CART
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeQuickView() {
  document.getElementById('quickview-modal').classList.add('hidden');
}

function showNotification(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  toastMsg.textContent = msg;
  toast.classList.remove('translate-y-24', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 3000);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToAbout() {
  document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
}

function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!");
    return;
  }
  showNotification("Direct order placed! No subscription or recurring fees.");
  cart = [];
  updateCartUI();
  toggleCart();
}

// Event Listeners setup to handle all user interactions cleanly without inline HTML events
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();

  // Navigation click listeners
  document.getElementById('brand-logo').addEventListener('click', scrollToTop);
  document.getElementById('nav-about-btn').addEventListener('click', scrollToAbout);
  document.getElementById('search-input').addEventListener('keyup', handleSearch);
  document.getElementById('wishlist-btn').addEventListener('click', () => showNotification('Saved item to your browser wishlist!'));
  document.getElementById('cart-toggle-btn').addEventListener('click', toggleCart);
  document.getElementById('close-cart-btn').addEventListener('click', toggleCart);
  document.getElementById('close-quickview-btn').addEventListener('click', closeQuickView);
  document.getElementById('checkout-btn').addEventListener('click', checkout);
  
  // Hero Section listeners
  document.getElementById('hero-size-selector').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn && btn.dataset.size) {
      selectHeroSize(btn.dataset.size);
    }
  });

  document.getElementById('hero-add-cart-btn').addEventListener('click', addHeroProductToCart);
  document.getElementById('hero-quickview-btn').addEventListener('click', () => openQuickView(1));

  // Category filters (nav & footer)
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      filterCategory(el.getAttribute('data-filter'));
    });
  });

  // Footer Toast triggers
  document.querySelectorAll('[data-toast]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showNotification(el.getAttribute('data-toast'));
    });
  });

  // Event Delegation for Dynamic Container Elements (Catalog products & Quickview)
  document.getElementById('products-container').addEventListener('click', (e) => {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const id = parseInt(actionBtn.dataset.id, 10);

    if (action === 'wishlist') {
      toggleWishlist(actionBtn);
    } else if (action === 'quickview') {
      openQuickView(id);
    } else if (action === 'set-size') {
      setItemSize(id, actionBtn.dataset.size);
    } else if (action === 'add-cart') {
      addToCart(id);
    }
  });

  document.getElementById('cart-items-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const key = btn.dataset.key;
    if (btn.dataset.action === 'cart-qty') {
      updateQuantity(key, parseInt(btn.dataset.delta, 10));
    } else if (btn.dataset.action === 'cart-delete') {
      updateQuantity(key, -parseInt(btn.dataset.qty, 10));
    }
  });

  document.getElementById('quickview-content').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="quickview-add"]');
    if (btn) {
      addToCart(parseInt(btn.dataset.id, 10));
      closeQuickView();
    }
  });
});