
import re
with open(r'C:\Users\M.S.I\Downloads\«· «Ã „ÿ⁄„ «·«”«”Ì «·Ì ›Ì «·Ê«ÃÂ…2.svg', encoding='utf-8') as f:
    content = f.read()
paths = re.findall(r'<path[^>]+>', content)
for i, p in enumerate(paths):
    st = re.search(r'class="st\d+"', p)
    m = re.search(r'd="([^"]+)"', p)
    if m:
        nums = [float(x) for x in re.findall(r'-?\d+\.?\d*', m.group(1))]
        if nums:
            minX = min(nums[0::2])
            maxX = max(nums[0::2])
            minY = min(nums[1::2])
            maxY = max(nums[1::2])
            cls_name = st.group(0) if st else i
            print(f'Path {cls_name} w={maxX-minX} h={maxY-minY} x={minX} y={minY}')

