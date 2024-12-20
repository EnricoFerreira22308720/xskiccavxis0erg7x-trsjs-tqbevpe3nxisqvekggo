'use client';
import React, { useState, useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import Card from '../../components/Card/Card';
import { Product } from '../models/interfaces';

export default function ProdutosPage() {
    const fetcher: Fetcher<Product[], string> = (url) =>
        fetch(url).then((res) => res.json());

    const { data, error } = useSWR<Product[]>('/api/products', fetcher);

    const [search, setSearch] = useState("");

    const [filteredData, setFilteredData] = useState<Product[]>([]);

    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        if (data) {
            const newFilteredData = data.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredData(newFilteredData);
        }
    }, [search, data]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    function removeFromCart(produtoId: number) {
        setCart((prevCart) => {
          const index = prevCart.findIndex((item) => item.id === produtoId);
          if (index !== -1) {
            const updatedCart = [...prevCart];
            updatedCart.splice(index, 1);
            return updatedCart;
          }
          return prevCart;
        });
      }
      

    const buy = () => {
        fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({
                products: cart.map((product) => product.id),
                name: "",
                student: false,
                coupon: "",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(() => {
                setCart([]);
                alert("Compra realizada com sucesso!");
            })
            .catch(() => {
                alert("Erro ao realizar a compra.");
            });
    };

    if (!data && !error) return <p>Carregando...</p>;
    if (error || data === undefined) return <p>Erro ao carregar produtos.</p>;
    if (data.length === 0) return <p>Nenhum produto disponível.</p>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ backgroundColor: '#4CAF50', fontSize: '40px', fontWeight: '700', marginBottom: '24px' }}>
                Produtos Disponíveis
            </h1>
            <div style={{ marginBottom: '16px' }}>
                <input
                    type="text"
                    placeholder="Pesquisar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '16px',
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {filteredData.map((product) => (
                    <Card
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        category={product.category}
                        onAddToCart={() => addToCart(product)}
                    />
                ))}
            </div>
            <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '2px solid #E5E7EB' }}>
                <h2
                    style={{
                        backgroundColor: '#4CAF50',
                        fontSize: '40px',
                        color: 'white',
                        fontWeight: '700',
                        marginBottom: '16px',
                        padding: '8px',
                        borderRadius: '4px',
                    }}
                >
                    Carrinho
                </h2>
                {cart.length === 0 ? (
                    <p style={{ fontSize: '16px', color: '#6B7280' }}>Nenhum produto no carrinho.</p>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {cart.map((item, i) => (
                            <Card
                                key={i}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                category={item.category}
                                isInCart
                                onRemoveFromCart={() => removeFromCart(item.id)}
                            />
                        ))}
                    </div>
                )}
                {cart.length > 0 && (
                    <button
                        onClick={buy}
                        style={{
                            marginTop: '16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            border: 'none',
                            fontWeight: '700',
                            fontSize: '16px',
                        }}
                    >
                        Comprar
                    </button>
                )}
            </div>
        </div>
    );
}