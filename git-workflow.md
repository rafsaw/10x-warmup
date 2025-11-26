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

### Two Approaches to Managing Your Work

You have two options for organizing your work:

#### Approach 1: Single Branch (Recommended for Learning)

Keep all your work on one branch (`rafal-10x-warmup`) and regularly sync it with the original repo. This is simpler and keeps everything in one place.

**When to use:**
- You're learning and want simplicity
- All your work is related training exercises
- You don't need to separate different tasks

**Workflow:**
- Use the "Getting Latest Changes" section above
- All your commits go to `rafal-10x-warmup`
- One branch to manage

#### Approach 2: Feature Branches (More Organized)

Create separate branches for each exercise or task, then optionally merge them back to your main branch.

**When to use:**
- You want to practice professional workflows
- You're working on multiple unrelated exercises
- You want cleaner, more organized history

**How to create a feature branch:**

```bash
# 1) First, sync master with original repo
git checkout master
git fetch upstream
git pull --rebase upstream master

# 2) Create a NEW branch for a specific exercise
git checkout -b rafal/banking-exercise
# (or: rafal/cursor-training, rafal/charts-task, etc.)

# 3) Do your work, commit, push
# ... edit files ...
git add .
git commit -m "feat: complete banking exercise"
git push -u origin rafal/banking-exercise

# 4) Optional: Merge feature branch back to your main branch
git checkout rafal-10x-warmup
git merge rafal/banking-exercise
git push
```

**Pros:**
- Clean separation of work
- Easy to see what each exercise added
- Can delete feature branches when done
- Professional workflow practice

**Cons:**
- More branches to manage
- Might be overkill for simple learning

**Recommendation:** Start with Approach 1 (single branch) for simplicity. Use Approach 2 when you want more organization or are practicing professional workflows.

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
  - **Important:** You should sync your fork's `master` with the original, but **never merge your work into it**.

- **`rafal-10x-warmup`** (or your branch name): Your working branch.
  - All your training work happens here.
  - You commit and push this branch to your fork.

#### Keeping Your Fork's Master Clean

**✅ DO: Keep your fork's master in sync with the original repo**

```bash
# Update YOUR fork's master to match original repo
git checkout master
git fetch upstream
git pull --rebase upstream master
git push origin master    # Push to YOUR fork's master
```

This keeps your fork's `master` aligned with `przeprogramowani/10x-warmup`.

**❌ DON'T: Merge your work into your fork's master**

```bash
# ❌ DON'T do this:
git checkout master
git merge rafal-10x-warmup    # This would mess up your master
```

**Why not:**
- Your fork's `master` would diverge from the original
- Makes it harder to sync with upstream later
- Your work belongs on feature branches, not `master`

**Summary:**
- Your fork's `master` → matches `upstream/master` (original repo)
- Your work → `rafal-10x-warmup` (or other feature branches)
- Don't merge your work into `master`

This keeps everything clean and makes syncing straightforward.

---

## Identifying Where a Repo Comes From

When you have multiple repos from different GitHub accounts, here's how to identify the source:

### Check Remote URLs

In any repo folder, run:

```bash
git remote -v
```

This shows all configured remotes and their URLs. Example output:

```
origin    https://github.com/rafsaw/10x-warmup.git (fetch)
origin    https://github.com/rafsaw/10x-warmup.git (push)
upstream  https://github.com/przeprogramowani/10x-warmup.git (fetch)
upstream  https://github.com/przeprogramowani/10x-warmup.git (push)
```

**What this tells you:**
- **`origin`** → Usually your fork or the repo you cloned from (where you push/pull)
- **`upstream`** → The original repo (if configured, read-only)
- The **GitHub username** in the URL shows which account owns the repo

### Check Current Branch Tracking

```bash
git branch -vv
```

Shows which branch you're on and which remote branch it tracks.

### See All Remote Branches

```bash
git branch -r
```

Lists all remote branches from all configured remotes.

### Quick Identification

The `git remote -v` output is usually enough to identify:
- **Which GitHub account** owns the repo (from the URL)
- **Whether it's a fork** (if `upstream` exists, it's likely a fork)
- **Where you're pushing/pulling** from (`origin`)

**Example scenarios:**
- If `origin` points to `rafsaw/repo-name` → You're working with your own fork
- If `origin` points to `other-account/repo-name` → You cloned from someone else's repo
- If `upstream` exists → You have a fork setup (original repo is `upstream`)

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


