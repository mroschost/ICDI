
$sourceBase = "f:\ICDI\public\arquivos"
$targetBase = "f:\ICDI\public\content"

# Ensure target base exists
if (-not (Test-Path $targetBase)) { New-Item -ItemType Directory -Path $targetBase }

function Get-CleanName($name) {
    $clean = $name.ToLower()
    # Replace special chars with ascii equivalents
    $clean = $clean.Replace('á','a').Replace('à','a').Replace('â','a').Replace('ã','a')
    $clean = $clean.Replace('é','e').Replace('è','e').Replace('ê','e')
    $clean = $clean.Replace('í','i').Replace('ì','i').Replace('î','i')
    $clean = $clean.Replace('ó','o').Replace('ò','o').Replace('ô','o').Replace('õ','o')
    $clean = $clean.Replace('ú','u').Replace('ù','u').Replace('û','u')
    $clean = $clean.Replace('ç','c')
    # Replace everything else non-alphanumeric with dash
    $clean = $clean -replace '[^a-z0-9\.]', '-'
    $clean = $clean -replace '-+', '-'
    $clean = $clean -replace '^-|-$', ''
    return $clean
}

# Mapping based on common words in folder names
$projects = @(
    @{ match="ANIMA"; slug="anima-escola" },
    @{ match="ARRAI"; slug="arraia-das-cidades" },
    @{ match="CANDANG"; slug="candangao-de-quadrilha-junina" },
    @{ match="ESTRUTURAL"; slug="estrutural-20-de-cultura" },
    @{ match="FEIR"; slug="feirao-do-trabalhador" },
    @{ match="FESTIVAL"; slug="festival-da-crianca" },
    @{ match="MUSICA"; slug="musica-teatro-e-cidadania" },
    @{ match="TEATRO VAI A ESCOLA$"; slug="teatro-vai-a-escola" }, # Exact match for 1st ed
    @{ match="TEATRO VAI A ESCOLA 2"; slug="teatro-vai-a-escola-2-edicao" },
    @{ match="VARJ"; slug="varjao-21-de-cultura" }
)

# Process project folders
Get-ChildItem -Path $sourceBase -Directory | ForEach-Object {
    $dir = $_
    foreach ($p in $projects) {
        if ($dir.Name -match $p.match) {
            $slug = $p.slug
            $destPath = Join-Path $targetBase $slug
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

# Process Transparencies
$transBase = Join-Path $sourceBase "TRANSPARÊNCIAS"
$targetTransBase = Join-Path $targetBase "transparency"
if (-not (Test-Path $targetTransBase)) { New-Item -ItemType Directory -Path $targetTransBase }

if (Test-Path $transBase) {
    Get-ChildItem -Path $transBase -Directory | ForEach-Object {
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
