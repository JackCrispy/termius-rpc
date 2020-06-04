#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

#SingleInstance, force

OnExit, ExitSub
RunWait, node "termius/main.js", % A_ScriptDir, Hide, pid
ExitApp

ExitSub:
Process, close, % pid
ExitApp
