$mainpath = $PSScriptRoot
if (-not $mainpath) {
    $mainpath = (Get-Location).Path
}

$h = "https:/"
$gh = ".com/miroxik74/dbs-mods"
$mod = "raw.githubusercontent$gh"
$l0 = "$h/$mod/main"
$rl = "$h/github$gh/releases/download"
$LINK = "$l0/mods"

function Cyan ($message) {
    if ($message) {
        Write-Host $message -ForegroundColor Cyan
    } else {
        Write-Host " " -ForegroundColor Cyan
    }
}

function Red ($message) {
    if ($message) {
        Write-Host $message -ForegroundColor Red
    } else {
        Write-Host " " -ForegroundColor Red
    }
}

function Yellow ($message) {
    if ($message) {
        Write-Host $message -ForegroundColor Yellow
    } else {
        Write-Host " " -ForegroundColor Yellow
    }
}

function DarkYellow ($message) {
    if ($message) {
        Write-Host $message -ForegroundColor DarkYellow
    } else {
        Write-Host " " -ForegroundColor DarkYellow
    }
}

function Green ($message) {
    if ($message) {
        Write-Host $message -ForegroundColor Green
    } else {
        Write-Host " " -ForegroundColor Green
    }
}

function Magenta ($message) {
    if ($message) {
        Write-Host $message -ForegroundColor Magenta
    } else {
        Write-Host " " -ForegroundColor Magenta
    }
}

function DarkGray ($message) {
    if ($message) {
        Write-Host $message -ForegroundColor DarkGray
    } else {
        Write-Host " " -ForegroundColor DarkGray
    }
}

function White ($message) {
    if ($message) {
        Write-Host $message -ForegroundColor White
    } else {
        Write-Host " " -ForegroundColor White
    }
}

function Error ($message) {
    if ($message) {
        Write-Error $message
    } else {
        Write-Error " " -ForegroundColor Red
    }
}

function Read ($message) {
    if ($message) {
        Read-Host $message
    } else {
        Read-Host " " -ForegroundColor White
    }
}

$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$gcache = "$h/$mod/refs/heads/main/updater/downloader.ps1?t=$timestamp"
try {
    $webResponse = Invoke-WebRequest -Uri $gcache -UseBasicParsing -ErrorAction Stop
} catch { }

function Show-disclaimer {
    Cyan
    Cyan
    Yellow "==========================================================="
    Yellow "                  IMPORTANT WARNINGS!                  "
    Yellow "==========================================================="
    Yellow "1. If you are sensitive to light, have symptoms of epilepsy"
    Yellow "or have epilepsy itself, i recommend NOT LOOKING at the"
    Yellow "monitor for at least 30 seconds after starting the action"
    Yellow "that will be displayed in Powershell !!!"
    Cyan
    Yellow "2. No idea why but the Captcha mod can be detected as"
    Yellow "Trojan so you can't get it here"
    Yellow "unless you download it via zip!"
    Yellow "==========================================================="
    Cyan
}
$main = Show-disclaimer
Start-Sleep -Seconds 1
Read "Press Enter to acknowledge and continue to the Menu..." 

$modPath = Join-Path $mainpath "mods"

function Request ($filename) {
    $dorequest = $false
    $url = "$LINK/$filename.js"
    $outputPath = Join-Path $modPath "$filename.js"
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
        $dorequest = $true
    } catch {
        Error "Failed to download $filename.js: $($_.Exception.Message)"
    }
}

function Mpath {
    Yellow "Missing mods folder, creating..."
    try {
        New-Item -ItemType Directory -Path $modPath -Force | Out-Null
        Green "Finished creating mods folder."
    } catch {
        Error "Failed to create mods folder: $($_.Exception.Message)"
        break
    }
    Cyan
}

function Show-SubMenuTasks {
    do {
        Clear-Host
        Cyan
        Green "--- Separated mods ---"
        Cyan
        White "1. AAA_BetterMods"
        White "2. APIMod"
        White "3. AskChatGPT"
        White "4. AuthorOnlyChannel"
        White "5. AuthorOnlyVoiceChannel"
        White "6. AwaitUserMessage"
        White "7. BanAllMember"
        White "8. BetterMods"
        White "9. BetterModsV2"
        White "10. BetterPing"
        White "11. BotInfo"
        White "12. BotSize"
        White "13. BotSizeUpdate"
        White "14. BotSystemInfo"
        White "15. BotType"
        White "16. CallEvent"
        White "17. CaptonHook"
        White "18. CategoryCreate"
        White "19. ChangeServerIcon"
        White "20. ChangeServerName"
        White "21. ChannelProperties"
        White "22. CheckChannelID"
        White "23. CheckChannelName"
        White "24. CheckCategoryID"
        White "25. CheckIfRoleIsOnServer"
        White "26. CheckRoleID"
        White "27. CodeBlock"
        White "28. Command"
        White "29. CommandCooldown"
        White "30. CommandDelete"
        White "31. CommandMessageDelete"
        White "32. ConsoleLog"
        White "33. CopyChannel"
        White "34. CreatedAt"
        White "35. CreateCategory"
        White "36. CreateFineTunedModel"
        White "37. CreateGuildInvite"
        White "38. Database"
        White "39. DelAllChannels"
        White "40. DelAllRoles"
        White "41. DeleteMessageByID"
        White "42. DeleteRoleFromServer"
        White "43. EditChannelName"
        White "44. EditChannelPermissions"
        White "45. EditedAuthorOnlyChannel"
        White "46. EditEmbed"
        White "47. EditMsg"
        White "48. EmbedPoll"
        White "49. EmbedReply"
        White "50. Emoji"
        White "51. Eval"
        White "52. FileSystem"
        White "53. ForceBan"
        White "54. forEach"
        White "55. GetInviteCount"
        White "56. GetMentionedChannel"
        White "57. GetMentionedRole"
        White "58. GetServerAmount"
        White "59. GetServerInfo"
        White "60. GrabCountOfMessages"
        White "61. Guilds"
        White "62. IfNSFW"
        White "63. ifargumentsarenone"
        White "64. IfStatement"
        White "65. InvLink"
        White "66. JumpToNode"
        White "67. KickAllMember"
        White "68. LastMessageReaction"
        White "69. Leaderboard"
        White "70. LeaveServer"
        White "71. LevelCard"
        White "72. LinkChecker"
        White "73. Lockdown"
        White "74. LockOneChannel"
        White "75. lowercase"
        White "76. MemeVariable"
        White "77. MessageReply"
        White "78. MoreStatus"
        White "79. Nickname"
        White "80. Notes"
        White "81. OFF"
        White "82. OneMemberChannelPerms"
        White "83. PinMod"
        White "84. PingMessage"
        White "85. Purge"
        White "86. RandomGuildMember"
        White "87. RandomLetters"
        White "88. RandomUser"
        White "89. RandomUserWithRole"
        White "90. RemoveReactions"
        White "91. RenameBot"
        White "92. ReplyMessage"
        White "93. sRoulette"
        White "94. SaveMessage"
        White "95. SendDM"
        White "96. SendMsgToGuild"
        White "97. ServerInfo"
        White "98. SetChannelPos"
        White "99. SetNSFW"
        White "100. SetNickname"
        White "101. slowmode"
        White "102. StartWithCMD"
        White "103. StopAction"
        White "104. Threads"
        White "105. TicketMod"
        White "106. Timeout"
        White "107. Tofixed"
        White "108. Transcript"
        White "109. TTSMessage"
        White "110. TwitchLiveNotifier"
        White "111. Unban"
        White "112. UnlockOneChannel"
        White "113. Unpinall"
        White "114. UpdateBio"
        White "115. update_bio_auto"
        White "116. UpTime"
        White "117. uppercase"
        White "118. UserInfo"
        White "119. UserLimit"
        White "120. UserList"
        White "121. UserList2"
        White "122. VoiceMove"
        White "123. VoiceMute"
        White "124. Webhook"
        White "125. Zoom"
        Magenta "B. Back to main menu"
        Cyan

        $choicesInput = Read "Enter your choices, separated by commas or spaces (e.g., 1,3)"

        $rawSelections = $choicesInput -split '[, ]+' | 
                        Where-Object { $_ -ne "" } | 
                        ForEach-Object { $_.ToUpperInvariant() }

        $selectedOptions = $rawSelections | Select-Object -Unique

        if ($rawSelections.Count -gt $selectedOptions.Count) {
            Cyan
            DarkGray "Note: Duplicate options were found and removed from your selection."
            Start-Sleep -Seconds 1 
        }

        if ($selectedOptions.Count -eq 0) {
            Cyan
            Yellow "No options selected. Please try again."
            Start-Sleep -Seconds 1
            continue
        }

        $backToMainMenu = $false
        $invalidOptionsFound = @()
        Cyan

        if (-not (Test-Path $modPath)) {
            Mpath
        }

        foreach ($option in $selectedOptions) {
            switch ($option) {
                "1" {
                    Request "AAA_BetterMods"
                }
                "2" {
                    Request "BetterMods"
                }
                "3" {
                    Request "BetterModsV2"
                }
                "4" {
                    Request "APIMod"
                }
                "5" {
                    Request "AskChatGPT"
                }
                "6" {
                    Request "AuthorOnlyChannel"
                }
                "7" {
                    Request "AuthorOnlyVoiceChannel"
                }
                "8" {
                    Request "AwaitUserMessage"
                }
                "9" {
                    Request "BanAllMember"
                }
                "10" {
                    Request "BetterPing"
                }
                "11" {
                    Request "BotInfo"
                }
                "12" {
                    Request "BotSize"
                }
                "13" {
                    Request "BotSizeUpdate"
                }
                "14" {
                    Request "BotSystemInfo"
                }
                "15" {
                    Request "BotType"
                }
                "16" {
                    Request "CallEvent"
                }
                "17" {
                    Request "CaptonHook"
                }
                "18" {
                    Request "CategoryCreate"
                }
                "19" {
                    Request "ChangeServerIcon"
                }
                "20" {
                    Request "ChangeServerName"
                }
                "21" {
                    Request "ChannelProperties"
                }
                "22" {
                    Request "CheckChannelID"
                }
                "23" {
                    Request "CheckChannelName"
                }
                "24" {
                    Request "CheckCategoryID"
                }
                "25" {
                    Request "CheckIfRoleIsOnServer"
                }
                "26" {
                    Request "CheckRoleID"
                }
                "27" {
                    Request "CodeBlock"
                }
                "28" {
                    Request "Command"
                }
                "29" {
                    Request "CommandCooldown"
                }
                "30" {
                    Request "CommandDelete"
                }
                "31" {
                    Request "CommandMessageDelete"
                }
                "32" {
                    Request "ConsoleLog"
                }
                "33" {
                    Request "CopyChannel"
                }
                "34" {
                    Request "CreatedAt"
                }
                "35" {
                    Request "CreateCategory"
                }
                "36" {
                    Request "CreateFineTunedModel"
                }
                "37" {
                    Request "CreateGuildInvite"
                }
                "38" {
                    Request "Database"
                }
                "39" {
                    Request "DelAllChannels"
                }
                "40" {
                    Request "DelAllRoles"
                }
                "41" {
                    Request "DeleteMessageByID"
                }
                "42" {
                    Request "DeleteRoleFromServer"
                }
                "43" {
                    Request "EditChannelName"
                }
                "44" {
                    Request "EditChannelPermissions"
                }
                "45" {
                    Request "EditedAuthorOnlyChannel"
                }
                "46" {
                    Request "EditEmbed"
                }
                "47" {
                    Request "EditMsg"
                }
                "48" {
                    Request "EmbedPoll"
                }
                "49" {
                    Request "EmbedReply"
                }
                "50" {
                    Request "Emoji"
                }
                "51" {
                    Request "Eval"
                }
                "52" {
                    Request "FileSystem"
                }
                "53" {
                    Request "ForceBan"
                }
                "54" {
                    Request "forEach"
                }
                "55" {
                    Request "GetInviteCount"
                }
                "56" {
                    Request "GetMentionedChannel"
                }
                "57" {
                    Request "GetMentionedRole"
                }
                "58" {
                    Request "GetServerAmount"
                }
                "59" {
                    Request "GetServerInfo"
                }
                "60" {
                    Request "GrabCountOfMessages"
                }
                "61" {
                    Request "Guilds"
                }
                "62" {
                    Request "IfNSFW"
                }
                "63" {
                    Request "ifargumentsarenone"
                }
                "64" {
                    Request "IfStatement"
                }
                "65" {
                    Request "InvLink"
                }
                "66" {
                    Request "JumpToNode"
                }
                "67" {
                    Request "KickAllMember"
                }
                "68" {
                    Request "LastMessageReaction"
                }
                "69" {
                    Request "Leaderboard"
                }
                "70" {
                    Request "LeaveServer"
                }
                "71" {
                    Request "LevelCard"
                }
                "72" {
                    Request "LinkChecker"
                }
                "73" {
                    Request "Lockdown"
                }
                "74" {
                    Request "LockOneChannel"
                }
                "75" {
                    Request "lowercase"
                }
                "76" {
                    Request "MemeVariable"
                }
                "77" {
                    Request "MessageReply"
                }
                "78" {
                    Request "MoreStatus"
                }
                "79" {
                    Request "Nickname"
                }
                "80" {
                    Request "Notes"
                }
                "81" {
                    Request "OFF"
                }
                "82" {
                    Request "OneMemberChannelPerms"
                }
                "83" {
                    Request "PinMod"
                }
                "84" {
                    Request "PingMessage"
                }
                "85" {
                    Request "Purge"
                }
                "86" {
                    Request "RandomGuildMember"
                }
                "87" {
                    Request "RandomLetters"
                }
                "88" {
                    Request "RandomUser"
                }
                "89" {
                    Request "RandomUserWithRole"
                }
                "90" {
                    Request "RemoveReactions"
                }
                "91" {
                    Request "RenameBot"
                }
                "92" {
                    Request "ReplyMessage"
                }
                "93" {
                    Request "sRoulette"
                }
                "94" {
                    Request "SaveMessage"
                }
                "95" {
                    Request "SendDM"
                }
                "96" {
                    Request "SendMsgToGuild"
                }
                "97" {
                    Request "ServerInfo"
                }
                "98" {
                    Request "SetChannelPos"
                }
                "99" {
                    Request "SetNSFW"
                }
                "100" {
                    Request "SetNickname"
                }
                "101" {
                    Request "slowmode"
                }
                "102" {
                    Request "StartWithCMD"
                }
                "103" {
                    Request "StopAction"
                }
                "104" {
                    Request "Threads"
                }
                "105" {
                    Request "TicketMod"
                }
                "106" {
                    Request "Timeout"
                }
                "107" {
                    Request "Tofixed"
                }
                "108" {
                    Request "Transcript"
                }
                "109" {
                    Request "TTSMessage"
                }
                "110" {
                    Request "TwitchLiveNotifier"
                }
                "111" {
                    Request "Unban"
                }
                "112" {
                    Request "UnlockOneChannel"
                }
                "113" {
                    Request "Unpinall"
                }
                "114" {
                    Request "UpdateBio"
                }
                "115" {
                    Request "update_bio_auto"
                }
                "116" {
                    Request "UpTime"
                }
                "117" {
                    Request "uppercase"
                }
                "118" {
                    Request "UserInfo"
                }
                "119" {
                    Request "UserLimit"
                }
                "120" {
                    Request "UserList"
                }
                "121" {
                    Request "UserList2"
                }
                "122" {
                    Request "VoiceMove"
                }
                "123" {
                    Request "VoiceMute"
                }
                "124" {
                    Request "Webhook"
                }
                "125" {
                    Request "Zoom"
                }
                "B" {
                    Red "Returning to Main Menu..." 
                    Cyan
                    $backToMainMenu = $true
                    Start-Sleep -Seconds 3
                    Show-Menu
                    break
                }
                default {
                    $invalidOptionsFound += $option 
                }
            }
        }

        if (!$dorequest) {
            Green "Completed."
            Cyan
        }

        if ($invalidOptionsFound.Count -gt 0) {
            DarkYellow "Ignored invalid option(s): $($invalidOptionsFound -join ', ')."
            Cyan
            Start-Sleep -Seconds 1
        }

        if (-not $backToMainMenu) { 
            if ($selectedOptions.Count -gt 0 -and $option -ne "B") {
                Read "Press Enter to continue..."
                Start-Sleep -Seconds 1
            }
        }

    } while (-not $backToMainMenu)
}

function Show-Menu {
    Clear-Host
    Cyan
    Cyan "What would you like to do?"
    Cyan
    Cyan "[1] Get: all mods"
    Cyan "[2] Get: bettermods only"
    Cyan "[3] Get: all mods but without bettermods"
    Cyan "[4] Get: package.json"
    Cyan "[5] Install: modules (if package.json exists)"
    Cyan "[6] Get: all mods [zip]"
    Cyan "[7] Get: bettermods only [zip]"
    Cyan "[8] Get: only specific mods"
    Magenta "[0] Leave"
    Cyan
    $choice = Read "Enter your choice"
    return $choice
}

while ($true) {
    $choice = Show-Menu

    if ($choice -eq "0") {
        exit
    }

    if ([string]::IsNullOrWhiteSpace($choice)) {
        Cyan
        Red "Invalid choice."
        Cyan
        Pause
        break
    }

    switch ($choice) {
        "1" {
            Cyan
            if (-not (Test-Path $modPath)) {
                Mpath
            }

            Yellow "Processing..."
            $files = @("AAA_BetterMods", "BetterMods", "BetterModsV2", "APIMod", "AskChatGPT", "AuthorOnlyChannel", "AuthorOnlyVoiceChannel", "AwaitUserMessage", "BanAllMember", "BetterPing", "BotInfo", "BotSize", "BotSizeUpdate", "BotSystemInfo", "BotType", "CallEvent", "CaptonHook", "CategoryCreate", "ChangeServerIcon", "ChangeServerName", "ChannelProperties", "CheckCategoryID", "CheckChannelID", "CheckChannelName", "CheckIfRoleIsOnServer", "CheckRoleID", "CodeBlock", "Command", "CommandCooldown", "CommandDelete", "CommandMessageDelete", "ConsoleLog", "CopyChannel", "CreateCategory", "CreateFineTunedModel", "CreateGuildInvite", "CreatedAt", "Database", "DelAllChannels", "DelAllRoles", "DeleteMessageByID", "DeleteRoleFromServer", "EditChannelName", "EditChannelPermissions", "EditEmbed", "EditMsg", "EditedAuthorOnlyChannel", "EmbedPoll", "EmbedReply", "Emoji", "Eval", "FileSystem", "ForceBan", "GetInviteCount", "GetMentionedChannel", "GetMentionedRole", "GetServerAmount", "GetServerInfo", "GrabCountOfMessages", "Guilds", "IfNSFW", "IfStatement", "InvLink", "JumpToNode", "KickAllMember", "LastMessageReaction", "Leaderboard", "LeaveServer", "LevelCard", "LinkChecker", "LockOneChannel", "Lockdown", "MemeVariable", "MessageReply", "MoreStatus", "Nickname", "Notes", "OFF", "OneMemberChannelPerms", "PinMod", "PingMessage", "Purge", "RandomGuildMember", "RandomLetters", "RandomUser", "RandomUserWithRole", "RemoveReactions", "RenameBot", "ReplyMessage", "SaveMessage", "SendDM", "SendMsgToGuild", "ServerInfo", "SetChannelPos", "SetNSFW", "SetNickname", "StartWithCMD", "StopAction", "TTSMessage", "Threads", "TicketMod", "Timeout", "Tofixed", "Transcript", "TwitchLiveNotifier", "Unban", "UnlockOneChannel", "Unpinall", "UpTime", "UpdateBio", "UserInfo", "UserLimit", "UserList", "UserList2", "VoiceMove", "VoiceMute", "Webhook", "Zoom", "forEach", "ifargumentsarenone", "lowercase", "sRoulette", "slowmode", "update_bio_auto", "uppercase")
            foreach ($file in $files) {
                Request "$file"
            }

            if (!$dorequest) {
                Green "Completed."
            }
            Cyan
        }
        "2" {
            Cyan
            if (-not (Test-Path $modPath)) {
                Mpath
            }

            Yellow "Processing..."
            $files = @("AAA_BetterMods", "BetterMods", "BetterModsV2")
            foreach ($file in $files) {
                Request "$file"
            }

            if (!$dorequest) {
                Green "Completed."
            }
            Cyan
        }
        "3" {
            Cyan
            if (-not (Test-Path $modPath)) {
                Mpath
            }

            Yellow "Processing..."
            $files = @("APIMod", "AskChatGPT", "AuthorOnlyChannel", "AuthorOnlyVoiceChannel", "AwaitUserMessage", "BanAllMember", "BetterPing", "BotInfo", "BotSize", "BotSizeUpdate", "BotSystemInfo", "BotType", "CallEvent", "CaptonHook", "CategoryCreate", "ChangeServerIcon", "ChangeServerName", "ChannelProperties", "CheckCategoryID", "CheckChannelID", "CheckChannelName", "CheckIfRoleIsOnServer", "CheckRoleID", "CodeBlock", "Command", "CommandCooldown", "CommandDelete", "CommandMessageDelete", "ConsoleLog", "CopyChannel", "CreateCategory", "CreateFineTunedModel", "CreateGuildInvite", "CreatedAt", "Database", "DelAllChannels", "DelAllRoles", "DeleteMessageByID", "DeleteRoleFromServer", "EditChannelName", "EditChannelPermissions", "EditEmbed", "EditMsg", "EditedAuthorOnlyChannel", "EmbedPoll", "EmbedReply", "Emoji", "Eval", "FileSystem", "ForceBan", "GetInviteCount", "GetMentionedChannel", "GetMentionedRole", "GetServerAmount", "GetServerInfo", "GrabCountOfMessages", "Guilds", "IfNSFW", "IfStatement", "InvLink", "JumpToNode", "KickAllMember", "LastMessageReaction", "Leaderboard", "LeaveServer", "LevelCard", "LinkChecker", "LockOneChannel", "Lockdown", "MemeVariable", "MessageReply", "MoreStatus", "Nickname", "Notes", "OFF", "OneMemberChannelPerms", "PinMod", "PingMessage", "Purge", "RandomGuildMember", "RandomLetters", "RandomUser", "RandomUserWithRole", "RemoveReactions", "RenameBot", "ReplyMessage", "SaveMessage", "SendDM", "SendMsgToGuild", "ServerInfo", "SetChannelPos", "SetNSFW", "SetNickname", "StartWithCMD", "StopAction", "TTSMessage", "Threads", "TicketMod", "Timeout", "Tofixed", "Transcript", "TwitchLiveNotifier", "Unban", "UnlockOneChannel", "Unpinall", "UpTime", "UpdateBio", "UserInfo", "UserLimit", "UserList", "UserList2", "VoiceMove", "VoiceMute", "Webhook", "Zoom", "forEach", "ifargumentsarenone", "lowercase", "sRoulette", "slowmode", "update_bio_auto", "uppercase")
            foreach ($file in $files) {
                Request "$file"
            }

            if (!$dorequest) {
                Green "Completed." 
            }
            Cyan
        }
        "4" {
            Cyan

            Yellow "Processing..."
            $geterr = $false
            $url = "$l0/updater/package.json"
            $outputPath = Join-Path $mainpath "package.json"

            try {
                Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
            } catch {
                Error "Failed to download package.json: $($_.Exception.Message)"
                $geterr = $true
            }
            
            if (!$geterr) {
                Green "Completed." 
            }
            Cyan
        }
        "5" {
            Cyan
            $packageJsonPath = Join-Path $mainpath "package.json"
            if (-not (Test-Path $packageJsonPath)) {
                Red "package.json not found, download it from option 4."
                Cyan
                break
            }

            $clearnmod = Join-Path $mainpath "node_modules"
            $locker = Join-Path $mainpath "package-lock.json"
            if (Test-Path $clearnmod) {
                Yellow "Clearing previous node_modules..."
                try {
                    Remove-Item -Path $clearnmod -Recurse -Force -ErrorAction Stop
                    Remove-Item -Path $locker -Force -ErrorAction Stop
                    Green "Successfully cleared node_modules."
                } catch {
                    Error "Failed to clear: $($_.Exception.Message)"
                }
                Cyan
            }

            Yellow "Processing..."
            $geterr = $false
            Push-Location $mainpath
            Get-Location

            try {
                npm install
            } catch {
                Error "NPM error': $($_.Exception.Message)"
                $geterr = $true
            } finally {
                Pop-Location
            }

            Cyan
            $anomalyFilePath = Join-Path $mainpath "node_modules\.package-lock.json"
                if (Test-Path $anomalyFilePath -PathType Leaf) {
                    Yellow "Detected an unusual '.package-lock.json' inside node_modules. Deleting..."
                    try {
                        Remove-Item -Path $anomalyFilePath -Force -ErrorAction Stop
                        Green "Successfully deleted '$anomalyFilePath'."
                    } catch {
                        Error "Failed to delete '$anomalyFilePath': $($_.Exception.Message)"
                    }
                    Cyan
                }
            
            if (!$geterr) {
                Green "Action completed."
            }
            Cyan
        }
        "6" {
            Cyan
            if (-not (Test-Path $modPath)) {
                Mpath
            }

            Yellow "Processing..."
            $geterr = $false
            $file = "mods"
            $url = "$rl/mods/mods.zip"
            $outputPath = Join-Path $modPath "$file.zip"

            try {
                Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
            } catch {
                Error "Failed to download $file.zip: $($_.Exception.Message)"
                $geterr = $true
            }

            if (!$geterr) {
                Green "Completed." 
            }
            Cyan
        }
        "7" {
            Cyan
            if (-not (Test-Path $modPath)) {
                Mpath
            }

            Yellow "Processing..."
            $geterr = $false
            $file = "bettermods_only"
            $url = "$rl/bettermods/$file.zip"
            $outputPath = Join-Path $modPath "$file.zip"

            try {
                Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
            } catch {
                Error "Failed to download $file.zip: $($_.Exception.Message)"
                $geterr = $true
            }
            
            if (!$geterr) {
                Green "Completed." 
            }
            Cyan
        }
        "8" {
            Show-SubMenuTasks
        }
        default {
            Cyan
            Red "Invalid choice."
            Cyan
        }
    }
    Pause
}
Pause