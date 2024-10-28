import React, { useEffect, useRef } from 'react';
import Hero from '../../Components/HeaderSection/Hero';
import ProductHome from '../../Components/ProductHome/ProductHome';
import Faq from '../../Components/Faq/Faq';
import './Home.css';

const Home = () => {
    const productHomeRef = useRef(null);
    const faqRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        const productHomeElement = productHomeRef.current;
        const faqElement = faqRef.current;

        if (productHomeElement) observer.observe(productHomeElement);
        if (faqElement) observer.observe(faqElement);

        return () => {
            if (productHomeElement) observer.unobserve(productHomeElement);
            if (faqElement) observer.unobserve(faqElement);
        };
    }, []);

    return (
        <div className="Home-container">
            <section className="heroSection">
                <Hero />
            </section>
            <section className="productHome" ref={productHomeRef}>
                <ProductHome />
            </section>
            <section className="faqSection" ref={faqRef}>
                <Faq />
            </section>
        </div>
    );
}

export default Home;
