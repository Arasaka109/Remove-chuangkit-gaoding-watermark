// ==UserScript==
// @name         去除稿定水印
// @author       小舟熊
// @version      1.0
// @description  拦截基于 blob 的 svg 水印绘制到 canvas
// @match        *://*.gaoding.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    const originalDrawImage = CanvasRenderingContext2D.prototype.drawImage;


    CanvasRenderingContext2D.prototype.drawImage = function(image, ...args) {

        if (image instanceof HTMLImageElement && image.src.startsWith('blob:')) {

            console.log('检测到正在绘制 blob 图片（可能是水印）:', image.src, image.width, image.height);


            return;
        }


        return originalDrawImage.apply(this, [image, ...args]);
    };
})();