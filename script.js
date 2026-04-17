// ===== Sample Notes Data =====
const sampleNotes = [
    {
        id: 1,
        title: "Introduction to Data Structures",
        subject: "computer-science",
        subjectLabel: "Computer Science",
        type: "lecture-notes",
        typeLabel: "Lecture Notes",
        description: "Comprehensive notes covering arrays, linked lists, stacks, and queues. Perfect for beginners learning computer science fundamentals.",
        author: "John Smith",
        authorInitial: "J",
        rating: 4.8,
        downloads: 245,
        views: 520,
        date: "2026-04-10",
        tags: ["data structures", "arrays", "linked lists", "algorithms"],
        comments: [
            { author: "Alice", date: "2026-04-11", text: "Very helpful notes! Thank you." },
            { author: "Bob", date: "2026-04-12", text: "Clear and concise explanations." }
        ]
    },
    {
        id: 2,
        title: "Calculus I - Complete Study Guide",
        subject: "mathematics",
        subjectLabel: "Mathematics",
        type: "study-guide",
        typeLabel: "Study Guide",
        description: "Complete study guide for Calculus I including limits, derivatives, and integrals with practice problems and solutions.",
        author: "Emily Johnson",
        authorInitial: "E",
        rating: 4.9,
        downloads: 312,
        views: 680,
        date: "2026-04-08",
        tags: ["calculus", "derivatives", "integrals", "limits"],
        comments: [
            { author: "Mike", date: "2026-04-09", text: "Best calculus guide I've found!" }
        ]
    },
    {
        id: 3,
        title: "Quantum Physics Basics",
        subject: "physics",
        subjectLabel: "Physics",
        type: "summary",
        typeLabel: "Summary",
        description: "Summary of quantum mechanics fundamentals including wave-particle duality, Schrödinger equation, and quantum states.",
        author: "David Chen",
        authorInitial: "D",
        rating: 4.7,
        downloads: 189,
        views: 425,
        date: "2026-04-05",
        tags: ["quantum physics", "mechanics", "waves"],
        comments: []
    },
    {
        id: 4,
        title: "Organic Chemistry Reactions",
        subject: "chemistry",
        subjectLabel: "Chemistry",
        type: "lecture-notes",
        typeLabel: "Lecture Notes",
        description: "Detailed notes on common organic chemistry reactions with mechanisms and examples for exam preparation.",
        author: "Sarah Williams",
        authorInitial: "S",
        rating: 4.6,
        downloads: 278,
        views: 590,
        date: "2026-04-03",
        tags: ["organic chemistry", "reactions", "mechanisms"],
        comments: [
            { author: "Tom", date: "2026-04-04", text: "Great for exam prep!" },
            { author: "Lisa", date: "2026-04-05", text: "Very detailed, thanks!" }
        ]
    },
    {
        id: 5,
        title: "Business Strategy Framework",
        subject: "business",
        subjectLabel: "Business",
        type: "presentation",
        typeLabel: "Presentation",
        description: "Comprehensive presentation on business strategy frameworks including SWOT, Porter's Five Forces, and BCG Matrix.",
        author: "Michael Brown",
        authorInitial: "M",
        rating: 4.5,
        downloads: 156,
        views: 340,
        date: "2026-04-01",
        tags: ["strategy", "business", "frameworks", "management"],
        comments: []
    },
    {
        id: 6,
        title: "Machine Learning Algorithms",
        subject: "computer-science",
        subjectLabel: "Computer Science",
        type: "study-guide",
        typeLabel: "Study Guide",
        description: "In-depth guide covering supervised and unsupervised learning algorithms with practical examples and use cases.",
        author: "Alex Turner",
        authorInitial: "A",
        rating: 4.9,
        downloads: 421,
        views: 890,
        date: "2026-03-28",
        tags: ["machine learning", "AI", "algorithms", "data science"],
        comments: [
            { author: "Nina", date: "2026-03-29", text: "Excellent resource for ML beginners!" }
        ]
    },
    {
        id: 7,
        title: "Linear Algebra Essentials",
        subject: "mathematics",
        subjectLabel: "Mathematics",
        type: "summary",
        typeLabel: "Summary",
        description: "Essential linear algebra concepts including matrices, determinants, eigenvalues, and vector spaces.",
        author: "Rachel Green",
        authorInitial: "R",
        rating: 4.7,
        downloads: 234,
        views: 510,
        date: "2026-03-25",
        tags: ["linear algebra", "matrices", "vectors"],
        comments: []
    },
    {
        id: 8,
        title: "Thermodynamics Principles",
        subject: "physics",
        subjectLabel: "Physics",
        type: "lecture-notes",
        typeLabel: "Lecture Notes",
        description: "Complete notes on thermodynamics laws, entropy, enthalpy, and practical applications in engineering.",
        author: "Chris Lee",
        authorInitial: "C",
        rating: 4.6,
        downloads: 198,
        views: 445,
        date: "2026-03-22",
        tags: ["thermodynamics", "physics", "engineering"],
        comments: [
            { author: "Dan", date: "2026-03-23", text: "Very comprehensive notes!" }
        ]
    },
    {
        id: 9,
        title: "Web Development Fundamentals",
        subject: "computer-science",
        subjectLabel: "Computer Science",
        type: "study-guide",
        typeLabel: "Study Guide",
        description: "Complete guide to HTML, CSS, and JavaScript for beginners. Includes hands-on examples and best practices.",
        author: "Jessica Park",
        authorInitial: "J",
        rating: 4.8,
        downloads: 367,
        views: 780,
        date: "2026-03-20",
        tags: ["web development", "HTML", "CSS", "JavaScript"],
        comments: [
            { author: "Sam", date: "2026-03-21", text: "Perfect for beginners!" },
            { author: "Kate", date: "2026-03-22", text: "Well structured content." }
        ]
    }
];

// ===== State Management =====
let currentUser = null;
let uploadedNotes = [];
let allNotes = [...sampleNotes];

// ===== DOM Elements =====
const notesGrid = document.getElementById('notesGrid');
const myNotesGrid = document.getElementById('myNotesGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const uploadForm = document.getElementById('uploadForm');
const fileUploadArea = document.getElementById('fileUploadArea');
const noteFile = document.getElementById('noteFile');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const removeFile = document.getElementById('removeFile');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    renderNotes(allNotes);
    setupEventListeners();
    loadCurrentUser();
});

// ===== Setup Event Listeners =====
function setupEventListeners() {
    // Search and filters
    searchInput.addEventListener('input', filterNotes);
    categoryFilter.addEventListener('change', filterNotes);
    sortFilter.addEventListener('change', filterNotes);

    // File upload
    fileUploadArea.addEventListener('click', () => noteFile.click());
    noteFile.addEventListener('change', handleFileSelect);
    removeFile.addEventListener('click', removeSelectedFile);

    // Drag and drop
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = 'var(--primary-color)';
        fileUploadArea.style.background = 'rgba(99, 102, 241, 0.1)';
    });

    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.style.borderColor = 'var(--gray-light)';
        fileUploadArea.style.background = 'transparent';
    });

    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = 'var(--gray-light)';
        fileUploadArea.style.background = 'transparent';
        if (e.dataTransfer.files.length > 0) {
            noteFile.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });

    // Upload form
    uploadForm.addEventListener('submit', handleUpload);

    // Auth modals
    document.getElementById('loginBtn').addEventListener('click', () => openAuthModal('login'));
    document.getElementById('signupBtn').addEventListener('click', () => openAuthModal('signup'));
    document.getElementById('closeAuthModal').addEventListener('click', closeAuthModal);

    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
    });

    // Auth forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);

    // Close modals
    document.getElementById('closeNoteDetail').addEventListener('click', closeNoteDetailModal);
    document.getElementById('noteDetailModal').addEventListener('click', (e) => {
        if (e.target.id === 'noteDetailModal') closeNoteDetailModal();
    });
    document.getElementById('authModal').addEventListener('click', (e) => {
        if (e.target.id === 'authModal') closeAuthModal();
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            categoryFilter.value = category;
            filterNotes();
            showSection('browse');
        });
    });

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            showSection(section);
        });
    });
}

// ===== Render Notes =====
function renderNotes(notes) {
    notesGrid.innerHTML = '';
    
    if (notes.length === 0) {
        notesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No notes found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    notes.forEach(note => {
        const noteCard = createNoteCard(note);
        notesGrid.appendChild(noteCard);
    });
}

function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card fade-in';
    card.onclick = () => openNoteDetail(note.id);

    card.innerHTML = `
        <div class="note-header">
            <span class="note-category">${note.subjectLabel}</span>
            <div class="note-rating">
                <i class="fas fa-star"></i> ${note.rating}
            </div>
        </div>
        <h3 class="note-title">${note.title}</h3>
        <p class="note-description">${note.description}</p>
        <div class="note-meta">
            <div class="note-author">
                <div class="note-author-avatar">${note.authorInitial}</div>
                <span>${note.author}</span>
            </div>
            <div class="note-stats">
                <span><i class="fas fa-download"></i> ${note.downloads}</span>
                <span><i class="fas fa-eye"></i> ${note.views}</span>
            </div>
        </div>
    `;

    return card;
}

// ===== Filter Notes =====
function filterNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortFilter.value;

    let filtered = allNotes.filter(note => {
        const matchesSearch = !searchTerm || 
            note.title.toLowerCase().includes(searchTerm) ||
            note.description.toLowerCase().includes(searchTerm) ||
            note.author.toLowerCase().includes(searchTerm) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesCategory = category === 'all' || note.subject === category;

        return matchesSearch && matchesCategory;
    });

    // Sort notes
    if (sort === 'newest') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'popular') {
        filtered.sort((a, b) => b.downloads - a.downloads);
    } else if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderNotes(filtered);
}

// ===== Open Note Detail =====
function openNoteDetail(noteId) {
    const note = allNotes.find(n => n.id === noteId);
    if (!note) return;

    // Increment views
    note.views++;

    const modal = document.getElementById('noteDetailModal');
    const content = document.getElementById('noteDetailContent');

    content.innerHTML = `
        <div class="note-detail-header">
            <span class="note-category">${note.subjectLabel}</span>
            <h2 class="note-detail-title">${note.title}</h2>
            <div class="note-detail-meta">
                <span><i class="fas fa-user"></i> ${note.author}</span>
                <span><i class="fas fa-calendar"></i> ${formatDate(note.date)}</span>
                <span><i class="fas fa-star"></i> ${note.rating} Rating</span>
                <span><i class="fas fa-download"></i> ${note.downloads} Downloads</span>
                <span><i class="fas fa-eye"></i> ${note.views} Views</span>
                <span><i class="fas fa-file-alt"></i> ${note.typeLabel}</span>
            </div>
        </div>
        <p class="note-detail-description">${note.description}</p>
        <div class="note-detail-tags">
            ${note.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
        <div class="note-detail-actions">
            <button class="btn btn-primary btn-lg" onclick="downloadNote(${note.id})">
                <i class="fas fa-download"></i> Download Note
            </button>
            <button class="btn btn-secondary" onclick="likeNote(${note.id})">
                <i class="fas fa-heart"></i> Like
            </button>
            <button class="btn btn-secondary" onclick="shareNote(${note.id})">
                <i class="fas fa-share-alt"></i> Share
            </button>
        </div>
        <div class="comments-section">
            <h3>Comments (${note.comments.length})</h3>
            ${note.comments.length > 0 ? note.comments.map(comment => `
                <div class="comment">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-date">${formatDate(comment.date)}</span>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                </div>
            `).join('') : '<p>No comments yet. Be the first to comment!</p>'}
            <div class="add-comment">
                <input type="text" id="commentInput" placeholder="Add a comment...">
                <button class="btn btn-primary" onclick="addComment(${note.id})">Post</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNoteDetailModal() {
    document.getElementById('noteDetailModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== Note Actions =====
function downloadNote(noteId) {
    const note = allNotes.find(n => n.id === noteId);
    if (note) {
        note.downloads++;
        showToast('Note downloaded successfully!', 'success');
        openNoteDetail(noteId); // Refresh modal
    }
}

function likeNote(noteId) {
    showToast('Note liked! ❤️', 'success');
}

function shareNote(noteId) {
    const note = allNotes.find(n => n.id === noteId);
    if (note) {
        const shareText = `Check out this note: ${note.title} on NoteShare!`;
        if (navigator.share) {
            navigator.share({
                title: note.title,
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText);
            showToast('Link copied to clipboard!', 'success');
        }
    }
}

function addComment(noteId) {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    
    if (!text) {
        showToast('Please enter a comment', 'error');
        return;
    }

    if (!currentUser) {
        showToast('Please login to comment', 'error');
        openAuthModal('login');
        return;
    }

    const note = allNotes.find(n => n.id === noteId);
    if (note) {
        note.comments.push({
            author: currentUser.name,
            date: new Date().toISOString().split('T')[0],
            text: text
        });
        showToast('Comment added!', 'success');
        openNoteDetail(noteId); // Refresh modal
    }
}

// ===== Upload Note =====
function handleUpload(e) {
    e.preventDefault();

    if (!currentUser) {
        showToast('Please login to upload notes', 'error');
        openAuthModal('signup');
        return;
    }

    const title = document.getElementById('noteTitle').value;
    const subject = document.getElementById('noteSubject').value;
    const subjectLabel = document.getElementById('noteSubject').options[document.getElementById('noteSubject').selectedIndex].text;
    const type = document.getElementById('noteType').value;
    const typeLabel = document.getElementById('noteType').options[document.getElementById('noteType').selectedIndex].text;
    const description = document.getElementById('noteDescription').value;
    const tags = document.getElementById('noteTags').value.split(',').map(t => t.trim()).filter(t => t);

    if (!noteFile.files.length) {
        showToast('Please select a file to upload', 'error');
        return;
    }

    const newNote = {
        id: allNotes.length + 1,
        title,
        subject,
        subjectLabel,
        type,
        typeLabel,
        description,
        author: currentUser.name,
        authorInitial: currentUser.name.charAt(0).toUpperCase(),
        rating: 0,
        downloads: 0,
        views: 0,
        date: new Date().toISOString().split('T')[0],
        tags,
        comments: []
    };

    allNotes.unshift(newNote);
    uploadedNotes.push(newNote);

    showToast('Note uploaded successfully!', 'success');
    uploadForm.reset();
    removeSelectedFile();
    renderMyNotes();
}

function handleFileSelect() {
    if (noteFile.files.length > 0) {
        const file = noteFile.files[0];
        fileName.textContent = file.name;
        fileInfo.style.display = 'flex';
        fileUploadArea.style.display = 'none';
    }
}

function removeSelectedFile() {
    noteFile.value = '';
    fileInfo.style.display = 'none';
    fileUploadArea.style.display = 'block';
}

// ===== My Notes =====
function renderMyNotes() {
    if (!currentUser) {
        document.getElementById('emptyMyNotes').style.display = 'block';
        myNotesGrid.style.display = 'none';
        return;
    }

    const userNotes = allNotes.filter(note => note.author === currentUser.name);
    
    if (userNotes.length === 0) {
        document.getElementById('emptyMyNotes').style.display = 'block';
        myNotesGrid.style.display = 'none';
    } else {
        document.getElementById('emptyMyNotes').style.display = 'none';
        myNotesGrid.style.display = 'grid';
        myNotesGrid.innerHTML = '';
        
        userNotes.forEach(note => {
            const noteCard = createNoteCard(note);
            myNotesGrid.appendChild(noteCard);
        });
    }
}

// ===== Authentication =====
function openAuthModal(tab) {
    document.getElementById('authModal').classList.add('active');
    switchAuthTab(tab);
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');
    
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(`${tab}Form`).classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate login (in real app, this would call an API)
    currentUser = {
        name: email.split('@')[0],
        email: email
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showToast('Login successful!', 'success');
    closeAuthModal();
    updateUIForUser();
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Simulate signup
    currentUser = {
        name,
        email
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showToast('Account created successfully!', 'success');
    closeAuthModal();
    updateUIForUser();
}

function loadCurrentUser() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateUIForUser();
    }
}

function updateUIForUser() {
    const navActions = document.querySelector('.nav-actions');
    
    if (currentUser) {
        navActions.innerHTML = `
            <span style="display: flex; align-items: center; gap: 0.5rem;">
                <div class="note-author-avatar" style="width: 35px; height: 35px;">${currentUser.name.charAt(0).toUpperCase()}</div>
                <span style="font-weight: 600;">${currentUser.name}</span>
            </span>
            <button class="btn btn-secondary" id="logoutBtn">Logout</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', logout);
        renderMyNotes();
    } else {
        navActions.innerHTML = `
            <button class="btn btn-secondary" id="loginBtn">Login</button>
            <button class="btn btn-primary" id="signupBtn">Sign Up</button>
        `;
        document.getElementById('loginBtn').addEventListener('click', () => openAuthModal('login'));
        document.getElementById('signupBtn').addEventListener('click', () => openAuthModal('signup'));
        document.getElementById('emptyMyNotes').style.display = 'block';
        myNotesGrid.style.display = 'none';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForUser();
    showToast('Logged out successfully', 'success');
}

// ===== Navigation =====
function showSection(section) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`.nav-link[href="#${section}"]`).classList.add('active');

    // Show/hide sections
    const sections = ['home', 'browse', 'upload', 'my-notes'];
    sections.forEach(s => {
        const element = document.getElementById(s);
        if (element) {
            if (s === 'home') {
                element.style.display = s === section ? 'block' : 'none';
            } else {
                element.style.display = s === section ? 'block' : 'none';
            }
        }
    });

    // Special handling
    if (section === 'my-notes') {
        renderMyNotes();
    }

    // Scroll to section
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ===== Utility Functions =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Animate Stats on Load =====
window.addEventListener('load', () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = stat.textContent;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + '+';
            }
        }, 30);
    });
});

console.log('NoteShare App Loaded Successfully! 📚');
