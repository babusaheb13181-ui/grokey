// Global variables
let isLoginMode = true;
let currentUser = null;
let orders = [];
let users = [];
let books = [];

// Initialize sample data
function initializeData() {
    // Sample orders
    orders = [
        { id: 'ORD001', customer: 'John Doe', book: 'JavaScript Mastery', amount: 29.99, status: 'completed', date: '2024-01-15' },
        { id: 'ORD002', customer: 'Jane Smith', book: 'Python Programming', amount: 34.99, status: 'processing', date: '2024-01-16' },
        { id: 'ORD003', customer: 'Mike Johnson', book: 'Web Development', amount: 39.99, status: 'pending', date: '2024-01-17' },
        { id: 'ORD004', customer: 'Sarah Wilson', book: 'Data Science Guide', amount: 44.99, status: 'completed', date: '2024-01-18' }
    ];

    // Sample users
    users = [
        { id: 'USR001', name: 'John Doe', email: 'john@example.com', joinDate: '2023-12-01', orders: 3 },
        { id: 'USR002', name: 'Jane Smith', email: 'jane@example.com', joinDate: '2023-12-15', orders: 2 },
        { id: 'USR003', name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-01-01', orders: 1 },
        { id: 'USR004', name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2024-01-10', orders: 4 }
    ];

    // Sample books
    books = [
        { id: 'BK001', title: 'JavaScript Mastery', author: 'Alex Johnson', category: 'Technology', price: 29.99, stock: 50 },
        { id: 'BK002', title: 'Python Programming', author: 'Maria Garcia', category: 'Technology', price: 34.99, stock: 35 },
        { id: 'BK003', title: 'Web Development', author: 'David Chen', category: 'Technology', price: 39.99, stock: 42 },
        { id: 'BK004', title: 'Data Science Guide', author: 'Lisa Brown', category: 'Science', price: 44.99, stock: 28 }
    ];

    updateDashboard();
}

// Authentication functions
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;

    if (isLoginMode) {
        // Check specific login credentials
        if (email === 'kumarkaushik663@gmail.com' && password === 'kaushik13181181181') {
            currentUser = { email: email, name: 'Kaushik Kumar' };
            showDashboard();
        } else {
            alert('Invalid email or password. Please check your credentials and try again.');
        }
    } else {
        // Simple signup validation
        if (email && password && fullName) {
            currentUser = { email: email, name: fullName };
            showDashboard();
        }
    }
});

document.getElementById('authToggle').addEventListener('click', function() {
    isLoginMode = !isLoginMode;
    
    if (isLoginMode) {
        document.getElementById('authTitle').textContent = 'GROKEY ADMIN Login';
        document.getElementById('authSubmit').textContent = 'Login';
        document.getElementById('authToggle').textContent = "Don't have an account? Sign up here";
        document.getElementById('nameGroup').classList.add('hidden');
    } else {
        document.getElementById('authTitle').textContent = 'GROKEY ADMIN Signup';
        document.getElementById('authSubmit').textContent = 'Sign Up';
        document.getElementById('authToggle').textContent = 'Already have an account? Login here';
        document.getElementById('nameGroup').classList.remove('hidden');
    }
});

function showDashboard() {
    document.getElementById('authContainer').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('welcomeUser').textContent = `Welcome, ${currentUser.name}!`;
    initializeData();
}

function logout() {
    currentUser = null;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('authForm').reset();
}

// Tab navigation
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Update dashboard statistics
function updateDashboard() {
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalBooks').textContent = books.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    
    populateOrdersTable();
    populateUsersTable();
    populateBooksTable();
}

// Populate orders table
function populateOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.book}</td>
            <td>$${order.amount.toFixed(2)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>${order.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Populate users table
function populateUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.joinDate}</td>
            <td>${user.orders}</td>
        `;
        tbody.appendChild(row);
    });
}

// Populate books table
function populateBooksTable() {
    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = '';
    
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>$${book.price.toFixed(2)}</td>
            <td>${book.stock}</td>
            <td>
                <button onclick="editBook('${book.id}')" style="background: #4299e1; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px;">Edit</button>
                <button onclick="deleteBook('${book.id}')" style="background: #e53e3e; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Book management functions
function showAddBookForm() {
    document.getElementById('addBookForm').classList.remove('hidden');
}

function hideAddBookForm() {
    document.getElementById('addBookForm').classList.add('hidden');
    document.getElementById('bookForm').reset();
}

document.getElementById('bookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newBook = {
        id: 'BK' + String(books.length + 1).padStart(3, '0'),
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        category: document.getElementById('bookCategory').value,
        price: parseFloat(document.getElementById('bookPrice').value),
        stock: Math.floor(Math.random() * 50) + 10 // Random stock between 10-60
    };
    
    books.push(newBook);
    updateDashboard();
    hideAddBookForm();
    
    alert('Book added successfully!');
});

function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        const newTitle = prompt('Enter new title:', book.title);
        const newAuthor = prompt('Enter new author:', book.author);
        const newPrice = prompt('Enter new price:', book.price);
        
        if (newTitle && newAuthor && newPrice) {
            book.title = newTitle;
            book.author = newAuthor;
            book.price = parseFloat(newPrice);
            updateDashboard();
            alert('Book updated successfully!');
        }
    }
}

function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(book => book.id !== bookId);
        updateDashboard();
        alert('Book deleted successfully!');
    }
}