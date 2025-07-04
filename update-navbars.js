// Script to update all HTML files with Bootstrap navbar
const fs = require('fs');
const path = require('path');

const bootstrapCSS = `    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`;

const bootstrapJS = `    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`;

function createBootstrapNavbar(activePage) {
  return `    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand fw-bold" href="index.html">
          <h2 class="mb-0">ReserVee</h2>
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link${activePage === 'home' ? ' active" aria-current="page"' : '"'} href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link${activePage === 'reservation' ? ' active" aria-current="page"' : '"'} href="reservation.html">Reservations</a>
            </li>
            <li class="nav-item">
              <a class="nav-link${activePage === 'admin' ? ' active" aria-current="page"' : '"'} href="admin.html">Admin</a>
            </li>
            <li class="nav-item">
              <a class="nav-link${activePage === 'tools' ? ' active" aria-current="page"' : '"'} href="tools.html">Tools</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
}

const files = [
  { name: 'index.html', activePage: 'home' },
  { name: 'reservation.html', activePage: 'reservation' },
  { name: 'admin.html', activePage: 'admin' },
  { name: 'tools.html', activePage: 'tools' },
  { name: 'restaurant.html', activePage: 'home' }
];

files.forEach(file => {
  const filePath = path.join(__dirname, file.name);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add Bootstrap CSS if not present
    if (!content.includes('bootstrap@5.3.2')) {
      content = content.replace(
        /<link rel="stylesheet" href="\/src\/assets\/scss\/main\.scss" \/>/,
        `${bootstrapCSS}\n    <link rel="stylesheet" href="/src/assets/scss/main.scss" />`
      );
    }
    
    // Replace old navbar with Bootstrap navbar
    const oldNavbarRegex = /<nav class="navbar">[\s\S]*?<\/nav>/;
    content = content.replace(oldNavbarRegex, createBootstrapNavbar(file.activePage));
    
    // Add Bootstrap JS if not present
    if (!content.includes('bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js')) {
      content = content.replace(
        /(<script type="module" src="[^"]*"><\/script>\s*<\/body>)/,
        `${bootstrapJS}\n    \n    $1`
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file.name}`);
  }
});

console.log('All HTML files updated with Bootstrap navbar!');
