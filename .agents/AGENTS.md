# Workspace Agent Rules

## PowerShell Script Delivery

When generating PowerShell hardening scripts, security configuration scripts, or any
administrative PowerShell content, **always write the script directly to a `.ps1` file**
on disk (using `write_to_file`) before asking the user to run it.

**Never deliver PowerShell scripts as:**
- Base64-encoded `-EncodedCommand` one-liners
- Long inline strings embedded inside `Start-Process powershell -ArgumentList "..."`
- Multi-line heredoc strings piped directly into `Invoke-Expression` / `iex`

**Reason:** Windows Defender flags inline encoded PowerShell as ClickFix dropper behaviour.
A clean `.ps1` file on disk is transparent, scannable by AV, and reviewable by the user.

**Correct pattern:**
1. Write the script to a known path using `write_to_file`
2. Tell the user to run it with:
   `& "C:\path\to\script.ps1"` from an elevated PowerShell window

**Incorrect pattern:**
```powershell
# DON'T - triggers AV heuristics
Start-Process powershell -ArgumentList "-EncodedCommand <base64blob>" -Verb RunAs
```
