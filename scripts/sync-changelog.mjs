// CHM の CHANGELOG.md から「更新履歴」のページを作る（CHM のリポジトリは非公開なので、作ったページをこのリポジトリに入れる）
// 使い方: node scripts/sync-changelog.mjs [CHANGELOG.md のパス]
import {readFileSync, writeFileSync} from 'node:fs';

// v1.5.x 以前はファイル名やクラス名を並べた開発者向けの書き方なので、説明書には載せない
const oldestShown = 'v1.6.0';

const source = process.argv[2] ?? '../com.nekoare.chimera-hair-master/CHANGELOG.md';
const changelog = readFileSync(source, 'utf8').replace(/^# Changelog\s*\n/, '');
const oldestStart = changelog.indexOf(`\n## ${oldestShown}\n`);
if (oldestStart < 0) throw new Error(`${source} に「## ${oldestShown}」が見つかりません`);
const olderStart = changelog.indexOf('\n## ', oldestStart + 1);
const body = olderStart < 0
  ? changelog
  : `${changelog.slice(0, olderStart).trim()}\n\n${oldestShown}より前の変更は省略しています。`;
const page = `---
title: 更新履歴
sidebar_position: 7
slug: /changelog
---

# 更新履歴

${body.trim()}
`;
writeFileSync('docs/changelog.md', page);
console.log(`docs/changelog.md を ${source} から作りました`);
