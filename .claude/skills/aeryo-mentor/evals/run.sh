#!/bin/zsh
# usage: run.sh <repo> <outdir> <prompt1> [prompt2]
REPO=$1; OUT=$2; P1=$3; P2=$4
mkdir -p $OUT/outputs; cd $REPO
T0=$(date +%s)
ARGS=(--model claude-opus-5-5 --output-format json --allowedTools Read Glob Grep Skill "Bash(ls:*)" "Bash(cat:*)" "Bash(grep:*)" "Bash(head:*)" "Bash(sed:*)" --disallowedTools Edit Write NotebookEdit $EXTRA_DENY)
claude -p "$P1" $ARGS > $OUT/turn1.json 2>$OUT/turn1.err
SID=$(python3 -c "import json;print(json.load(open('$OUT/turn1.json'))['session_id'])")
python3 -c "import json;print(json.load(open('$OUT/turn1.json'))['result'])" > $OUT/outputs/response.md
if [ -n "$P2" ]; then
  claude -p "$P2" --resume $SID $ARGS > $OUT/turn2.json 2>$OUT/turn2.err
  { echo "# Turn 1\n"; cat $OUT/outputs/response.md; echo "\n\n---\n# Turn 2 (user: $P2)\n"; python3 -c "import json;print(json.load(open('$OUT/turn2.json'))['result'])"; } > $OUT/outputs/r.md && mv $OUT/outputs/r.md $OUT/outputs/response.md
fi
python3 - $OUT $T0 <<'PY'
import json,sys,glob,time
out,t0=sys.argv[1],int(sys.argv[2]); tok=0
for f in glob.glob(out+'/turn*.json'):
    u=json.load(open(f)).get('usage',{}); tok+=sum(u.get(k,0) for k in ('input_tokens','output_tokens','cache_creation_input_tokens','cache_read_input_tokens'))
d=time.time()-t0
json.dump({"total_tokens":tok,"duration_ms":int(d*1000),"total_duration_seconds":round(d,1)},open(out+'/timing.json','w'))
PY
echo done $OUT
