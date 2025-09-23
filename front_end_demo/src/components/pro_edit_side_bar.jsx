import React, { useState } from 'react';

const navItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Product Category', icon: '#' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Logout', icon: '🚪' },
];

export default function Product_page_sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <aside style={{
            width: '220px',
            height: '100vh',
            background: '#222',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 0'
        }}>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {navItems.map((item, idx) => (
                        <li
                            key={item.name}
                            onClick={() => setActiveIndex(idx)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1rem',
                                cursor: 'pointer',
                                background: activeIndex === idx ? '#444' : 'none'
                            }}
                        >
                            <span style={{ marginRight: '1rem' }}>{item.icon}</span>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
