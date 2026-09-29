import { BOOK, BOOK_VERSION, SOURCE } from "./manuscript.mjs";

export const coverHtml = () => `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><link rel="stylesheet" href="FONTS_CSS"><style>
html, body { margin: 0; }
body { width: 1200px; height: 1800px; background: #14181f; color: #f2f0e8; font-family: "Noto Sans JP", sans-serif; position: relative; overflow: hidden; }
.frame { position: absolute; inset: 70px; border: 3px solid #d9a441; }
.kicker { position: absolute; top: 200px; left: 140px; font-size: 40px; letter-spacing: 8px; color: #d9a441; }
h1 { position: absolute; top: 560px; left: 140px; right: 140px; margin: 0; font-size: 155px; line-height: 1.05; font-weight: 700; word-break: normal; line-break: strict; }
.sub { position: absolute; top: 960px; left: 140px; right: 160px; font-size: 56px; line-height: 1.45; font-weight: 700; color: #cfcab9; }
.foot { position: absolute; bottom: 170px; left: 140px; right: 140px; font-size: 32px; line-height: 1.6; color: #a9a693; }
.stack { position: absolute; top: 1330px; left: 140px; display: flex; gap: 14px; }
.stack i { display: block; width: 46px; height: 46px; background: #d9a441; opacity: .9; }
.stack i:nth-child(2n) { opacity: .55; } .stack i:nth-child(3n) { opacity: .3; }
</style></head><body>
<div class="frame"></div>
<div class="kicker">CURSOR PLUGIN</div>
<h1>pstack<br>ガイド</h1>
<div class="sub">Cursorプラグインの<br>47スキルを理解する</div>
<div class="stack">${"<i></i>".repeat(9)}</div>
<div class="foot">非公式日本語解説書<br>原著 pstack：Lauren Tan (MIT)<br>pstack ${SOURCE.version} 対象（本書 ${BOOK_VERSION}）</div>
</body></html>`;
