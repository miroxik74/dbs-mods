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

$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$gcache = "$h/$mod/refs/heads/main/updater/downloader.ps1?t=$timestamp"
try {
    $webResponse = Invoke-WebRequest -Uri $gcache -UseBasicParsing -ErrorAction Stop
} catch {
    Write-Error "$($_.Exception.Message)"
}

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

function WW {
    param (
        [Parameter(Mandatory=$true)]
        [string[]]$Messages
    )

    foreach ($message in $Messages) {
        if ($message) {
            White $message
        } else {
            White " "
        }
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

function Sleep ($timer) {
    Start-Sleep -Seconds $timer
}

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
Sleep 1
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

function Show-Available {
    $list = @("1. AAA_BetterMods", "2. APIMod", "3. AskChatGPT", "4. AuthorOnlyChannel", "5. AuthorOnlyVoiceChannel", "6. AwaitUserMessage", "7. BanAllMember", "8. BetterMods", "9. BetterModsV2", "10. BetterPing", "11. BotInfo", "12. BotSize", "13. BotSizeUpdate", "14. BotSystemInfo", "15. BotType", "16. CallEvent", "17. CaptonHook", "18. CategoryCreate", "19. ChangeServerIcon", "20. ChangeServerName", "21. ChannelProperties", "22. CheckChannelID", "23. CheckChannelName", "24. CheckCategoryID", "25. CheckIfRoleIsOnServer", "26. CheckRoleID", "27. CodeBlock", "28. Command", "29. CommandCooldown", "30. CommandDelete", "31. CommandMessageDelete", "32. ConsoleLog", "33. CopyChannel", "34. CreatedAt", "35. CreateCategory", "36. CreateFineTunedModel", "37. CreateGuildInvite", "38. Database", "39. DelAllChannels", "40. DelAllRoles", "41. DeleteMessageByID", "42. DeleteRoleFromServer", "43. EditChannelName", "44. EditChannelPermissions", "45. EditedAuthorOnlyChannel", "46. EditEmbed", "47. EditMsg", "48. EmbedPoll", "49. EmbedReply", "50. Emoji", "51. Eval", "52. FileSystem", "53. ForceBan", "54. forEach", "55. GetInviteCount", "56. GetMentionedChannel", "57. GetMentionedRole", "58. GetServerAmount", "59. GetServerInfo", "60. GrabCountOfMessages", "61. Guilds", "62. IfNSFW", "63. ifargumentsarenone", "64. IfStatement", "65. InvLink", "66. JumpToNode", "67. KickAllMember", "68. LastMessageReaction", "69. Leaderboard", "70. LeaveServer", "71. LevelCard", "72. LinkChecker", "73. Lockdown", "74. LockOneChannel", "75. lowercase", "76. MemeVariable", "77. MessageReply", "78. MoreStatus", "79. Nickname", "80. Notes", "81. OFF", "82. OneMemberChannelPerms", "83. PinMod", "84. PingMessage", "85. Purge", "86. RandomGuildMember", "87. RandomLetters", "88. RandomUser", "89. RandomUserWithRole", "90. RemoveReactions", "91. RenameBot", "92. ReplyMessage", "93. sRoulette", "94. SaveMessage", "95. SendDM", "96. SendMsgToGuild", "97. ServerInfo", "98. SetChannelPos", "99. SetNSFW", "100. SetNickname", "101. slowmode", "102. StartWithCMD", "103. StopAction", "104. Threads", "105. TicketMod", "106. Timeout", "107. Tofixed", "108. Transcript", "109. TTSMessage", "110. TwitchLiveNotifier", "111. Unban", "112. UnlockOneChannel", "113. Unpinall", "114. UpdateBio", "115. update_bio_auto", "116. UpTime", "117. uppercase", "118. UserInfo", "119. UserLimit", "120. UserList", "121. UserList2", "122. VoiceMove", "123. VoiceMute", "124. Webhook", "125. Zoom")
    foreach ($data in $list) {
        WW "$data"
    }
}

function Show-SubMenuTasks {
    do {
        Clear-Host
        Cyan
        Green "--- Separated mods ---"
        Cyan
        Show-Available
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
            Sleep 1
        }

        if ($selectedOptions.Count -eq 0) {
            Cyan
            Yellow "No options selected. Please try again."
            Sleep 1
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
                    Sleep 3
                    Show-Menu
                    break
                }
                default {
                    $invalidOptionsFound += $option 
                }
            }
        }

        if ($invalidOptionsFound.Count -gt 0) {
            DarkGray "Ignored invalid option(s): $($invalidOptionsFound -join ', ')."
            Cyan
            Sleep 1
        }

        if (!$dorequest) {
            Green "Completed."
            Cyan
        }

        if (-not $backToMainMenu) { 
            if ($selectedOptions.Count -gt 0 -and $option -ne "B") {
                Read "Press Enter to continue..."
                Sleep 1
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