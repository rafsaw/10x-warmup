## Git Workflow for Training Repos (Fork-Based)

This guide covers the **complete workflow** for working with a training repo where you:
- **Cannot push/commit directly to the original repo** (`przeprogramowani/10x-warmup`).
- **Want to push your work to GitHub** (your own fork).
- **Want to regularly get latest changes** from the original repo.

This uses the **fork workflow**: you create your own copy (fork) on GitHub, work there, and sync with the original.

---

## Part 1: One-Time Setup (First Time Only)

### Step 1: Fork the Repository on GitHub

1. Go to the original repository in your browser:
   - Example: `https://github.com/przeprogramowani/10x-warmup`
2. Make sure you are **logged in** to GitHub (check top-right corner).
3. Click the **"Fork"** button (top-right of the repo page).
4. In the fork dialog:
   - **Owner**: Select your GitHub account (e.g., `rafsaw`).
   - **Repository name**: Leave as-is (e.g., `10x-warmup`).
   - Click **"Create fork"**.
5. Wait a few seconds. You'll be redirected to your fork: `https://github.com/rafsaw/10x-warmup`

✅ **Done!** You now have your own copy on GitHub where you can push freely.

---

### Step 2: Configure Your Local Repository

Open PowerShell in your repo folder:

cd C:\Users\rafal\repos\10xDevs2\10x-warmup
# (or wherever your repo is located)

git remote -vYou should see `origin` pointing to the original repo. Now rename it and add your fork:

# Rename original repo to "upstream" (read-only source)
git remote rename origin upstream

# Add your fork as "origin" (where you can push)
git remote add origin https://github.com/rafsaw/10x-warmup.git
# ⚠️ Replace "rafsaw" with YOUR GitHub username!

# Verify it's correct
git remote -vYou should now see:
- `origin` → `https://github.com/rafsaw/10x-warmup.git` (your fork - you can push here)
- `upstream` → `https://github.com/przeprogramowani/10x-warmup.git` (original - read-only)

---

### Step 3: Clean Up Local Master (If Needed)

If you see this message:

> Your branch and 'origin/master' have diverged

Your local `master` has commits that aren't in the original. Fix it:

# 1) Save your current master work to a safety branch
git checkout master
git checkout -b rafal/old-master-work

# 2) Reset local master to match original repo
git checkout master
git fetch upstream
git reset --hard upstream/master

# 3) Verify master is clean
git statusYou should see: `Your branch is up to date with 'upstream/master'`.

---

### Step 4: Create Your Working Branch

From clean `master`, create your personal branch:
sh
git checkout master
git checkout -b rafal-10x-warmup
# (or any name you prefer, e.g., rafal/playground, rafal/training)

# Push it to your fork
git push -u origin rafal-10x-warmup✅ **Setup complete!** From now on, you'll work on `rafal-10x-warmup` and push to your fork.

---

## Part 2: Daily Workflow

### Getting Latest Changes from Original Repo

Whenever you want to sync with the original repo:

cd C:\Users\rafal\repos\10xDevs2\10x-warmup

# 1) Update local master from ORIGINAL repo (upstream)
git checkout master
git fetch upstream
git pull --rebase upstream master

# 2) Update your working branch on top of that
git checkout rafal-10x-warmup
git rebase master
# OR (simpler but messier history):
# git merge master

# 3) Push updated branch to YOUR fork
git push**What this does:**
- `upstream` = original repo (read-only, you pull from here).
- `origin` = your fork (you push to here).
- Your branch gets all the latest changes from the original.

---

### Making Changes and Committing

# Make sure you're on your working branch
git checkout rafal-10x-warmup

# Make your changes (edit files, add new ones, etc.)

# See what changed
git status

# Stage changes
git add path/to/file.ts    # specific file
# OR
git add .                  # everything (be careful)

# Commit
git commit -m "feat: describe what you did"
# Use clear messages: "feat:", "fix:", "chore:", "docs:"

# Push to your fork
git push**Repeat this cycle** as often as you want: edit → `git status` → `git add` → `git commit` → `git push`.

---

### Undoing Mistakes

**Discard changes in a file** (not yet staged):h
git restore path/to/file.ts**Unstage a file** (keep edits, but don't commit them yet):
git reset HEAD path/to/file.ts**See what changed** in detail:
git diff                # unstaged changes
git diff --staged       # staged changes---

## Part 3: Quick Reference Recipe

**Every time you start working:**

cd C:\Users\rafal\repos\10xDevs2\10x-warmup

# Sync with original repo
git checkout master
git fetch upstream
git pull --rebase upstream master

# Switch to your branch and update it
git checkout rafal-10x-warmup
git rebase master        # or: git merge master**During work:**

git status
git add .
git commit -m "feat: describe what you did"
git push**End of session:**

git push    # Make sure everything is on your fork---

## Part 4: Understanding the Setup

### Remotes Explained

- **`upstream`**: The original repository (e.g., `przeprogramowani/10x-warmup`).
  - You **pull** from here to get latest changes.
  - You **cannot push** here (no permission).

- **`origin`**: Your fork on GitHub (e.g., `rafsaw/10x-warmup`).
  - You **push** your work here.
  - You **own** this repo, so you can do anything.

### Branches Explained

- **`master`**: Should always match `upstream/master` (the original).
  - Keep it clean. Don't do your work here.
  - Use it as a "sync point" to get latest changes.

- **`rafal-10x-warmup`** (or your branch name): Your working branch.
  - All your training work happens here.
  - You commit and push this branch to your fork.

---

## Troubleshooting

### "Permission denied" when pushing

- Make sure you forked the repo (Step 1).
- Check that `origin` points to YOUR fork: `git remote -v`.
- Verify you're logged into GitHub with the correct account.

### "Your branch and 'upstream/master' have diverged"

- Follow **Step 3** in Part 1 to clean up `master`.
- Always work on your own branch, not `master`.

### Conflicts during rebase

If `git rebase master` shows conflicts:

1. Git will pause and show which files conflict.
2. Open those files, look for `<<<<<<<`, `=======`, `>>>>>>>` markers.
3. Edit to resolve the conflict (keep what you want, remove markers).
4. Stage the fixed files:
   git add path/to/conflicted-file.ts
   5. Continue the rebase:
  
   git rebase --continue
   If rebasing feels too scary, use `git merge master` instead (simpler, but creates merge commits).

---

## Applying This to Other Projects

To use this workflow on **any other training repo**:

1. **Fork it** on GitHub (same as Step 1).
2. **Clone your fork** (or if you already cloned the original):
   
   git remote rename origin upstream
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   3. **Create your working branch** and push it.
4. **Follow the daily workflow** (Part 2).

That's it! The same pattern works for any repo where you need to fork.

---

**Last updated**: Based on actual setup with `10x-warmup` repo.


