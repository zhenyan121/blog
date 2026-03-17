---
title: CMake 教程与模板
published: 2026-02-17
pinned: true
description: 本教程从零开始带你掌握 CMake 的基础语法、项目构建流程及常用技巧，适合 C/C++ 开发者快速上手。
tags: [CMake, C++, 构建工具, 教程, Linux]
category: 编程
draft: true
image: ''
---
## 前言  
CMake是一个工具，用于cpp开发中的库管理  

## 基本介绍  
### 项目相关  
```CMAKE
cmake_minimum_required(VERSION 3.20)   
project(MyProject  
    VERSION 1.0   
    DESCRIPTION "A simple C++ project using CMake"  
    LANGUAGES CXX
)
```
`cmake_minimum_required(VERSION 3.20)` : 指定CMake的最小版本，推荐写3.14以上的版本  
`project()`: 第一个是项目的名字，`VERSION`是项目的版本号,`DESCRIPTION`:是项目的描述,`LANGUAGES`：是项目的语言，有C和CXX两种，也可以两种都写上去  

### 编译器相关  
```CMAKE

set(CMAKE_CXX_STANDARD 17)           
set(CMAKE_CXX_STANDARD_REQUIRED ON)  
set(CMAKE_CXX_EXTENSIONS OFF)        


if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Debug)
endif()


message(STATUS "Build type: ${CMAKE_BUILD_TYPE}")
```
`set`:用于定义或者修改变量  
常用变量如下  
- `CMAKE_CXX_STANDARD`: 这个是项目的cpp标准
- `CMAKE_CXX_STANDARD_REQUIRED`: 这个是强制要求项目标准的开关，ON为开启
- `CMAKE_CXX_EXTENSIONS`: 这个是cpp编译器扩展的开关，OFF是禁用，可以保持严格的标准
- `CMAKE_BUILD_TYPE`: 这个是设置构建的类型， 有`Debug`,`Release`两种常用的类型

`message()`是一个用于输出信息的内置命令  

基本语法

```cmake
message([<mode>] "message text" ...)
```

其中 `<mode>` 是可选的消息类型（决定输出颜色和行为），消息文本可以是一个或多个字符串，会自动拼接。

---

消息类型（Mode）

| 模式               | 行为说明                                         |
| ---------------- | -------------------------------------------- |
| **无模式（默认）**      | 输出普通消息，通常显示为**高亮/白色**                        |
| `STATUS`         | 输出状态信息，前缀是 `--`，显示为**绿色** → 最常用！             |
| `WARNING`        | 输出警告，前缀是 `CMake Warning`，显示为**品红色/洋红**       |
| `AUTHOR_WARNING` | 针对项目作者的警告（一般用不到）                             |
| `SEND_ERROR`     | 输出错误并继续执行后续 CMake 命令（不中断配置）→ 显示为**红色**       |
| `FATAL_ERROR`    | 输出错误并**立即终止 CMake 配置过程** → 显示为**红色 + 退出**    |
| `DEPRECATION`    | 输出弃用警告（需设置 `CMAKE_WARN_DEPRECATED=ON`）       |
| `LOG`            | 仅当使用 `--log-level=verbose` 时才显示（CMake 3.15+） |

---



```CMAKE
# ================
# 查找源文件（自动收集 .cpp 和 .h）
# ================
file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS "src/*.cpp")
file(GLOB_RECURSE HEADERS CONFIGURE_DEPENDS "include/*.h" "include/*.hpp")

# 可选：打印找到的文件（调试用）
# message(STATUS "Sources: ${SOURCES}")
# message(STATUS "Headers: ${HEADERS}")

# ================
# 包含头文件目录
# ================
include_directories(include)

# ================
# 创建可执行文件
# ================
add_executable(${PROJECT_NAME} ${SOURCES} ${HEADERS})

# ================
# 链接库（示例：链接线程库）
# ================
find_package(Threads REQUIRED)
target_link_libraries(${PROJECT_NAME} Threads::Threads)

# ================
# 安装规则（可选）
# ================
install(TARGETS ${PROJECT_NAME}
    RUNTIME DESTINATION bin
)

install(DIRECTORY include/
    DESTINATION include
    FILES_MATCHING PATTERN "*.h*"
)

# ================
# 测试支持（可选）
# ================
enable_testing()
# add_test(NAME mytest COMMAND ${PROJECT_NAME})
```