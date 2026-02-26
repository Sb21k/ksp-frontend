import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import ArticleDetail from './pages/ArticleDetail';
import CreateEditArticle from './pages/CreateEditArticle';
import Navbar from './components/Navbar'

const Dashboard = () => <h1>My Articles Dashboard</h1>;


function App(){
  return (
    <Router>
      <Navbar>
      </Navbar>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-article" element={<CreateEditArticle />} />
          <Route path="/edit-article/:id" element={<CreateEditArticle />} />
        </Routes>
      </div>

    </Router>
  )
}

export default App;