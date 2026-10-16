#!/usr/bin/env bash
# Runs every migration + the SQL test suites against a THROWAWAY local Postgres cluster (never touches Supabase).
# Usage: npm run test:db        (needs PostgreSQL server binaries: initdb, pg_ctl, psql)
set -euo pipefail
cd "$(dirname "$0")/../.."
BIN="$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1 || true)"
[ -n "${BIN:-}" ] && export PATH="$BIN:$PATH"
command -v initdb >/dev/null || { echo "initdb not found: install postgresql server binaries"; exit 2; }
TMP="$(mktemp -d)"; PORT="${PGTEST_PORT:-54329}"; SOCK="$TMP/sock"; mkdir -p "$SOCK"
cleanup() { pg_ctl -D "$TMP/data" -m immediate stop >/dev/null 2>&1 || true; rm -rf "$TMP"; }
trap cleanup EXIT
initdb -D "$TMP/data" -U postgres --auth=trust >/dev/null
pg_ctl -D "$TMP/data" -o "-p $PORT -k $SOCK -c listen_addresses=''" -l "$TMP/pg.log" -w start >/dev/null
P=(psql -h "$SOCK" -p "$PORT" -U postgres -v ON_ERROR_STOP=1 -q)
"${P[@]}" -c "create database lms_test" >/dev/null
P+=(-d lms_test)
"${P[@]}" -f supabase/tests/auth_shim.sql
for f in supabase/migrations/*.sql; do echo "migrate: $f"; "${P[@]}" -f "$f"; done
for f in supabase/tests/*_tests.sql; do echo "run: $f"; "${P[@]}" -f "$f" 2>&1 | grep -E "NOTICE|ERROR|FAILED|PASSED" || true; "${P[@]}" -f "$f" >/dev/null; done
echo "DB TESTS OK"
