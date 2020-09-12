import React from 'react';
import './styles.css';

export default function Footer() {
    
    return (
        <footer>
            <p class="footer-text">&copy;{new Date().getFullYear()} <a href="https://aarongduyett.com">Aaron Guyett</a></p>
        </footer>
    )
};