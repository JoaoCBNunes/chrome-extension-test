(() => {
  // Counter for detected images
  let imgCount = 0;

  // 1. Create the info panel
  const panel = document.createElement('div');
  panel.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ffb3d9;
    color: #000;
    z-index: 2147483647;
    font-family: monospace;
    font-size: 12px;
    padding: 4px;
    max-height: 580px;
    overflow: auto;
    box-shadow: 0 2px 4px rgba(0,0,0,.2);
  `;
  panel.textContent = 'Imagens “grandonas” (área \u2265 1080×1080) detectadas:';
  document.body.appendChild(panel);

  // 2. Report function for console and panel
  const report = (img) => {
    imgCount++;
    const { naturalWidth: w, naturalHeight: h, src: url } = img;
    const line = document.createElement('div');
    line.textContent = `[${imgCount}] ${w}×${h} → `;
    line.style.marginBottom = '12px';
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.textContent = url;
    line.appendChild(anchor);
    panel.appendChild(line);
    console.log(`[${imgCount}]`, '[IMAGEM GRANDE]', w, '×', h, url);
  };

  // 3. Check image area
  const watchImg = (img) => {
    const checkArea = () => {
      const area = img.naturalWidth * img.naturalHeight;
      if (area >= 1080 * 1080) {
        report(img);
      }
    };
    img.complete
      ? checkArea()
      : img.addEventListener('load', checkArea, { once: true });
  };

  // 4. Initial scan
  document.querySelectorAll('img').forEach(watchImg);

  // 5. Observe future images
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.tagName === 'IMG') {
          watchImg(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll('img').forEach(watchImg);
        }
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();
