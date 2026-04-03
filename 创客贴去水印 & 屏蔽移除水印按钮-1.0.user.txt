// ==UserScript==
// @name         创客贴去水印 & 屏蔽移除水印按钮
// @author       小舟熊
// @version      1.0
// @description  精准拦截 PNG 水印，并自动屏蔽“移除水印”付费提示按钮，方便系统手动截图
// @match        *://*.chuangkit.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('🎯 极简版：去水印 & 按钮屏蔽模块已启动...');

    const originalCreateObjectURL = window.URL.createObjectURL;
    const transparentPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const binaryString = atob(transparentPngBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) { bytes[i] = binaryString.charCodeAt(i); }
    const fakePngBlob = new Blob([bytes], { type: 'image/png' });

    window.URL.createObjectURL = function(blob) {
        if (blob instanceof Blob && blob.type === 'image/png' && blob.size >= 8400 && blob.size <= 8600) {
            console.log(`🎯 成功拦截底层水印 (大小: ${blob.size} 字节)`);
            return originalCreateObjectURL.call(this, fakePngBlob);
        }
        return originalCreateObjectURL.call(this, blob);
    };

    function removeAnnoyingButton() {
        const xpath = "//div[contains(text(), '移除水印，畅享高清模板')]";
        const result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (let i = 0; i < result.snapshotLength; i++) {
            const node = result.snapshotItem(i);
            if (node) {
                node.remove();
                console.log("✅ 成功移除了阻挡视线的“移除水印”按钮！");
            }
        }
    }

    setInterval(removeAnnoyingButton, 1000);

})();