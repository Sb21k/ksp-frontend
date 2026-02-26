import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const ArticleDetail = () => {
    const { id } = useParams(); 
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            try {

                const response = await api.get(`/articles/${id}`);
                setArticle(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Article not found or failed to load.');
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <h2>Loading article...</h2>;
    if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;
    if (!article) return <h2>No article found.</h2>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                ← Back to Home
            </Link>
            
            <h1 style={{ marginTop: '20px', fontSize: '2.5rem' }}>{article.title}</h1>
            

            <div className='page-wrapper'>
                <p style={{ margin: '0 0 8px 0' }}><strong>Author:</strong> {article.author} [cite: 55]</p>
                <p style={{ margin: '0 0 8px 0' }}><strong>Category:</strong> {article.category}</p>
                <p style={{ margin: '0 0 8px 0' }}><strong>Tags:</strong> {article.tags} [cite: 56]</p>
                <p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>
                    <strong>Published:</strong> {new Date(article.created_at).toLocaleString()} [cite: 57]
                </p>
            </div>

  
            <div 
                style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
                dangerouslySetInnerHTML={{ __html: article.content }} 
            />
        </div>
    );
};

export default ArticleDetail;