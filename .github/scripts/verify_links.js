const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const OLD_FILE_PATH = process.argv[2];
const NEW_FILE_PATH = process.argv[3];

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

function parseItems(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}, assuming empty list.`);
        return [];
    }
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find '友情链接' section
    const friendLinkSectionRegex = /title:\s*['"]友情链接['"]\s*,\s*items:\s*\[([\s\S]*?)\]/s;
    const match = content.match(friendLinkSectionRegex);
    
    if (!match) {
        console.warn(`Could not find "友情链接" section in ${filePath}`);
        return [];
    }

    const itemsString = match[1];
    const items = [];
    const fullItemRegex = /{\s*(?:icon:\s*['"](.*?)['"])?[\s\S]*?title:\s*['"](.*?)['"][\s\S]*?link:\s*['"](.*?)['"][\s\S]*?}/g;

    let itemMatch;
    while ((itemMatch = fullItemRegex.exec(itemsString)) !== null) {
        items.push({
            icon: itemMatch[1] || '',
            title: itemMatch[2],
            link: itemMatch[3]
        });
    }
    return items;
}

async function main() {
    try {
        if (!NEW_FILE_PATH) {
            console.error('Usage: node verify_links.js <old_file_path> <new_file_path>');
            process.exit(1);
        }

        const oldItems = parseItems(OLD_FILE_PATH);
        const newItems = parseItems(NEW_FILE_PATH);

        // Find Added or Modified Items
        // We use 'link' as the primary key for identity, but if link changed, it's tricky.
        // Let's assume title + link is the identity.
        // Or simply find items in newItems that are NOT in oldItems (deep comparison).
        
        const changes = newItems.filter(newItem => {
            return !oldItems.some(oldItem => 
                oldItem.title === newItem.title && 
                oldItem.link === newItem.link && 
                oldItem.icon === newItem.icon
            );
        });

        if (changes.length === 0) {
            console.log('No changes detected in Friend Links.');
            // Fallback: If no changes found but file changed, maybe check the last item just in case?
            // Or maybe user just reformatted code.
            // Let's verify the LAST item of new list if it exists, to be safe.
            if (newItems.length > 0) {
                 console.log('Falling back to check the last item.');
                 changes.push(newItems[newItems.length - 1]);
            } else {
                 return;
            }
        }

        // We process the FIRST change found for PR Title updates etc.
        // (In a real scenario we might loop all, but Actions outputs are key-value pairs)
        const targetItem = changes[0];
        
        console.log(`Checking item: ${targetItem.title} (${targetItem.link})`);

        // Output for Actions
        const setOutput = (key, value) => {
            const outputFile = process.env.GITHUB_OUTPUT;
            if (outputFile) {
                fs.appendFileSync(outputFile, `${key}=${value}\n`);
            }
            console.log(`::set-output name=${key}::${value}`); // Fallback
        };

        setOutput('title', targetItem.title);
        setOutput('link', targetItem.link);
        setOutput('icon', targetItem.icon);

        // Check Icon
        let iconStatus = 200;
        if (targetItem.icon) {
             const res = await checkUrl(targetItem.icon);
             iconStatus = res.status;
        }
        setOutput('icon_status', iconStatus === 200 ? 'ok' : 'fail');

        // Check Link
        const linkRes = await checkUrl(targetItem.link);
        setOutput('link_status', linkRes.status === 200 ? 'ok' : 'fail');

        // Check Verify File
        let verifyUrl = targetItem.link;
        if (!verifyUrl.endsWith('/')) verifyUrl += '/';
        verifyUrl += 'qingyun-verify.txt'; 
        
        const verifyRes = await checkUrl(verifyUrl);
        setOutput('verify_status', verifyRes.status === 200 ? 'ok' : 'fail');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
