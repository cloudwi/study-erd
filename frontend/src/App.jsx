import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api/posts'

function App() {
  const [posts, setPosts] = useState([])
  const [isWriting, setIsWriting] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentBoard, setCurrentBoard] = useState('자유게시판')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content || !formData.author) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setFormData({ title: '', content: '', author: '' })
        setIsWriting(false)
        fetchPosts()
      }
    } catch (error) {
      console.error('Failed to create post:', error)
      alert('게시글 작성에 실패했습니다.')
    }
  }

  const handlePostClick = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`)
      const data = await response.json()
      setSelectedPost(data)
    } catch (error) {
      console.error('Failed to fetch post detail:', error)
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">에브리타임</div>
          <div className="university">동의대</div>
        </div>
        <div className="header-nav">
          <span>게시판</span>
          <span>시간표</span>
          <span>강의평가</span>
          <span>쪽지함</span>
          <span>내정보</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">즐겨찾는 게시판</div>
            <div
              className={`sidebar-item ${currentBoard === '자유게시판' ? 'active' : ''}`}
              onClick={() => setCurrentBoard('자유게시판')}
            >
              <span>자유게시판</span>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">인기 게시판</div>
            <div className="sidebar-item">
              <span>HOT게시물</span>
              <span className="sidebar-item-badge">NEW</span>
            </div>
            <div className="sidebar-item">
              <span>BEST게시물</span>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">전체 게시판</div>
            <div className="sidebar-item">
              <span>자유게시판</span>
            </div>
            <div className="sidebar-item">
              <span>비밀게시판</span>
            </div>
            <div className="sidebar-item">
              <span>졸업생게시판</span>
            </div>
            <div className="sidebar-item">
              <span>새내기게시판</span>
            </div>
            <div className="sidebar-item">
              <span>시사·이슈</span>
            </div>
            <div className="sidebar-item">
              <span>정보게시판</span>
            </div>
            <div className="sidebar-item">
              <span>장터게시판</span>
            </div>
            <div className="sidebar-item">
              <span>동아리·학회</span>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="content">
          <div className="content-inner">
            <div className="board-header">
              <h2 className="board-title">{currentBoard}</h2>
              <button
                className="write-button"
                onClick={() => setIsWriting(!isWriting)}
              >
                {isWriting ? '취소' : '글쓰기'}
              </button>
            </div>

            {isWriting && (
              <div className="post-form">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="글 제목"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="작성자"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                  <textarea
                    placeholder="내용을 입력하세요."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                  <div className="post-form-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => {
                        setIsWriting(false)
                        setFormData({ title: '', content: '', author: '' })
                      }}
                    >
                      취소
                    </button>
                    <button type="submit" className="submit-button">
                      완료
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="post-list">
              {posts.length === 0 ? (
                <div className="empty-state">
                  <p>아직 작성된 게시글이 없습니다.</p>
                  <p>첫 번째 게시글을 작성해보세요!</p>
                </div>
              ) : (
                posts.map(post => (
                  <div
                    key={post.id}
                    className="post-item"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <div className="post-item-header">
                      <div className="post-title">{post.title}</div>
                      <span className="comment-count">[0]</span>
                    </div>
                    <div className="post-content">{post.content}</div>
                    <div className="post-meta">
                      <span className="post-author">{post.author}</span>
                      <span className="post-meta-separator">|</span>
                      <span>{post.createdAt}</span>
                      <div className="post-stats">
                        <span className="stat-item">공감 {post.likes}</span>
                        <span className="stat-item">조회 {post.views}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div></div>
              <button
                className="close-button"
                onClick={() => setSelectedPost(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="post-detail-title">{selectedPost.title}</div>
              <div className="post-detail-meta">
                <span className="post-author">{selectedPost.author}</span>
                <span>|</span>
                <span>{selectedPost.createdAt}</span>
                <span>|</span>
                <span>조회 {selectedPost.views}</span>
                <span>|</span>
                <span>공감 {selectedPost.likes}</span>
              </div>
              <div className="post-detail-content">{selectedPost.content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
