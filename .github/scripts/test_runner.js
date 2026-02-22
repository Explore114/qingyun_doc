const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const DATA_FILE = '.vitepress/theme/untils/data.ts';
const OUTPUT_FILE = 'output.txt';

// Mock Server
const server = http.createServer((req, res) => {
    console.log(`[MockServer] Request: ${req.url}`);
    
    // 模拟 404
    if (req.url.includes('invalid') || req.url.includes('404')) {
        res.writeHead(404);
        res.end('Not Found');
        return;
    }

    // 模拟 verification file
    if (req.url === '/qingyun-verify.txt') {
        res.writeHead(200);
        res.end('verify-content');
        return;
    } 
    
    // 模拟 Icon (任意图片请求)
    if (req.url.endsWith('.png')) {
        res.writeHead(200);
        res.end('Icon Data');
        return;
    }

    // 默认首页 (Link check)
    if (req.url === '/') {
        res.writeHead(200);
        res.end('Home Page');
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

function runVerifyScript() {
    return new Promise((resolve) => {
        // Set GITHUB_OUTPUT environment variable
        process.env.GITHUB_OUTPUT = OUTPUT_FILE;
        
        exec('node .github/scripts/verify_links.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
            }
            // console.log(`stdout: ${stdout}`); // Optional: Log stdout
            if (stderr) console.error(`stderr: ${stderr}`);
            resolve();
        });
    });
}

async function runTest() {
    let originalContent = '';
    try {
        if (!fs.existsSync(DATA_FILE)) {
             console.error(`Data file not found at ${DATA_FILE}`);
             process.exit(1);
        }
        originalContent = fs.readFileSync(DATA_FILE, 'utf8');
        
        // Start Server
        await new Promise(resolve => server.listen(PORT, resolve));
        console.log(`Mock server running at http://localhost:${PORT}`);

        // --- Test Case 1: All Valid ---
        console.log('\n--- Running Test Case 1: Valid Links ---');
        
        // Construct new item
        const validItem = `
      {
        icon: 'http://localhost:${PORT}/icon.png',
        title: '测试友链Valid',
        desc: '本地测试描述',
        link: 'http://localhost:${PORT}'
      },`;
        
        // Insert into file. We look for the last closing brace of an item in the '友情链接' section
        // A simple way is to replace the last "      }," with "      }, [validItem]"
        // But we need to be careful not to break the structure.
        
        // Let's assume the file ends with the last item of the last group.
        // We will insert before the last closing bracket of the items array.
        // The file structure:
        // items: [ ... { ... }, ]
        
        // Find the last occurrence of "]" which closes the items array? 
        // No, there are multiple arrays.
        // We specifically need the '友情链接' section.
        
        // Let's regex replace to inject.
        // Find: title: '友情链接', ... items: [ ... (last item) ... ]
        // We will just append to the end of the file's array for simplicity in this mock test, 
        // AS LONG AS the script picks up the last item.
        // The script regex: `const friendLinkSectionRegex = /title:\s*['"]友情链接['"]\s*,\s*items:\s*\[([\s\S]*?)\]/s;`
        // So we MUST inject into that specific section.
        
        const friendLinkMatch = originalContent.match(/title:\s*['"]友情链接['"]\s*,\s*items:\s*\[([\s\S]*?)\]/s);
        if (!friendLinkMatch) throw new Error("Could not find Friend Link section");
        
        const sectionContent = friendLinkMatch[0]; // The whole section
        const itemsContent = friendLinkMatch[1];   // The items inside [ ]
        
        // We want to append to itemsContent
        const newItemsContent = itemsContent + validItem;
        const newSectionContent = sectionContent.replace(itemsContent, newItemsContent);
        
        const newFileContent = originalContent.replace(sectionContent, newSectionContent);
        
        fs.writeFileSync(DATA_FILE, newFileContent, 'utf8');

        // Run Script
        if (fs.existsSync(OUTPUT_FILE)) fs.unlinkSync(OUTPUT_FILE);
        await runVerifyScript();

        // Check Output
        let output = '';
        if (fs.existsSync(OUTPUT_FILE)) {
             output = fs.readFileSync(OUTPUT_FILE, 'utf8');
        }
        console.log('Output Content:\n' + output);
        
        if (!output.includes('title=测试友链Valid')) console.error('FAIL: Title check failed');
        if (!output.includes('link_status=ok')) console.error('FAIL: Link status check failed');
        if (!output.includes('icon_status=ok')) console.error('FAIL: Icon status check failed');
        if (!output.includes('verify_status=ok')) console.error('FAIL: Verify status check failed');

        // --- Test Case 2: Invalid Link ---
        console.log('\n--- Running Test Case 2: Invalid Links ---');
        
        const invalidItem = `
      {
        icon: 'http://localhost:${PORT}/404.png',
        title: '测试无效链接',
        desc: '本地测试描述',
        link: 'http://localhost:${PORT}/invalid'
      },`;

        const invalidItemsContent = itemsContent + invalidItem; // Reset to original items + invalid
        const invalidSectionContent = sectionContent.replace(itemsContent, invalidItemsContent);
        const invalidFileContent = originalContent.replace(sectionContent, invalidSectionContent);

        fs.writeFileSync(DATA_FILE, invalidFileContent, 'utf8');

        if (fs.existsSync(OUTPUT_FILE)) fs.unlinkSync(OUTPUT_FILE);
        await runVerifyScript();

        output = '';
        if (fs.existsSync(OUTPUT_FILE)) {
             output = fs.readFileSync(OUTPUT_FILE, 'utf8');
        }
        console.log('Output Content:\n' + output);

        if (!output.includes('title=测试无效链接')) console.error('FAIL: Title check failed');
        if (output.includes('link_status=ok')) console.error('FAIL: Link status should fail'); 
        if (output.includes('icon_status=ok')) console.error('FAIL: Icon status should fail');
        if (output.includes('verify_status=ok')) console.error('FAIL: Verify status should fail');

    } catch (e) {
        console.error('Test Failed:', e);
    } finally {
        // Cleanup
        server.close();
        if (originalContent) {
            fs.writeFileSync(DATA_FILE, originalContent, 'utf8');
        }
        if (fs.existsSync(OUTPUT_FILE)) fs.unlinkSync(OUTPUT_FILE);
        console.log('\nTest Completed. Cleanup done.');
        process.exit(0);
    }
}

runTest();
