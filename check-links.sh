#!/usr/bin/env bash
# check-links.sh — validate 2025-26 CS Academy student showcase links

ORG="sbhs-computer-science-academy"
GHPAGES="https://sbhs-computer-science-academy.github.io"
DS_BASE="$GHPAGES/Data-Science-25-26-projects-for-showcase"
CA_BASE="$GHPAGES/Comp-Art-25-26-projects-for-showcase"

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
RESULTS="$WORK/results"
touch "$RESULTS"

# ── Fetch & parse ─────────────────────────────────────────

fetch_js() {
    local out
    out=$(gh api "repos/$ORG/$1/contents/script.js" --jq '.content' 2>/dev/null) || return 1
    echo "$out" | base64 -d
}

# Plain string names from a names array (no URL — Comp-Art style)
parse_plain_names() {
    perl -ne 'while (/^\s*"([^"]+)",?\s*$/) { print "$1\n" }' <<< "$1"
}

# [name, https-url] pairs → tab-separated lines
parse_pairs() {
    perl -ne 'while (/\["([^"]+)",\s*"(https?:\/\/[^"]+)"\]/g){print "$1\t$2\n"}' <<< "$1"
}

# [name, *.pdf] pairs → tab-separated lines
parse_pdfs() {
    perl -ne 'while (/\["([^"]+)",\s*"([^"]+\.pdf)"\]/g){print "$1\t$2\n"}' <<< "$1"
}

# [name, url, url] triples → tab-separated lines
parse_triples() {
    perl -ne 'while (/\["([^"]+)",\s*"(https?:\/\/[^"]+)",\s*"(https?:\/\/[^"]+)"\]/g){print "$1\t$2\t$3\n"}' <<< "$1"
}

# ── Check functions ───────────────────────────────────────

# Writes display line to $3, "pass"/"fail" to $4 (for parallel use)
check_codehs() {
    local name="$1" url="$2" out_f="$3" sts_f="$4"
    local body final title
    body=$(mktemp "$WORK/b_XXXXX")
    final=$(curl -sL --max-time 15 -o "$body" -w "%{url_effective}" \
        -H "User-Agent: Mozilla/5.0" "$url" 2>/dev/null)

    if [[ "$final" == *".codehs.me"* ]]; then
        printf "[PASS]  %s\n" "$name" > "$out_f"
        echo pass > "$sts_f"
    else
        title=$(grep -o '<title>[^<]*</title>' "$body" 2>/dev/null \
            | sed 's/<[^>]*>//g' | head -1 | tr -d '\r\n')
        if [[ "$title" == "CodeHS" || -z "$title" ]]; then
            printf "[FAIL]  %-30s  %s\n" "$name" "$url" > "$out_f"
            echo fail > "$sts_f"
        else
            printf "[PASS]  %s\n" "$name" > "$out_f"
            echo pass > "$sts_f"
        fi
    fi
    rm -f "$body"
}

check_pdf() {
    local name="$1" file="$2"
    local enc url code
    enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" \
        "$file" 2>/dev/null || printf '%s' "$file" | sed 's/ /%20/g')
    url="${DS_BASE}/${enc}"
    code=$(curl -sI --max-time 10 -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    if [[ "$code" == "200" ]]; then
        printf "[PASS]  %s  (PDF)\n" "$name"
        echo pass >> "$RESULTS"
    else
        printf "[FAIL]  %-30s  HTTP %s\n" "$name" "$code"
        echo fail >> "$RESULTS"
    fi
}

check_render() {
    local name="$1" url="$2"
    local t0 code elapsed
    t0=$(date +%s)
    code=$(curl -sL --max-time 60 -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    elapsed=$(( $(date +%s) - t0 ))
    if [[ "$code" == "200" ]]; then
        if (( elapsed > 20 )); then
            printf "[SLOW]  %-30s  %ds — warm up before showcase\n" "$name (site)" "$elapsed"
            echo slow >> "$RESULTS"
        else
            printf "[PASS]  %-30s  %ds\n" "$name (site)" "$elapsed"
            echo pass >> "$RESULTS"
        fi
    else
        printf "[FAIL]  %-30s  HTTP %s\n" "$name (site)" "${code:-timeout}"
        echo fail >> "$RESULTS"
    fi
}

check_url() {
    local name="$1" url="$2"
    local code
    code=$(curl -sI --max-time 10 -o /dev/null -w "%{http_code}" -L "$url" 2>/dev/null)
    if [[ "$code" == "200" ]]; then
        printf "[PASS]  %s\n" "$name"
        echo pass >> "$RESULTS"
    else
        printf "[FAIL]  %-30s  HTTP %s\n" "$name" "$code"
        echo fail >> "$RESULTS"
    fi
}

check_github() {
    local name="$1" url="$2"
    local code
    code=$(curl -sI --max-time 10 -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    if [[ "$code" == "200" ]]; then
        printf "[PASS]  %s  (repo)\n" "$name"
        echo pass >> "$RESULTS"
    else
        printf "[FAIL]  %-30s  HTTP %s\n" "$name (repo)" "$code"
        echo fail >> "$RESULTS"
    fi
}

# ── Parallel CodeHS runner ────────────────────────────────

run_codehs() {
    local pairs="$1"
    local pids=() outs=() stss=()
    local i=0

    while IFS=$'\t' read -r name url; do
        [[ -n "$name" && -n "$url" ]] || continue
        outs+=("$WORK/o_$i"); stss+=("$WORK/s_$i")
        check_codehs "$name" "$url" "$WORK/o_$i" "$WORK/s_$i" &
        pids+=($!)
        i=$(( i + 1 ))
        if (( ${#pids[@]} >= 5 )); then
            wait "${pids[0]}" 2>/dev/null || true
            pids=("${pids[@]:1}")
        fi
    done <<< "$pairs"

    for p in "${pids[@]}"; do wait "$p" 2>/dev/null || true; done

    for j in "${!outs[@]}"; do
        cat "${outs[$j]}" 2>/dev/null || true
        cat "${stss[$j]}" >> "$RESULTS" 2>/dev/null || true
        rm -f "${outs[$j]}" "${stss[$j]}"
    done
}

# ── Duplicate detection ───────────────────────────────────

ALL_ENTRIES=()  # "name|url"
reg() { ALL_ENTRIES+=("$1|$2"); }

check_dupes() {
    printf "\n── Duplicate URLs ──────────────────────────────────────\n"
    local dupes
    dupes=$(printf '%s\n' "${ALL_ENTRIES[@]}" | cut -d'|' -f2 | sort | uniq -d)
    if [[ -z "$dupes" ]]; then
        printf "      None found.\n"
        return
    fi
    while IFS= read -r url; do
        printf "[WARN]  Duplicate: %s\n" "$url"
        printf '%s\n' "${ALL_ENTRIES[@]}" | grep -F "|${url}" | cut -d'|' -f1 \
            | while IFS= read -r n; do printf "        → %s\n" "$n"; done
        echo warn >> "$RESULTS"
    done <<< "$dupes"
}

# Mirrors Comp-Art script.js: name.replaceAll(" ","").replaceAll(",","")
name_to_slug() { echo "$1" | sed 's/ //g' | sed 's/,//g'; }

# ── MAIN ──────────────────────────────────────────────────

printf "\nCS Academy 2025–26 Showcase — Link Checker\n"
printf "============================================\n\n"

# ── Computational Art ─────────────────────────────────────
printf "── Computational Art ──────────────────────────────────────\n"
if CA=$(fetch_js "Comp-Art-25-26-projects-for-showcase"); then
    CA_NAMES=$(parse_plain_names "$CA")
    N=$(printf '%s\n' "$CA_NAMES" | grep -c '.' || echo 0)
    printf "(%d projects — hosted as subfolders)\n" "$N"

    IMAGES=$(gh api "repos/$ORG/Comp-Art-25-26-projects-for-showcase/contents/images" \
        --jq '.[].name' 2>/dev/null)

    while IFS= read -r name; do
        [[ -n "$name" ]] || continue
        slug=$(name_to_slug "$name")
        url="${CA_BASE}/${slug}/index.html"
        reg "$name" "$url"
        check_url "$name" "$url"

        img="${slug}.png"
        if echo "$IMAGES" | grep -qF "$img"; then
            printf "  [PASS]  screenshot: %s\n" "$img"
            echo pass >> "$RESULTS"
        else
            printf "  [WARN]  missing screenshot: %s\n" "$img"
            echo warn >> "$RESULTS"
        fi
    done <<< "$CA_NAMES"
else
    printf "  ERROR: Could not fetch Comp-Art data\n"
fi
printf "\n"

# ── Data Science ──────────────────────────────────────────
printf "── Data Science ──────────────────────────────────────────\n"
if DS=$(fetch_js "Data-Science-25-26-projects-for-showcase"); then
    DS_PAIRS=$(parse_pdfs "$DS")
    N=$(printf '%s\n' "$DS_PAIRS" | grep -c '.' || echo 0)
    printf "(%d projects)\n" "$N"
    while IFS=$'\t' read -r name file; do
        [[ -n "$name" && -n "$file" ]] || continue
        reg "$name" "${DS_BASE}/${file}"
        check_pdf "$name" "$file"
    done <<< "$DS_PAIRS"
else
    printf "  ERROR: Could not fetch Data Science data\n"
fi
printf "\n"

# ── ECS ───────────────────────────────────────────────────
printf "── Exploring Computer Science ────────────────────────────\n"
if ECS=$(fetch_js "ECS-25-26-projects-for-showcase"); then
    ECS_PAIRS=$(parse_pairs "$ECS")
    N=$(printf '%s\n' "$ECS_PAIRS" | grep -c '.' || echo 0)
    printf "(%d projects)\n" "$N"
    while IFS=$'\t' read -r name url; do
        [[ -n "$name" && -n "$url" ]] || continue
        reg "$name" "$url"
    done <<< "$ECS_PAIRS"
    run_codehs "$ECS_PAIRS"
else
    printf "  ERROR: Could not fetch ECS data\n"
fi
printf "\n"

# ── DSW ───────────────────────────────────────────────────
printf "── Designing Software for the Web ────────────────────────\n"
if DSW=$(fetch_js "DSW-25-26-projects-for-showcase"); then
    DSW_TRIPS=$(parse_triples "$DSW")
    N=$(printf '%s\n' "$DSW_TRIPS" | grep -c '.' || echo 0)
    printf "(%d projects — checking site + repo)\n" "$N"
    while IFS=$'\t' read -r name render_url github_url; do
        [[ -n "$name" && -n "$render_url" ]] || continue
        reg "$name (site)" "$render_url"
        reg "$name (repo)" "$github_url"
        check_render "$name" "$render_url"
        check_github "$name" "$github_url"
    done <<< "$DSW_TRIPS"
else
    printf "  ERROR: Could not fetch DSW data\n"
fi

check_dupes

printf "\n── Summary ───────────────────────────────────────────────\n"
PASS_N=$(grep -c '^pass$' "$RESULTS" 2>/dev/null || echo 0)
FAIL_N=$(grep -c '^fail$' "$RESULTS" 2>/dev/null || echo 0)
WARN_N=$(grep -c '^warn$' "$RESULTS" 2>/dev/null || echo 0)
SLOW_N=$(grep -c '^slow$' "$RESULTS" 2>/dev/null || echo 0)
TOTAL=$(( PASS_N + FAIL_N + WARN_N + SLOW_N ))
printf "%d checks  |  [PASS] %d  [FAIL] %d  [WARN] %d  [SLOW] %d\n\n" \
    "$TOTAL" "$PASS_N" "$FAIL_N" "$WARN_N" "$SLOW_N"
