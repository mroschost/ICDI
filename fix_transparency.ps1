
$sourceBase = "f:\ICDI\public\arquivos"
$targetBase = "f:\ICDI\public\content"

function Get-CleanName($name) {
    $clean = $name.ToLower()
    $clean = $clean.Replace('á','a').Replace('à','a').Replace('â','a').Replace('ã','a')
    $clean = $clean.Replace('é','e').Replace('è','e').Replace('ê','e')
    $clean = $clean.Replace('í','i').Replace('ì','i').Replace('î','i')
    $clean = $clean.Replace('ó','o').Replace('ò','o').Replace('ô','o').Replace('õ','o')
    $clean = $clean.Replace('ú','u').Replace('ù','u').Replace('û','u')
    $clean = $clean.Replace('ç','c')
    $clean = $clean -replace '[^a-z0-9\.]', '-'
    $clean = $clean -replace '-+', '-'
    $clean = $clean -replace '^-|-$', ''
    return $clean
}

$projects = @(
    @{ match="ANIMA"; slug="anima-escola" },
    @{ match="ARRAI"; slug="arraia-das-cidades" },
    @{ match="CANDANG"; slug="candangao-de-quadrilha-junina" },
    @{ match="ESTRUTURAL"; slug="estrutural-20-de-cultura" },
    @{ match="FEIR"; slug="feirao-do-trabalhador" },
    @{ match="FESTIVAL"; slug="festival-da-crianca" },
    @{ match="MUSICA"; slug="musica-teatro-e-cidadania" },
    @{ match="TEATRO VAI A ESCOLA$"; slug="teatro-vai-a-escola" },
    @{ match="TEATRO VAI A ESCOLA 2"; slug="teatro-vai-a-escola-2-edicao" },
    @{ match="VARJ"; slug="varjao-21-de-cultura" }
)

# Find transparency folder by partial match
$transDir = Get-ChildItem -Path $sourceBase -Directory | Where-Object { $_.Name -like "*TRANSP*" }
if ($transDir) {
    $targetTransBase = Join-Path $targetBase "transparency"
    if (-not (Test-Path $targetTransBase)) { New-Item -ItemType Directory -Path $targetTransBase }
    
    Get-ChildItem -Path $transDir.FullName -Directory | ForEach-Object {
        $dir = $_
        foreach ($p in $projects) {
            if ($dir.Name -match $p.match) {
                $slug = $p.slug
                $destPath = Join-Path $targetTransBase $slug
                if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath }
                
                Get-ChildItem -Path $dir.FullName -File | ForEach-Object {
                    $cleanName = Get-CleanName $_.Name
                    $destFile = Join-Path $destPath $cleanName
                    Copy-Item -Path $_.FullName -Destination $destFile -Force
                }
                break
            }
        }
    }
}
