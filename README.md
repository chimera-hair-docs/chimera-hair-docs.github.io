# キメラヘアマスター 説明書

https://chimera-hair-docs.github.io/ の元になるファイルです。Docusaurusで作っています。

## 手元で見る

```bash
npm ci
npm run start
```

## 公開

`main`にpushすると、GitHub Actions（`.github/workflows/deploy.yml`）が組み立ててGitHub Pagesに公開します。

## 更新履歴のページ

`docs/changelog.md`は、キメラヘアマスターのCHANGELOG.mdから作ります。v1.6.0より前は載せません。

```bash
node scripts/sync-changelog.mjs [CHANGELOG.mdのパス]
```
