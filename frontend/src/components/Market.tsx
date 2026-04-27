import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Market() {
  const [products, setProducts] = useState<Product[]>([]);
  const [usId, setUsId] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("ughhh products nah", err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users) => {
        if (users.length > 0) {
          setUsId(users[0]._id || users[0].id);
        }
      });
  }, []);

  const handleBuy = async (productId: string, price: number) => {
    if (!usId) return;

    try {
      const response = await fetch(`http://localhost:5000/users/${usId}/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, price }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error);
        return;
      }

      window.dispatchEvent(new Event("groshi"));
      console.log("Successfully bought!");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {products.map((item) => (
        <div
          key={item.id}
          className="item-card flex flex-col gap-4 sm:flex-row sm:items-start"
        >
          <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-pink-hot/20 bg-black/15 sm:w-36">
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 object-contain"
            />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-2xl font-black leading-tight">
              {item.name}
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              {item.description}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-pink-hot/30 bg-pink-hot/10 px-4 py-2 text-lg font-black text-pink-light sm:self-center">
            <DollarSign size={20} />
            <span>{item.price}</span>
          </div>
          <button
            onClick={() => handleBuy(item.id, item.price)}
            className="flex items-center justify-center gap-2 px-6 sm:self-center"
          >
            <ShoppingCart size={18} />
            <span>Buy</span>
          </button>
        </div>
      ))}
    </div>
  );
}
