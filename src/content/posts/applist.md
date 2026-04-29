---
title: arch软件列表
published: 2026-02-17
pinned: true
description: 这是我日常使用的Arch Linux软件列表，涵盖开发、办公、娱乐等工具。
tags: [Arch Linux, Linux, Software, List]
category: Linux
draft: false
image: ''
---
### 🖥️ 基础系统 & 内核

```
base                      # 基础系统包
base-devel                # 编译开发工具链
linux-zen                 # 主内核
linux-lts                 # LTS内核（后安装）
linux-zen-headers         # ZEN内核头文件
linux-lts-headers         # LTS内核头文件
btrfs-progs               # Btrfs 文件系统工具
amd-ucode                 # AMD CPU 微码
linux-firmware            # 硬件固件
efibootmgr                # EFI 启动管理
grub                      # 引导加载器
os-prober                 # 多系统检测
exfat-utils               # exFAT 文件系统支持
zram-generator            # 内存压缩服务
snapper                   # Btrfs 快照管理
snap-pac                  # Pacman 集成 Snapper
btrfs-assistant           # Btrfs GUI 管理工具
grub-btrfs                # GRUB + Btrfs 快照集成
inotify-tools             # 文件系统事件监控
switcheroo-control        # 混合显卡切换服务
vulkan-tools              # Vulkan 调试工具
vulkan-radeon             # Radeon Vulkan 驱动（备用/兼容）
```

---

### 🌐 网络 & 连接

```
networkmanager            # 网络管理服务
network-manager-applet    # GNOME 网络托盘小程序
dnsmasq                   # DNS/DHCP 服务（用于虚拟机或本地解析）
bluetui                   # TUI 蓝牙管理器
bluez                     # 蓝牙协议栈（随 GNOME 安装）
iperf3                    # 网络测速工具
localsend                 # 局域网传文件神器
```

---

### 🧑 用户 & 权限 & Shell

```
sudo                      # 提权工具
zsh                       # 默认 Shell
vim                       # 文本编辑器
neovim                    # 现代 Vim
visual-studio-code-bin    # 图形化代码编辑器
paru                      # AUR 助手
pacseek                   # TUI 包搜索工具
fzf                       # 模糊查找
zoxide                    # 智能目录跳转
eza                       # 现代 ls 替代
bat                       # 现代 cat 替代
less                      # 查看文件
```

---

### 🖼️ 桌面环境 & 显示管理

```
gnome-desktop            # GNOME 桌面核心
gdm                      # GNOME 显示管理器(已经替换成ly)
ly                       # TUI 的显示管理器
gnome-tweaks             # GNOME 调优工具
gnome-extensions-app     # 扩展管理器（通过 flatpak 安装 extension-manager）
gnome-control-center     # 设置中心
gnome-clocks             # 时钟应用
gnome-calendar           # 日历应用
nautilus                 # 文件管理器（默认）
nautilus-terminal        # 在 Nautilus 中打开终端插件
nautilus-open-any-terminal # 替代方案（后安装）
kitty                    # 终端模拟器（替换 ghostty）
waypaper-git             # 壁纸管理器(AUR)
awww                     # Wayland 动态壁纸后端
waybar                   # Wayland 状态栏（使用 mechabar 主题）
fuzzel                   # Wayland 应用启动器
nwg-look                 # GTK 主题切换器
qt6ct                    # Qt6 配置工具
qt5ct                    # Qt5 配置工具
roundedWindowsCorners-reborn-git # 窗口圆角插件
xorg-xrdb                # X11 资源数据库（用于缩放/XWayland）
xdg-desktop-portal-gnome # 桌面门户（Flatpak/Wayland 集成）
polkit-gnome             # PolicyKit 认证代理
mako                     # 通知守护进程
libnotify                # 通知库
imagemagick              # 图片处理工具    
```

---

### 🎮 游戏 & Steam 相关

```
steam                    # 游戏平台
gamescope                # 游戏窗口管理器
mangojuice               # MangoHud 的替代品（后安装）
gamemoderun              # 游戏优化运行器
nvidia-prime             # NVIDIA 混合显卡切换
vulkan-mesa-layer        # Vulkan 层（尝试解决独显占用）
nvdia-settings           # NVIDIA 控制面板（隐含安装）
libva-nvidia-utils       # NVIDIA VA-API 支持
nvtop                    # NVIDIA GPU 监控
obs-studio               # 录屏/直播
mpv                      # 媒体播放器
wf-recorder              # Wayland 录屏
hyprpicker               # 颜色选择器（游戏/截图辅助）
slurp                    # 区域选择工具
wl-clipboard             # Wayland 剪贴板
clipse                   # 剪贴板历史（推测是 clipman 或类似）
```

---

### 🎵 音频 & 视频

```
easyeffects              # 音频效果器
pavucontrol              # PulseAudio 音量控制
celluloid                # 视频播放器（GTK MPV 前端）
loupe                    # 图片查看器
mission-center           # 系统信息仪表盘
baobab                   # 磁盘空间分析器
ffmpegthumbnailer        # 视频缩略图生成
gst-plugins-base         # GStreamer 基础插件
gst-plugins-good         # GStreamer 优质插件
gst-libav                # GStreamer LibAV 插件
gvfs-smb                 # SMB 网络文件系统支持
flite                    # 语音合成库
go-musicfox              # TUI 网易云音乐客户端(AUR)
beep                     # 控制蜂鸣器
mpd                      # 一个音乐播放的服务端
```

---

### 🖋️ 输入法 & 字体 & 本地化

```
fcitx5-im                # Fcitx5 输入法框架
fcitx5-rime              # Rime 输入引擎
fcitx5-pinyin-zhwiki     # 雾凇拼音词库
fonts-noto-cjk           # 思源黑体（中日韩字体）
nerd-fonts               # 编程字体（带图标）
jetbrains-mono-nerd      # JetBrains Mono Nerd 字体（后设为默认）
```

---

### 📦 开发 & 编译工具

```
clang                    # C/C++ 编译器
cmake                    # 构建系统
ninja                    # 构建工具
gdb                      # GNU 调试器
lldb                     # LLVM 调试器
miniconda3               # Python 环境管理器（含 conda）
reaper                   # 数字音频工作站（DAW）
npm                      # 你不知道吗  
libc++                   # LLVM C++ 库  
jdk25-openjdk            # JAVA25  
jdk21-openjdk            # JAVA21  
tokei                    # 代码统计工具
pre-commit               # 钩子
blender                  # 3d建模软件
```

---

### 🧰 系统监控 & 工具

```
btop                     # 系统资源监控（htop 替代）
asciiquarium             # ASCII 水族馆屏保
figlet                   # 大字标题生成
jp2a                     # 图片转 ASCII
toilet                   # 彩色大字生成
cowsay                   # 牛说文本
lolcat                   # 彩虹输出
cbonsai                  # ASCII 盆栽模拟器
cava                     # 音频可视化
timg                     # 终端图像查看器
rssguard                 # RSS 阅读器
okular                   # PDF/文档阅读器（含 VLC 支持版）
bookokrat-bin            # TUI的PDF/EBUP阅读器
kdenlive                 # 视频编辑器
onlyoffice               # Office 套件
transmission-gtk         # BT 下载客户端
marktext                 # Markdown 编辑器（AUR）
Linuxqq                  # QQ（AppImage，AUR）
netease-cloud-music-rust-gtk # 网易云第三方客户端（AUR）
hmcl                     # 我的世界启动器
pipes.sh                 # 终端随机管道显示(AUR)
tabby-bin                # ssh工具
```

---

### 🧪 虚拟化 & 容器

```
qemu-full                # QEMU 全功能虚拟机
virt-manager             # 虚拟机管理 GUI
swtpm                    # TPM 模拟器（用于安全启动虚拟机）
```

---

### 🎨 主题 & 美化 & 扩展

```
gnome-shell-extension-steal-my-focus # 自动聚焦窗口扩展
gnome-shell-extension-clipboard-indicator # 剪贴板历史
gnome-shell-extension-auto-power-profile # 自动电源模式
gnome-shell-extension-power-tracker   # 电量追踪
gnome-shell-extension-power-profile-indicator # 电源模式指示器
gnome-shell-extension-hide-universal-access # 隐藏无障碍菜单
gnome-shell-extension-tiling-shell   # 平铺窗口扩展
matugen                  # 根据壁纸生成配色方案
```

---

### ⚙️ 服务 & 后台 & 优化

```
power-profiles-daemon    # 性能模式切换服务
xdg-document-portal.service # 文档门户服务（超时调整）
local-search-3.service   # 本地搜索服务（超时调整）
gloseterminal → kitty 符号链接 # GNOME Terminal 替换为 Kitty
EDITOR=vim               # 默认编辑器设置
```

---

### 🌐 浏览器 & 网络工具

```
firefox                  # 火狐浏览器
firefox-i18n-zh-cn       # 火狐中文语言包
google-chrome            # 谷歌浏览器(AUR)
```

---

### ✅ 最终备注

- 所有曾安装但被**明确删除或回退**的软件（如 `mangohud`, `ghostty`, `fragments`, `python-pywal16`）**未列入**。
- 部分软件通过 **AUR** 或 **Flatpak** 安装，已在注释中标明。
- 部分服务（如 `bluetooth`, `NetworkManager`, `switcheroo-control`, `power-profiles-daemon`）已启用并保留。
- 所有配置文件修改（如 locale、GRUB、环境变量、xdg-mime）视为系统设置，不列为“软件”。

---

✅ 此列表可用于备份、重装参考、或制作自动化脚本。  
如需导出为可执行的 pacman/paru 安装命令，也可提供。