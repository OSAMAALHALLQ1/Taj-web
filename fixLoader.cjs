const fs = require('fs');

let content = fs.readFileSync('src/components/AnimatedLogoLoader.tsx', 'utf8');

// Replace <style type="text/css">...</style> with dangerouslySetInnerHTML
content = content.replace(/<style type="text\/css">([\s\S]*?)<\/style>/gi, (match, p1) => {
    return `<style type="text/css" dangerouslySetInnerHTML={{ __html: \`${p1.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />`;
});

// Write it back
fs.writeFileSync('src/components/AnimatedLogoLoader.tsx', content);
console.log('Fixed style tags inside AnimatedLogoLoader.tsx');
