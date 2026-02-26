import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'

import api from "../api/axios";

const Dashboard = () => {
    const [myArticles, setMyArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const userString = localStorage.getItem('user');
    const currentUser = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchMyArticles = async () => {
            try {
                const response = await api.get('/articles');
                const userArticles = response.data.filter(
                    article => article.Author === currentUser.username
                );
                setMyArticles(userArticles);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load your articles.');
                setLoading(false);
            }
        };

        fetchMyArticles();
    }, [currentUser, navigate]);


    const handleDelete = async (articleId) => {
       
        const confirmDelete = window.confirm("Are you sure you want to delete this article? This cannot be undone.");
        
        if (confirmDelete) {
            try {
                await api.delete(`/articles/${articleId}`);
                setMyArticles(myArticles.filter(article => article.id !== articleId));
                alert("Article deleted successfully.");
            } catch (err) {
                alert(err.response?.data?.error || "Failed to delete article.");
            }
        }
    };

    if (loading) return <h2 className="page-wrapper">Loading your dashboard...</h2>;
    if (error) return <h2 className="page-wrapper" style={{ color: 'red' }}>{error}</h2>;

    return (
        <div className="page-wrapper" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>My Articles</h1>
                <Link to="/new-article" style={{ 
                    background: '#28a745', color: 'white', padding: '10px 15px', 
                    textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' 
                }}>
                    + Write New Article
                </Link>
            </div>

            {myArticles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', background: '#1f1f1f', borderRadius: '8px' }}>
                    <h3>You haven't written any articles yet.</h3>
                    <p style={{ color: '#aaa', marginTop: '10px' }}>Share your knowledge with the world!</p>
                </div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#1f1f1f', borderRadius: '8px', overflow: 'hidden' }}>
                    <thead style={{ background: '#333', color: '#fff' }}>
                        <tr>
                            <th style={{ padding: '15px' }}>Title</th>
                            <th style={{ padding: '15px' }}>Category</th>
                            <th style={{ padding: '15px' }}>Published Date</th>
                            <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myArticles.map((article) => (
                            <tr key={article.id} style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '15px', fontWeight: 'bold' }}>
                                    <Link to={`/article/${article.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                                        {article.title}
                                    </Link>
                                </td>
                                <td style={{ padding: '15px' }}>{article.category}</td>
                                <td style={{ padding: '15px' }}>{new Date(article.created_at).toLocaleDateString()}</td>
                                <td style={{ padding: '15px', textAlign: 'right' }}>
                                    <Link to={`/edit-article/${article.id}`} style={{ 
                                        color: '#41eb4a', textDecoration: 'none', marginRight: '15px', fontWeight: 'bold' 
                                    }}>
                                        Edit
                                    </Link>
                                    
                                    <button onClick={() => handleDelete(article.id)} style={{ 
                                        background: 'transparent', color: '#ff4d4d', border: 'none', 
                                        cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' 
                                    }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;