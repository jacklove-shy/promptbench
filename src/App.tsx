import { useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Copy,
  FileText,
  FlaskConical,
  MoreHorizontal,
  Plus,
  Play,
  Save,
  Search,
  Settings2,
  Sparkles,
  WandSparkles,
  Zap,
} from 'lucide-react'

type Result = { model: string; answer: string; time: string; tokens: number }
const presets = [
  {
    name: 'Support reply',
    icon: '✦',
    text: 'Draft a helpful, concise reply to a customer support request.',
  },
  {
    name: 'Product summary',
    icon: '◈',
    text: 'Summarize a product update for busy team members.',
  },
  {
    name: 'JSON extractor',
    icon: '{}',
    text: 'Extract key fields from unstructured text as valid JSON.',
  },
]
const startingResults: Result[] = [
  {
    model: 'GPT-4o',
    answer:
      'Hi Alex, thanks for flagging this. I’m sorry the export failed on your last report. I’ve checked the steps you shared and can help you get it working again.\n\nCould you try refreshing the page and exporting once more? If it still fails, send me the report name and I’ll investigate the issue with our team.',
    time: '1.24s',
    tokens: 86,
  },
  {
    model: 'Claude 3.5 Sonnet',
    answer:
      'Hi Alex — I’m sorry the report export didn’t work. I know that can interrupt your workflow.\n\nLet’s try a quick fix: refresh the page, then open the report and choose Export again. If you see an error, please share the message and I’ll take a closer look.',
    time: '1.41s',
    tokens: 68,
  },
]
export default function App() {
  const [prompt, setPrompt] = useState(
    'You are a thoughtful support specialist for {{product_name}}.\n\nWrite a reply to the customer that:\n- Acknowledges their issue with empathy\n- Gives one clear next step\n- Stays under {{max_words}} words\n- Never promises an unverified fix\n\nUse a warm, direct tone.',
  )
  const [customerMessage, setCustomerMessage] = useState(
    'The export button keeps failing when I try to download my report. I have a deadline today and this is really frustrating.',
  )
  const [productName, setProductName] = useState('Forma')
  const [maxWords, setMaxWords] = useState('90')
  const [results, setResults] = useState(startingResults)
  const [running, setRunning] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(presets[0].name)
  const [toast, setToast] = useState('')
  const [saved, setSaved] = useState(false)
  const [history, setHistory] = useState([
    'Support reply · 2 models · just now',
    'Support reply · 2 models · 9 min ago',
    'JSON extractor · 1 model · Yesterday',
  ])
  function notify(value: string) {
    setToast(value)
    window.setTimeout(() => setToast(''), 2200)
  }
  function runComparison() {
    if (running) return
    setRunning(true)
    window.setTimeout(() => {
      setResults([
        {
          model: 'GPT-4o',
          answer:
            'Hi there, I’m sorry the report export is failing, especially with your deadline today.\n\nPlease refresh the page and try exporting once more. If the issue continues, tell me the report name and I’ll help you find another way to download it.',
          time: '1.08s',
          tokens: 73,
        },
        {
          model: 'Claude 3.5 Sonnet',
          answer:
            'Hi there — I’m sorry this is getting in the way of your deadline.\n\nCould you refresh the page and try the export again? If it still fails, send over the report name and any error message. I’ll help you work through it.',
          time: '1.36s',
          tokens: 58,
        },
      ])
      setHistory((current) => [
        'Support reply · 2 models · just now',
        ...current.slice(0, 4),
      ])
      setRunning(false)
      notify('对比运行完成')
    }, 900)
  }
  function applyPreset(name: string, content: string) {
    setSelectedPreset(name)
    setPrompt(content + '\n\n{{context}}')
    setSaved(false)
  }
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span>
            <FlaskConical size={17} />
          </span>
          <b>
            promptbench<span>.</span>
          </b>
          <button aria-label="收起导航">
            <ArrowDown size={14} />
          </button>
        </div>
        <button className="workspace">
          <i>F</i>
          <span>
            <b>Forma Studio</b>
            <small>Personal workspace</small>
          </span>
          <ChevronDown size={14} />
        </button>
        <button
          className="new-prompt"
          onClick={() => {
            setPrompt('')
            setCustomerMessage('')
            setResults([])
            setSaved(false)
          }}
        >
          <Plus size={16} />
          New prompt<kbd>⌘ N</kbd>
        </button>
        <button className="sidebar-search" onClick={() => notify('搜索提示词')}>
          <Search size={15} />
          Search prompts<kbd>⌘ K</kbd>
        </button>
        <div className="side-label">
          PROMPT LIBRARY{' '}
          <button aria-label="更多提示词">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className="prompt-list">
          {presets.map((item) => (
            <button
              key={item.name}
              onClick={() => applyPreset(item.name, item.text)}
              className={selectedPreset === item.name ? 'chosen' : ''}
            >
              <span>{item.icon}</span>
              {item.name}
              <MoreHorizontal size={14} />
            </button>
          ))}
        </div>
        <button
          className="add-folder"
          onClick={() => notify('新建文件夹即将推出')}
        >
          <Plus size={14} />
          New folder
        </button>
        <div className="side-label history-label">
          RECENT RUNS{' '}
          <button aria-label="运行记录">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className="run-history">
          {history.map((item, i) => (
            <button key={item + i} onClick={() => notify('运行记录已加载')}>
              <Clock3 size={13} />
              <span>{item}</span>
            </button>
          ))}
        </div>
        <div className="side-bottom">
          <div className="usage-card">
            <div>
              <Zap size={14} />
              <b>Free plan</b>
            </div>
            <span>42 / 100 runs this month</span>
            <div className="usage-track">
              <i />
            </div>
            <button onClick={() => notify('方案信息即将推出')}>
              View usage <ArrowRight size={12} />
            </button>
          </div>
          <button className="user">
            <span>J</span>
            <b>
              Jamie Chen<small>Free plan</small>
            </b>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div className="crumb">
            <span>Workspace</span>
            <i>/</i>
            <b>Prompt lab</b>
            <i>/</i>
            <span>{selectedPreset}</span>
          </div>
          <div className="top-actions">
            <button
              className="help"
              onClick={() => notify('PromptBench · Demo mode')}
            >
              <CircleHelp size={17} />
            </button>
            <span className="avatar">J</span>
          </div>
        </header>
        <div className="content">
          <div className="headline">
            <div>
              <div className="eyebrow">
                <Sparkles size={13} /> PROMPT WORKSPACE
              </div>
              <h1>
                Prompt lab<span>.</span>
              </h1>
              <p>Shape a prompt. Compare the outputs. Find what works.</p>
            </div>
            <div className="head-actions">
              <button onClick={() => notify('历史记录即将推出')}>
                <Clock3 size={14} />
                History
              </button>
              <button
                onClick={() => {
                  setSaved(true)
                  notify('Prompt version saved')
                }}
              >
                <Save size={14} />
                {saved ? 'Saved' : 'Save version'}
              </button>
            </div>
          </div>
          <div className="toolbar">
            <div className="tab active">
              <FlaskConical size={14} />
              Playground
            </div>
            <button className="tab" onClick={() => notify('评测集即将推出')}>
              <Activity size={14} />
              Evaluations <span>Coming soon</span>
            </button>
            <div className="toolbar-right">
              <span className="status-dot" />
              All changes saved{' '}
              <button aria-label="设置" onClick={() => notify('设置即将推出')}>
                <Settings2 size={15} />
              </button>
            </div>
          </div>
          <div className="work-grid">
            <section className="editor panel">
              <div className="panel-title">
                <div>
                  <span className="step">01</span>
                  <div>
                    <h2>Prompt setup</h2>
                    <p>Write once, test with any input.</p>
                  </div>
                </div>
                <button
                  aria-label="更多提示词设置"
                  onClick={() => notify('提示词选项')}
                >
                  <MoreHorizontal size={17} />
                </button>
              </div>
              <label className="field-label">
                SYSTEM PROMPT <span>Markdown supported</span>
              </label>
              <div className="prompt-editor">
                <div className="editor-gutter">
                  1<br />2<br />3<br />4<br />5<br />6<br />7<br />8
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value)
                    setSaved(false)
                  }}
                  spellCheck={false}
                />
              </div>
              <div className="variable-row">
                <span>VARIABLES</span>
                <button onClick={() => notify('变量从 {{name}} 语法自动识别')}>
                  <Plus size={12} />
                  Add variable
                </button>
              </div>
              <div className="variables">
                <label>
                  <span>
                    <i />
                    product_name
                  </span>
                  <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </label>
                <label>
                  <span>
                    <i />
                    max_words
                  </span>
                  <input
                    value={maxWords}
                    onChange={(e) => setMaxWords(e.target.value)}
                  />
                </label>
              </div>
              <div className="field-head">
                <label className="field-label">TEST INPUT</label>
                <button
                  onClick={() =>
                    setCustomerMessage(
                      'The export button keeps failing when I try to download my report. I have a deadline today and this is really frustrating.',
                    )
                  }
                >
                  Reset example
                </button>
              </div>
              <textarea
                className="test-input"
                value={customerMessage}
                onChange={(e) => setCustomerMessage(e.target.value)}
              />
              <div className="editor-footer">
                <span>
                  <FileText size={13} />
                  Single test case <ChevronDown size={12} />
                </span>
                <button onClick={() => notify('测试集管理即将推出')}>
                  <Plus size={13} />
                  Add test case
                </button>
              </div>
              <button
                className="run-button"
                disabled={running || !prompt.trim()}
                onClick={runComparison}
              >
                {running ? (
                  <>
                    <span className="spinner" />
                    Running comparison…
                  </>
                ) : (
                  <>
                    <Play size={14} fill="currentColor" />
                    Run comparison <kbd>⌘ ↵</kbd>
                  </>
                )}
              </button>
              <div className="run-footnote">
                <Zap size={12} />2 models · Estimated cost <b>$0.004</b>
              </div>
            </section>
            <section className="results">
              <div className="results-head">
                <div>
                  <span className="step">02</span>
                  <div>
                    <h2>Compare outputs</h2>
                    <p>Same prompt, two perspectives.</p>
                  </div>
                </div>
                <button
                  className="model-config"
                  onClick={() => notify('模型设置即将推出')}
                >
                  <span className="tiny-dot purple" />2 models{' '}
                  <ChevronDown size={13} />
                </button>
              </div>
              <div className="compare-grid">
                {results.map((result, index) => (
                  <article className="result-card" key={result.model}>
                    <div className="result-head">
                      <div className="model-avatar">
                        {index === 0 ? '◎' : '✳'}
                      </div>
                      <b>{result.model}</b>
                      <span className="model-tag">
                        {index === 0 ? 'OpenAI' : 'Anthropic'}
                      </span>
                      <button
                        aria-label="模型选项"
                        onClick={() => notify('模型选项')}
                      >
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                    {running ? (
                      <div className="loading-output">
                        <i />
                        <i />
                        <i />
                        <i />
                        <span>Generating response</span>
                      </div>
                    ) : (
                      <div className="output-text">
                        {result.answer
                          .split('\n')
                          .map((line, i) =>
                            line ? <p key={i}>{line}</p> : <br key={i} />,
                          )}
                      </div>
                    )}
                    <div className="result-metrics">
                      <span>
                        <Clock3 size={12} />
                        {result.time}
                      </span>
                      <i />
                      <span>
                        <Activity size={12} />
                        {result.tokens} tokens
                      </span>
                      <button
                        aria-label="复制回答"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(result.answer)
                            notify('回答已复制')
                          } catch {
                            notify('无法访问剪贴板')
                          }
                        }}
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                    <div className="result-rating">
                      <span>Rate this response</span>
                      <div>
                        <button
                          aria-label="不喜欢"
                          onClick={() => notify('感谢反馈')}
                        >
                          ↓
                        </button>
                        <button
                          aria-label="喜欢"
                          onClick={() => notify('感谢反馈')}
                        >
                          ↑
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="quality-card">
                <div>
                  <span>
                    <WandSparkles size={15} />
                  </span>
                  <div>
                    <b>Prompt quality</b>
                    <small>
                      Clear instructions with measurable constraints
                    </small>
                  </div>
                </div>
                <div className="quality-score">
                  <b>8.4</b>
                  <span>/ 10</span>
                  <i>
                    <b />
                  </i>
                </div>
                <button onClick={() => notify('优化建议即将推出')}>
                  See suggestions <ArrowRight size={12} />
                </button>
              </div>
              <div className="insight">
                <span>
                  <Sparkles size={14} />
                </span>
                <p>
                  <b>Quick insight</b> Claude is 18% shorter while keeping the
                  same empathetic tone. Try asking both models to include a
                  specific troubleshooting step.
                </p>
              </div>
            </section>
          </div>
          <footer>
            <span>
              PromptBench <i>·</i> Local demo mode
            </span>
            <span>Runs are simulated and do not call model APIs.</span>
          </footer>
        </div>
      </main>
      {toast && (
        <div className="toast">
          <Check size={14} />
          {toast}
        </div>
      )}
    </div>
  )
}
