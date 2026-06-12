import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

glob_code = '''
const images: Record<string, string> = import.meta.glob('@/assets/extracted_items/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const getImg = (name: string) => images['/src/assets/extracted_items/' + name] || '';
'''

new_content = re.sub(r'image:\s*\"/extracted_items/([^\"\']+)\"', r'image: getImg("\1")', content)

new_content = re.sub(r'(export interface MenuItem \{.*?\})', r'\1\n' + glob_code, new_content, flags=re.DOTALL)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Updated menu.ts successfully!')
