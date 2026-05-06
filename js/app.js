// PDD 福袋互助 - 前端交互逻辑

// 模拟数据 - fullCode 是完整邀请码，displayCode 是显示的带星号码
const mockAvailableCodes = [
    { code: '875123498', displayCode: '875**498', time: '05/06 07:35', ip: '182.*.*.105' },
    { code: '872567048', displayCode: '872**048', time: '05/06 07:35', ip: '120.*.*.6' },
    { code: '878901474', displayCode: '878**474', time: '05/06 07:35', ip: '123.*.*.150' },
    { code: '876234274', displayCode: '876**274', time: '05/06 07:35', ip: '123.*.*.20' }
];

const mockUsedCodes = [
    { code: '872962171', displayCode: '872**171', time: '05/06 07:35', ip: '180.*.*.144' },
    { code: '874483957', displayCode: '874**957', time: '05/06 07:35', ip: '180.*.*.5' },
    { code: '873318628', displayCode: '873**628', time: '05/06 07:35', ip: '27.*.*.252' },
    { code: '878741898', displayCode: '878**898', time: '05/06 07:35', ip: '27.*.*.242' },
    { code: '874991878', displayCode: '874**878', time: '05/06 07:35', ip: '140.*.*.41' },
    { code: '875960587', displayCode: '875**587', time: '05/06 07:35', ip: '144.*.*.212' },
    { code: '874373373', displayCode: '874**373', time: '05/06 07:35', ip: '112.*.*.123' },
    { code: '876809505', displayCode: '876**505', time: '05/06 07:35', ip: '182.*.*.68' },
    { code: '873253092', displayCode: '873**092', time: '05/06 07:35', ip: '39.*.*.117' },
    { code: '880185736', displayCode: '880**736', time: '05/06 07:35', ip: '106.*.*.42' },
    { code: '872470784', displayCode: '872**784', time: '05/06 07:35', ip: '60.*.*.98' },
    { code: '875849987', displayCode: '875**987', time: '05/06 07:35', ip: '112.*.*.97' }
];

// DOM 元素
const availableList = document.getElementById('availableList');
const usedList = document.getElementById('usedList');
const availableCount = document.getElementById('availableCount');
const usedCount = document.getElementById('usedCount');
const refreshTime = document.getElementById('refreshTime');
const publishBtn = document.getElementById('publishBtn');
const inviteCodeInput = document.getElementById('inviteCodeInput');
const refreshBtn = document.getElementById('refreshBtn');
const copyOnlyCheck = document.getElementById('copyOnlyCheck');
const followBtn = document.getElementById('followBtn');
const closeRecommend = document.getElementById('closeRecommend');
const recommendSection = document.querySelector('.recommend-section');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderAvailableCodes();
    renderUsedCodes();
    updateRefreshTime();
    bindEvents();
    startAutoRefresh();
});

// 渲染可用邀请码
function renderAvailableCodes() {
    availableList.innerHTML = '';
    mockAvailableCodes.forEach(item => {
        const li = document.createElement('li');
        // 显示带星号的代码，但点击时传递完整代码
        const fullCode = item.code || item.displayCode.replace('**', '000');
        const displayCode = item.displayCode || item.code;
        li.innerHTML = `
            <div class="code-info">
                <div class="code-number">${displayCode}</div>
                <div class="code-meta">${item.time} from ${item.ip}</div>
            </div>
            <div class="code-actions">
                <button class="action-btn" onclick="useCode('${fullCode}')">
                    <span>📋</span>
                    <span>使用</span>
                </button>
                <button class="action-btn secondary" onclick="shareCode('${fullCode}')">
                    <span>🔗</span>
                    <span>分享</span>
                </button>
            </div>
        `;
        availableList.appendChild(li);
    });
    availableCount.textContent = mockAvailableCodes.length;
}

// 渲染已使用邀请码
function renderUsedCodes() {
    usedList.innerHTML = '';
    mockUsedCodes.forEach(item => {
        const li = document.createElement('li');
        const displayCode = item.displayCode || item.code;
        li.innerHTML = `
            <div class="code-info">
                <div class="code-number">${displayCode}</div>
                <div class="code-meta">${item.time} from ${item.ip}</div>
            </div>
            <div class="code-actions">
                <button class="action-btn used" onclick="copyCode('${item.code}')">
                    <span>📄</span>
                    <span>复制</span>
                </button>
                <span style="color: #999; font-size: 0.85rem;">
                    <span>✅</span>
                    <span>已使用</span>
                </span>
            </div>
        `;
        usedList.appendChild(li);
    });
    usedCount.textContent = '20999+';
}

// 更新时间
function updateRefreshTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
    refreshTime.textContent = timeStr;
}

// 绑定事件
function bindEvents() {
    // 发布按钮 - 支持点击和回车
    if (publishBtn) {
        publishBtn.addEventListener('click', handlePublish);
    }
    
    // 输入框回车发布
    if (inviteCodeInput) {
        inviteCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handlePublish();
            }
        });
    }
    
    // 刷新按钮
    if (refreshBtn) {
        refreshBtn.addEventListener('click', handleRefresh);
    }
    
    // 关注公众号
    followBtn.addEventListener('click', () => {
        showToast('欢迎关注！GitHub: ZhaoJjun');
    });
    
    // 关闭推荐
    closeRecommend.addEventListener('click', () => {
        recommendSection.style.display = 'none';
    });
    
    // 输入框验证
    inviteCodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
    
    // Tab 切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // 智能直达 - 点击邀请码的"使用"按钮时自动跳转拼多多
    document.getElementById('smartDirect').addEventListener('click', () => {
        const code = prompt('请输入拼多多福袋邀请码（9 位数字）：');
        if (code && code.length === 9) {
            useCode(code);
        } else if (code) {
            showToast('⚠️ 邀请码必须是 9 位数字');
        }
    });
    
    document.getElementById('smartDirectBtn').addEventListener('click', () => {
        const code = prompt('请输入拼多多福袋邀请码（9 位数字）：');
        if (code && code.length === 9) {
            useCode(code);
        } else if (code) {
            showToast('⚠️ 邀请码必须是 9 位数字');
        }
    });
    
    document.getElementById('smartDirectHelp').addEventListener('click', () => {
        alert('智能直达说明：\n\n1. 点击列表中的"使用"按钮\n2. 自动复制邀请码并跳转拼多多\n3. 或点击顶部"智能直达"手动输入邀请码\n4. 支持批量处理多个邀请码\n\n⚠️ 注意：需要已安装拼多多 APP 才能跳转');
    });
    
    // 异常举报
    document.getElementById('reportBtn').addEventListener('click', () => {
        const code = prompt('请输入要举报的邀请码：');
        if (code) {
            showToast(`已举报邀请码：${code}`);
        }
    });
    
    // 关于联系
    document.getElementById('aboutBtn').addEventListener('click', () => {
        alert('关于联系：\n\n作者：ZhaoJjun\nGitHub: https://github.com/ZhaoJjun\n版本：v1.0.0\n\nPDD 福袋互助 - 免费组队平台');
    });
    
    // 解封/封禁/举报
    document.getElementById('unbanBtn').addEventListener('click', () => {
        const code = prompt('请输入要解封的邀请码：');
        if (code) {
            showToast(`已申请解封：${code}`);
        }
    });
    
    document.getElementById('blacklistBtn').addEventListener('click', () => {
        const code = prompt('请输入要封禁的邀请码：');
        if (code) {
            showToast(`已封禁：${code}`);
        }
    });
    
    document.getElementById('reportListBtn').addEventListener('click', () => {
        const code = prompt('请输入要举报的邀请码：');
        if (code) {
            showToast(`已举报：${code}`);
        }
    });
    
    // 展开规则
    document.getElementById('expandRules').addEventListener('click', () => {
        alert('互助规则：\n\n1. 必须真实互助，不得虚假发布\n2. 禁止发布拉人头、减减卡类邀请码\n3. 违规将直接封禁\n4. 复制分享成功后，当日免勾选协议');
    });
}

// 处理发布
function handlePublish() {
    console.log('发布按钮被点击');
    
    const codeInput = document.getElementById('inviteCodeInput');
    const agreeCheck = document.getElementById('agreeCheck');
    
    if (!codeInput) {
        console.error('找不到输入框');
        showToast('错误：找不到输入框');
        return;
    }
    
    const code = codeInput.value.trim();
    
    console.log('输入的邀请码:', code);
    
    if (!code) {
        showToast('⚠️ 请输入 9 位拼多多福袋码');
        return;
    }
    
    if (code.length !== 9) {
        showToast('⚠️ 邀请码必须是 9 位数字');
        return;
    }
    
    if (!agreeCheck || !agreeCheck.checked) {
        showToast('⚠️ 请先同意互助协议');
        return;
    }
    
    // 保存完整代码和显示代码（带星号）
    const displayCode = code.substring(0, 3) + '**' + code.substring(6);
    const now = new Date();
    const timeStr = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    mockAvailableCodes.unshift({
        code: code,  // 完整代码，用于复制和跳转
        displayCode: displayCode,  // 带星号的显示代码
        time: timeStr,
        ip: '192.*.*.*'
    });
    
    renderAvailableCodes();
    codeInput.value = '';
    showToast('✅ 发布成功！');
    
    // 更新统计
    const todayHelpCount = document.getElementById('todayHelpCount');
    if (todayHelpCount) {
        let count = parseInt(todayHelpCount.textContent.replace(/,/g, ''));
        todayHelpCount.textContent = (count + 1).toLocaleString();
    }
    
    console.log('发布成功，当前可用邀请码数量:', mockAvailableCodes.length);
}

// 使用邀请码 - 复制并跳转拼多多福袋活动页
function useCode(code) {
    const copyOnly = copyOnlyCheck.checked;
    
    // 先复制邀请码
    copyCode(code);
    
    if (copyOnly) {
        showToast('✅ 邀请码已复制，请手动打开拼多多');
    } else {
        // 跳转到拼多多百亿补贴福袋活动页面
        setTimeout(() => {
            // 拼多多百亿补贴消费券福袋活动页
            const pddUrl = `https://mobile.yangkeduo.com/duo_coupon_luck?active_id=15528&code=${code}`;
            
            // 在当前窗口打开，触发 APP 跳转
            window.location.href = pddUrl;
            
            showToast('🚀 正在跳转拼多多福袋...');
        }, 200);
    }
}

// 分享邀请码
function shareCode(code) {
    const shareUrl = window.location.origin + '/pdd?code=' + code;
    
    if (navigator.share) {
        navigator.share({
            title: 'PDD 福袋互助',
            text: '快来帮我助力拼多多福袋！',
            url: shareUrl
        }).catch(() => {
            copyToClipboard(shareUrl);
            showToast('分享链接已复制');
        });
    } else {
        copyToClipboard(shareUrl);
        showToast('分享链接已复制');
    }
}

// 复制邀请码
function copyCode(code) {
    copyToClipboard(code);
    showToast('邀请码已复制：' + code);
}

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

// 降级复制方案
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (e) {
        console.error('复制失败', e);
    }
    document.body.removeChild(textarea);
}

// 显示提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 处理刷新
function handleRefresh() {
    refreshBtn.innerHTML = '<span>🔄</span><span>刷新中...</span>';
    refreshBtn.disabled = true;
    
    setTimeout(() => {
        renderAvailableCodes();
        updateRefreshTime();
        refreshBtn.innerHTML = '<span>🔄</span><span>刷新</span>';
        refreshBtn.disabled = false;
        showToast('刷新成功');
    }, 1000);
}

// 自动刷新
function startAutoRefresh() {
    setInterval(() => {
        updateRefreshTime();
    }, 1000);
    
    // 每 30 秒自动刷新一次列表
    setInterval(() => {
        // 这里可以添加实际的 API 调用
        console.log('自动刷新列表...');
    }, 30000);
}

// 导出到全局作用域
window.useCode = useCode;
window.shareCode = shareCode;
window.copyCode = copyCode;
