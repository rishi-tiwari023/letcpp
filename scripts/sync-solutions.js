const fs = require('fs');
const path = require('path');

const SOLUTIONS_FILE = path.join(__dirname, '../solutions.json');
const VIEWS_DIR = path.join(__dirname, '../views');

function extractMetadata(filePath, id) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract Title
    const titleMatch = content.match(/<title>\s*LeetCode\s*\d+:\s*(.*?)\s*\(C\+\+\)\s*<\/title>/i) ||
        content.match(/<h1>LeetCode\s*\d+:\s*(.*?)\s*\(C\+\+\)<\/h1>/i) ||
        content.match(/<h1>LeetCode\s*\d+:\s*(.*?)\s*<\/h1>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : `Problem ${id}`;

    // Extract Difficulty
    // Note: Difficulty is often not explicitly in a tag but sometimes in the description or assumed Medium.
    // We'll try to find common keywords or default to Medium.
    let difficulty = "Medium";
    if (content.toLowerCase().includes("difficulty: easy") || content.toLowerCase().includes("easy</span>")) difficulty = "Easy";
    if (content.toLowerCase().includes("difficulty: hard") || content.toLowerCase().includes("hard</span>")) difficulty = "Hard";

    // Extract Description
    const descMatch = content.match(/<div class="problem-description">[\s\S]*?<p><strong>Problem:<\/strong>([\s\S]*?)<\/p>/i);
    let description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : "";
    if (description.length > 200) description = description.substring(0, 197) + "...";

    return {
        id: parseInt(id),
        title: title,
        route: `/${id}`,
        difficulty: difficulty,
        description: description,
        timeComplexity: "O(n)", // Default - needs manual refinement often
        spaceComplexity: "O(1)"  // Default - needs manual refinement often
    };
}

function sync() {
    console.log("Starting solutions synchronization...");

    if (!fs.existsSync(SOLUTIONS_FILE)) {
        console.error("solutions.json not found!");
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(SOLUTIONS_FILE, 'utf8'));
    const existingIds = new Set(data.solutions.map(s => s.id));
    const files = fs.readdirSync(VIEWS_DIR);

    let addedCount = 0;

    for (const file of files) {
        if (file.endsWith('.ejs') && file !== '404.ejs') {
            const id = file.replace('.ejs', '');
            if (!isNaN(id) && !existingIds.has(parseInt(id))) {
                console.log(`Adding new solution: ${id}`);
                const metadata = extractMetadata(path.join(VIEWS_DIR, file), id);
                data.solutions.push(metadata);
                addedCount++;
            }
        }
    }

    if (addedCount > 0) {
        // Sort by ID ascending
        data.solutions.sort((a, b) => a.id - b.id);

        data.lastUpdated = new Date().toISOString().split('T')[0];

        fs.writeFileSync(SOLUTIONS_FILE, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Successfully added ${addedCount} new solutions.`);
    } else {
        console.log("No new solutions found.");
    }
}

sync();
