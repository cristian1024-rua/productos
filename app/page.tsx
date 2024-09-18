'use client';
import { useState } from 'react';

// Definimos una interfaz para los productos
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [checkout, setCheckout] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'Queso campesino',
      price: 5000,
      description: 'Ingredientes: Leche, cuajo, sal',
      image: 'https://organicosnutriandina.com/wp-content/uploads/2020/02/Queso-campesino-Org%C3%A1nicos-Nutriandina.png',
    },
    {
      id: 2,
      name: 'Yogurt Natural',
      price: 2000,
      description: 'Ingredientes: Leche, cultivos lácteos',
      image: 'https://sembrandoconfianza.com/wp-content/uploads/2022/04/Fotos-para-producto-2-scaled.webp',
    },
    {
      id: 3,
      name: 'Queso doblecrema',
      price: 7000,
      description: 'Ingredientes: Leche, cuajo, sal',
      image: 'https://i0.wp.com/rancholosalamos.co/wp-content/uploads/2021/07/DobleCrema_2500.jpg?fit=1000%2C1000&ssl=1',
    },
    {
      id: 4,
      name: 'Leche Entera',
      price: 2500,
      description: 'Leche pasteurizada',
      image: 'https://lacteoslaesmeralda.com/wp-content/uploads/2021/05/leche-2.png',
    },
    {
      id: 5,
      name: 'Crema de Leche',
      price: 4000,
      description: 'Ideal para cocinar y repostería',
      image: 'https://i0.wp.com/lacteoslevelma.com/wp-content/uploads/2021/05/62-crema-de-leche-500.png?fit=1230%2C895&ssl=1',
    },
    {
      id: 6,
      name: 'Fresas con crema',
      price: 3500,
      description: 'Ingredientes: crema de leche, fresa, azúcar',
      image: 'https://i.pinimg.com/736x/18/ba/d6/18bad67a48022b95917c730a272e71ab.jpg',
    },
    {
      id: 7,
      name: 'Quesadillas',
      price: 2500,
      description: 'Ingredientes: Quesillo, dulce de guayaba',
      image: 'https://maclic.imgix.net/places/QlkSMHz6nSa8JYlhxZBp/products/new/1573155896429-IMG_6142.jpg?auto=format%2Ccompress&fit=crop&ar=16%3A14&crop=edges&ixlib=react-9.3.0',
    },
    {
      id: 8,
      name: 'Ensalada de frutas',
      price: 8500,
      description: 'Ingredientes: Helado, frutas, queso, salsas dulces',
      image: 'https://i.pinimg.com/originals/43/1e/2d/431e2d0ac4509aa4f7780d8f48095005.jpg',
    },
    {
      id: 9,
      name: 'Mantequilla',
      price: 4000,
      description: 'Ingredientes: Leche, sal',
      image: 'https://thefoodtech.com/wp-content/uploads/2022/09/margarina-828x548.jpeg',
    },
  ];

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setTotal(total + product.price);
    showNotification(`${product.name} ha sido agregado al carrito`);
  };

  const removeFromCart = (index: number) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto del carrito?');
    if (confirmed) {
      const updatedCart = [...cart];
      const productPrice = updatedCart[index].price;
      updatedCart.splice(index, 1);
      setCart(updatedCart);
      setTotal(total - productPrice);
      showNotification('Producto eliminado del carrito');
    }
  };

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handleConfirmPurchase = () => {
    alert('Compra realizada con éxito');
    setCart([]);
    setTotal(0);
    setCheckout(false);
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <header className="h-24 p-10 bg-blue-800 shadow-md flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-yellow-300 font-bold text-4xl">Quesería de mi sin ti</h1>
          <p className="text-yellow-100 font-bold text-xl">Bienvenidos, aquí encontrarás productos derivados de la leche</p>
        </div>
      </header>

      {notification && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-auto p-10">
        {!checkout ? (
          <>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center bg-white shadow-lg rounded-xl p-4"
              >
                <div className="w-72 h-72">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={product.image}
                    alt={product.name}
                    loading="lazy" 
                  />
                </div>
                <h3 className="text-black font-bold mt-3 text-xl">{product.name}</h3>
                <p className="text-gray-600 text-lg">₽ {product.price.toLocaleString('es-CO')}</p>
                <p className="text-gray-500 text-sm text-center mt-2">
                  {product.description}
                </p>
                <button
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  onClick={() => addToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="p-10 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">Finalizar compra</h2>
            <p className="text-gray-700 text-lg mb-4">
              Estás a punto de confirmar tu compra.
            </p>
            <ul className="mb-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between text-lg text-black mb-2">
                  {item.name} - ₽ {item.price.toLocaleString('es-CO')}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    onClick={() => removeFromCart(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-black font-bold text-xl mb-4">Total: ₽ {total.toLocaleString('es-CO')}</p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800"
              onClick={handleConfirmPurchase}
            >
              Confirmar compra
            </button>
          </div>
        )}
      </div>

      {!checkout && (
        <div className="fixed bottom-4 left-4">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Finalizar compra
          </button>
        </div>
      )}
    </div>
  );
}


