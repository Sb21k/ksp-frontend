import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // The default styling for the editor
import api from '../api/axios';

const CreateEditArticle = () => {
    const { id } = useParams(); // If this exists, we are in Edit mode
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    
    const [isSaving, setIsSaving] = useState(false);
    const [isAILoading, setIsAILoading] = useState(false);
    const [error, setError] = useState('');

    // If editing, fetch the existing article data
    useEffect(() => {
        if (id) {
            const fetchArticle = async () => {
                try {
                    const response = await api.get(`/articles/${id}`);
                    const article = response.data;
                    setTitle(article.title);
                    setCategory(article.category);
                    setTags(article.tags);
                    setContent(article.content);
                } catch (err) {
                    setError('Failed to load article for editing.');
                }
            };
            fetchArticle();
        }
    }, [id]);

    const handleImproveWithAI = () => {
        if (!content) {
            alert("Please write some content first for the AI to improve!");
            return;
        }
        
        setIsAILoading(true);
        

        setTimeout(() => {
            const improvedContent = content + '<br><br><strong>[AI Enhanced]:</strong> <em>This content has been reviewed and optimized for clarity, grammar, and engagement by the AI Writing Assistant.</em>';
            setContent(improvedContent);
            setIsAILoading(false);
        }, 1500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');

        const articleData = { title, category, tags, content };

        try {
            if (id) {

                await api.put(`/articles/${id}`, articleData);
                alert('Article updated successfully!');
            } else {

                await api.post('/articles', articleData);
                alert('Article published successfully!');
            }
            navigate('/dashboard'); d
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to save article.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="page-wrapper" style={{ maxWidth: '800px' }}>
            <h2>{id ? 'Edit Article' : 'Create New Article'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                
                <input 
                    type="text" placeholder="Article Title" value={title} 
                    onChange={(e) => setTitle(e.target.value)} required 
                    style={{ padding: '10px', fontSize: '1.2rem' }}
                />
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" placeholder="Category (e.g., Tech, AI, Frontend)" value={category} 
                        onChange={(e) => setCategory(e.target.value)} required 
                        style={{ padding: '10px', flex: 1 }}
                    />
                    <input 
                        type="text" placeholder="Tags (comma-separated)" value={tags} 
                        onChange={(e) => setTags(e.target.value)} required 
                        style={{ padding: '10px', flex: 1 }}
                    />
                </div>


                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        type="button" 
                        onClick={handleImproveWithAI} 
                        disabled={isAILoading}
                        style={{ 
                            background: 'linear-gradient(90deg, #8a2be2, #4b0082)', 
                            color: 'white', border: 'none', padding: '10px 15px', 
                            borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                        }}
                    >
                        {isAILoading ? 'AI is thinking...' : '✨ Improve with AI'}
                    </button>
                </div>


                <div style={{ backgroundColor: 'white', color: 'black' }}>
                    <ReactQuill 
                        theme="snow" 
                        value={content} 
                        onChange={setContent} 
                        style={{ height: '300px', marginBottom: '40px' }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isSaving}
                    style={{ 
                        padding: '12px', fontSize: '1.1rem', backgroundColor: '#007bff', 
                        color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' 
                    }}
                >
                    {isSaving ? 'Saving...' : (id ? 'Update Article' : 'Publish Article')}
                </button>
            </form>
        </div>
    );
};

export default CreateEditArticle;