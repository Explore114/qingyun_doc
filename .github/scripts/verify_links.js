const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const FILE_PATH = '.vitepress/theme/untils/data.ts';

function checkUrl(url) {
    return new Promise((resolve) => {
        if (!url) {
            resolve({ status: 404 }); 
            return;
        }
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, (res) => {
            resolve({ status: res.statusCode });
        });
        req.on('error', () => resolve({ status: 0 }));
        req.setTimeout(5000, () => {
            req.destroy();
            resolve({ status: 0 });
        });
    });
}

async function main() {
    try {
        if (!fs.existsSync(FILE_PATH)) {
            console.error(`File not found: ${FILE_PATH}`);
            process.exit(1);
        }
        const content = fs.readFileSync(FILE_PATH, 'utf8');
        
        // Find '友情链接' section
        const friendLinkSectionRegex = /title:\s*['"]友情链接['"]\s*,\s*items:\s*\[([\s\S]*?)\]/s;
        const match = content.match(friendLinkSectionRegex);
        
        if (!match) {
            console.error('Could not find "友情链接" section');
            process.exit(1);
        }

        const itemsString = match[1];
        // Extract items. Note: This regex assumes simple structure.
        const items = [];
        // Regex to match object blocks crudely
        const itemRegex = /{[^}]*?title:\s*['"](.*?)['"][^}]*?link:\s*['"](.*?)['"][^}]*?}/g;
        // A better regex to capture icon as well
        const fullItemRegex = /{\s*(?:icon:\s*['"](.*?)['"])?[\s\S]*?title:\s*['"](.*?)['"][\s\S]*?link:\s*['"](.*?)['"][\s\S]*?}/g;

        let itemMatch;
        while ((itemMatch = fullItemRegex.exec(itemsString)) !== null) {
            items.push({
                icon: itemMatch[1] || '',
                title: itemMatch[2],
                link: itemMatch[3]
            });
        }

        if (items.length === 0) {
            console.log('No items found');
            return;
        }

        const lastItem = items[items.length - 1];
        console.log(`Checking item: ${lastItem.title} (${lastItem.link})`);

        // Output for Actions
        const setOutput = (key, value) => {
            const outputFile = process.env.GITHUB_OUTPUT;
            if (outputFile) {
                fs.appendFileSync(outputFile, `${key}=${value}\n`);
            }
            console.log(`::set-output name=${key}::${value}`); // Fallback
        };

        setOutput('title', lastItem.title);
        setOutput('link', lastItem.link);
        setOutput('icon', lastItem.icon);

        // Check Icon
        let iconStatus = 200;
        if (lastItem.icon) {
             const res = await checkUrl(lastItem.icon);
             iconStatus = res.status;
        }
        setOutput('icon_status', iconStatus === 200 ? 'ok' : 'fail');

        // Check Link
        const linkRes = await checkUrl(lastItem.link);
        setOutput('link_status', linkRes.status === 200 ? 'ok' : 'fail');

        // Check Verify File
        let verifyUrl = lastItem.link;
        if (!verifyUrl.endsWith('/')) verifyUrl += '/';
        verifyUrl += 'qingyun-verify.txt'; // Standard verification file
        
        const verifyRes = await checkUrl(verifyUrl);
        setOutput('verify_status', verifyRes.status === 200 ? 'ok' : 'fail');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
