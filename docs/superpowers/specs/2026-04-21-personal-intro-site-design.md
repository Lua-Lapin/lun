# 個人自己紹介サイト 設計書

## 概要

Linktree的な自己紹介ページ。プロフィール・SNSリンク・思い出アルバムを持つ静的サイト。React + Vite で構築し GitHub Pages にデプロイする。コンテンツは `src/config.ts` を編集してビルドする運用。

## 技術スタック

- React + Vite + TypeScript
- React Router v6 **HashRouter**（GitHub Pages はサーバーサイドルーティング不可のため `/#/album/...` 形式のURLを使う）
- lucide-react（SNSアイコン）
- CSS Modules（スタイル管理）
- gh-pages（GitHub Pages デプロイ）

## ページ構成

| URL | コンポーネント | 内容 |
|-----|---------------|------|
| `/` | `TopPage` | プロフィール・SNSリンク・イベントプレビュー |
| `/album/:eventId` | `EventPage` | イベント個別の全画像 |

`/album` の一覧ページは持たない。トップのプレビューから直接各イベントページへ遷移する。

## 設定ファイル

`src/config.ts` にすべてのコンテンツを集約する。

```typescript
export const profile = {
  name: string;          // 表示名
  bio: string;           // 一言自己紹介
  avatar: string;        // 画像パス（例: "/images/avatar.jpg"）
};

export const snsLinks = [
  {
    label: string;       // 表示ラベル
    url: string;         // リンク先URL
    icon: string;        // Lucideアイコン名（例: "Twitter", "Github"）
  }
];

export const events = [
  {
    id: string;          // URLに使うID（例: "summer-fest-2024"）
    title: string;       // イベント名（例: "夏フェス 2024"）
    date: string;        // 表示用日付（例: "2024.08"）
    description: string; // イベントの一言メモ
    images: string[];    // 画像パスの配列（例: ["/images/summer-fest-2024/01.jpg", ...]）
    previewCount: number; // トップページに表示する枚数
  }
];
```

## コンポーネント構成

```
src/
  config.ts
  App.tsx              ← Router設定
  pages/
    TopPage.tsx        ← プロフィール・SNSリンク・イベントプレビュー一覧
    EventPage.tsx      ← /album/:eventId、イベント個別ページ
  components/
    Profile.tsx        ← アイコン・名前・自己紹介
    SnsLinks.tsx       ← SNSリンクボタン群
    EventPreview.tsx   ← トップ用プレビューカード（縦長サムネ + もっと見るリンク）
    EventGallery.tsx   ← アルバム用マソンリーグリッド
    DynamicIcon.tsx    ← lucide-reactのアイコンを名前で動的レンダリング
    Lightbox.tsx       ← 画像タップ時のフルスクリーン拡大表示
public/
  images/
    avatar.jpg
    {eventId}/         ← イベントごとにディレクトリを切る
      01.jpg
      02.jpg
```

## デザイン仕様

**カラーパレット**
- 背景: `#fff5ee`（クリーム）〜 `#ffe8d6`（薄オレンジ）グラデーション
- アクセント: `#c25e1a`（深オレンジ）
- サブテキスト: `#e07a2f`
- カード背景: `#ffffff`

**スタイル方針**
- 角丸多め（`border-radius: 12px〜20px`）
- カードにやわらかい影（`box-shadow: 0 2px 8px rgba(0,0,0,0.06)`）
- フォントはシステムフォント（丸みのある系、`'Hiragino Maru Gothic Pro'` など）

## レイアウト詳細

### トップページ

縦1カラム、中央寄せ、最大幅 `480px`（スマホ縦基準）。

1. **Profile** — アイコン（円形）・名前・自己紹介
2. **SnsLinks** — ピル型ボタンを横並び・折り返し
3. **EventPreview × n** — イベントカードを縦に並べる
   - タイトル・日付
   - サムネイル `previewCount` 枚を横並び（`aspect-ratio: 3/4`、縦長）
   - 「もっと見る →」リンク（`/album/:eventId` へ）

### イベントページ（`/album/:eventId`）

- ページ上部にイベントタイトル・日付・説明
- 「← トップに戻る」リンク
- 全画像を **2列マソンリーレイアウト**（`columns: 2`）で表示
- 画像は原寸比率を維持（縦長スマホ写真に対応）
- 画像をタップすると拡大表示（lightbox）

## 画像管理

- `public/images/` 以下にコミットして管理
- イベントごとにサブディレクトリを切る（例: `public/images/summer-fest-2024/`）
- ファイル名は連番推奨（`01.jpg`, `02.jpg`, ...）
- `config.ts` の `images` 配列にパスを列挙する

## デプロイ

```bash
npm run build    # dist/ を生成
npm run deploy   # gh-pages パッケージで GitHub Pages へプッシュ
```

`vite.config.ts` の `base` をリポジトリ名に合わせて設定する（例: `base: '/lun/'`）。

## スコープ外

- CMS・管理画面（コードを直接編集する運用）
- 画像の外部ストレージ連携
- ダークモード
- アニメーション・トランジション（凝ったもの）
