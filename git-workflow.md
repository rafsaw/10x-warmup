## Git workflow for this training repo

This guide assumes:
- You **cannot push/commit directly to `origin/master`** (protected branch).
- You **can create and push your own branches** (e.g. `rafal/playground`).
- You are working in this folder: `10x-warmup`.

---

## 1. One-time setup

In PowerShell, go to the repo:

```bash
cd C:\Users\rafal\repos\10xDevs2\10x-warmup
git status
```

Configure your identity if needed:

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

You can commit **locally** on any branch (even `master`), but you will only be able to **push** your own branches to the remote.

---

## 2. Keep `master` clean and in sync with origin

Treat local `master` as a **read-only mirror** of `origin/master`:

```bash
git checkout master
git fetch origin
git pull --rebase origin master
```

- Do **not** do your training work directly on `master`.
- If you already have local commits on `master`, see section **6. Cleaning up a diverged master**.

---

## 3. Create your own working branch

From up-to-date `master`:

```bash
git checkout master
git pull --rebase origin master

git checkout -b rafal/playground
```

Guidelines:
- Use a personal prefix, e.g. `rafal/…` for all your branches.
- Example branches: `rafal/banking-exercises`, `rafal/cursor-training`.

You can commit **freely** on these branches and push them to origin.

---

## 4. Day-to-day workflow on your branch

When you start working:

```bash
cd C:\Users\rafal\repos\10xDevs2\10x-warmup
git checkout rafal/playground   # or any of your branches
git status
```

Make changes (edit files, add new ones), then:

```bash
git status                # see what changed
git add path/to/file.ts   # or: git add .
git commit -m "feat: short description of change"
```

You can repeat this cycle (edit → `git status` → `git add` → `git commit`) as often as you want.

If you need to undo:

- Discard changes in a file (not staged yet):

  ```bash
  git restore path/to/file.ts
  ```

- Unstage a file (keep edits in the working tree):

  ```bash
  git reset HEAD path/to/file.ts
  ```

---

## 5. Getting the latest changes from `origin/master`

You will regularly want your training branch to include the latest upstream changes.

1. **Update local `master` from origin**:

   ```bash
   git checkout master
   git fetch origin
   git pull --rebase origin master
   ```

2. **Rebase your branch on top of `master`** (recommended):

   ```bash
   git checkout rafal/playground
   git rebase master
   ```

   - If there are no conflicts, you are done.
   - If there are conflicts:
     - Fix the files shown by Git.
     - Stage them:

       ```bash
       git add path/to/conflicted-file.ts
       ```

     - Continue:

       ```bash
       git rebase --continue
       ```

If rebasing feels too advanced, you can instead **merge**:

```bash
git checkout rafal/playground
git merge master
```

Resolve conflicts if any, then:

```bash
git add .
git commit          # Git will create a merge commit
```

---

## 6. Cleaning up a diverged `master` (safe version)

If you see a message like:

> Your branch and 'origin/master' have diverged

that means you have local commits on `master` that are not on `origin/master`.

The cleanest approach:

1. **Save your current `master` work into a new branch**:

   ```bash
   git checkout master
   git checkout -b rafal/old-master-work
   ```

2. **Reset local `master` to exactly match `origin/master`**:

   ```bash
   git checkout master
   git fetch origin
   git reset --hard origin/master
   ```

   > ⚠️ `reset --hard` will remove local commits from `master`, but they are still safe on `rafal/old-master-work`.

3. For new work, always branch **from `master`**:

   ```bash
   git checkout master
   git checkout -b rafal/new-playground
   ```

---

## 7. Pushing your branches (since you can’t push to master)

You will typically **not** push `master` at all. Instead, push your personal branches:

```bash
git checkout rafal/playground
git push -u origin rafal/playground
```

- `-u` sets the upstream so next time you can just run `git push`.
- Remote maintainers (or you in a fork) can use your branch for pull requests or code review.

---

## 8. Quick recipe (copy-paste friendly)

**Before starting work:**

```bash
cd C:\Users\rafal\repos\10xDevs2\10x-warmup
git checkout master
git fetch origin
git pull --rebase origin master

git checkout rafal/playground   # or create it with: git checkout -b rafal/playground
```

**During work:**

```bash
git status
git add .
git commit -m "feat: describe what you did"
```

**Regularly sync with origin/master:**

```bash
git checkout master
git pull --rebase origin master
git checkout rafal/playground
git rebase master              # or: git merge master
```

**Push your work (never to master):**

```bash
git checkout rafal/playground
git push -u origin rafal/playground
```

Use this file as your reference when working in this repo. Adjust branch names as needed (but keep the pattern: personal prefix + short task name).


