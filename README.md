# PromptBench — Prompt Lab

面向 AI 应用前端岗位的提示词实验工作台。它把提示词编辑、变量测试、模型对比和运行记录放在同一个工作流中，适合展示 AI 产品复杂表单与结果对比界面的设计能力。

## 功能

- 编辑系统提示词和用户提示词
- 插入 `{{variables}}` 并为变量提供测试值
- 同时查看两个模型的演示输出与延迟、Token 指标
- 运行多个测试案例并查看记录
- 保存提示词版本与复制结果

## 本地运行

需要 Node.js 20+。

```bash
pnpm install
pnpm dev
```

## 演示说明

该版本使用本地模拟结果，不会调用模型 API；延迟和 Token 数为演示数据。项目后续可接入 OpenAI 兼容接口，并补充数据集批量评测与结果导出。

## 技术栈

React 18、TypeScript、Vite、lucide-react、CSS。

## License

MIT

