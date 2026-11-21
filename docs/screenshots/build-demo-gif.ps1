$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

# Exports zoomed crops of the workspace capture. These are the frames used for
# the social posts: a wide board shot, a chat close-up, a code close-up and a
# shot of the research window with the radar minimap.

$src = 'D:\Projects\freeworkSpace\docs\screenshots\workspace.png'
$dir = 'D:\Projects\freeworkSpace\docs\screenshots'

$img = [System.Drawing.Image]::FromFile($src)

$crops = @(
  @{ name = 'demo-01-board.png';    r = @(0, 0, $img.Width, $img.Height) },
  @{ name = 'demo-02-chat.png';     r = @(600, 60, 700, 620) },
  @{ name = 'demo-03-code.png';     r = @(1120, 20, 680, 620) },
  @{ name = 'demo-04-radar.png';    r = @(1080, 300, 720, 600) }
)

foreach ($c in $crops) {
  $r = $c.r
  $w = $r[2]; $h = $r[3]
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), (New-Object System.Drawing.Rectangle($r[0], $r[1], $r[2], $r[3])), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $path = Join-Path $dir $c.name
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Output "wrote $c.name ($w x $h)"
}

$img.Dispose()
