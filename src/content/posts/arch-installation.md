---
title: arch安装日志
published: 2026-02-17
pinned: true
description: 记录Arch Linux的安装过程、配置步骤及遇到问题的解决方法。
tags: [Arch Linux, Installation, Guide, Linux]
category: Tutorial
draft: false
image: ''
---
# 🐧 Arch Linux 安装与配置日志

> 作者：匿名用户  
> 时间跨度：2025年1月 - 2月  
> 桌面环境：GNOME → 后期尝试 Wayland + Hyprland/Niri 相关组件  
> 硬件支持：NVIDIA 显卡、AMD CPU、Btrfs 文件系统、ZRAM、EFI 引导等

---

## 📦 基础系统安装（1月初）

### 1. 准备工作
- 下载 Arch ISO 镜像
- 关闭设备加密（如有）
- 连接网络（有线/WiFi）
- 设置时间同步：
  ```bash
  timedatectl set-ntp true
  ```

### 2. 分区与文件系统
- 使用 `cfdisk` 对磁盘分区（如 `/dev/nvme0n1`）
- 创建 Btrfs 文件系统：
  ```bash
  mkfs.btrfs /dev/nvme0n1pX
  mount -t btrfs /dev/nvme0n1pX /mnt
  ```
- 创建子卷：
  ```bash
  btrfs subvolume create /mnt/@
  btrfs subvolume create /mnt/@home
  umount /mnt
  ```
- 分别挂载子卷：
  ```bash
  mount -o subvol=@ /dev/nvme0n1pX /mnt
  mkdir -p /mnt/home
  mount -o subvol=@home /dev/nvme0n1pX /mnt/home
  ```
- 挂载 EFI 分区：
  ```bash
  mkdir -p /mnt/boot/efi
  mount /dev/nvme0n1p1 /mnt/boot/efi
  ```

### 3. 安装基础包
```bash
pacstrap /mnt base base-devel linux-zen linux-firmware btrfs-progs \
networkmanager vim sudo amd-ucode
```

### 4. 生成 fstab
```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

### 5. Chroot 进入新系统
```bash
arch-chroot /mnt
```

### 6. 时区与本地化
- 设置时区：
  ```bash
  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
  timedatectl set-timezone Asia/Shanghai
  hwclock --systohc
  ```
- 编辑 `/etc/locale.gen`，取消注释 `en_US.UTF-8 UTF-8`
- 生成 locale：
  ```bash
  locale-gen
  ```
- 创建 `/etc/locale.conf`：
  ```ini
  LANG=en_US.UTF-8
  ```

### 7. 主机名与 root 密码
```bash
echo "myarch" > /etc/hostname
passwd
```

### 8. 安装并配置 GRUB（UEFI）
```bash
pacman -S grub efibootmgr os-prober exfat-utils
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
mkdir -p /efi/EFI/grub
ln -s /boot/grub /efi/EFI/grub/boot
grub-mkconfig -o /boot/grub/grub.cfg
```

> ✅ 编辑 `/etc/default/grub` 启用 `GRUB_DISABLE_OS_PROBER=false` 和 `loglevel=5`

### 9. 安装辅助工具
```bash
pacman -S zram-generator
systemctl enable systemd-zram-setup@zram0.service
```

> ⚠️ 在 GRUB 配置中禁用 `zswap`

---

## 🔄 重启进入系统 & 基础服务配置

```bash
exit
umount -R /mnt
reboot
```

登录后：

```bash
systemctl enable NetworkManager
systemctl start NetworkManager
```

---

## 🧑‍💻 用户与环境配置

### 1. 安装常用软件
```bash
pacman -S fastfetch cmatrix
echo 'EDITOR=vim' >> /etc/environment
useradd -m -G wheel username
passwd username
visudo  # 取消 %wheel ALL=(ALL) ALL 的注释
```

### 2. 配置 pacman 源
- 开启 32 位源（`[multilib]`）
- 添加国内镜像源（清华、中科大等）
- 安装 CN 密钥环：
  ```bash
  pacman -S archlinuxcn-keyring
  ```

### 3. 安装 AUR 助手 Paru
```bash
git clone https://aur.archlinux.org/paru.git
cd paru && makepkg -si
```

### 4. 安装备份与快照工具
```bash
paru -S snapper snap-pac btrfs-assistant grub-btrfs inotify-tools
systemctl enable grub-btrfs.path
snapper -c root create-config /
snapper -c home create-config /home
snapper create --description "Initial snapshot"
```

### 5. 安装 LTS 内核（备用）
```bash
pacman -S linux-lts linux-lts-headers
grub-mkconfig -o /boot/grub/grub.cfg
```

---

## 🖥️ GNOME 桌面环境安装

```bash
pacman -S gnome gdm gnome-control-center flatpak
systemctl enable gdm
```

> 💡 发现部分组件已随 GNOME 自动安装（如 bluez），需手动启用服务：
```bash
systemctl enable bluetooth
systemctl start bluetooth
```

### 性能管理
```bash
pacman -S power-profiles-daemon
systemctl enable power-profiles-daemon
```

### 其他工具
```bash
pacman -S nvtop noto-fonts-cjk fcitx5-im fcitx5-rime fcitx5-pinyin-moegirl
paru -S linuxqq-appimage
```

> 🌐 设置输入法环境变量（全局）：
```bash
cat >> /etc/environment <<EOF
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
EOF
```

---

## 🎮 游戏与多媒体支持

### Steam & 游戏优化
```bash
pacman -S steam-native-runtime
paru -S uuacc-steamdeck-plugin
systemctl enable switcheroo-control
systemctl start switcheroo-control
```

> 🔧 解决 Steam 中文输入问题：
- 修改 `/etc/locale.conf` → `LANG=zh_CN.UTF-8`
- GNOME 时间格式自动切换为 24 小时制

> 🎯 TTY 中文乱码修复：
```bash
# 在 ~/.zshrc 或 ~/.bashrc 中添加：
if [ "$TERM" = "linux" ]; then
    export LANG=zh_CN.UTF-8
fi
```

### 图形驱动与 Vulkan
```bash
pacman -S nvidia nvidia-utils libva-nvidia-utils vulkan-icd-loader vulkan-tools
paru -S vulkan-mesa-layers  # 尝试解决独显占用
```

### 游戏辅助工具
```bash
paru -S gamescope mangohud mangojuice gamemoderun
```

> ⚠️ 曾安装 `mangohud` + `goverlay`，因 Bug 回退

---

## 🧰 开发与生产力工具

### 终端与 Shell
```bash
pacman -S zsh neovim clang cmake ninja gdb lldb btop bat eza fzf zoxide
chsh -s /bin/zsh
```

> ✨ ZSH 插件配置（语法高亮、补全、历史）  
> ✨ 安装 Nerd Fonts + Starship 提示符

### IDE 与编辑器
```bash
pacman -S code visual-studio-code-bin
paru -S marktext
```

### Python 与科学计算
```bash
paru -S miniconda3
echo 'export PATH="/opt/miniconda3/bin:$PATH"' >> ~/.zshrc
chmod -R g+w /opt/miniconda3  # 保证可更新
conda config --set auto_activate_base false
```

### 多媒体与办公
```bash
pacman -S firefox ffmpegthumbnailer gvfs-smb gst-plugins-{base,good,libav}
pacman -S okular kdenlive onlyoffice-desktopeditors reaper
pacman -S gnome-clocks gnome-calendar transmission-gtk timg
```

---

## 🖼️ 美化与个性化

### 字体与缩放
- 更改系统字体为「思源黑体」
- 修改 `~/.config/fontconfig/fonts.conf`
- 调整 GTK 缩放：`xorg-xrdb` + `Xft.dpi: 144`
- Minecraft 缩放修复：游戏内设 100%，字体缩放 1.33

### GNOME 扩展与插件
```bash
flatpak install flathub com.mattjakeman.ExtensionManager
```
安装扩展：
- AppIndicator and KStatusNotifierItem Support
- Caffeine（后关闭）
- Steal My Focus Window
- Clipboard Indicator
- Auto Power Profile / Power Tracker
- Hide Universal Access
- Tiling Shell

> 🎨 安装 rounded-window-corners、reborn 主题  
> 🖋️ 字体改为 JetBrains Mono（AUR 安装失败，手动处理）

### 终端美化
```bash
pacman -S kitty
gsettings set org.gnome.desktop.default-applications.terminal exec 'kitty'
ln -sf /usr/bin/kitty /usr/bin/gnome-terminal
paru -S nautilus-open-any-terminal
```

> ❌ 移除 Ghostty  
> ✅ 安装 `nautilus-terminal` 替代

---

## 🌐 网络与虚拟化

### 网络工具
```bash
pacman -S network-manager-applet dnsmasq bluetui
systemctl enable dnsmasq
```

### 虚拟机
```bash
pacman -S qemu-full virt-manager swtpm
systemctl enable libvirtd
```

### 浏览器插件与工具
```bash
paru -S pywalfox matugen
pacman -S python-pywal  # 后删除 v16 版本
```

---

## 🖱️ Wayland 实验性配置（2月初）

> 尝试迁移到 Wayland 生态：

```bash
paru -S niri xwayland-satellite xdg-desktop-portal-gnome fuzzel
pacman -S libnotify mako polkit-gnome pavucontrol swww waybar
```

> 🎨 使用 Mechabar 的 Waybar 主题（后删除）  
> 🔧 QQ 在 XWayland 下输入法异常 → 调整 DPI 与光标大小

---

## 🛠️ 故障修复与优化

### 文件管理器打开异常
> 问题：点击“打开文件夹”却启动 Kitty  
> 修复：
```bash
xdg-mime query default inode/directory  # 查看当前默认
xdg-mime default org.gnome.Nautilus.desktop inode/directory
```

### GTK 应用启动慢
> 设置环境变量强制使用 OpenGL 渲染：
```bash
export GDK_BACKEND=gl
```

### 服务超时调整
```bash
sudo systemctl edit xdg-document-portal.service
# 设置 TimeoutStopSec=10s

sudo systemctl edit localsearch-3.service
# 设置 TimeoutStopSec=5s
```

### Steam 下载限速
> 创建 `~/.steam/steam/steam_dev.cfg`：
```ini
"DownloadThrottle" "0"
```

### 关闭内核看门狗（编辑 GRUB）
> 在 `/etc/default/grub` 添加：
```ini
GRUB_CMDLINE_LINUX_DEFAULT="... nowatchdog"
```

---

## 🧩 其他工具与彩蛋

```bash
pacman -S asciiquarium figlet jp2a toilet cowsay lolcat cbonsai cava musicfox p7zip
paru -S hmcl  # 修改 .desktop 文件适配缩放
```

> 🌈 安装 `pywal` + `matugen` 自动主题生成  
> 🎵 安装 `easyeffects`, `loupe`, `baobab`, `mission-center`

---

## 📅 更新日志摘要

| 日期   | 主要操作 |
|--------|----------|
| 1.2    | 修复中文输入、TTY 乱码、root 切换 ZSH |
| 1.4    | 安装开发工具链、VSCode、调试器 |
| 1.5    | Miniconda 配置、Reaper、缩放修复 |
| 1.6    | RSSGuard、Okular、HiDPI 配置 |
| 1.7    | Kdenlive、OnlyOffice |
| 1.18   | Kitty 终端、JetBrains 字体、Nautilus 集成 |
| 2.1    | Wayland 实验堆栈、蓝牙 TUI、通知系统 |
| 2.3    | 截图/录屏工具、快速模糊选择器、剪贴板增强 |

---

## ✅ 当前系统状态

- ✅ 双内核：`linux-zen` + `linux-lts`
- ✅ 文件系统：Btrfs + 子卷 + Snapper 快照
- ✅ 桌面环境：GNOME + 扩展 + Wayland 实验支持
- ✅ 显卡驱动：NVIDIA + PRIME + Vulkan
- ✅ 输入法：Fcitx5 + Rime + 雾凇拼音
- ✅ 终端：Kitty + ZSH + Starship + 插件生态
- ✅ 包管理：pacman + paru (AUR)
- ✅ 快照备份：Snapper + grub-btrfs 自动菜单
- ✅ 游戏支持：Steam + Gamescope + MangoHUD + UU加速器
- ✅ 开发环境：Neovim, VSCode, CMake, GDB, Conda

---

## 📌 后续待办事项

- [ ] 迁移完整工作流至 Wayland
- [ ] 配置自动清理旧快照策略
- [ ] 优化 NVIDIA 功耗与温度控制
- [ ] 配置自动壁纸更换（`swaybg` / `swww`）
- [ ] 整合 OBS + wf-recorder 工作流

---

> 🎉 **恭喜完成高度定制化的 Arch Linux 系统部署！**

> 文档最后更新：2025年2月3日  
> 作者保留所有配置权利 —— Enjoy your Arch!

---

如需 PDF/HTML 导出、或按模块拆分，请告知我，我可以进一步为你优化排版或生成多文件结构。希望这份 Markdown 日志对你未来的维护和分享有所帮助！🚀