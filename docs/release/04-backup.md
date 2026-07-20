# Backup Strategy

> **Procedimientos de backup y restore**

---

## Backup PostgreSQL

Script: `scripts/backup-postgres.sh`

```bash
# Backup manual
DB_NAME=alpacart DB_HOST=localhost DB_PORT=5446 DB_USERNAME=alpacart \
  bash scripts/backup-postgres.sh

# Backup automático (cron)
0 3 * * * DB_NAME=alpacart bash /opt/alpacart/scripts/backup-postgres.sh
```

### Retention
- Backups diarios: 7 días
- Backup semanal: 4 semanas
- Backup mensual: 12 meses

## Restore PostgreSQL

Script: `scripts/restore-postgres.sh`

```bash
bash scripts/restore-postgres.sh /backups/postgres/alpacart_20260717_030000.dump
```

## Backup MinIO/S3

```bash
# Usar aws-cli o mc client
mc mirror --watch /data/minio s3://alpacart-backups/
```

## Configuración

| Variable | Default | Descripción |
|----------|---------|-------------|
| BACKUP_DIR | /backups/postgres | Directorio de backups |
| RETENTION_DAYS | 7 | Días de retención |
| DB_NAME | alpacart | Nombre de BD |

## Restore Procedure

1. Detener aplicación
2. Restaurar backup: `bash scripts/restore-postgres.sh <archivo>`
3. Verificar datos: `psql -c "SELECT count(*) FROM users"`
4. Iniciar aplicación
5. Validar funcionalidad
