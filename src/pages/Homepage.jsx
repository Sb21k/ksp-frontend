import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

import api from '../api/axios';

const Homepage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // for filter states

    const [searchTerm, setSearchTerm] = useState('');
    const[selectedCategory, setSelectedCategory] = useState('');

    
    
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


    const uniqueCategories = [...new Set(articles.map( article => article.category))];
    const filteredArticles = articles.filter(article =>{
        const matchSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase()) || article.short?.toLowerCase().includes(searchTerm.toLowerCase()) || article.tags?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchecategory = selectedCategory === "" || article.category === selectedCategory;

        return matchSearch && matchecategory;
    });

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Explore Articles</h1>
            <div style={{ 
                display: 'flex', gap: '15px', marginTop: '20px', marginBottom: '30px',
                backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px'
            }}>
                <input 
                    type="text" 
                    placeholder="Search by title, content, or tags..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 2, padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
                />
                
                {/* Category Filter Dropdown */}
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
                >
                    <option value="">All Categories</option>
                    {uniqueCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            

            <div className="page-wrapper">
                {filteredArticles.length === 0 ? (
                    <p>No articles found. Log in and be the first to write one!</p>
                ) : (
                    filteredArticles.map((article) => (
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
                            <p style={{ lineHeight: '1.6', color: '#ddd' }}>
                                {article.short?.replace(/<[^>]*>?/gm, '')}...
                            </p>

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
