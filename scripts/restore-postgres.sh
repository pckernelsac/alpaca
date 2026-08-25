#!/bin/bash
# restore-postgres.sh — Restore PostgreSQL database
set -e

BACKUP_FILE="$1"
DB_NAME="${DB_NAME:-alpacart}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5446}"
DB_USER="${DB_USERNAME:-alpacart}"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup-file.dump>"
  echo "Available backups:"
  ls -1 /backups/postgres/ 2>/dev/null || echo "No backups found"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found: $BACKUP_FILE"
  exit 1
fi

echo "[$(date)] Restoring $BACKUP_FILE to $DB_NAME..."
pg_restore -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
  --clean --no-owner --no-acl \
  "$BACKUP_FILE"

echo "[$(date)] Restore completed successfully."
