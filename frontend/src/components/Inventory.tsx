import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Item {
  product: Product;
  count: number;
}

export default function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    const fetchInv = async () => {
      try {
        const [usersRes, prodsRes] = await Promise.all([
          fetch("http://localhost:5000/users"),
          fetch("http://localhost:5000/products"),
        ]);
        const users = await usersRes.json();
        const allProds: Product[] = await prodsRes.json();
        const curr = users[0];

        if (curr && curr.inventory) {
          const uniqueId = Array.from(new Set(curr.inventory));
          const allItems = uniqueId.map((id) => {
            const product = allProds.find((product) => product.id === id);
            const count = curr.inventory.filter(
              (itemId: string) => itemId === id,
            ).length;
            return { product, count };
          });
          setItems(
            allItems.filter((item) => item.product !== undefined) as Item[],
          );
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchInv();
  }, []);

  const itemQ = (itemId: string) => {
    let newQ;
    if (queue.includes(itemId)) {
      newQ = queue.filter((id) => id !== itemId);
    } else if (queue.length >= 2) {
      alert("You can take up to 2 items");
      return;
    } else {
      newQ = [...queue, itemId];
    }
    setQueue(newQ);
    window.dispatchEvent(new CustomEvent("heistItemsUpd", { detail: newQ }));
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
      {items.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 border border-dashed border-gray-600/50 rounded-lg p-10">
          <p className="text-lg mb-2">Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={`${item.product.id}-${index}`}
              className="relative flex flex-col rounded-lg border border-pink-hot/20 bg-card-dark/50 p-3 hover:border-pink-hot/50 transition-colors"
            >
              {item.count > 1 && (
                <div className="absolute top-2 right-2 bg-pink-300 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                  x{item.count}
                </div>
              )}

              <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden  sm:w-60">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-24 w-24 object-contain"
                />
              </div>

              <div className="text-center">
                <h2 className="text-sm font-bold text-text-light line-clamp-1">
                  {item.product.name}
                </h2>
              </div>

              <button
                onClick={() => itemQ(item.product.id)}
                className={`mt-2 px-4 py-1 rounded font-bold ${queue.includes(item.product.id) ? "bg-pink-300 text-white border-2 border-white" : "bg-black text-pink-hot border-2 border-pink-hot"}`}
              >
                {queue.includes(item.product.id) ? "Picked" : "Pick"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
