
const STEP_ORDER = [
  "validate_input",
  "expression_thinking",
  "expression_surprise",
  "expression_angry",
  "cg_01",
  "cg_02",
  "cutout_expression_thinking",
  "cutout_expression_surprise",
  "cutout_expression_angry"
];

const POLL_INTERVAL_MS = 1000;
const PERSONAL_GITHUB_URL = "https://github.com/hzagaming";
const PROJECT_GITHUB_URL = "https://github.com/hzagaming/p2g-character-workflow";
const APP_VERSION = "1.3.2";

const COLOR_STYLES = [
  { id: "cyan", label: { zh: "海蓝", en: "Cyan", ja: "シアン", ru: "Циан" } },
  { id: "emerald", label: { zh: "翡翠", en: "Emerald", ja: "エメラルド", ru: "Изумруд" } },
  { id: "amber", label: { zh: "琥珀", en: "Amber", ja: "アンバー", ru: "Янтарь" } },
  { id: "rose", label: { zh: "玫瑰", en: "Rose", ja: "ローズ", ru: "Роза" } },
  { id: "violet", label: { zh: "紫藤", en: "Violet", ja: "バイオレット", ru: "Фиолет" } },
  { id: "ocean", label: { zh: "深海", en: "Ocean", ja: "オーシャン", ru: "Океан" } },
  { id: "slate", label: { zh: "石墨", en: "Slate", ja: "スレート", ru: "Сланец" } }
];

const SUPPORTED_LANGUAGES = ["zh", "ja", "en", "ru"];
const SUPPORTED_MODES = ["light", "dark"];

const STYLE_PRESETS = [
  {
    id: "default",
    label: {
      zh: "默认样式",
      en: "Default Style",
      ja: "デフォルトスタイル",
      ru: "Стандартный стиль"
    }
  },
  {
    id: "paper2gal",
    label: {
      zh: "paper2gal 官方样式",
      en: "paper2gal Official Style",
      ja: "paper2gal 公式スタイル",
      ru: "Официальный стиль paper2gal"
    }
  }
];

const ANNOUNCEMENTS = [
  {
    version: "1.3.2",
    date: "2026-04-08",
    type: "patch",
    title: {
      zh: "1.3.2 下载与输出体验更新",
      en: "1.3.2 Download and Output UX Update",
      ja: "1.3.2 ダウンロードと出力体験の更新",
      ru: "1.3.2 Обновление скачивания и вывода"
    },
    summary: {
      zh: "目标输出更新为 8 个，为每个产出补充下载与复制按钮，并支持一键打包下载全部结果。",
      en: "Updated the target output count to 8, added download and copy actions for every asset, and introduced one-click zip download for all outputs.",
      ja: "目標出力数を 8 に更新し、各出力にダウンロードとコピー操作を追加、さらに全結果の一括 zip ダウンロードに対応しました。",
      ru: "Количество целевых результатов обновлено до 8, для каждого ассета добавлены кнопки скачивания и копирования, а также появилась загрузка всех файлов одним zip."
    },
    bullets: {
      zh: [
        "首页目标输出数字从 6 改为 8，更准确反映当前工作流结果数量。",
        "每张产出图新增打开、下载、复制按钮，便于单独取用素材。",
        "结果栏新增“下载全部”，会通过 zip 一次性打包整个工作流输出目录。",
        "manifest.json 不再只是链接，而是改成按钮形式，和其他操作保持一致。"
      ],
      en: [
        "The hero metric now shows 8 outputs to match the current workflow.",
        "Each generated asset now includes open, download, and copy actions for easier reuse.",
        "The outputs panel now includes a Download All action that returns the full workflow output directory as a zip file.",
        "manifest.json is now exposed as a button-based action to match the rest of the interface."
      ],
      ja: [
        "ヒーローの出力数表示を 6 から 8 に変更し、現在のワークフローに合わせました。",
        "各生成画像に開く、ダウンロード、コピー操作を追加し、素材を個別に扱いやすくしました。",
        "出力欄に「すべてダウンロード」を追加し、ワークフロー出力ディレクトリを zip でまとめて取得できます。",
        "manifest.json は単なるリンクではなく、他の操作と揃えたボタン形式になりました。"
      ],
      ru: [
        "Счетчик целевых результатов на главном экране изменен с 6 на 8 в соответствии с текущим workflow.",
        "Для каждого результата добавлены действия открытия, скачивания и копирования.",
        "В блоке результатов появилась кнопка «Скачать все», которая отдает весь каталог результатов workflow одним zip.",
        "manifest.json теперь открывается через кнопку, чтобы интерфейс был единообразным."
      ]
    }
  },
  {
    version: "1.3.0",
    date: "2026-04-08",
    type: "minor",
    title: {
      zh: "1.3.0 提示词与场景池升级",
      en: "1.3.0 Prompt and Scene Pool Upgrade",
      ja: "1.3.0 プロンプトとシーンプール強化",
      ru: "1.3.0 Улучшение промптов и пула сцен"
    },
    summary: {
      zh: "将表情与 CG 提示词压缩为更短的中文版本，并把 CG 随机场景池扩展到 200 个。",
      en: "Compressed the expression and CG prompts into shorter Chinese prompts and expanded the randomized CG scene pool to 200 entries.",
      ja: "表情と CG のプロンプトを短い中国語版へ整理し、ランダム CG シーンプールを 200 件まで拡張しました。",
      ru: "Промпты для выражений и CG стали короче и компактнее, а случайный пул CG-сцен расширен до 200 вариантов."
    },
    bullets: {
      zh: [
        "表情提示词改成短版中文，更适合直接喂给当前工作流。",
        "生气表情调整为轻微生气，避免出现龇牙咧嘴的夸张怒脸。",
        "CG 提示词新增 16:9 横屏和尽量高清要求。",
        "CG Example Scene Pool 与运行时场景池同步扩充到 200 个场景。"
      ],
      en: [
        "Expression prompts were rewritten into shorter Chinese prompts that fit the current workflow better.",
        "The angry expression was softened to avoid exaggerated bared-teeth anger.",
        "CG prompts now explicitly require a 16:9 landscape layout and higher image quality.",
        "The documented CG Example Scene Pool and the runtime scene pool were both expanded to 200 scenes."
      ],
      ja: [
        "表情プロンプトを、現在のワークフローに合う短い中国語版へ整理しました。",
        "怒り表情は誇張した歯むき出しを避け、軽い怒りへ調整しました。",
        "CG プロンプトに 16:9 横長と高画質の指定を追加しました。",
        "CG の Example Scene Pool と実行時シーンプールを 200 件まで拡張しました。"
      ],
      ru: [
        "Промпты выражений переписаны в коротком китайском формате, лучше подходящем текущему workflow.",
        "Злое выражение смягчено, чтобы избегать чрезмерной гримасы с оскалом.",
        "В CG-промпты добавлены требования к формату 16:9 и более высокой четкости.",
        "CG Example Scene Pool и реальный runtime-пул сцен синхронно расширены до 200 вариантов."
      ]
    }
  },
  {
    version: "1.2.0",
    date: "2026-04-08",
    type: "minor",
    title: {
      zh: "1.2.0 设置与样式升级",
      en: "1.2.0 Settings and Style Upgrade",
      ja: "1.2.0 設定とスタイルの強化",
      ru: "1.2.0 Улучшение настроек и стиля"
    },
    summary: {
      zh: "修复设置面板交互，新增 paper2gal 官方样式，并把工作流改成更耐失败的连续执行模式。",
      en: "Fixes settings panel interactions, adds a dedicated paper2gal official style, and makes the workflow continue more gracefully across step failures.",
      ja: "設定パネルの操作性を修正し、paper2gal 公式スタイルを追加、ワークフローも失敗に強い連続実行へ改善しました。",
      ru: "Исправлена работа панели настроек, добавлен отдельный официальный стиль paper2gal, а workflow стал устойчивее к ошибкам отдельных шагов."
    },
    bullets: {
      zh: [
        "修复设置面板按钮无法点击的问题，并优化弹层关闭逻辑。",
        "新增独立的 paper2gal 官方样式，启用后会接管浅色/深色和配色设置。",
        "工作流改为先生成 3 个表情，再生成 2 个 CG，最后为表情图执行 rembg 抠图。",
        "单步失败不再中断整条流程，失败与跳过原因都会被记录到工作流详情里。"
      ],
      en: [
        "Fixed the non-clickable settings controls and tightened the modal close behavior.",
        "Added a dedicated paper2gal official style preset that takes over light, dark, and accent settings when enabled.",
        "The workflow now generates 3 expressions first, then 2 CG scenes, and only then runs rembg cutouts for the expression images.",
        "A single step failure no longer stops the whole pipeline, and both failure and skip reasons are recorded in the workflow details."
      ],
      ja: [
        "クリックできなかった設定ボタンを修正し、モーダルの閉じ方も安定させました。",
        "独立した paper2gal 公式スタイルを追加し、有効時はライト/ダークと配色をこのプリセットが管理します。",
        "ワークフローは 3 つの表情を先に生成し、その後に 2 つの CG、最後に表情画像へ rembg 切り抜きを行います。",
        "単一ステップの失敗で全体を止めず、失敗理由とスキップ理由をワークフロー詳細へ残すようにしました。"
      ],
      ru: [
        "Исправлены некликабельные кнопки в настройках и улучшено поведение закрытия модального окна.",
        "Добавлен отдельный официальный пресет paper2gal, который при включении берет на себя светлую, темную и цветовую тему.",
        "Теперь workflow сначала создает 3 выражения, затем 2 CG-сцены, и только после этого делает rembg-вырезание для изображений выражений.",
        "Ошибка одного шага больше не останавливает весь pipeline, а причины ошибок и пропусков сохраняются в деталях workflow."
      ]
    }
  },
  {
    version: "1.0.1",
    date: "2026-04-07",
    type: "patch",
    title: {
      zh: "1.0.1 可用性修复",
      en: "1.0.1 Usability Fixes",
      ja: "1.0.1 使いやすさ修正",
      ru: "1.0.1 Исправления удобства"
    },
    summary: {
      zh: "调整 rembg 模型、修复 Plato 图像返回解析、优化报错可读性并精简主界面装饰。",
      en: "Adjusts the rembg model, fixes Plato image response parsing, improves error readability, and simplifies UI decoration.",
      ja: "rembg モデルを調整し、Plato の画像応答解析を修正、エラー可読性を改善し、UI 装飾を整理しました。",
      ru: "Настроена модель rembg, исправлен разбор графического ответа Plato, улучшена читаемость ошибок и упрощены декоративные элементы UI."
    },
    bullets: {
      zh: [
        "rembg 默认改为 isnet-anime，并支持通过配置切换模型。",
        "Plato 兼容完整 /chat/completions 地址，并可解析 markdown 图片链接返回。",
        "浅色模式下的错误区域颜色重做，并新增一键复制错误信息按钮。",
        "移除多余圆角浅蓝装饰和中部大圆图形，主界面更干净。"
      ],
      en: [
        "rembg now defaults to isnet-anime and stays configurable through the environment.",
        "Plato now supports a full /chat/completions endpoint and parses markdown image links.",
        "Error blocks were redesigned for light mode and now include a one-click copy button.",
        "Extra rounded cyan decorations and the central circle graphic were removed for a cleaner layout."
      ],
      ja: [
        "rembg のデフォルトを isnet-anime に変更し、設定で切り替え可能にしました。",
        "Plato は完全な /chat/completions エンドポイントに対応し、markdown 画像リンクを解析できます。",
        "ライトモードのエラー表示を見やすくし、ワンクリックコピーも追加しました。",
        "余計な丸いシアン装飾と中央の円形グラフィックを削除し、画面を整理しました。"
      ],
      ru: [
        "rembg теперь по умолчанию использует isnet-anime и остается настраиваемым через окружение.",
        "Plato поддерживает полный endpoint /chat/completions и умеет разбирать markdown-ссылки на изображения.",
        "Блоки ошибок переработаны для светлой темы и получили кнопку копирования в один клик.",
        "Убраны лишние голубые скругленные украшения и центральный круг, интерфейс стал чище."
      ]
    }
  },
  {
    version: "1.0.0",
    date: "2026-04-07",
    type: "major",
    title: {
      zh: "1.0.0 正式版",
      en: "1.0.0 Official Release",
      ja: "1.0.0 正式リリース",
      ru: "1.0.0 Официальный релиз"
    },
    summary: {
      zh: "加入持久化工作流、即时输出预览、详细错误排查、多语言设置与新版界面。",
      en: "Adds persisted workflows, progressive outputs, detailed debugging, multilingual settings, and the refreshed UI.",
      ja: "ワークフロー永続化、段階的な出力表示、詳細なデバッグ、多言語設定、新しいUIを追加しました。",
      ru: "Добавлены сохранение workflow, поэтапный вывод, подробная отладка, многоязычные настройки и обновленный интерфейс."
    },
    bullets: {
      zh: [
        "每个步骤完成后立即写入工作流快照并显示结果，不再等整条流程结束。",
        "错误信息现在包含 step、provider、接口状态和调试字段，便于定位问题。",
        "新增设置面板，支持深色/浅色模式、7 套样式主题与中日英俄四种语言。",
        "加入公告与关于页面，并补充 GitHub 快速跳转。"
      ],
      en: [
        "Each finished step now writes a workflow snapshot and surfaces its output immediately.",
        "Errors now include the step, provider, HTTP state, and debug fields for faster diagnosis.",
        "A new settings panel adds light and dark modes, 7 accent themes, and Chinese/Japanese/English/Russian UI.",
        "Announcement and about sections are now built in with direct GitHub links."
      ],
      ja: [
        "各ステップ完了時にワークフロースナップショットを保存し、結果を即時表示するようになりました。",
        "エラーには step、provider、HTTP 状態、debug 情報が含まれ、原因を追いやすくなりました。",
        "設定パネルでライト/ダーク、7 色テーマ、中国語/日本語/英語/ロシア語を切り替えできます。",
        "お知らせと About セクションを追加し、GitHub への導線も用意しました。"
      ],
      ru: [
        "После завершения каждого шага сохраняется снимок workflow и результат сразу появляется в интерфейсе.",
        "Ошибки теперь содержат шаг, провайдера, HTTP-статус и debug-поля для быстрой диагностики.",
        "Добавлена панель настроек: светлая/темная тема, 7 цветовых стилей и UI на китайском, японском, английском и русском.",
        "Появились разделы с объявлениями и информацией о проекте, а также быстрые ссылки на GitHub."
      ]
    }
  },
  {
    version: "0.1.2",
    date: "2026-04-07",
    type: "minor",
    title: {
      zh: "0.1.2 抠图与提示词增强",
      en: "0.1.2 Cutout and Prompt Upgrade",
      ja: "0.1.2 切り抜きとプロンプト強化",
      ru: "0.1.2 Улучшение вырезания и промптов"
    },
    summary: {
      zh: "引入 rembg 做本地抠图，并将 CG 场景改为随机且贴合角色。",
      en: "Introduces local rembg cutout and makes CG scenes randomized and character-aware.",
      ja: "ローカル rembg 切り抜きと、キャラクターに合うランダム CG シーンを導入しました。",
      ru: "Добавлены локальный rembg для вырезания и случайные CG-сцены, подходящие персонажу."
    },
    bullets: {
      zh: [
        "remove_background 改为 rembg，本地输出透明背景 PNG。",
        "表情提示词统一强调角色一致性与透明背景边缘干净。",
        "CG 提示词从固定书房改为随机场景池，并要求结合角色气质设计场景。"
      ],
      en: [
        "remove_background now uses rembg and returns a transparent PNG locally.",
        "Expression prompts now enforce identity consistency and clean transparent edges.",
        "CG prompts moved from fixed library scenes to a randomized scene pool aligned with the character."
      ],
      ja: [
        "remove_background が rembg ベースになり、透過 PNG をローカル生成します。",
        "表情プロンプトはキャラクター一貫性と綺麗な透過エッジをより強く指定します。",
        "CG プロンプトは固定の書斎から、キャラ性に合うランダムシーンへ変更しました。"
      ],
      ru: [
        "Шаг remove_background теперь использует rembg и локально возвращает PNG с прозрачным фоном.",
        "Промпты выражений усилены требованиями к сохранению идентичности и чистым прозрачным краям.",
        "CG-промпты больше не используют фиксированную библиотеку сцен, а выбирают случайную сцену под образ персонажа."
      ]
    }
  },
  {
    version: "0.1.1",
    date: "2026-04-06",
    type: "minor",
    title: {
      zh: "0.1.1 动态前端原型",
      en: "0.1.1 Dynamic Frontend Prototype",
      ja: "0.1.1 動的フロントエンド試作",
      ru: "0.1.1 Динамический фронтенд-прототип"
    },
    summary: {
      zh: "静态页面被替换为 React 前端，可轮询工作流状态并展示输出。",
      en: "The static page was replaced with a React frontend that polls workflow status and renders outputs.",
      ja: "静的ページを React フロントエンドに置き換え、ワークフロー状態のポーリングと出力表示に対応しました。",
      ru: "Статичная страница заменена React-фронтендом с опросом статуса workflow и показом результатов."
    },
    bullets: {
      zh: [
        "接入 Vite + React，支持上传、轮询、结果卡片预览。",
        "前后端分离开发，根目录可统一启动。",
        "输出 manifest 和 provider 信息，方便调试。"
      ],
      en: [
        "Introduced Vite + React for upload, polling, and output card previews.",
        "Frontend and backend can now run separately while still being launched from the repo root.",
        "Manifest and provider metadata were added for easier debugging."
      ],
      ja: [
        "Vite + React を導入し、アップロード、ポーリング、結果カード表示に対応しました。",
        "フロントエンドとバックエンドを分離しつつ、リポジトリルートから起動できます。",
        "manifest と provider 情報を追加し、デバッグしやすくしました。"
      ],
      ru: [
        "Добавлены Vite + React для загрузки, опроса и предпросмотра результатов в карточках.",
        "Фронтенд и бэкенд можно запускать раздельно, но также удобно стартовать из корня репозитория.",
        "Для отладки добавлены manifest и метаданные провайдера."
      ]
    }
  },
  {
    version: "0.1.0",
    date: "2026-04-06",
    type: "init",
    title: {
      zh: "0.1.0 初始原型",
      en: "0.1.0 Initial Prototype",
      ja: "0.1.0 初期プロトタイプ",
      ru: "0.1.0 Начальный прототип"
    },
    summary: {
      zh: "建立首个公开仓库结构，并打通基础工作流原型。",
      en: "Set up the first public repository structure and the baseline workflow prototype.",
      ja: "最初の公開リポジトリ構成とベースラインのワークフロープロトタイプを作成しました。",
      ru: "Создана первая публичная структура репозитория и базовый прототип workflow."
    },
    bullets: {
      zh: [
        "完成 README、路线图、Phase 1 规格与 prompts 文档。",
        "搭建上传、扣图、3 个表情和 2 个 CG 的服务端骨架。",
        "提供 mock provider，保证本地无真实 API 时也能演示。"
      ],
      en: [
        "Added the README, roadmap, phase-1 spec, and prompt documentation.",
        "Scaffolded the server pipeline for upload, cutout, 3 expressions, and 2 CG outputs.",
        "Included a mock provider so the prototype could still be demonstrated without live APIs."
      ],
      ja: [
        "README、ロードマップ、Phase 1 仕様、プロンプト文書を追加しました。",
        "アップロード、切り抜き、3 表情、2 CG のサーバーパイプライン骨格を構築しました。",
        "実 API がなくてもデモできるように mock provider を用意しました。"
      ],
      ru: [
        "Добавлены README, roadmap, спецификация phase-1 и документация по промптам.",
        "Подготовлен серверный конвейер для загрузки, вырезания, 3 выражений и 2 CG-результатов.",
        "Добавлен mock-провайдер, чтобы прототип можно было демонстрировать без реальных API."
      ]
    }
  }
];

const UI = {
  zh: {
    appName: "Character Workflow Agent",
    heroTitle: "单图进，多资产出",
    heroText: "上传一张带背景的角色图，系统会依次完成校验、3 个表情版本、2 张贴合角色的 CG 场景图，并在最后给表情图执行 rembg 抠图。",
    workflowBadge: "Workflow Agent",
    settings: "设置",
    settingsTitle: "项目设置",
    appearance: "样式",
    appearancePreset: "样式预设",
    appearanceLocked: "当前已启用 paper2gal 官方样式，浅色/深色和配色会被这个样式接管。",
    language: "语言",
    announcements: "公告",
    about: "关于",
    mode: "模式",
    light: "浅色",
    dark: "深色",
    colorStyle: "配色样式",
    currentVersion: "当前版本",
    uploadTitle: "开始新的工作流",
    uploadText: "建议上传单人、主体完整、五官与服装清晰可见的 PNG、JPG 或 WEBP 图片。",
    chooseImage: "角色图片",
    chooseHint: "支持 PNG / JPG / WEBP，建议单人立绘或清晰半身图。",
    startWorkflow: "开始工作流",
    starting: "正在启动...",
    idleMessage: "上传一张角色图开始。",
    workflowTitle: "工作流进度",
    outputsTitle: "阶段输出",
    outputsHint: "每一步成功后会立刻出现在这里，不用等整条流程结束。",
    noWorkflow: "还没有开始任何工作流。",
    noOutputs: "暂无输出，步骤一旦成功就会立即显示。",
    manifest: "结果清单",
    openManifest: "打开 manifest.json",
    openFile: "打开文件",
    downloadFile: "下载",
    copyAsset: "复制",
    downloadAll: "下载全部",
    latestError: "最近错误",
    debugDetails: "调试详情",
    sourceInfo: "输入信息",
    providerInfo: "执行通道",
    providerCutout: "抠图",
    providerExpressions: "表情",
    providerCg: "CG",
    footer: "Copyright © 2026 Mirako Company. Developed by Hanazar Ochikawa.",
    authorLabel: "作者",
    authorName: "Hanazar Ochikawa",
    aboutText: "这是一个把单张角色图转换成可复用角色资产的工作流原型。当前重点是先把 cutout、表情差分、CG 场景图与调试体验打磨稳定。",
    personalGithub: "个人 GitHub",
    projectGithub: "项目仓库",
    annLatest: "最新公告",
    annHistory: "历史版本",
    chooseFile: "选择文件",
    copyError: "复制报错",
    copied: "已复制",
    stepLabels: {
      validate_input: "输入校验",
      expression_thinking: "思考表情",
      expression_surprise: "惊讶表情",
      expression_angry: "生气表情",
      cg_01: "CG 场景 01",
      cg_02: "CG 场景 02",
      cutout_expression_thinking: "思考表情抠图",
      cutout_expression_surprise: "惊讶表情抠图",
      cutout_expression_angry: "生气表情抠图"
    },
    statuses: {
      queued: "排队中",
      running: "执行中",
      success: "成功",
      failed: "失败",
      skipped: "跳过",
      completed_with_errors: "完成但有错误"
    },
    networkStartError: "无法启动工作流：前端没有拿到后端响应。请确认服务端已运行在 http://localhost:3001，且 Vite 代理没有被改动。",
    networkFetchError: "无法获取最新工作流状态：请求没有到达后端。请检查本地服务、代理配置或浏览器控制台。",
    hostedApiRequired: "当前页面部署在 GitHub Pages。请先在 设置 -> 接口 中填写后端 API 地址，再启动工作流。",
    sectionSummary: "完成步骤",
    livePreview: "即时预览"
  },
  en: {
    appName: "Character Workflow Agent",
    heroTitle: "One image in, reusable assets out",
    heroText: "Upload one character image with background and the workflow will validate it, generate 3 expression variants, produce 2 character-fitting CG scenes, and finally run rembg cutouts for the expression images.",
    workflowBadge: "Workflow Agent",
    settings: "Settings",
    settingsTitle: "Project Settings",
    appearance: "Appearance",
    appearancePreset: "Style Preset",
    appearanceLocked: "paper2gal Official Style is active, so light or dark mode and accent colors are managed by that preset.",
    language: "Language",
    announcements: "Announcements",
    about: "About",
    mode: "Mode",
    light: "Light",
    dark: "Dark",
    colorStyle: "Color Style",
    currentVersion: "Current Version",
    uploadTitle: "Start a New Workflow",
    uploadText: "For the best result, upload a single-character image with clear facial features and visible outfit details in PNG, JPG, or WEBP.",
    chooseImage: "Character Image",
    chooseHint: "PNG / JPG / WEBP supported. Clear full-body or half-body character art works best.",
    startWorkflow: "Start Workflow",
    starting: "Starting...",
    idleMessage: "Upload one character image to begin.",
    workflowTitle: "Workflow Progress",
    outputsTitle: "Step Outputs",
    outputsHint: "Outputs appear here as soon as each step succeeds. You do not need to wait for the whole pipeline to finish.",
    noWorkflow: "No workflow has started yet.",
    noOutputs: "No outputs yet. The first finished step will appear immediately.",
    manifest: "Result Manifest",
    openManifest: "Open manifest.json",
    openFile: "Open file",
    downloadFile: "Download",
    copyAsset: "Copy",
    downloadAll: "Download All",
    latestError: "Latest Error",
    debugDetails: "Debug Details",
    sourceInfo: "Source",
    providerInfo: "Execution Providers",
    providerCutout: "Cutout",
    providerExpressions: "Expressions",
    providerCg: "CG",
    footer: "Copyright © 2026 Mirako Company. Developed by Hanazar Ochikawa.",
    authorLabel: "Author",
    authorName: "Hanazar Ochikawa",
    aboutText: "This is a workflow prototype focused on turning one character image into reusable character assets. The current goal is to make cutout, expression variants, CG scenes, and debugging stable and practical.",
    personalGithub: "Personal GitHub",
    projectGithub: "Project Repository",
    annLatest: "Latest Announcement",
    annHistory: "Version History",
    chooseFile: "Choose File",
    copyError: "Copy Error",
    copied: "Copied",
    stepLabels: {
      validate_input: "Validate Input",
      expression_thinking: "Thinking Expression",
      expression_surprise: "Surprise Expression",
      expression_angry: "Angry Expression",
      cg_01: "CG Scene 01",
      cg_02: "CG Scene 02",
      cutout_expression_thinking: "Thinking Cutout",
      cutout_expression_surprise: "Surprise Cutout",
      cutout_expression_angry: "Angry Cutout"
    },
    statuses: {
      queued: "Queued",
      running: "Running",
      success: "Success",
      failed: "Failed",
      skipped: "Skipped",
      completed_with_errors: "Completed with Errors"
    },
    networkStartError: "Could not start the workflow because the frontend did not receive a response from the backend. Make sure the server is running on http://localhost:3001 and the Vite proxy is intact.",
    networkFetchError: "Could not fetch the latest workflow state because the request did not reach the backend. Check the local server, proxy settings, or browser console.",
    hostedApiRequired: "This page is running on GitHub Pages. Open Settings -> Backend and enter your hosted API URL before starting the workflow.",
    sectionSummary: "Completed Steps",
    livePreview: "Live Preview"
  },
  ja: {
    appName: "Character Workflow Agent",
    heroTitle: "1 枚の画像から再利用可能な資産へ",
    heroText: "背景付きのキャラクター画像を 1 枚アップロードすると、検証、3 つの表情差分、2 枚のキャラ適合 CG シーンを順番に生成し、最後に表情画像へ rembg 切り抜きを行います。",
    workflowBadge: "Workflow Agent",
    settings: "設定",
    settingsTitle: "プロジェクト設定",
    appearance: "スタイル",
    appearancePreset: "スタイルプリセット",
    appearanceLocked: "paper2gal 公式スタイルが有効なため、ライト/ダークとアクセント色はこのプリセットが管理します。",
    language: "言語",
    announcements: "お知らせ",
    about: "About",
    mode: "モード",
    light: "ライト",
    dark: "ダーク",
    colorStyle: "カラースタイル",
    currentVersion: "現在のバージョン",
    uploadTitle: "新しいワークフローを開始",
    uploadText: "最良の結果のため、顔と衣装がはっきり見える単一キャラクターの PNG、JPG、WEBP をアップロードしてください。",
    chooseImage: "キャラクター画像",
    chooseHint: "PNG / JPG / WEBP 対応。全身または上半身がはっきりした画像がおすすめです。",
    startWorkflow: "ワークフロー開始",
    starting: "開始中...",
    idleMessage: "キャラクター画像を 1 枚アップロードしてください。",
    workflowTitle: "ワークフロー進行",
    outputsTitle: "ステップ出力",
    outputsHint: "各ステップが成功するとすぐにここへ表示されます。全体完了を待つ必要はありません。",
    noWorkflow: "まだワークフローは開始されていません。",
    noOutputs: "まだ出力はありません。最初に成功したステップからすぐ表示されます。",
    manifest: "結果マニフェスト",
    openManifest: "manifest.json を開く",
    openFile: "ファイルを開く",
    downloadFile: "ダウンロード",
    copyAsset: "コピー",
    downloadAll: "すべてダウンロード",
    latestError: "最新エラー",
    debugDetails: "デバッグ詳細",
    sourceInfo: "入力情報",
    providerInfo: "実行プロバイダ",
    providerCutout: "切り抜き",
    providerExpressions: "表情",
    providerCg: "CG",
    footer: "Copyright © 2026 Mirako Company. Developed by Hanazar Ochikawa.",
    authorLabel: "作者",
    authorName: "Hanazar Ochikawa",
    aboutText: "このプロトタイプは、1 枚のキャラクター画像を再利用可能な資産へ変換するワークフローを目指しています。現在は cutout、表情差分、CG シーン、デバッグ体験の安定化を重視しています。",
    personalGithub: "個人 GitHub",
    projectGithub: "プロジェクト GitHub",
    annLatest: "最新のお知らせ",
    annHistory: "履歴バージョン",
    chooseFile: "ファイルを選択",
    copyError: "エラーをコピー",
    copied: "コピー済み",
    stepLabels: {
      validate_input: "入力検証",
      expression_thinking: "思考表情",
      expression_surprise: "驚き表情",
      expression_angry: "怒り表情",
      cg_01: "CG シーン 01",
      cg_02: "CG シーン 02",
      cutout_expression_thinking: "思考表情切り抜き",
      cutout_expression_surprise: "驚き表情切り抜き",
      cutout_expression_angry: "怒り表情切り抜き"
    },
    statuses: {
      queued: "待機中",
      running: "実行中",
      success: "成功",
      failed: "失敗",
      skipped: "スキップ",
      completed_with_errors: "エラー付き完了"
    },
    networkStartError: "フロントエンドがバックエンド応答を受け取れず、ワークフローを開始できませんでした。http://localhost:3001 でサーバーが動作し、Vite プロキシ設定が変わっていないか確認してください。",
    networkFetchError: "最新のワークフロー状態を取得できませんでした。リクエストがバックエンドに届いていません。ローカルサーバー、プロキシ設定、ブラウザコンソールを確認してください。",
    hostedApiRequired: "このページは GitHub Pages 上で動いています。ワークフロー開始前に、設定 -> バックエンド で API アドレスを入力してください。",
    sectionSummary: "完了ステップ",
    livePreview: "ライブプレビュー"
  },
  ru: {
    appName: "Character Workflow Agent",
    heroTitle: "Одно изображение на входе, готовые ассеты на выходе",
    heroText: "Загрузите одно изображение персонажа с фоном, и workflow по шагам выполнит проверку, создаст 3 варианта выражений, 2 подходящие CG-сцены и в конце сделает rembg-вырезание для изображений выражений.",
    workflowBadge: "Workflow Agent",
    settings: "Настройки",
    settingsTitle: "Настройки проекта",
    appearance: "Стиль",
    appearancePreset: "Пресет стиля",
    appearanceLocked: "Сейчас активен официальный стиль paper2gal, поэтому светлая/темная тема и цветовые акценты управляются этим пресетом.",
    language: "Язык",
    announcements: "Объявления",
    about: "О проекте",
    mode: "Режим",
    light: "Светлый",
    dark: "Темный",
    colorStyle: "Цветовой стиль",
    currentVersion: "Текущая версия",
    uploadTitle: "Запустить новый workflow",
    uploadText: "Для лучшего результата загрузите изображение с одним персонажем, где хорошо видны лицо и одежда, в формате PNG, JPG или WEBP.",
    chooseImage: "Изображение персонажа",
    chooseHint: "Поддерживаются PNG / JPG / WEBP. Лучше всего подходит четкий арт по пояс или в полный рост.",
    startWorkflow: "Запустить workflow",
    starting: "Запуск...",
    idleMessage: "Загрузите одно изображение персонажа, чтобы начать.",
    workflowTitle: "Ход workflow",
    outputsTitle: "Результаты шагов",
    outputsHint: "Результаты появляются здесь сразу после успешного шага. Ждать конца всего пайплайна не нужно.",
    noWorkflow: "Workflow еще не запускался.",
    noOutputs: "Пока результатов нет. Первый успешный шаг появится сразу.",
    manifest: "Манифест результата",
    openManifest: "Открыть manifest.json",
    openFile: "Открыть файл",
    downloadFile: "Скачать",
    copyAsset: "Копировать",
    downloadAll: "Скачать всё",
    latestError: "Последняя ошибка",
    debugDetails: "Подробности отладки",
    sourceInfo: "Источник",
    providerInfo: "Провайдеры выполнения",
    providerCutout: "Вырезание",
    providerExpressions: "Выражения",
    providerCg: "CG",
    footer: "Copyright © 2026 Mirako Company. Developed by Hanazar Ochikawa.",
    authorLabel: "Автор",
    authorName: "Hanazar Ochikawa",
    aboutText: "Это прототип workflow, который превращает одно изображение персонажа в набор переиспользуемых ассетов. Сейчас основной акцент на стабильности cutout, вариаций выражений, CG-сцен и удобной отладки.",
    personalGithub: "Личный GitHub",
    projectGithub: "Репозиторий проекта",
    annLatest: "Последнее объявление",
    annHistory: "История версий",
    chooseFile: "Выбрать файл",
    copyError: "Скопировать ошибку",
    copied: "Скопировано",
    stepLabels: {
      validate_input: "Проверка входа",
      expression_thinking: "Выражение: раздумье",
      expression_surprise: "Выражение: удивление",
      expression_angry: "Выражение: злость",
      cg_01: "CG-сцена 01",
      cg_02: "CG-сцена 02",
      cutout_expression_thinking: "Вырезание раздумья",
      cutout_expression_surprise: "Вырезание удивления",
      cutout_expression_angry: "Вырезание злости"
    },
    statuses: {
      queued: "В очереди",
      running: "Выполняется",
      success: "Успешно",
      failed: "Ошибка",
      skipped: "Пропущено",
      completed_with_errors: "Завершено с ошибками"
    },
    networkStartError: "Не удалось запустить workflow: фронтенд не получил ответ от бэкенда. Убедитесь, что сервер работает на http://localhost:3001 и прокси Vite не изменен.",
    networkFetchError: "Не удалось получить актуальное состояние workflow: запрос не дошел до бэкенда. Проверьте локальный сервер, прокси или консоль браузера.",
    hostedApiRequired: "Эта страница работает на GitHub Pages. Перед запуском workflow откройте Настройки -> Бэкенд и укажите URL вашего API.",
    sectionSummary: "Завершенные шаги",
    livePreview: "Мгновенный предпросмотр"
  }
};

function normalizeErrorMessage(error, fallback) {
  if (error instanceof TypeError && String(error.message).includes("Failed to fetch")) {
    return fallback;
  }

  return error.message || fallback;
}

async function parseJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { error: text || `Unexpected response with status ${response.status}.` };
}

function readStoredValue(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch (_error) {
    return fallback;
  }
}

function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (_error) {
    return null;
  }

  return null;
}

function renderDebugEntries(debug) {
  if (!debug || typeof debug !== "object") {
    return [];
  }

  return Object.entries(debug).filter(([, value]) => value !== null && value !== undefined && value !== "");
}

function inferFileNameFromUrl(url, fallback = "asset") {
  if (!url) {
    return fallback;
  }

  const clean = String(url).split("?")[0];
  const segments = clean.split("/");
  return segments[segments.length - 1] || fallback;
}

async function copyText(value) {
  if (!value) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (_error) {
    return false;
  }
}

async function copyAsset(url) {
  if (!url) {
    return false;
  }

  try {
    const response = await fetch(toAssetUrl(url));
    if (!response.ok) {
      return false;
    }

    const blob = await response.blob();
    if (navigator.clipboard && window.ClipboardItem && blob.type.startsWith("image/")) {
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      return true;
    }

    return copyText(toAssetUrl(url));
  } catch (_error) {
    return false;
  }
}

async function downloadAsset(url, fileName) {
  if (!url) {
    return false;
  }

  try {
    const response = await fetch(toAssetUrl(url));
    if (!response.ok) {
      return false;
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName || inferFileNameFromUrl(url);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    return true;
  } catch (_error) {
    return false;
  }
}

function flashCopiedAction(key) {
  state.copiedActionKey = key;
  renderApp();
  window.setTimeout(() => {
    if (state.copiedActionKey === key) {
      state.copiedActionKey = "";
      renderApp();
    }
  }, 1600);
}


const BACKEND_UI_PATCH = {
  zh: {
    networkStartError: "无法启动工作流：静态页面没有拿到后端响应。请确认 API 地址配置正确，并且服务端可访问。",
    networkFetchError: "无法获取最新工作流状态：静态页面没有连到后端。请检查 API 地址、服务端状态或浏览器控制台。",
    backend: "接口",
    apiModeTitle: "接口模式",
    builtInApi: "使用内置模型",
    customApi: "自定义 API",
    platoPresetLabel: "Plato 预设通道",
    platoPresetHint: "这个按钮会使用你预先接好的 Plato 后端通道，不会把私钥暴露到前端页面。",
    customApiHint: "填写你自己的后端根地址。静态页面只会请求这个地址，不会直接保存或暴露你的私钥。",
    presetUnavailable: "当前环境还没有配置 Plato 预设通道地址。请切换到自定义 API，或给预设接上已部署的后端地址。",
    apiSourceLabel: "当前生效地址",
    apiModeSaved: "接口模式已更新。",
    apiEndpoint: "API 地址",
    apiEndpointHint: "GitHub Pages 部署时，请填写你后端服务的根地址，例如 https://your-api.example.com。留空时会走当前站点同源地址。",
    apiEndpointSaved: "API 地址已更新。",
    noApiConfigured: "当前正在使用同源 API。若页面部署在 GitHub Pages，请在设置里填写后端地址。"
  },
  en: {
    networkStartError: "Could not start the workflow because the static page did not receive a backend response. Check the configured API endpoint and make sure the server is reachable.",
    networkFetchError: "Could not fetch the latest workflow state because the static page could not reach the backend. Check the API endpoint, server status, or browser console.",
    backend: "Backend",
    apiModeTitle: "API Mode",
    builtInApi: "Built-in Model",
    customApi: "Custom API",
    platoPresetLabel: "Plato Preset Channel",
    platoPresetHint: "This button uses your pre-wired Plato backend channel without exposing any secret key in the frontend.",
    customApiHint: "Enter the root URL of your own backend here. The static page will call this backend and will not store or expose your secret key.",
    presetUnavailable: "The Plato preset channel is not configured in this environment yet. Switch to Custom API or connect the preset to a deployed backend URL.",
    apiSourceLabel: "Effective endpoint",
    apiModeSaved: "API mode updated.",
    apiEndpoint: "API Endpoint",
    apiEndpointHint: "When deploying on GitHub Pages, enter the root URL of your backend service here, for example https://your-api.example.com. Leave it empty to use the current origin.",
    apiEndpointSaved: "API endpoint updated.",
    noApiConfigured: "The app is currently using same-origin API calls. If this page is on GitHub Pages, set your backend URL in Settings."
  },
  ja: {
    networkStartError: "静的ページがバックエンド応答を受け取れず、ワークフローを開始できませんでした。API アドレス設定とサーバー到達性を確認してください。",
    networkFetchError: "静的ページがバックエンドに接続できず、最新のワークフロー状態を取得できませんでした。API アドレス、サーバー状態、ブラウザコンソールを確認してください。",
    backend: "バックエンド",
    apiModeTitle: "API モード",
    builtInApi: "内蔵モデル",
    customApi: "カスタム API",
    platoPresetLabel: "Plato プリセット",
    platoPresetHint: "このボタンは事前接続済みの Plato バックエンドを使います。秘密鍵をフロントエンドへ露出しません。",
    customApiHint: "自分のバックエンドのルート URL を入力してください。静的ページはその URL にだけ接続し、秘密鍵を保存・公開しません。",
    presetUnavailable: "この環境では Plato プリセットの接続先 URL がまだ設定されていません。カスタム API に切り替えるか、プリセットへデプロイ済みバックエンド URL を接続してください。",
    apiSourceLabel: "現在の接続先",
    apiModeSaved: "API モードを更新しました。",
    apiEndpoint: "API アドレス",
    apiEndpointHint: "GitHub Pages に配置する場合は、ここにバックエンドのルート URL を入力してください。例: https://your-api.example.com。空欄のままなら現在のオリジンを使います。",
    apiEndpointSaved: "API アドレスを更新しました。",
    noApiConfigured: "現在は同一オリジンの API を使用しています。GitHub Pages 配置時は設定でバックエンド URL を指定してください。"
  },
  ru: {
    networkStartError: "Не удалось запустить workflow: статическая страница не получила ответ от бэкенда. Проверьте настроенный API endpoint и доступность сервера.",
    networkFetchError: "Не удалось получить актуальное состояние workflow: статическая страница не смогла подключиться к бэкенду. Проверьте API endpoint, состояние сервера и консоль браузера.",
    backend: "Бэкенд",
    apiModeTitle: "Режим API",
    builtInApi: "Встроенная модель",
    customApi: "Свой API",
    platoPresetLabel: "Предустановленный Plato",
    platoPresetHint: "Эта кнопка использует заранее подключенный Plato backend и не раскрывает секретный ключ во фронтенде.",
    customApiHint: "Укажите корневой URL своего backend. Статическая страница будет обращаться только к нему и не будет хранить или показывать ваш секретный ключ.",
    presetUnavailable: "В этой среде еще не настроен URL предустановленного канала Plato. Переключитесь на свой API или подключите к пресету адрес развернутого backend.",
    apiSourceLabel: "Текущий endpoint",
    apiModeSaved: "Режим API обновлен.",
    apiEndpoint: "API endpoint",
    apiEndpointHint: "При размещении на GitHub Pages укажите здесь корневой URL вашего бэкенда, например https://your-api.example.com. Оставьте пустым, чтобы использовать текущий origin.",
    apiEndpointSaved: "API endpoint обновлен.",
    noApiConfigured: "Сейчас приложение использует same-origin API. Если страница размещена на GitHub Pages, задайте URL бэкенда в настройках."
  }
};

for (const [languageCode, patch] of Object.entries(BACKEND_UI_PATCH)) {
  Object.assign(UI[languageCode], patch);
}

const root = document.getElementById("app");

function normalizeApiBase(value) {
  const raw = String(value || "").trim();
  const { hostname, origin, port } = window.location;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    const portNumber = Number.parseInt(port, 10);
    const isViteDevPort = Number.isFinite(portNumber) && portNumber >= 5173 && portNumber <= 5199;

    // If the app is served by Vite dev server, default to the backend port instead of same-origin.
    if (isViteDevPort) {
      if (!raw || raw === origin) {
        return "http://localhost:3001";
      }
    }
  }

  return raw;
}

const state = {
  selectedFile: null,
  workflow: null,
  message: { type: "info", text: (UI[readStoredValue("cwa-language", "zh")] || UI.zh).idleMessage },
  submitting: false,
  settingsOpen: false,
  settingsTab: "appearance",
  language: readStoredValue("cwa-language", "zh"),
  mode: readStoredValue("cwa-mode", "dark"),
  accent: readStoredValue("cwa-accent", "cyan"),
  visualPreset: readStoredValue("cwa-visual-preset", "default"),
  apiBase: normalizeApiBase(readStoredValue("cwa-api-base", defaultApiBase())),
  selectedAnnouncement: "1.3.2",
  copiedErrorKey: "",
  copiedActionKey: "",
  copyPayloads: {}
};

let pollTimer = null;
let lastWorkflowUpdatedAt = "";

function normalizeStateSelections() {
  if (!SUPPORTED_LANGUAGES.includes(state.language)) {
    state.language = "zh";
  }

  if (!SUPPORTED_MODES.includes(state.mode)) {
    state.mode = "dark";
  }

  if (!COLOR_STYLES.some((item) => item.id === state.accent)) {
    state.accent = "cyan";
  }

  if (!STYLE_PRESETS.some((item) => item.id === state.visualPreset)) {
    state.visualPreset = "default";
  }

  if (!["preset", "custom"].includes(state.apiMode)) {
    state.apiMode = defaultLocalApiBase() ? "preset" : "custom";
  }

  if (!API_PRESETS.some((item) => item.id === state.apiPreset)) {
    state.apiPreset = API_PRESETS[0]?.id || "plato";
  }

  if (!ANNOUNCEMENTS.some((entry) => entry.version === state.selectedAnnouncement)) {
    state.selectedAnnouncement = APP_VERSION;
  }
}

function defaultApiBase() {
  const queryApiBase = readQueryApiBase("api");

  if (queryApiBase) {
    return queryApiBase.replace(/\/+$/, "");
  }

  const localBase = defaultLocalApiBase();
  if (localBase) {
    return localBase;
  }

  return "";
}

function readQueryApiBase(key) {
  const params = new URLSearchParams(window.location.search);
  return (params.get(key) || "").trim();
}

function defaultLocalApiBase() {
  const { hostname, origin, port } = window.location;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    const portNumber = Number.parseInt(port, 10);
    const isViteDevPort = Number.isFinite(portNumber) && portNumber >= 5173 && portNumber <= 5199;

    if (isViteDevPort) {
      return "http://localhost:3001";
    }

    return origin;
  }

  return "";
}

function isHostedStaticEnvironment() {
  const { hostname, protocol } = window.location;
  return protocol === "https:" && hostname.endsWith("github.io");
}

function requiresHostedApiBase() {
  return isHostedStaticEnvironment() && !getEffectiveApiBase();
}

function getText() {
  return UI[state.language] || UI.zh;
}

function setMessage(type, text) {
  state.message = { type, text };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildApiUrl(pathname) {
  if (!pathname) {
    return "";
  }

  if (/^https?:\/\//.test(pathname)) {
    return pathname;
  }

  const base = getEffectiveApiBase().replace(/\/+$/, "");
  if (!base) {
    return pathname;
  }

  return `${base}${pathname}`;
}

function toAssetUrl(url) {
  if (!url) {
    return "";
  }

  if (/^https?:\/\//.test(url)) {
    return url;
  }

  return buildApiUrl(url);
}

async function startWorkflow(file, t) {
  if (requiresHostedApiBase()) {
    throw new Error(getMissingApiBaseMessage(t));
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(buildApiUrl("/api/workflows"), {
    method: "POST",
    body: formData
  });

  const payload = await parseJsonResponse(response);
  if (!response.ok) {
    throw new Error(payload.error || t.networkStartError);
  }

  return payload.workflow;
}

async function fetchWorkflow(workflowId, t) {
  if (requiresHostedApiBase()) {
    throw new Error(getMissingApiBaseMessage(t));
  }

  const response = await fetch(buildApiUrl(`/api/workflows/${workflowId}`));
  const payload = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(payload.error || t.networkFetchError);
  }

  return payload;
}

function applyAppearance() {
  normalizeStateSelections();
  const preset = STYLE_PRESETS.some((item) => item.id === state.visualPreset) ? state.visualPreset : "default";

  state.visualPreset = preset;
  document.documentElement.dataset.mode = state.mode;
  document.documentElement.dataset.accent = state.accent;
  document.documentElement.dataset.themeVariant = preset;
  document.documentElement.lang = state.language;
  writeStoredValue("cwa-mode", state.mode);
  writeStoredValue("cwa-accent", state.accent);
  writeStoredValue("cwa-visual-preset", preset);
  writeStoredValue("cwa-language", state.language);
  writeStoredValue("cwa-api-mode", state.apiMode);
  writeStoredValue("cwa-api-preset", state.apiPreset);
  writeStoredValue("cwa-api-base", state.apiBase);
}

function getPresetApiBase(presetId) {
  if (presetId === "plato") {
    const queryPresetBase = readQueryApiBase("platoApi") || readQueryApiBase("api");
    if (queryPresetBase) {
      return queryPresetBase.replace(/\/+$/, "");
    }

    return defaultLocalApiBase().replace(/\/+$/, "");
  }

  return "";
}

function getEffectiveApiBase() {
  if (state.apiMode === "preset") {
    return getPresetApiBase(state.apiPreset);
  }

  return (state.apiBase || "").trim().replace(/\/+$/, "");
}

function getMissingApiBaseMessage(t) {
  if (state.apiMode === "preset") {
    return t.presetUnavailable;
  }

  return t.hostedApiRequired;
}

function stopPolling() {
  if (pollTimer) {
    window.clearTimeout(pollTimer);
    pollTimer = null;
  }
}

function startPollingIfNeeded() {
  stopPolling();

  if (!state.workflow?.id) {
    return;
  }

  if (["completed", "completed_with_errors", "failed"].includes(state.workflow.status)) {
    return;
  }

  const workflowId = state.workflow.id;

  const pollOnce = async () => {
    const t = getText();

    try {
      const latest = await fetchWorkflow(workflowId, t);
      const latestUpdatedAt = latest?.updated_at || latest?.generated_at || "";
      const hasChanged =
        latestUpdatedAt && latestUpdatedAt !== lastWorkflowUpdatedAt
          ? true
          : JSON.stringify(latest) !== JSON.stringify(state.workflow);

      if (hasChanged) {
        lastWorkflowUpdatedAt = latestUpdatedAt || lastWorkflowUpdatedAt;
        state.workflow = latest;

        if (latest.status === "completed") {
          setMessage("success", state.language === "zh" ? "工作流已完成。" : t.statuses.success);
        } else if (latest.status === "completed_with_errors") {
          setMessage(
            "error",
            latest.error ||
              (state.language === "zh" ? "工作流已完成，但部分步骤失败或被跳过。" : t.statuses.completed_with_errors)
          );
        } else if (latest.status === "failed") {
          setMessage("error", latest.error || t.networkFetchError);
        }

        renderApp();
      }

      if (state.workflow?.id !== workflowId) {
        return;
      }

      if (!["completed", "completed_with_errors", "failed"].includes(state.workflow.status)) {
        pollTimer = window.setTimeout(pollOnce, POLL_INTERVAL_MS);
      } else {
        stopPolling();
      }
    } catch (error) {
      setMessage("error", normalizeErrorMessage(error, t.networkFetchError));
      renderApp();
      pollTimer = window.setTimeout(pollOnce, POLL_INTERVAL_MS);
    }
  };

  pollTimer = window.setTimeout(pollOnce, POLL_INTERVAL_MS);
}

function getOutputCards(t) {
  const outputs = state.workflow?.outputs;

  if (!outputs) {
    return [];
  }

  return [
    { title: t.stepLabels.expression_thinking, url: outputs.expressions?.thinking, fileName: "expression-thinking.png" },
    { title: t.stepLabels.expression_surprise, url: outputs.expressions?.surprise, fileName: "expression-surprise.png" },
    { title: t.stepLabels.expression_angry, url: outputs.expressions?.angry, fileName: "expression-angry.png" },
    { title: t.stepLabels.cg_01, url: outputs.cg_outputs?.[0], fileName: "cg-01.png" },
    { title: t.stepLabels.cg_02, url: outputs.cg_outputs?.[1], fileName: "cg-02.png" },
    { title: t.stepLabels.cutout_expression_thinking, url: outputs.expression_cutouts?.thinking, fileName: "expression-thinking-cutout.png" },
    { title: t.stepLabels.cutout_expression_surprise, url: outputs.expression_cutouts?.surprise, fileName: "expression-surprise-cutout.png" },
    { title: t.stepLabels.cutout_expression_angry, url: outputs.expression_cutouts?.angry, fileName: "expression-angry-cutout.png" }
  ].filter((item) => Boolean(item.url));
}

function renderDebugPanel(entries, openByDefault = false) {
  if (!entries.length) {
    return "";
  }

  return `
    <details class="debug-panel" ${openByDefault ? "open" : ""}>
      <summary>${escapeHtml(getText().debugDetails)}</summary>
      <div class="debug-grid">
        ${entries
          .map(
            ([key, value]) => `
              <div class="debug-row">
                <span>${escapeHtml(key)}</span>
                <code>${escapeHtml(String(value))}</code>
              </div>`
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderSettings(t, selectedAnnouncementData) {
  if (!state.settingsOpen) {
    return "";
  }

  const appearanceLocked = state.visualPreset === "paper2gal";

  const tabs = [
    ["appearance", t.appearance],
    ["language", t.language],
    ["backend", t.backend],
    ["announcements", t.announcements],
    ["about", t.about]
  ];

  return `
    <div class="settings-overlay" data-action="close-settings-overlay">
      <section class="settings-modal panel glass">
        <div class="settings-header">
          <div>
            <h2>${escapeHtml(t.settingsTitle)}</h2>
          </div>
          <button type="button" class="icon-button" data-action="close-settings">×</button>
        </div>

        <div class="settings-layout">
          <nav class="settings-nav">
            ${tabs
              .map(
                ([tabId, label]) => `
                  <button
                    type="button"
                    class="${tabId === state.settingsTab ? "nav-item active" : "nav-item"}"
                    data-action="set-tab"
                    data-tab="${tabId}"
                  >
                    ${escapeHtml(label)}
                  </button>`
              )
              .join("")}
          </nav>

          <div class="settings-content">
            ${state.settingsTab === "appearance"
              ? `
                <div class="settings-section">
                  <div class="settings-block">
                    <h3>${escapeHtml(t.appearancePreset)}</h3>
                    <div class="choice-row">
                      ${STYLE_PRESETS.map(
                        (preset) => `
                          <button
                            type="button"
                            class="${preset.id === state.visualPreset ? "choice active" : "choice"}"
                            data-action="set-preset"
                            data-preset="${preset.id}"
                          >
                            ${escapeHtml(preset.label[state.language] || preset.label.zh)}
                          </button>`
                      ).join("")}
                    </div>
                    ${appearanceLocked ? `<p class="settings-help">${escapeHtml(t.appearanceLocked)}</p>` : ""}
                  </div>
                  <div class="settings-block">
                    <h3>${escapeHtml(t.mode)}</h3>
                    <div class="choice-row">
                      <button type="button" class="${state.mode === "light" ? "choice active" : "choice"}" data-action="set-mode" data-mode="light" ${appearanceLocked ? "disabled" : ""}>${escapeHtml(t.light)}</button>
                      <button type="button" class="${state.mode === "dark" ? "choice active" : "choice"}" data-action="set-mode" data-mode="dark" ${appearanceLocked ? "disabled" : ""}>${escapeHtml(t.dark)}</button>
                    </div>
                  </div>
                  <div class="settings-block">
                    <h3>${escapeHtml(t.colorStyle)}</h3>
                    <div class="palette-grid">
                      ${COLOR_STYLES.map(
                        (item) => `
                          <button
                            type="button"
                            class="${item.id === state.accent ? `palette-chip ${item.id} active` : `palette-chip ${item.id}` }"
                            data-action="set-accent"
                            data-accent="${item.id}"
                            ${appearanceLocked ? "disabled" : ""}
                          >
                            <span class="palette-dot"></span>
                            <span>${escapeHtml(item.label[state.language] || item.label.zh)}</span>
                          </button>`
                      ).join("")}
                    </div>
                  </div>
                  <div class="settings-block version-card">
                    <h3>${escapeHtml(t.currentVersion)}</h3>
                    <p>v${APP_VERSION}</p>
                  </div>
                </div>`
              : ""}

            ${state.settingsTab === "language"
              ? `
                <div class="settings-section">
                  <div class="palette-grid language-grid">
                    ${[
                      ["zh", "中文"],
                      ["ja", "日本語"],
                      ["en", "English"],
                      ["ru", "Русский"]
                    ]
                      .map(
                        ([langId, label]) => `
                          <button
                            type="button"
                            class="${langId === state.language ? "choice active" : "choice"}"
                            data-action="set-language"
                            data-language="${langId}"
                          >
                            ${label}
                          </button>`
                      )
                      .join("")}
                  </div>
                </div>`
              : ""}

            ${state.settingsTab === "backend"
              ? `
                <div class="settings-section">
                  <div class="settings-block">
                    <h3>${escapeHtml(t.apiModeTitle)}</h3>
                    <div class="choice-row">
                      <button
                        type="button"
                        class="${state.apiMode === "preset" ? "choice active" : "choice"}"
                        data-action="set-api-mode"
                        data-api-mode="preset"
                      >
                        ${escapeHtml(t.builtInApi)}
                      </button>
                      <button
                        type="button"
                        class="${state.apiMode === "custom" ? "choice active" : "choice"}"
                        data-action="set-api-mode"
                        data-api-mode="custom"
                      >
                        ${escapeHtml(t.customApi)}
                      </button>
                    </div>
                  </div>

                  ${state.apiMode === "preset"
                    ? `
                      <div class="settings-block">
                        <h3>${escapeHtml(t.platoPresetLabel)}</h3>
                        <div class="choice-row">
                          ${API_PRESETS.map(
                            (preset) => `
                              <button
                                type="button"
                                class="${preset.id === state.apiPreset ? "choice active" : "choice"}"
                                data-action="set-api-preset"
                                data-api-preset="${preset.id}"
                              >
                                ${escapeHtml(preset.label[state.language] || preset.label.zh)}
                              </button>`
                          ).join("")}
                        </div>
                        <p class="settings-help">${escapeHtml(t.platoPresetHint)}</p>
                        <p class="settings-help muted">${escapeHtml(getEffectiveApiBase() || t.presetUnavailable)}</p>
                        ${!getEffectiveApiBase() ? `<p class="settings-help settings-warning">${escapeHtml(t.presetUnavailable)}</p>` : ""}
                      </div>`
                    : `
                      <div class="settings-block">
                        <h3>${escapeHtml(t.apiEndpoint)}</h3>
                        <input id="api-base-input" class="settings-input" type="text" value="${escapeHtml(state.apiBase)}" placeholder="https://your-api.example.com" />
                        <p class="settings-help">${escapeHtml(t.customApiHint)}</p>
                        <p class="settings-help">${escapeHtml(t.apiEndpointHint)}</p>
                        <p class="settings-help muted">${escapeHtml(state.apiBase ? state.apiBase : t.noApiConfigured)}</p>
                      </div>`}

                  <div class="settings-block">
                    <h3>${escapeHtml(t.apiSourceLabel)}</h3>
                    <p class="settings-help muted">${escapeHtml(getEffectiveApiBase() || t.noApiConfigured)}</p>
                    ${requiresHostedApiBase() ? `<p class="settings-help settings-warning">${escapeHtml(getMissingApiBaseMessage(t))}</p>` : ""}
                  </div>
                </div>`
              : ""}

            ${state.settingsTab === "announcements"
              ? `
                <div class="settings-section announcements-layout">
                  <div class="announcement-list">
                    ${ANNOUNCEMENTS.map(
                      (entry) => `
                        <button
                          type="button"
                          class="${entry.version === state.selectedAnnouncement ? "announcement-item active" : "announcement-item"}"
                          data-action="set-announcement"
                          data-announcement="${entry.version}"
                        >
                          <span>${escapeHtml(entry.date)}</span>
                          <strong>${escapeHtml(entry.version)}</strong>
                          <small>${escapeHtml(entry.summary[state.language] || entry.summary.zh)}</small>
                        </button>`
                    ).join("")}
                  </div>
                  <article class="announcement-detail">
                    <h3>${escapeHtml(selectedAnnouncementData.title[state.language] || selectedAnnouncementData.title.zh)}</h3>
                    <p>${escapeHtml(selectedAnnouncementData.summary[state.language] || selectedAnnouncementData.summary.zh)}</p>
                    <ul>
                      ${(selectedAnnouncementData.bullets[state.language] || selectedAnnouncementData.bullets.zh)
                        .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
                        .join("")}
                    </ul>
                  </article>
                </div>`
              : ""}

            ${state.settingsTab === "about"
              ? `
                <div class="settings-section">
                  <div class="about-card">
                    <h3>${escapeHtml(t.authorLabel)}: ${escapeHtml(t.authorName)}</h3>
                    <p>${escapeHtml(t.aboutText)}</p>
                    <div class="choice-row about-links">
                      <a class="choice link-button" href="${PERSONAL_GITHUB_URL}" target="_blank" rel="noreferrer">${escapeHtml(t.personalGithub)}</a>
                      <a class="choice link-button" href="${PROJECT_GITHUB_URL}" target="_blank" rel="noreferrer">${escapeHtml(t.projectGithub)}</a>
                    </div>
                  </div>
                </div>`
              : ""}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderApp() {
  applyAppearance();

  const t = getText();
  const workflow = state.workflow;
  const outputs = workflow?.outputs;
  const outputCards = getOutputCards(t);
  const selectedAnnouncementData =
    ANNOUNCEMENTS.find((entry) => entry.version === state.selectedAnnouncement) || ANNOUNCEMENTS[0];

  const copyPayloads = {};
  if (workflow?.error) {
    copyPayloads.workflow = workflow.error;
  }

  const stepsMarkup = workflow
    ? STEP_ORDER.map((stepName) => {
        const step = workflow.steps?.[stepName] || { status: "queued" };
        const debugEntries = renderDebugEntries(step.debug);
        const copyKey = `step-${stepName}`;
        if (step.error) {
          copyPayloads[copyKey] = step.error;
        }

        return `
          <li class="step ${escapeHtml(step.status)}">
            <div class="step-main">
              <div>
                <strong>${escapeHtml(t.stepLabels[stepName] || stepName)}</strong>
                <p>${escapeHtml(step.provider || "-")}</p>
              </div>
              <span>${escapeHtml(t.statuses[step.status] || step.status)}</span>
            </div>
            ${step.output_url ? `<a class="step-link" href="${escapeHtml(toAssetUrl(step.output_url))}" target="_blank" rel="noreferrer">${escapeHtml(t.openFile)}</a>` : ""}
            ${step.error ? `
              <div class="error-stack">
                <div class="error-toolbar">
                  <button type="button" class="copy-button" data-action="copy-error" data-copy-key="${copyKey}">
                    ${escapeHtml(state.copiedErrorKey === copyKey ? t.copied : t.copyError)}
                  </button>
                </div>
                <pre class="step-error">${escapeHtml(step.error)}</pre>
              </div>` : ""}
            ${renderDebugPanel(debugEntries)}
          </li>`;
      }).join("")
    : "";

  state.copyPayloads = copyPayloads;

  root.innerHTML = `
    <div class="app-shell">
      <main class="page">
        <header class="topbar panel glass">
          <div class="brand-block">
            <div>
              <h1>${escapeHtml(t.appName)}</h1>
              <p>${escapeHtml(t.heroText)}</p>
            </div>
          </div>
          <div class="topbar-actions">
            <span class="version-pill">v${APP_VERSION}</span>
            <button type="button" class="secondary-button" data-action="open-settings">${escapeHtml(t.settings)}</button>
          </div>
        </header>

        <section class="hero-grid">
          <article class="panel hero-card">
            <div class="hero-copy">
              <h2>${escapeHtml(t.heroTitle)}</h2>
              <p>${escapeHtml(t.heroText)}</p>
              <div class="hero-metrics">
                <div>
                  <strong>8</strong>
                  <span>${escapeHtml(state.language === "zh" ? "目标输出" : state.language === "ja" ? "出力数" : state.language === "ru" ? "выходов" : "outputs")}</span>
                </div>
                <div>
                  <strong>rembg</strong>
                  <span>${escapeHtml(state.language === "zh" ? "本地抠图" : state.language === "ja" ? "ローカル切り抜き" : state.language === "ru" ? "локальный cutout" : "local cutout")}</span>
                </div>
                <div>
                  <strong>AI</strong>
                  <span>${escapeHtml(state.language === "zh" ? "表情与 CG" : state.language === "ja" ? "表情と CG" : state.language === "ru" ? "выражения и CG" : "expressions + CG")}</span>
                </div>
              </div>
            </div>
          </article>

          <article class="panel upload-card">
            <h2>${escapeHtml(t.uploadTitle)}</h2>
            <p>${escapeHtml(t.uploadText)}</p>
            <form class="upload-form" id="workflow-form">
              <div class="field-group">
                <label for="image-input">${escapeHtml(t.chooseImage)}</label>
                <div class="file-picker">
                  <label class="file-trigger" for="image-input">${escapeHtml(t.chooseFile)}</label>
                  <span class="file-name">${escapeHtml(state.selectedFile ? state.selectedFile.name : t.chooseHint)}</span>
                  <input id="image-input" class="file-input" type="file" accept="image/png,image/jpeg,image/webp" ${state.submitting ? "disabled" : ""} />
                </div>
              </div>
              <button type="submit" ${state.submitting ? "disabled" : ""}>${escapeHtml(state.submitting ? t.starting : t.startWorkflow)}</button>
            </form>
            <p class="message ${escapeHtml(state.message.type)}">${escapeHtml(state.message.text)}</p>
          </article>
        </section>

        <section class="content-grid">
          <article class="panel workflow-panel">
            <div class="panel-heading">
              <div>
                <h2>${escapeHtml(t.workflowTitle)}</h2>
              </div>
              ${workflow ? `<span class="status-chip ${escapeHtml(workflow.status)}">${escapeHtml(t.statuses[workflow.status] || workflow.status)}</span>` : ""}
            </div>

            ${!workflow ? `<p class="muted">${escapeHtml(t.noWorkflow)}</p>` : `
              <div class="meta-grid">
                <div class="meta-card">
                  <span>Workflow ID</span>
                  <strong>${escapeHtml(workflow.id)}</strong>
                </div>
                <div class="meta-card">
                  <span>${escapeHtml(t.sourceInfo)}</span>
                  <strong>${escapeHtml(workflow.source_image?.original_name || "-")}</strong>
                </div>
                <div class="meta-card">
                  <span>${escapeHtml(t.providerInfo)}</span>
                  <strong>${escapeHtml(workflow.current_step || "-")}</strong>
                </div>
              </div>
              <ul class="steps">${stepsMarkup}</ul>`}
          </article>

          <article class="panel outputs-panel">
            <div class="panel-heading">
              <div>
                <h2>${escapeHtml(t.outputsTitle)}</h2>
              </div>
            </div>

            <p class="muted strong-muted">${escapeHtml(t.outputsHint)}</p>

            ${outputs?.providers ? `
              <div class="provider-row">
                <span class="provider-pill">${escapeHtml(t.providerCutout)}: ${escapeHtml(outputs.providers.remove_background || "-")}</span>
                <span class="provider-pill">${escapeHtml(t.providerExpressions)}: ${escapeHtml(outputs.providers.expressions || "-")}</span>
                <span class="provider-pill">${escapeHtml(t.providerCg)}: ${escapeHtml(outputs.providers.cg || "-")}</span>
              </div>` : ""}

            ${outputs?.manifest ? `
              <div class="output-toolbar">
                ${outputs?.manifest ? `<button type="button" class="choice link-button" data-action="open-asset" data-url="${escapeHtml(outputs.manifest)}">${escapeHtml(t.openManifest)}</button>` : ""}
                ${workflow?.id ? `<button type="button" class="choice link-button" data-action="download-all">${escapeHtml(t.downloadAll)}</button>` : ""}
              </div>` : ""}

            ${workflow?.error ? `
              <section class="error-box">
                <h3>${escapeHtml(t.latestError)}</h3>
                <div class="error-toolbar">
                  <button type="button" class="copy-button" data-action="copy-error" data-copy-key="workflow">
                    ${escapeHtml(state.copiedErrorKey === "workflow" ? t.copied : t.copyError)}
                  </button>
                </div>
                <pre>${escapeHtml(workflow.error)}</pre>
                ${renderDebugPanel(renderDebugEntries(workflow.error_details), true)}
              </section>` : ""}

            ${outputCards.length === 0 ? `<p class="muted">${escapeHtml(t.noOutputs)}</p>` : ""}
            <div class="grid">
              ${outputCards
                .map(
                  (card) => `
                    <article class="output-card">
                      <div class="output-card-header">
                        <h3>${escapeHtml(card.title)}</h3>
                        <button type="button" class="choice link-button" data-action="open-asset" data-url="${escapeHtml(card.url)}">${escapeHtml(t.openFile)}</button>
                      </div>
                      <img src="${escapeHtml(toAssetUrl(card.url))}" alt="${escapeHtml(card.title)}" />
                      <div class="output-actions">
                        <button type="button" class="choice link-button" data-action="download-asset" data-url="${escapeHtml(card.url)}" data-file-name="${escapeHtml(card.fileName || inferFileNameFromUrl(card.url))}">
                          ${escapeHtml(t.downloadFile)}
                        </button>
                        <button type="button" class="choice link-button" data-action="copy-asset" data-url="${escapeHtml(card.url)}" data-copy-key="asset-${escapeHtml(card.fileName || inferFileNameFromUrl(card.url))}">
                          ${escapeHtml(state.copiedActionKey === `asset-${card.fileName || inferFileNameFromUrl(card.url)}` ? t.copied : t.copyAsset)}
                        </button>
                      </div>
                    </article>`
                )
                .join("")}
            </div>
          </article>
        </section>

        <footer class="footer">${escapeHtml(t.footer)}</footer>
      </main>
      ${renderSettings(t, selectedAnnouncementData)}
    </div>
  `;
}

async function handleSubmit(event) {
  event.preventDefault();

  if (!state.selectedFile) {
    setMessage(
      "error",
      state.language === "zh"
        ? "请先选择一张图片。"
        : state.language === "ja"
          ? "先に画像を選択してください。"
          : state.language === "ru"
            ? "Сначала выберите изображение."
            : "Please choose an image first."
    );
    renderApp();
    return;
  }

  const t = getText();

  if (requiresHostedApiBase()) {
    state.settingsOpen = true;
    state.settingsTab = "backend";
    setMessage("error", getMissingApiBaseMessage(t));
    renderApp();
    return;
  }

  try {
    state.submitting = true;
    state.workflow = null;
    lastWorkflowUpdatedAt = "";
    setMessage(
      "info",
      state.language === "zh"
        ? "正在启动工作流..."
        : state.language === "ja"
          ? "ワークフローを開始しています..."
          : state.language === "ru"
            ? "Workflow запускается..."
            : "Starting workflow..."
    );
    renderApp();

    const created = await startWorkflow(state.selectedFile, t);
    state.workflow = created;
    setMessage(
      "info",
      state.language === "zh"
        ? "工作流已启动，结果会随步骤即时刷新。"
        : state.language === "ja"
          ? "ワークフローを開始しました。各ステップ結果は即時更新されます。"
          : state.language === "ru"
            ? "Workflow запущен. Результаты будут появляться по мере завершения шагов."
            : "Workflow started. Results will appear as soon as each step finishes."
    );
    renderApp();
    startPollingIfNeeded();
  } catch (error) {
    setMessage("error", normalizeErrorMessage(error, t.networkStartError));
    renderApp();
  } finally {
    state.submitting = false;
    renderApp();
  }
}

root.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;

  if (action === "open-settings") {
    state.settingsOpen = true;
    renderApp();
    return;
  }

  if (action === "close-settings" || action === "close-settings-overlay") {
    if (action === "close-settings-overlay" && event.target.closest(".settings-modal")) {
      return;
    }
    state.settingsOpen = false;
    renderApp();
    return;
  }

  if (action === "set-tab") {
    state.settingsTab = button.dataset.tab || "appearance";
    renderApp();
    return;
  }

  if (action === "set-api-mode") {
    state.apiMode = button.dataset.apiMode || "custom";
    setMessage("info", getText().apiModeSaved);
    renderApp();
    return;
  }

  if (action === "set-api-preset") {
    state.apiPreset = button.dataset.apiPreset || "plato";
    setMessage("info", getText().apiModeSaved);
    renderApp();
    return;
  }

  if (action === "set-mode") {
    if (state.visualPreset === "paper2gal") {
      return;
    }
    state.mode = button.dataset.mode || "dark";
    renderApp();
    return;
  }

  if (action === "set-accent") {
    if (state.visualPreset === "paper2gal") {
      return;
    }
    state.accent = button.dataset.accent || "cyan";
    renderApp();
    return;
  }

  if (action === "set-preset") {
    state.visualPreset = button.dataset.preset || "default";
    renderApp();
    return;
  }

  if (action === "set-language") {
    state.language = button.dataset.language || "zh";
    if (!state.message?.text || Object.values(UI).some((entry) => entry.idleMessage === state.message.text)) {
      setMessage("info", getText().idleMessage);
    }
    renderApp();
    return;
  }

  if (action === "set-announcement") {
    state.selectedAnnouncement = button.dataset.announcement || state.selectedAnnouncement;
    renderApp();
    return;
  }

  if (action === "open-asset") {
    const url = button.dataset.url;
    if (url) {
      window.open(toAssetUrl(url), "_blank", "noopener,noreferrer");
    }
    return;
  }

  if (action === "download-asset") {
    const ok = await downloadAsset(button.dataset.url, button.dataset.fileName);
    if (!ok) {
      setMessage("error", state.language === "zh" ? "下载文件失败。" : state.language === "ja" ? "ファイルのダウンロードに失敗しました。" : state.language === "ru" ? "Не удалось скачать файл." : "Failed to download the file.");
      renderApp();
    }
    return;
  }

  if (action === "download-all") {
    if (state.workflow?.id) {
      window.open(buildApiUrl(`/api/workflows/${state.workflow.id}/download`), "_blank", "noopener,noreferrer");
    }
    return;
  }

  if (action === "copy-asset") {
    const copyKey = button.dataset.copyKey || "asset";
    const ok = await copyAsset(button.dataset.url);
    if (!ok) {
      setMessage("error", state.language === "zh" ? "复制文件失败。" : state.language === "ja" ? "ファイルのコピーに失敗しました。" : state.language === "ru" ? "Не удалось скопировать файл." : "Failed to copy the file.");
      renderApp();
      return;
    }

    flashCopiedAction(copyKey);
    return;
  }

  if (action === "copy-error") {
    const copyKey = button.dataset.copyKey;
    const payload = state.copyPayloads[copyKey];
    if (!payload) {
      return;
    }

    const ok = await copyText(payload);
    if (!ok) {
      return;
    }

    state.copiedErrorKey = copyKey;
    renderApp();
    window.setTimeout(() => {
      if (state.copiedErrorKey === copyKey) {
        state.copiedErrorKey = "";
        renderApp();
      }
    }, 1600);
  }
});

root.addEventListener("change", (event) => {
  const target = event.target;

  if (target.id === "image-input") {
    state.selectedFile = target.files?.[0] || null;
    renderApp();
    return;
  }

  if (target.id === "api-base-input") {
    state.apiBase = target.value.trim();
    writeStoredValue("cwa-api-base", state.apiBase);
    setMessage("info", getText().apiEndpointSaved);
    renderApp();
  }
});

root.addEventListener("submit", (event) => {
  if (event.target?.id === "workflow-form") {
    handleSubmit(event);
  }
});

applyAppearance();
renderApp();
startPollingIfNeeded();
