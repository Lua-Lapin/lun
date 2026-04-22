# 個人自己紹介サイト 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** React + Vite で作る自己紹介サイト。プロフィール・SNSリンク・思い出アルバムを持ち、GitHub Pages にデプロイする。

**Architecture:** `src/config.ts` に全コンテンツを集約し、コンポーネントはそれを読んでレンダリングする。React Router HashRouter で `/` と `/#/album/:eventId` の2ページ構成。CSS Modules でスタイルを管理する。

**Tech Stack:** React 18, Vite, TypeScript, React Router v6 (HashRouter), lucide-react, CSS Modules, Vitest, @testing-library/react, gh-pages

---

## ファイル構成

```
src/
  config.ts               ← 全コンテンツ（profile / snsLinks / events）と型定義
  App.tsx                 ← HashRouter + Routes
  main.tsx                ← エントリポイント
  test-setup.ts           ← @testing-library/jest-dom セットアップ
  styles/
    global.css            ← CSS変数・body・ベーススタイル
  pages/
    TopPage.tsx           ← プロフィール + SNSリンク + イベントプレビュー一覧
    TopPage.module.css
    EventPage.tsx         ← /album/:eventId、イベント個別ページ
    EventPage.module.css
  components/
    DynamicIcon.tsx       ← lucide-react アイコンを名前で動的レンダリング
    DynamicIcon.test.tsx
    Profile.tsx           ← アイコン・名前・自己紹介
    Profile.module.css
    Profile.test.tsx
    SnsLinks.tsx          ← SNSリンクボタン群
    SnsLinks.module.css
    SnsLinks.test.tsx
    EventPreview.tsx      ← トップ用プレビューカード（縦長サムネ + もっと見るリンク）
    EventPreview.module.css
    EventPreview.test.tsx
    EventGallery.tsx      ← イベント個別ページの2列マソンリーグリッド
    EventGallery.module.css
    EventGallery.test.tsx
    Lightbox.tsx          ← 画像フルスクリーン拡大表示
    Lightbox.module.css
    Lightbox.test.tsx
public/
  images/
    avatar.jpg            ← プロフィール画像（ユーザーが差し替える）
    sample-event/
      01.jpg              ← サンプル画像（ユーザーが差し替える）
vite.config.ts
```

---

### Task 1: プロジェクトスキャフォールド

**Files:**
- Create: `vite.config.ts`（更新）
- Create: `src/main.tsx`（更新）
- Create: `src/test-setup.ts`

- [ ] **Step 1: Vite プロジェクトを作成する**

```bash
cd /Users/lua/projects/lun
npm create vite@latest . -- --template react-ts
```

プロンプトで "current directory" に作成するか聞かれたら `y` を選択。

- [ ] **Step 2: 依存パッケージをインストールする**

```bash
npm install
npm install react-router-dom lucide-react
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom gh-pages
```

- [ ] **Step 3: vite.config.ts を更新する**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lun/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
})
```

> `base: '/lun/'` はリポジトリ名に合わせる。リポジトリ名が異なる場合は変更すること。

- [ ] **Step 4: test-setup.ts を作成する**

`src/test-setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: package.json の scripts を更新する**

`package.json` の `scripts` セクションを以下に置き換える:
```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "deploy": "npm run build && gh-pages -d dist"
}
```

- [ ] **Step 6: main.tsx を更新する**

`src/main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 7: .gitignore に .superpowers/ を追加する**

`.gitignore` に以下の行を追加する:
```
.superpowers/
```

- [ ] **Step 8: Vite が起動することを確認する**

```bash
npm run dev
```

Expected: `http://localhost:5173` でデフォルトのViteページが表示される。

- [ ] **Step 9: コミットする**

```bash
git init
git add vite.config.ts src/main.tsx src/test-setup.ts package.json package-lock.json .gitignore
git commit -m "chore: scaffold React + Vite + TypeScript project"
```

---

### Task 2: config.ts — 型定義とサンプルデータ

**Files:**
- Create: `src/config.ts`

- [ ] **Step 1: config.ts を作成する**

`src/config.ts`:
```ts
export interface Profile {
  name: string
  bio: string
  avatar: string
}

export interface SnsLink {
  label: string
  url: string
  icon: string
}

export interface Event {
  id: string
  title: string
  date: string
  description: string
  images: string[]
  previewCount: number
}

export const profile: Profile = {
  name: 'なまえ',
  bio: 'ひとことじこしょうかい。よろしくね🍊',
  avatar: '/images/avatar.jpg',
}

export const snsLinks: SnsLink[] = [
  { label: 'X (Twitter)', url: 'https://x.com/', icon: 'Twitter' },
  { label: 'Instagram', url: 'https://instagram.com/', icon: 'Instagram' },
  { label: 'GitHub', url: 'https://github.com/', icon: 'Github' },
]

export const events: Event[] = [
  {
    id: 'sample-event',
    title: 'サンプルイベント',
    date: '2024.08',
    description: 'イベントの説明をここに書く。',
    images: [
      '/images/sample-event/01.jpg',
      '/images/sample-event/02.jpg',
      '/images/sample-event/03.jpg',
    ],
    previewCount: 3,
  },
]
```

- [ ] **Step 2: TypeScript のチェックが通ることを確認する**

```bash
npx tsc --noEmit
```

Expected: エラーなし。

- [ ] **Step 3: コミットする**

```bash
git add src/config.ts
git commit -m "feat: add config.ts with types and sample data"
```

---

### Task 3: グローバルCSS

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: styles ディレクトリを作成して global.css を書く**

```bash
mkdir -p src/styles
```

`src/styles/global.css`:
```css
:root {
  --bg-start: #fff5ee;
  --bg-end: #ffe8d6;
  --accent: #c25e1a;
  --sub: #e07a2f;
  --card: #ffffff;
  --radius-sm: 12px;
  --radius-lg: 20px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  --font: 'Hiragino Maru Gothic Pro', 'BIZ UDPGothic', 'Rounded Mplus 1c', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100dvh;
  background: linear-gradient(160deg, var(--bg-start) 0%, var(--bg-end) 100%);
  background-attachment: fixed;
  font-family: var(--font);
  color: var(--accent);
  -webkit-font-smoothing: antialiased;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 2: コミットする**

```bash
mkdir -p src/styles
git add src/styles/global.css
git commit -m "feat: add global CSS with peach/orange design tokens"
```

---

### Task 4: DynamicIcon コンポーネント

**Files:**
- Create: `src/components/DynamicIcon.tsx`
- Create: `src/components/DynamicIcon.test.tsx`

- [ ] **Step 1: テストを書く**

`src/components/DynamicIcon.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { DynamicIcon } from './DynamicIcon'

describe('DynamicIcon', () => {
  it('既知のアイコン名で SVG をレンダリングする', () => {
    const { container } = render(<DynamicIcon name="Github" data-testid="icon" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('未知のアイコン名では何もレンダリングしない', () => {
    const { container } = render(<DynamicIcon name="UnknownIconXyz" />)
    expect(container.firstChild).toBeNull()
  })
})
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test -- DynamicIcon
```

Expected: FAIL（DynamicIcon が存在しない）

- [ ] **Step 3: DynamicIcon を実装する**

`src/components/DynamicIcon.tsx`:
```tsx
import * as Icons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

interface Props extends LucideProps {
  name: string
}

export const DynamicIcon = ({ name, ...props }: Props) => {
  const Icon = Icons[name as keyof typeof Icons] as React.ComponentType<LucideProps> | undefined
  if (!Icon) return null
  return <Icon {...props} />
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npm test -- DynamicIcon
```

Expected: PASS

- [ ] **Step 5: コミットする**

```bash
git add src/components/DynamicIcon.tsx src/components/DynamicIcon.test.tsx
git commit -m "feat: add DynamicIcon component for lucide-react dynamic rendering"
```

---

### Task 5: Profile コンポーネント

**Files:**
- Create: `src/components/Profile.tsx`
- Create: `src/components/Profile.module.css`
- Create: `src/components/Profile.test.tsx`

- [ ] **Step 1: テストを書く**

`src/components/Profile.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Profile } from './Profile'

describe('Profile', () => {
  it('名前を表示する', () => {
    render(<Profile />)
    expect(screen.getByText('なまえ')).toBeInTheDocument()
  })

  it('自己紹介を表示する', () => {
    render(<Profile />)
    expect(screen.getByText(/ひとことじこしょうかい/)).toBeInTheDocument()
  })

  it('アバター画像を表示する', () => {
    render(<Profile />)
    const img = screen.getByRole('img', { name: 'なまえ' })
    expect(img).toHaveAttribute('src', '/images/avatar.jpg')
  })
})
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test -- Profile
```

Expected: FAIL

- [ ] **Step 3: Profile を実装する**

`src/components/Profile.tsx`:
```tsx
import { profile } from '../config'
import styles from './Profile.module.css'

export const Profile = () => (
  <div className={styles.container}>
    <img
      src={profile.avatar}
      alt={profile.name}
      className={styles.avatar}
    />
    <h1 className={styles.name}>{profile.name}</h1>
    <p className={styles.bio}>{profile.bio}</p>
  </div>
)
```

`src/components/Profile.module.css`:
```css
.container {
  text-align: center;
  padding: 32px 16px 20px;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 12px;
  box-shadow: 0 4px 16px rgba(255, 140, 66, 0.35);
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 6px;
}

.bio {
  font-size: 0.875rem;
  color: var(--sub);
  line-height: 1.6;
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npm test -- Profile
```

Expected: PASS

- [ ] **Step 5: コミットする**

```bash
git add src/components/Profile.tsx src/components/Profile.module.css src/components/Profile.test.tsx
git commit -m "feat: add Profile component"
```

---

### Task 6: SnsLinks コンポーネント

**Files:**
- Create: `src/components/SnsLinks.tsx`
- Create: `src/components/SnsLinks.module.css`
- Create: `src/components/SnsLinks.test.tsx`

- [ ] **Step 1: テストを書く**

`src/components/SnsLinks.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { SnsLinks } from './SnsLinks'

describe('SnsLinks', () => {
  it('config のリンクをすべて表示する', () => {
    render(<SnsLinks />)
    expect(screen.getByText('X (Twitter)')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('リンクは新しいタブで開く', () => {
    render(<SnsLinks />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('リンクの href が config の url と一致する', () => {
    render(<SnsLinks />)
    const twitterLink = screen.getByText('X (Twitter)').closest('a')
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/')
  })
})
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test -- SnsLinks
```

Expected: FAIL

- [ ] **Step 3: SnsLinks を実装する**

`src/components/SnsLinks.tsx`:
```tsx
import { snsLinks } from '../config'
import { DynamicIcon } from './DynamicIcon'
import styles from './SnsLinks.module.css'

export const SnsLinks = () => (
  <div className={styles.container}>
    {snsLinks.map((link) => (
      <a
        key={link.url}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <DynamicIcon name={link.icon} size={16} />
        <span>{link.label}</span>
      </a>
    ))}
  </div>
)
```

`src/components/SnsLinks.module.css`:
```css
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 0 16px 24px;
}

.link {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--card);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent);
  box-shadow: var(--shadow);
  transition: box-shadow 0.15s ease;
}

.link:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npm test -- SnsLinks
```

Expected: PASS

- [ ] **Step 5: コミットする**

```bash
git add src/components/SnsLinks.tsx src/components/SnsLinks.module.css src/components/SnsLinks.test.tsx
git commit -m "feat: add SnsLinks component with pill-style buttons"
```

---

### Task 7: EventPreview コンポーネント

**Files:**
- Create: `src/components/EventPreview.tsx`
- Create: `src/components/EventPreview.module.css`
- Create: `src/components/EventPreview.test.tsx`

- [ ] **Step 1: テストを書く**

`src/components/EventPreview.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { EventPreview } from './EventPreview'
import type { Event } from '../config'

const mockEvent: Event = {
  id: 'test-event',
  title: 'テストイベント',
  date: '2024.08',
  description: 'テスト説明',
  images: ['/img/01.jpg', '/img/02.jpg', '/img/03.jpg', '/img/04.jpg'],
  previewCount: 3,
}

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>)

describe('EventPreview', () => {
  it('イベントタイトルを表示する', () => {
    renderWithRouter(<EventPreview event={mockEvent} />)
    expect(screen.getByText('テストイベント')).toBeInTheDocument()
  })

  it('previewCount 枚だけ画像を表示する', () => {
    renderWithRouter(<EventPreview event={mockEvent} />)
    const imgs = screen.getAllByRole('img')
    expect(imgs).toHaveLength(3)
  })

  it('「もっと見る」リンクが /album/:eventId を指す', () => {
    renderWithRouter(<EventPreview event={mockEvent} />)
    const link = screen.getByText(/もっと見る/)
    expect(link.closest('a')).toHaveAttribute('href', '/album/test-event')
  })
})
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test -- EventPreview
```

Expected: FAIL

- [ ] **Step 3: EventPreview を実装する**

`src/components/EventPreview.tsx`:
```tsx
import { Link } from 'react-router-dom'
import type { Event } from '../config'
import styles from './EventPreview.module.css'

interface Props {
  event: Event
}

export const EventPreview = ({ event }: Props) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <span className={styles.title}>{event.title}</span>
      <span className={styles.date}>{event.date}</span>
    </div>
    <div className={styles.thumbnails}>
      {event.images.slice(0, event.previewCount).map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${event.title} ${i + 1}`}
          className={styles.thumbnail}
        />
      ))}
    </div>
    <Link to={`/album/${event.id}`} className={styles.more}>
      もっと見る →
    </Link>
  </div>
)
```

`src/components/EventPreview.module.css`:
```css
.card {
  background: var(--card);
  border-radius: var(--radius-lg);
  padding: 14px;
  margin: 0 16px 12px;
  box-shadow: var(--shadow);
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}

.title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--accent);
}

.date {
  font-size: 0.75rem;
  color: var(--sub);
}

.thumbnails {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.thumbnail {
  flex: 1;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius-sm);
  min-width: 0;
}

.more {
  display: block;
  text-align: right;
  font-size: 0.8125rem;
  color: var(--sub);
  font-weight: 600;
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npm test -- EventPreview
```

Expected: PASS

- [ ] **Step 5: コミットする**

```bash
git add src/components/EventPreview.tsx src/components/EventPreview.module.css src/components/EventPreview.test.tsx
git commit -m "feat: add EventPreview component with portrait thumbnails"
```

---

### Task 8: EventGallery コンポーネント

**Files:**
- Create: `src/components/EventGallery.tsx`
- Create: `src/components/EventGallery.module.css`
- Create: `src/components/EventGallery.test.tsx`

- [ ] **Step 1: テストを書く**

`src/components/EventGallery.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EventGallery } from './EventGallery'

const images = ['/img/01.jpg', '/img/02.jpg', '/img/03.jpg']

describe('EventGallery', () => {
  it('すべての画像を表示する', () => {
    render(<EventGallery images={images} title="テスト" onImageClick={() => {}} />)
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('画像クリックで正しいインデックスを渡す', async () => {
    const onImageClick = vi.fn()
    render(<EventGallery images={images} title="テスト" onImageClick={onImageClick} />)
    const imgs = screen.getAllByRole('img')
    await userEvent.click(imgs[1])
    expect(onImageClick).toHaveBeenCalledWith(1)
  })
})
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test -- EventGallery
```

Expected: FAIL

- [ ] **Step 3: EventGallery を実装する**

`src/components/EventGallery.tsx`:
```tsx
import styles from './EventGallery.module.css'

interface Props {
  images: string[]
  title: string
  onImageClick: (index: number) => void
}

export const EventGallery = ({ images, title, onImageClick }: Props) => (
  <div className={styles.grid}>
    {images.map((src, i) => (
      <img
        key={i}
        src={src}
        alt={`${title} ${i + 1}`}
        className={styles.image}
        onClick={() => onImageClick(i)}
      />
    ))}
  </div>
)
```

`src/components/EventGallery.module.css`:
```css
.grid {
  columns: 2;
  column-gap: 8px;
  padding: 0 16px;
}

.image {
  width: 100%;
  break-inside: avoid;
  margin-bottom: 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.image:hover {
  opacity: 0.9;
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npm test -- EventGallery
```

Expected: PASS

- [ ] **Step 5: コミットする**

```bash
git add src/components/EventGallery.tsx src/components/EventGallery.module.css src/components/EventGallery.test.tsx
git commit -m "feat: add EventGallery with 2-column masonry layout"
```

---

### Task 9: Lightbox コンポーネント

**Files:**
- Create: `src/components/Lightbox.tsx`
- Create: `src/components/Lightbox.module.css`
- Create: `src/components/Lightbox.test.tsx`

- [ ] **Step 1: テストを書く**

`src/components/Lightbox.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Lightbox } from './Lightbox'

const images = ['/img/01.jpg', '/img/02.jpg', '/img/03.jpg']
const defaultProps = {
  images,
  currentIndex: 1,
  onClose: vi.fn(),
  onPrev: vi.fn(),
  onNext: vi.fn(),
}

describe('Lightbox', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('現在の画像を表示する', () => {
    render(<Lightbox {...defaultProps} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/img/02.jpg')
  })

  it('オーバーレイクリックで onClose を呼ぶ', async () => {
    render(<Lightbox {...defaultProps} />)
    await userEvent.click(screen.getByTestId('lightbox-overlay'))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('Escape キーで onClose を呼ぶ', async () => {
    render(<Lightbox {...defaultProps} />)
    await userEvent.keyboard('{Escape}')
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('← ボタンクリックで onPrev を呼ぶ', async () => {
    render(<Lightbox {...defaultProps} />)
    await userEvent.click(screen.getByLabelText('前の画像'))
    expect(defaultProps.onPrev).toHaveBeenCalled()
  })

  it('→ ボタンクリックで onNext を呼ぶ', async () => {
    render(<Lightbox {...defaultProps} />)
    await userEvent.click(screen.getByLabelText('次の画像'))
    expect(defaultProps.onNext).toHaveBeenCalled()
  })

  it('最初の画像では ← ボタンを表示しない', () => {
    render(<Lightbox {...defaultProps} currentIndex={0} />)
    expect(screen.queryByLabelText('前の画像')).not.toBeInTheDocument()
  })

  it('最後の画像では → ボタンを表示しない', () => {
    render(<Lightbox {...defaultProps} currentIndex={2} />)
    expect(screen.queryByLabelText('次の画像')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test -- Lightbox
```

Expected: FAIL

- [ ] **Step 3: Lightbox を実装する**

`src/components/Lightbox.tsx`:
```tsx
import { useEffect } from 'react'
import styles from './Lightbox.module.css'

interface Props {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }: Props) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <div
      className={styles.overlay}
      data-testid="lightbox-overlay"
      onClick={onClose}
    >
      <img
        src={images[currentIndex]}
        alt={`image ${currentIndex + 1}`}
        className={styles.image}
        onClick={(e) => e.stopPropagation()}
      />
      {currentIndex > 0 && (
        <button
          className={`${styles.nav} ${styles.prev}`}
          aria-label="前の画像"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
        >
          ‹
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          className={`${styles.nav} ${styles.next}`}
          aria-label="次の画像"
          onClick={(e) => { e.stopPropagation(); onNext() }}
        >
          ›
        </button>
      )}
    </div>
  )
}
```

`src/components/Lightbox.module.css`:
```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
}

.image {
  max-width: 100%;
  max-height: 90dvh;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  font-size: 2.5rem;
  line-height: 1;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.prev {
  left: 12px;
}

.next {
  right: 12px;
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npm test -- Lightbox
```

Expected: PASS

- [ ] **Step 5: コミットする**

```bash
git add src/components/Lightbox.tsx src/components/Lightbox.module.css src/components/Lightbox.test.tsx
git commit -m "feat: add Lightbox component with keyboard navigation"
```

---

### Task 10: TopPage

**Files:**
- Create: `src/pages/TopPage.tsx`
- Create: `src/pages/TopPage.module.css`

- [ ] **Step 1: TopPage を実装する**

`src/pages/TopPage.tsx`:
```tsx
import { Profile } from '../components/Profile'
import { SnsLinks } from '../components/SnsLinks'
import { EventPreview } from '../components/EventPreview'
import { events } from '../config'
import styles from './TopPage.module.css'

export const TopPage = () => (
  <div className={styles.container}>
    <Profile />
    <SnsLinks />
    <div className={styles.events}>
      {events.map((event) => (
        <EventPreview key={event.id} event={event} />
      ))}
    </div>
  </div>
)
```

`src/pages/TopPage.module.css`:
```css
.container {
  max-width: 480px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.events {
  display: flex;
  flex-direction: column;
  gap: 0;
}
```

- [ ] **Step 2: コミットする**

```bash
git add src/pages/TopPage.tsx src/pages/TopPage.module.css
git commit -m "feat: add TopPage layout"
```

---

### Task 11: EventPage

**Files:**
- Create: `src/pages/EventPage.tsx`
- Create: `src/pages/EventPage.module.css`

- [ ] **Step 1: EventPage を実装する**

`src/pages/EventPage.tsx`:
```tsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { events } from '../config'
import { EventGallery } from '../components/EventGallery'
import { Lightbox } from '../components/Lightbox'
import styles from './EventPage.module.css'

export const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const event = events.find((e) => e.id === eventId)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!event) {
    return (
      <div className={styles.container}>
        <Link to="/" className={styles.back}>← トップに戻る</Link>
        <p className={styles.notFound}>イベントが見つかりません</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.back}>← トップに戻る</Link>
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.date}>{event.date}</p>
      {event.description && (
        <p className={styles.description}>{event.description}</p>
      )}
      <EventGallery
        images={event.images}
        title={event.title}
        onImageClick={setLightboxIndex}
      />
      {lightboxIndex !== null && (
        <Lightbox
          images={event.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() =>
            setLightboxIndex((i) => Math.min(event.images.length - 1, (i ?? 0) + 1))
          }
        />
      )}
    </div>
  )
}
```

`src/pages/EventPage.module.css`:
```css
.container {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 0 40px;
}

.back {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--sub);
  font-weight: 600;
  padding: 0 16px 16px;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  padding: 0 16px 4px;
}

.date {
  font-size: 0.8125rem;
  color: var(--sub);
  padding: 0 16px 8px;
}

.description {
  font-size: 0.875rem;
  color: var(--sub);
  padding: 0 16px 16px;
  line-height: 1.6;
}

.notFound {
  padding: 16px;
  color: var(--sub);
}
```

- [ ] **Step 2: コミットする**

```bash
git add src/pages/EventPage.tsx src/pages/EventPage.module.css
git commit -m "feat: add EventPage with gallery and lightbox"
```

---

### Task 12: App.tsx + ルーティング設定

**Files:**
- Create: `src/App.tsx`

- [ ] **Step 1: App.tsx を実装する**

`src/App.tsx`:
```tsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import { TopPage } from './pages/TopPage'
import { EventPage } from './pages/EventPage'

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="/album/:eventId" element={<EventPage />} />
    </Routes>
  </HashRouter>
)
```

- [ ] **Step 2: 開発サーバーで動作確認する**

```bash
npm run dev
```

確認項目:
- `http://localhost:5173/lun/` でトップページが表示される
- プロフィール・SNSリンク・サンプルイベントのプレビューが見える
- 「もっと見る」を押すと `/#/album/sample-event` へ遷移する

- [ ] **Step 3: コミットする**

```bash
git add src/App.tsx
git commit -m "feat: add App with HashRouter routing"
```

---

### Task 13: プレースホルダー画像の配置

**Files:**
- Create: `public/images/avatar.jpg`（プレースホルダー）
- Create: `public/images/sample-event/01.jpg` など

- [ ] **Step 1: public/images ディレクトリを作成する**

```bash
mkdir -p public/images/sample-event
```

- [ ] **Step 2: プレースホルダー画像を用意する**

実際の画像に差し替えるまでの仮画像として、以下のいずれかを使う。

**オプションA: curl でプレースホルダーを取得する**
```bash
curl -o public/images/avatar.jpg "https://placehold.co/200x200/ffb347/ffffff?text=avatar"
curl -o public/images/sample-event/01.jpg "https://placehold.co/400x533/ffd9b7/c25e1a?text=photo1"
curl -o public/images/sample-event/02.jpg "https://placehold.co/400x533/ffcba4/c25e1a?text=photo2"
curl -o public/images/sample-event/03.jpg "https://placehold.co/400x533/ffd9b7/c25e1a?text=photo3"
```

**オプションB: 自分の画像を直接コピーする**
```bash
cp /path/to/your/avatar.jpg public/images/avatar.jpg
cp /path/to/photos/*.jpg public/images/sample-event/
```

- [ ] **Step 3: ブラウザで見た目を確認する**

```bash
npm run dev
```

`http://localhost:5173/lun/` を開き、以下を確認する:
- アバター画像が丸く表示される
- サムネイルが縦長（3:4）で3枚並ぶ
- 「もっと見る」でイベントページへ遷移し、マソンリーグリッドで全画像が表示される
- 画像タップでライトボックスが開き、矢印で前後移動できる

- [ ] **Step 4: コミットする**

```bash
git add public/images/
git commit -m "feat: add placeholder images for development"
```

---

### Task 14: GitHub Pages デプロイ設定

**Files:**
- Modify: `package.json`（`homepage` フィールド追加）

- [ ] **Step 1: package.json に homepage を追加する**

`package.json` に以下を追加する（`name` フィールドの隣など）:
```json
"homepage": "https://<GitHubユーザー名>.github.io/lun"
```

`<GitHubユーザー名>` は実際のGitHubユーザー名に置き換える。

- [ ] **Step 2: GitHub リポジトリを作成してプッシュする（未作成の場合）**

```bash
git remote add origin https://github.com/<GitHubユーザー名>/lun.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: デプロイする**

```bash
npm run deploy
```

Expected: `gh-pages` ブランチが作成され、GitHub Pages にビルド物がプッシュされる。

- [ ] **Step 4: GitHub の Pages 設定を確認する**

GitHub リポジトリの Settings → Pages を開き、ソースが `gh-pages` ブランチになっていることを確認する。

- [ ] **Step 5: 公開URLにアクセスして動作確認する**

`https://<GitHubユーザー名>.github.io/lun/` を開き、サイトが正常に表示されることを確認する。

- [ ] **Step 6: 最終コミット**

```bash
git add package.json
git commit -m "chore: add homepage for GitHub Pages deployment"
git push origin main
```

---

## 全テスト実行コマンド

```bash
npm test
```

Expected: すべてのテストが PASS する。
