import { useEffect, useMemo, useState } from "react";
import "./App.css";
const products = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 59.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    title: "Smart Watch Series 8",
    category: "Electronics",
    price: 129.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    title: "Mechanical Keyboard",
    category: "Gaming",
    price: 89.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
  },
  {
    id: 4,
    title: "4K Ultra HD Monitor",
    category: "Electronics",
    price: 279.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    category: "Audio",
    price: 39.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
  },
  {
    id: 6,
    title: "Modern Desk Lamp",
    category: "Home",
    price: 34.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
  },
  {
    id: 7,
    title: "Running Shoes - Nike",
    category: "Fashion",
    price: 74.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 8,
    title: "Coffee Cups ",
    category: "Home",
    price: 49.99,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
  },
];
const categories = ["All", ...new Set(products.map((product) => product.category))];
function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("amazonCloneCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  useEffect(() => {
    localStorage.setItem("amazonCloneCart", JSON.stringify(cart));
  }, [cart]);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...currentCart, { ...product, qty: 1 }];
    });
  }
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }
  function clearCart() {
    setCart([]);
  }
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          amazon<span>.clone</span>
        </div>

        <input
          className="search"
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="cart-pill">Cart: {cartCount}</div>
      </header>

      <nav className="category-bar">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <section className="hero">
        <h1>Shop today’s deals</h1>
        <p>Fast delivery, everyday tech, fashion, and home essentials.</p>
      </section>
      <main className="layout">
        <section className="products">
          {filteredProducts.length === 0 ? (
            <div className="no-results">No products found.</div>
          ) : (
            filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />

                <div className="product-info">
                  <span className="category-label">{product.category}</span>
                  <h2>{product.title}</h2>
                  <p className="rating">
                    {"★".repeat(Math.floor(product.rating))} {product.rating}
                  </p>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </article>
            ))
          )}
        </section>

        <aside className="cart">
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>
                      ${item.price.toFixed(2)} × {item.qty}
                    </p>
                  </div>

                  <button onClick={() => removeFromCart(item.id)}>-</button>
                </div>
              ))}

              <div className="total">
                <span>Total</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              <button className="checkout">Checkout</button>
              <button className="secondary-button" onClick={clearCart}>
                Clear Cart
              </button>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
