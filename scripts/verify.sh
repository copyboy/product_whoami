#!/usr/bin/env bash
# scripts/verify.sh — L1+L2 机器防线聚合门（质量体系 WI1）
# 依次运行 type-check、lint、test:run，任一失败即整体非零退出。
# 注意：本脚本直接调用底层 npm 子命令，严禁递归调用自身（防 verify 套 verify）。
set -euo pipefail

FAILED=0

run_step() {
  local name="$1"
  shift
  echo ""
  echo "==> [verify] ${name}"
  if "$@"; then
    echo "<== [verify] ${name}: PASS"
  else
    local code="$?"
    echo "<== [verify] ${name}: FAIL (exit ${code})"
    FAILED=1
  fi
}

run_step "type-check" npm run type-check
run_step "lint" npm run lint
run_step "test:run" npm run test:run

echo ""
if [ "${FAILED}" -ne 0 ]; then
  echo "verify: FAIL（存在未通过的防线）"
  exit 1
fi
echo "verify: PASS（type-check / lint / test:run 全绿）"
