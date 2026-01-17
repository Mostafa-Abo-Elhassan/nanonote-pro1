📝 NanoNote Pro - Professional Reference Guide
A high-performance, transparent, and multi-tabbed desktop note-taking application built for developers who need to capture ideas without breaking their coding flow.

1. Project Philosophy (Problem Statement)
The Problem: Context switching between a heavy IDE (like Visual Studio) and bloated note-taking apps leads to cognitive load and distraction.

The Solution: A lightweight, Native Desktop utility that stays "Always on Top" with smart transparency, allowing for seamless note capture while coding.

2. Technical Architecture
NanoNote Pro is built on the Electron.js Framework, leveraging a dual-engine synergy:

Chromium Engine: Renders the UI using HTML5/CSS3 with hardware acceleration.

Node.js Runtime: Provides low-level OS access (FileSystem, Global Shortcuts).

Project Structure
Plaintext

/NanoNote-Pro
├── package.json          # Metadata, scripts, and dependencies
├── main.js               # Main Process: Window lifecycle & Global Hotkeys
└── /renderer             # Renderer Process: The UI Layer
    ├── index.html        # Structure (Tabs, Sidebar, Editor)
    ├── style.css         # Glassmorphism styling & Themes
    └── ui.js             # Interaction logic (Drag & Drop, Search, Auto-save)
3. Core Features
🖥️ UI/UX Excellence
Compact Mode: Instantly toggle to a slim bar (300x60px) to minimize screen real estate.

Tabbed System: Effortlessly switch between multiple active notes.

Collapsible Sidebar: Focus mode for distraction-free writing.

Glassmorphism UI: Modern transparent aesthetic using backdrop-filter: blur.

⚙️ Technical Functionality
Drag & Drop Reorder: Intuitive note prioritization.

Live Search: Instant note filtering as you type.

Global Hotkey (Alt+Shift+N): Toggle visibility from anywhere in the OS.

Always on Top: Sticky window behavior to keep notes visible over the IDE.

💾 Storage & Reliability
100% Offline: Zero latency, zero external dependencies.

Auto-Save: Data persistence via LocalStorage triggered on every keystroke.

4. Developer Guide
Prerequisites
OS: Windows 10/11, macOS, or Linux.

Environment: Node.js (LTS recommended).

Setup Commands
Fix Execution Policy (PowerShell - Run as Admin if needed):

PowerShell

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Install Dependencies:

Bash

npm install
Run in Development Mode:

Bash

npm start
5. Production & Distribution
To package the app into a standalone .exe (Windows):

Build Engine: Powered by Electron Forge.

Packaging: Bundles JavaScript source with a minified Chromium binary.

Command:

Bash

npm run make
Resulting binaries will be found in the /out directory.

6. Maintenance & Future Scalability
Performance: Memory footprint averages 80-120MB (standard for Chromium-based apps).

Next Steps:

Data Migration: Transition from LocalStorage to SQLite for large datasets.

Cloud Sync: Integration with a .NET Web API for cross-device synchronization.

Optimization: Implement Context Isolation for enhanced security.

Author: Mostafa Mahmoud

Category: Productivity / Developer Tools

License: ISC