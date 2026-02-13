# 📝 How to Edit Your Portfolio

This guide will help you easily add, update, or remove content from your portfolio.

## Quick Reference: Where Things Are

| What to Edit | File | Section |
|---|---|---|
| Your name, bio, description | `index.html` | Search for `HERO` or `ABOUT` |
| Add new projects/case studies | `index.html` | Search for `CASE STUDIES` |
| Add new certificates | `index.html` | Search for `CERTIFICATIONS` |
| Update skills | `index.html` | Search for `SKILLS` |
| Change typing roles | `script.js` | Edit the `roles` array in `CONFIG` |
| Change colors/theme | `style.css` | Edit CSS variables in `:root` |

---

## 🎓 Adding a New Certificate

In `index.html`, find the `<!-- CERTIFICATIONS -->` section. Copy this template and paste it inside `<div class="certs-grid">`:

```html
<div class="cert-card reveal">
    <div class="cert-badge">🏆</div>
    <h3>YOUR CERTIFICATE NAME</h3>
    <p class="cert-issuer">ISSUER • DATE</p>
    <p>Brief description of what you learned</p>
</div>
```

---

## 📂 Adding a New Case Study / Project

In `index.html`, find the `<!-- CASE STUDIES -->` section. Copy an existing `<div class="case-card reveal">` block, paste it after the last one, and update:

- The `case-number` (04, 05, etc.)
- The `case-tag` tags (topic labels)
- The `case-title` and `case-subtitle`
- Each `step-content` block (Problem, Approach, Tools, Insights, Outcome)
- The `tool-tags` with the tools you used

---

## 🔗 Adding Project Links

To add a link to any project, wrap the title in an anchor tag:

```html
<!-- Before -->
<h3 class="case-title">My Project Name</h3>

<!-- After (with link) -->
<h3 class="case-title">
    <a href="https://github.com/yourname/repo" target="_blank" style="color: inherit; text-decoration: underline dotted;">
        My Project Name 🔗
    </a>
</h3>
```

---

## 🛠 Adding New Skills

Find the skills section in `index.html`. Add items inside any `<div class="skill-items">`:

```html
<div class="skill-item">
    <span class="skill-name">NEW SKILL NAME</span>
    <div class="skill-bar">
        <div class="skill-fill" data-level="85"></div> <!-- 0 to 100 -->
    </div>
</div>
```

---

## 🎨 Changing Colors

In `style.css`, change the CSS variables at the top:

```css
:root {
    --accent-1: #6c63ff;   /* Primary purple */
    --accent-2: #00d4ff;   /* Cyan accent */
    --accent-3: #a855f7;   /* Secondary purple */
    --bg-primary: #060a13; /* Main background */
}
```

---

## 🔄 Updating Typing Roles

In `script.js`, edit the `roles` array:

```javascript
const CONFIG = {
    roles: [
        "Data Analyst",
        "Your New Role Here",
        // Add more...
    ],
};
```

---

## 🌐 Deploying to GitHub Pages (for shareable link)

1. Create a GitHub account at github.com
2. Create a new repository named `portfolio`
3. Upload all 3 files (`index.html`, `style.css`, `script.js`)
4. Go to **Settings → Pages → Source: main branch**
5. Your live link: `https://yourusername.github.io/portfolio/`
