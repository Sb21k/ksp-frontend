import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

import api from '../api/axios';

const Homepage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get('/articles');
                setArticles(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load articles!');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);
    if (loading) return <h2>Loading latest articles...</h2>;
    if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Explore Articles</h1>

            {/* We will add the Search & Filter bar here later */}

            <div className="page-wrapper">
                {articles.length === 0 ? (
                    <p>No articles found. Log in and be the first to write one!</p>
                ) : (
                    articles.map((article) => (
                        <div key={article.id} style={{
                            border: '1px solid #ddd',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <h2 style={{ margin: '0 0 10px 0' }}>{article.title}</h2>

                            <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '15px' }}>
                                <strong>By {article.Author}</strong> |
                                <span style={{ marginLeft: '10px' }}>Category: {article.category}</span> |
                                <span style={{ marginLeft: '10px' }}>
                                    {new Date(article.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <p style={{ lineHeight: '1.6' }}>{article.short}...</p>

                            <Link to={`/article/${article.id}`} style={{
                                display: 'inline-block',
                                marginTop: '10px',
                                color: '#007bff',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}>
                                Read Full Article →
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Homepage;
