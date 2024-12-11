'use client';
import React from 'react';

interface CardProps {
    image: string;
    title: string;
    description: string;
    price: number;
    category: string;
    onAddToCart?: () => void;
    onRemoveFromCart?: () => void;
    isInCart?: boolean;
}

const Card: React.FC<CardProps> = ({ image, title, description, price, category, onAddToCart, onRemoveFromCart, isInCart }) => {
    return (
        <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', width: '320px' }}>
            <img
                src={image}
                alt={title}
                style={{ width: '100%', height: '192px', objectFit: 'cover' }}
            />
            <div style={{ padding: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>{title}</h2>
                <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>{description}</p>
                <div style={{ marginTop: '16px' }}>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>Preço: €{price}</p>
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>Categoria: {category}</p>
                </div>
                {isInCart ? (
                    <button 
                        onClick={onRemoveFromCart} 
                        style={{ marginTop: '16px', backgroundColor: '#EF4444', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', border: 'none', fontWeight: '600' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#EF4444'}>
                        Remover do Carrinho
                    </button>
                ) : (
                    <button 
                        onClick={onAddToCart} 
                        style={{ marginTop: '16px', backgroundColor: '#3B82F6', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', border: 'none', fontWeight: '600' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}>
                        Adicionar ao Carrinho
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;
