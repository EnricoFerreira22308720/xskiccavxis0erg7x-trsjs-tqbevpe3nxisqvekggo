'use client';

import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import Card from '../../components/Card/Card';

export default function TecnologiasPage() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '24px' }}>
                Tecnologias Aprendidas
            </h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {tecnologias.map((tech, index) => (
                    <Card
                        key={index}
                        image={tech.image}
                        title={tech.title}
                        description={tech.description}
                        rating={tech.rating}
                    />
                ))}
            </div>
        </div>
    );
}
