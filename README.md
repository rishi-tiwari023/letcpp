# LetCpp - LeetCode C++ Solutions

A comprehensive collection of C++ solutions for LeetCode problems with a modern, responsive web interface. Clean, efficient code with detailed complexity analysis and multiple approaches.

## ✨ Features

- **Modern Homepage** with Tailwind CSS styling
- **Solution Pages** with copy-to-clipboard functionality
- **Responsive Design** that works on all devices
- **Professional Styling** with dark code blocks and clean typography
- **Easy Navigation** between problems and home page
- **Developer Profile** with social links

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: EJS templating + Tailwind CSS
- **Styling**: Custom CSS + Tailwind CSS
- **JavaScript**: Vanilla JS for copy functionality
- **Build Tools**: PostCSS + Autoprefixer

## 📋 Requirements

- Node.js 18+ recommended
- npm or yarn package manager

## 🚀 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd letcpp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build CSS (Development)**
   ```bash
   npm run build:css
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 🌐 Available Pages

- **Homepage**: `http://localhost:3000` - Modern landing page with project overview
- **LeetCode 1**: `http://localhost:3000/1` - Two Sum solution
- **LeetCode 2**: `http://localhost:3000/2` - Add Two Numbers solution

## 🎨 Styling & Build

### Development Mode
```bash
npm run build:css
```
Watches for changes and rebuilds CSS automatically.

### Production Build
```bash
npm run build:css:prod
```
Creates minified CSS for production deployment.

## 📁 Project Structure

```
letcpp/
├── server.js                    # Express server and routes
├── package.json                 # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── render.yaml                 # Render deployment configuration
├── DEPLOYMENT.md               # Complete deployment guide
├── .gitignore                  # Git ignore rules
│
├── views/
│   ├── home.ejs               # Modern homepage with Tailwind
│   ├── 1.ejs                  # LeetCode 1 solution page
│   ├── 2.ejs                  # LeetCode 2 solution page
│   ├── 404.ejs                # 404 error page
│   └── solution-template.ejs  # Template for new solutions
│
├── public/
│   ├── styles.css             # Custom CSS for solution pages
│   ├── styles.min.css         # Compiled Tailwind CSS (generated)
│   ├── tailwind.css           # Tailwind source file
│   ├── solution.js            # Shared JavaScript for copy functionality
│   └── Developer.jpeg         # Developer profile image
│
└── node_modules/              # Dependencies (not in git)
```

## 📝 Adding New Solution Pages

### Method 1: Manual Creation
1. Create a new file in `views/` (e.g., `views/3.ejs`)
2. Use the solution template structure:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>LeetCode 3 - Problem Name</title>
       <link rel="stylesheet" href="/styles.css" />
       <script src="/solution.js"></script>
   </head>
   <body>
       <main>
           <h1>LeetCode 3: Problem Name (C++)</h1>
           <div class="problem-description">
               <p><strong>Problem:</strong> Problem description...</p>
               <p><strong>Example:</strong> Example with code...</p>
           </div>
           <div class="code-container">
               <button class="copy-button" onclick="copyCode(this)">Copy Code</button>
               <pre><code class="language-cpp">Your C++ solution here</code></pre>
           </div>
           <a href="/" class="back-link">← Back to Home</a>
       </main>
   </body>
   </html>
   ```

3. Add a route in `server.js`:
   ```javascript
   app.get('/3', (req, res) => {
     res.render('3', { title: 'LeetCode 3 - Problem Name' });
   });
   ```

### Method 2: Using EJS Template (Advanced)
You can modify the server to use dynamic templates with data.

## 🎯 Features in Detail

### Copy to Clipboard
- One-click code copying from solution pages
- Visual feedback with button state changes
- Cross-browser compatibility with fallback support
- Automatic reset after 2 seconds

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Clean typography and spacing
- Professional color scheme
- Smooth hover effects and transitions

### Code Styling
- Dark theme code blocks for better readability
- Syntax highlighting support
- Proper font families for code
- Inline code styling for problem descriptions

### HTML Entity Encoding for C++ Template Syntax
When displaying C++ code with template syntax in HTML, use HTML entities to prevent browser interpretation:
- `<` → `&lt;` (less than)
- `>` → `&gt;` (greater than)  
- `&` → `&amp;` (ampersand)

**Example**: `vector<vector<char>>&` should be written as `vector&lt;vector&lt;char&gt;&gt;&amp;` in HTML source to display correctly.

## 🔧 Customization

### Styling
- Modify `public/styles.css` for solution page styles
- Update `public/tailwind.css` for Tailwind customizations
- Edit `tailwind.config.js` for theme configuration

### JavaScript
- Update `public/solution.js` for shared functionality
- All solution pages automatically use the shared script

## 🚀 Deployment

### Local Development
```bash
npm start
```

### Production Build
```bash
npm run build:css:prod
npm start
```

### Environment Variables
- `PORT`: Set custom port (default: 3000)
- PowerShell: `($env:PORT = 4000); npm start`
- Bash: `PORT=4000 npm start`

### Deploy to Render (Recommended)

1. **Follow the complete deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Quick deployment**:
   - Push your code to GitHub
   - Connect to Render using the `render.yaml` blueprint
   - Your app will be live at `https://your-app-name.onrender.com`

### Other Deployment Options

- **Vercel**: Use the `vercel.json` configuration
- **Netlify**: Use the `netlify.toml` configuration
- **Railway**: Direct deployment from GitHub
- **Heroku**: Use `Procfile` (if you have one)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Rishi Tiwari** - Full Stack Developer & Competitive Programmer

- [LinkedIn](https://www.linkedin.com/in/rishi-tiwari023/)
- [LeetCode](https://leetcode.com/u/2311038_cscysIIB/)
- [GitHub](https://github.com/rishi-tiwari023/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your solution page
4. Submit a pull request

---

## 🔍 Finding Missing Solutions

Use this script to find which solution EJS files exist but are not yet added to `solutions.json`:

```javascript
// search.js - Find missing solutions
const fs = require('fs');
const path = require('path');

// Read solutions.json
const solutions = JSON.parse(fs.readFileSync('solutions.json', 'utf8'));
const existingIds = new Set(solutions.solutions.map(s => s.id));

// Get all numeric EJS files from views directory
const viewsDir = 'views';
const files = fs.readdirSync(viewsDir).filter(f => /^\d+\.ejs$/.test(f));
const fileIds = files.map(f => parseInt(f.replace('.ejs', '')));

// Find missing solution IDs
const missing = fileIds.filter(id => !existingIds.has(id)).sort((a, b) => a - b);

console.log('TotalCount field in JSON:', solutions.totalCount);
console.log('Actual solutions array length:', solutions.solutions.length);
console.log('EJS files found:', files.length);
console.log('Missing solution IDs:', JSON.stringify(missing));
console.log('Total missing:', missing.length);

// Also show which IDs are in solutions.json but don't have EJS files
const solutionIds = new Set(solutions.solutions.map(s => s.id));
const missingFiles = Array.from(solutionIds).filter(id => !fileIds.includes(id)).sort((a, b) => a - b);
if (missingFiles.length > 0) {
    console.log('\nSolutions in JSON but missing EJS files:', JSON.stringify(missingFiles));
}
```

Run with: `node search.js`

## 🔄 Syncing Solutions Metadata

To automatically sync and validate solution metadata (like missing difficulties or complexities) across the repository, use the included sync script:

```bash
node scripts/sync-solutions.js
```

This ensures `solutions.json` correctly reflects all the solutions available in the `views/` directory.

---

**LetCpp** - Making LeetCode solutions accessible and beautiful! 🚀


