Param(
  [Parameter(Mandatory=$true)]
  [string]$FeedPath,
  [Parameter(Mandatory=$false)]
  [string]$OutPath
)

function Get-CDataOrText {
  Param([Parameter(Mandatory=$false)][object]$Node)
  if ($null -eq $Node) { return $null }
  if ($Node.PSObject.Properties.Name -contains '#cdata-section') {
    $cdata = $Node.'#cdata-section'
    if ($cdata -is [System.Array]) { return ($cdata -join "\n") }
    return [string]$cdata
  }
  return [string]$Node
}

$xml = [xml](Get-Content $FeedPath -Raw)
$item = $xml.rss.channel.item[0]

$title = Get-CDataOrText $item.title
$link = Get-CDataOrText $item.link
$pub = Get-CDataOrText $item.pubDate
$desc = Get-CDataOrText $item.description
$content = Get-CDataOrText $item.'content:encoded'

Write-Output ("TITLE: " + $title)
Write-Output ("LINK: " + $link)
Write-Output ("DATE: " + $pub)
Write-Output "DESCRIPTION:"
if ($desc) { Write-Output $desc }
Write-Output "CONTENT:"
if ($content) { Write-Output $content }

if ($OutPath) {
  Add-Type -AssemblyName System.Web
  $decode = [System.Web.HttpUtility]::HtmlDecode
  $plainDesc = $decode.Invoke($desc)
  $plainContent = $decode.Invoke(($content -replace "<[^>]+>", ""))
  $summary = if ($plainDesc) { $plainDesc } elseif ($plainContent) { $plainContent } else { '' }
  if ($summary.Length -gt 600) { $summary = $summary.Substring(0,600) + '…' }
  $nl = [Environment]::NewLine
  $md = "# $title$nl$pub$nl$link$nl$nl$summary"
  Set-Content -Path $OutPath -Value $md -Encoding UTF8
}


