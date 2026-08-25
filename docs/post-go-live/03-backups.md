# Post Go-Live — Backups

> **Verificación de backups**

---

## Programa de Backups

| Tipo | Frecuencia | Retención | Horario | Responsable |
|------|-----------|-----------|---------|-------------|
| PostgreSQL completo | Diario | 7 días | 03:00 AM | Automático |
| PostgreSQL semanal | Semanal | 4 semanas | Domingo 03:00 | Automático |
| PostgreSQL mensual | Mensual | 12 meses | 1 del mes 03:00 | Automático |
| MinIO/S3 | Diario | 30 días | 04:00 AM | Automático |

## Verificación Diaria

```bash
# Verificar backup más reciente
ls -la /backups/postgres/$(date +%Y%m%d)*.dump

# Verificar tamaño
du -sh /backups/postgres/

# Probar integridad
pg_restore --list /backups/postgres/$(date +%Y%m%d)*.dump | head -20
```

## Restore Test (Semanal)

```bash
# Restaurar en entorno de staging
DB_NAME=alpacart_test pg_restore -d alpacart_test /backups/postgres/latest.dump

# Verificar datos
psql -d alpacart_test -c "SELECT count(*) FROM users;"
psql -d alpacart_test -c "SELECT count(*) FROM orders;"

# Verificar migraciones
psql -d alpacart_test -c "SELECT * FROM SequelizeMeta;"
```

## Alertas

| Alerta | Condición | Acción |
|--------|-----------|--------|
| Backup fallido | No se generó archivo .dump | Revisar cron/logs del script |
| Backup tamaño 0 | Archivo .dump de 0 bytes | Revisar conexión DB |
| Backup antiguo | Backup más reciente > 24h | Revisar cron |
| Disco lleno | /backups > 85% | Revisar retención, archivar |
