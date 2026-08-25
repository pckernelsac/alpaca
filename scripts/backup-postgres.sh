#!/bin/bash
# backup-postgres.sh — Backup PostgreSQL database
set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres"
DB_NAME="${DB_NAME:-alpacart}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5446}"
DB_USER="${DB_USERNAME:-alpacart}"
RETENTION_DAYS=7

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting backup of $DB_NAME..."
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
  --no-owner --no-acl \
  -F c -f "$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.dump"

echo "[$(date)] Backup completed: ${DB_NAME}_${TIMESTAMP}.dump"

# Rotate old backups
find "$BACKUP_DIR" -name "${DB_NAME}_*.dump" -mtime +$RETENTION_DAYS -delete
echo "[$(date)] Old backups cleaned (retention: $RETENTION_DAYS days)"
