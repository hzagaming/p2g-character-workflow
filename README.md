# character-workflow-agent

Character workflow engine for turning a single character image into reusable character assets, then packaging that character into prompts and runtime capabilities for downstream p2g workflows.

## README 说明
这份 README 是当前项目的主说明书，也是后续讨论、开发、产品判断的基准文档。

原则上：
- 以后如果需求、方向、产品定义变了，优先更新这里
- 如果开发中有不确定的地方，先回来看 README
- README 既服务用户，也服务开发者，也服务未来的产品化决策

## 项目边界
这个仓库当前只做下面这条线：

**角色系列素材生成 -> 角色 prompt 封装 -> LLM/TTS 能力封装 -> 交给 p2g 工作流消费**

明确不放在这个仓库里的内容：
- 自定义捏脸
- 转画风 / 风格迁移主管线
- 面向捏脸与画风控制的独立工作流

这些能力后续会单独开仓库做，未来如果结构合适，再考虑和当前仓库对接或合并。

所以从现在开始，这个仓库的职责要收紧，不再继续把“捏脸到转画风”也塞进来。

## 项目现在到底是什么
这个项目目前不是一个普通的“上传图片然后出图”的网站。

它的本质是一个：

**角色系列素材与角色能力封装引擎**

当前输入：
- 1 张角色图，允许带背景

当前输出：
- 3 张表情图
- 2 张 CG 图
- 3 张表情抠图
- 1 份结果清单与调试信息

也就是当前阶段的目标：

`单图输入 -> 角色一致性生成 -> 素材包输出`

在当前边界下，它的长期方向是：

**角色系列素材引擎 + 角色能力封装层 + p2g 上游输入层**

## 我们真正要解决的问题
用户表面上是在“生成图片”，但真正的问题不是点按钮，而是：

- 不会稳定描述角色
- prompt 写不稳
- 角色很容易漂移
- 画风很容易不一致
- 输出往往是零散图片，不是可复用资产
- 后续接剧情、语音、Live2D、角色 API 时，没有统一角色结构

所以这个项目的核心不是“多做几张图”，而是：

**把一个角色稳定地变成一套可复用的系列素材，并进一步封装成可被 p2g 消费的角色 prompt、角色设定和 LLM/TTS 能力输入。**

## 当前项目定义
当前版本可以把它理解为：

**角色系列素材与角色能力封装层的第一阶段原型**

现阶段职责：
1. 输入一张角色图
2. 做角色一致性的表情生成
3. 做角色一致性的 CG 生成
4. 对部分素材做透明抠图
5. 输出角色素材包
6. 输出角色卡、prompt bundle、character pack
7. 为后续 LLM/TTS 封装和 p2g 对接准备统一输入结构
8. 把每一步调试信息和 prompt 信息记录下来

## 长期产品定义
这个项目未来更合理的形态，不是只做一个消费级网页，而是优先做成：

**API-first 的角色系列素材与角色能力封装层**

也就是：
- 对内它是角色素材与角色能力装配线
- 对外它是给 p2g 或其他上层产品消费的角色输入层
- UI 只是调试和演示入口，不是全部产品本体

未来别人不一定直接使用你的网页。
他们也可能：
- 调你的 API 生成角色系列素材
- 调你的 API 拿到角色 prompt 包和角色卡
- 调你的 API 使用角色对话 / 角色语音能力
- 把这些结果接进 p2g 或其他剧情产品

## 项目未来会扩展成什么
当前工作流只是起点，未来扩展方向已经比较明确：

### 1. 角色系列素材层
目标：把角色图变成结构化系列素材包。

包括但不限于：
- 标准角色图
- 表情差分
- 透明素材
- 场景 CG
- 系列素材包

### 2. 角色理解层
目标：从图里提取角色的稳定设定，形成角色卡。

包括但不限于：
- 发型
- 五官
- 服装
- 配饰
- 配色
- 体型
- 气质
- 世界观
- 不可漂移项
- 可扩展项

### 3. 角色能力层
目标：不只是出图，而是把角色能力封装出来。

包括但不限于：
- 角色 prompt 封装
- 角色对话人格
- 角色剧情生成
- 角色 TTS
- 角色素材调用 API
- 向 p2g 传递的角色输入结构

### 4. 产品层
目标：把底层能力做成可交付产品。

可能形态：
- 角色工作台
- 开发者 API
- 创作者后台
- 游戏插件
- 教育产品接入层
- AI 陪伴 / AI UGC 接入层

## 我们当前最重要的 knowhow
在当前仓库范围内，真正的核心壁垒不是某个模型本身，而是下面这些能力：

1. 角色一致性控制
2. 角色结构化描述
3. 系列素材稳定产出
4. prompt 编译
5. LLM/TTS 输入封装
6. 向 p2g 工作流交付标准化角色包

如果以后只能记住一件事，那就是：

**这个仓库的核心 knowhow 是“角色一致性生成 + prompt/能力封装 + p2g 对接”。**

## 当前工作流
当前版本的主工作流是：

1. `validate_input`
2. `analyze_character`
3. `expression_thinking`
4. `expression_surprise`
5. `expression_angry`
6. `cg_01`
7. `cg_02`
8. `cutout_expression_thinking`
9. `cutout_expression_surprise`
10. `cutout_expression_angry`

当前逻辑特征：
- 单步失败不会直接打断整条工作流
- 后续可独立执行的步骤继续执行
- 依赖上一步结果的步骤会被标记为 `skipped`
- 每一步会持续写入 manifest 和调试信息

## 当前输出结构
当前阶段目标输出是 `8` 个核心资产：

- 3 个表情图
- 2 个 CG 图
- 3 个表情抠图

此外还会输出：
- `manifest.json`
- `character-profile.json`
- `prompts.json`
- `character-pack.json`
- `p2g-handoff.json`
- provider 信息
- prompt 信息
- 每步 debug 信息

所以当前项目已经不是“只出图”，而是开始具备：

**角色素材包输出**

## 未来应该新增的关键步骤
从产品化角度看，下一步最值得新增的不是更多页面，而是更强的中间层。

### A. Character Profile Step
在图片进入后，增加一个“角色理解”步骤，输出结构化角色卡。

当前状态：
- 已经有 bootstrap 版 `character-profile.json`
- 目前主要基于输入图元信息和角色锁定规则生成骨架
- 还没有接入真正的视觉理解模型

建议最少包含：
- identity
- appearance
- accessories
- outfit
- palette
- vibe
- world
- forbidden drift rules
- scene hints
- voice hints

### B. Prompt Compiler
不要继续把 prompt 当成散落在各文件里的文本。

当前状态：
- 已有基础 prompt compiler
- 已经会根据角色卡、场景、负面约束编译出 `prompts.json`
- 未来还需要接入更强的角色理解、对话人格、语音设定和 scene planning

未来应该改成：
- 角色卡
- 风格卡
- 场景卡
- 输出目标
- 负面约束

然后由系统自动生成最终 prompt。

### C. Character Pack
不要只输出一组图片。

当前状态：
- 已有 bootstrap 版 `character-pack.json`
- 已经把角色卡、prompt bundle、资产列表、providers 和 manifest 绑定到一个统一结构里
- 未来还需要进一步升级成真正稳定的外部 API 输出格式

应该输出完整 `character pack`，例如：
- profile.json
- prompts.json
- expressions/
- cutouts/
- cg/
- manifest.json
- preview/

### D. Character API
未来应该提供的不是单个页面功能，而是标准能力接口。

建议未来 API 方向：
- `POST /characters`
- `GET /characters/:id`
- `POST /characters/:id/assets`
- `POST /characters/:id/chat`
- `POST /characters/:id/speak`
- `POST /characters/:id/p2g-handoff`
- `GET /characters/:id/pack`

### E. P2G Handoff Layer
这是当前仓库非常重要的一层。

目标：
- 把角色系列素材、角色卡、prompt bundle、LLM/TTS 配置整理成 p2g 可消费的统一输入

当前状态：
- 已有 bootstrap 版 `p2g-handoff.json`
- 已经把素材索引、角色卡、prompt 注入文本、LLM/TTS 占位配置整理成统一交接结构
- 之后应继续和真正的 p2g 上层工作流字段对齐

建议最少包含：
- 角色基础设定
- 角色素材索引
- 角色 prompt 注入片段
- 对话人格基础配置
- 语音配置占位
- 对 p2g 工作流的交接说明

## 模型策略
这个项目未来不应该绑定单一模型。

正确方向是：

**多模型路由 + 分层职责**

建议职责分工：

### 1. 抠图模型
推荐用途：
- 透明背景抠图
- 确定性前景提取

当前：
- `rembg`

### 2. 图像生成 / 图像编辑模型
推荐用途：
- 表情差分
- CG 场景
- 角色一致性生成

当前接入方向：
- Plato / 兼容图像生成接口
- 其他图像模型可继续接入

### 3. 长上下文语言模型
推荐用途：
- 角色理解
- 文档理解
- 剧情生成
- 对话生成
- prompt 规划
- scene planning

根据你提供的 [paper2gal_stepfun_review.pdf](/Users/28zhong.lecheng/Documents/Code/P2G/paper2gal_stepfun_review.pdf)，目前很值得重视的是：
- `StepFun 3.5 Flash` 在“长上下文 + 速度 + 成本”这个组合上表现很好
- 它更适合承担：
  - 长文理解
  - 对话风格转换
  - 剧情/角色 planning
  - prompt compiler
- 它不一定需要包办整个图像工作流，但很适合作为未来角色理解与剧情能力的主力模型

### 4. 语音模型
未来用途：
- 角色声音
- 角色语音风格
- 角色 TTS 封装

## 关于 StepFun 的结论
结合 PDF 和聊天记录，我的判断是：

### StepFun 对你最有价值的地方
不是先拿来替代图像链路，而是拿来做：
- 长文本理解
- 文档到角色/剧情的结构化提炼
- 角色对话生成
- 低成本 prompt planning
- 面向端侧/移动端/并发场景的性价比路线

### 这意味着什么
你的未来产品线可以拆成两条并行仓库：

#### 路线 1：角色系列素材与能力封装仓库
- 当前这个仓库负责
- 图进来
- 稳定出角色素材、角色卡、prompt bundle、LLM/TTS 输入

#### 路线 2：捏脸 / 转画风仓库
- 单独仓库负责
- 解决角色外观定制、风格统一、风格迁移

之后看结构是否合适，再决定在 API 层或 character pack 层做对接。

## 我建议的产品路线
不要先把这个项目定义成“大而全消费级产品”。

更合理的路径是：

### 第一阶段：Character Pack & Runtime Input Engine
目标：稳定生成角色素材包，并准备角色 runtime 输入。

重点：
- 角色一致性
- 稳定工作流
- 成本控制
- 资产结构化
- prompt 注入结构
- LLM/TTS 输入结构

### 第二阶段：Character Runtime Integration
目标：把角色接进对话、剧情、语音和 p2g 运行链路。

重点：
- 角色卡
- prompt compiler
- LLM / TTS 封装
- p2g handoff

### 第三阶段：Character Platform
目标：做成产品和 API。

重点：
- 开发者接口
- 创作者工作台
- 外部集成
- 计费、权限、配额、稳定性

## 当前最值得优先做的事
如果只看接下来一段时间的优先级，我建议：

### P0
1. 定义 `character profile schema`
2. 定义 `character pack` 输出结构
3. 把 prompt 体系改成可编译结构
4. 把现有 workflow 稳定成可重复产出素材包的引擎

### P1
5. 增加“角色理解 step”
6. 把 LLM/TTS 输入结构补齐
7. 把 p2g handoff 格式定义清楚
8. 把 API 抽象成标准接口

### P2
9. 接入 LLM/TTS
10. 做角色聊天/角色说话能力
11. 对接上层 p2g 工作流
12. 形成真正的产品化工作台

## 当前不建议过早做的事
为了避免项目失控，下面这些现在不建议放在这个仓库优先：

- 太早做面向普通用户的大而全产品
- 太早押注单一模型厂商
- 太早把捏脸 / 转画风主管线混进当前仓库
- 太早做复杂商业系统

## 当前项目的核心判断
用一句话总结：

**这个项目应该从“角色图片工作流”升级为“角色系列素材与角色能力封装引擎”。**

再进一步说：

**短期做 Character Pack + Runtime Input Engine，长期做 Character-as-a-Service。**

## 仓库结构
```text
character-workflow-agent/
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
├── docs/
├── prompts/
├── examples/
├── workflows/
├── tmp/
├── index.html
├── app.js
├── styles.css
├── vite.config.js
├── web/
└── server/
```

## 当前技术结构
### 前端
- 根目录静态前端：`index.html`、`app.js`、`styles.css`
- 适合本地开发与 GitHub Pages 托管

### 后端
- `server/` 负责：
  - 上传
  - 工作流执行
  - provider 路由
  - manifest 输出
  - 下载打包

### 当前 provider 思路
- 抠图：`rembg`
- 图像生成：可接 `plato` 等 provider
- 以后：应支持更多 provider 路由，不把产品绑死在单模型上

## 本地启动
1. 安装依赖
```bash
npm install
npm --prefix server install
```

2. 创建环境变量
```bash
cp .env.example .env
```

3. 启动后端
```bash
npm --prefix server run dev
```

4. 启动前端
```bash
npm run dev:web
```

5. 打开
```text
http://localhost:5173
```

## GitHub Pages 说明
GitHub Pages 只能托管静态前端，不能运行 Node 后端。

所以：
- GitHub Pages 只能放页面
- 真正的 workflow API 必须单独部署后端
- 页面需要在设置里填写可访问的后端地址

## 开发原则
1. 先稳住主工作流，再拓宽功能
2. 任何新增能力都尽量结构化，不要只做 prompt 堆叠
3. 任何模型接入都尽量走 provider abstraction
4. 任何输出都尽量沉淀到 character pack，而不是只给图片
5. 以后不确定方向时，先回来看 README

## 最后一句话
现在这个仓库的使命，不只是“从一张图出几张图”。

它的真正方向是：

**把一个角色，变成一套可复用、可扩展、可调用的资产与能力系统。**
