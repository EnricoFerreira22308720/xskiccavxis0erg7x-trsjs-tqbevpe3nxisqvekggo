'use client';
import React from 'react';
import useSWR, { Fetcher } from 'swr';
import { Product } from '../models/interfaces';

export default function ProdutosPage() {
    // Fetcher para buscar os dados da API
    const fetcher: Fetcher<Product[], string> = (url) =>
        fetch(url).then((res) => res.json());

    // Uso do SWR para consumir a API
    const { data, error } = useSWR('/api/products', fetcher);

    // Validações de estado
    if (!data && !error) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar produtos.</p>;
    if (data.length === 0) return <p>Nenhum produto disponível.</p>;

    // Renderização dos produtos
    return (
        <div>
            <h1>Produtos Disponíveis</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {data.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '20px',
                            width: '200px',
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p><strong>Preço:</strong> €{product.price}</p>
                        <p><strong>Categoria:</strong> {product.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
