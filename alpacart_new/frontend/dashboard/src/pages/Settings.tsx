import { useCallback, useEffect, useState } from 'react';

import { PageHeader } from '../components/layout/Shell';
import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Field';
import { IconAlert } from '../components/ui/Icon';
import { Alert, Card, LoadingBlock } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useResource } from '../hooks/useResource';
import { ApiRequestError, systemApi } from '../lib/api';
import type { Company, CompanyInput } from '../lib/types';
import { useAuth } from '../providers/AuthProvider';
import { useTheme } from '../providers/ThemeProvider';
import { useToast } from '../providers/ToastProvider';
import styles from './Page.module.css';

interface FormState {
  legal_name: string;
  tax_id: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  primary_currency: string;
}

export function Settings() {
  usePageTitle('Ajustes');
  const toast = useToast();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const loader = useCallback((signal: AbortSignal) => systemApi.company(signal), []);
  const { data, loading, error, setData } = useResource<Company>(loader);

  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);

  // El formulario se hidrata cuando llega la empresa; antes no hay qué editar.
  useEffect(() => {
    if (!data) return;
    setForm({
      legal_name: data.legalName ?? '',
      tax_id: data.taxId ?? '',
      industry: data.industry ?? '',
      website: data.website ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      address: data.address ?? '',
      primary_currency: data.primaryCurrency ?? 'PEN',
    });
  }, [data]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const payload: CompanyInput = {
        legal_name: form.legal_name || null,
        tax_id: form.tax_id || null,
        industry: form.industry || null,
        website: form.website || null,
        email: form.email || null,
        phone: form.phone || null,
        address: form.address || null,
        primary_currency: form.primary_currency || null,
      };
      await systemApi.updateCompany(payload);
      // El PUT responde { updated: true }, no la empresa: se refleja en local
      // para no pedir el recurso de nuevo.
      if (data) {
        setData({
          ...data,
          legalName: form.legal_name,
          taxId: form.tax_id,
          industry: form.industry,
          website: form.website,
          email: form.email,
          phone: form.phone,
          address: form.address,
          primaryCurrency: form.primary_currency,
        });
      }
      toast.success('Datos de la empresa actualizados');
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos guardar');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader title="Ajustes" description="Datos de la empresa y preferencias del panel." />

      {error && (
        <Alert tone="danger" icon={<IconAlert size={16} />}>
          {error}
        </Alert>
      )}

      <div className={styles.split}>
        <Card title="Empresa">
          {loading || !form ? (
            <LoadingBlock />
          ) : (
            <form className={styles.formGrid} onSubmit={save}>
              <div className={styles.formGridFull}>
                <Input
                  label="Razón social"
                  value={form.legal_name}
                  onChange={(event) => setForm({ ...form, legal_name: event.target.value })}
                />
              </div>

              <Input
                label="RUC"
                value={form.tax_id}
                onChange={(event) => setForm({ ...form, tax_id: event.target.value })}
              />

              <Input
                label="Rubro"
                value={form.industry}
                onChange={(event) => setForm({ ...form, industry: event.target.value })}
              />

              <Input
                label="Correo"
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />

              <Input
                label="Teléfono"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />

              <Input
                label="Sitio web"
                value={form.website}
                onChange={(event) => setForm({ ...form, website: event.target.value })}
              />

              <Select
                label="Moneda"
                value={form.primary_currency}
                onChange={(event) => setForm({ ...form, primary_currency: event.target.value })}
              >
                <option value="PEN">Soles (PEN)</option>
                <option value="USD">Dólares (USD)</option>
              </Select>

              <div className={styles.formGridFull}>
                <Textarea
                  label="Dirección"
                  rows={3}
                  value={form.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                />
              </div>

              <div className={styles.formGridFull}>
                <Button type="submit" size="sm" loading={saving}>
                  Guardar cambios
                </Button>
              </div>
            </form>
          )}
        </Card>

        <div className={styles.stack}>
          <Card title="Tu cuenta">
            <dl className={styles.definitionList}>
              <dt>Nombre</dt>
              <dd>{user?.name}</dd>
              <dt>Correo</dt>
              <dd>{user?.email}</dd>
              <dt>Rol</dt>
              <dd>{user?.role ?? '—'}</dd>
              <dt>Puesto</dt>
              <dd>{user?.position ?? '—'}</dd>
              <dt>Legajo</dt>
              <dd>{user?.employeeId ?? '—'}</dd>
            </dl>
          </Card>

          <Card title="Apariencia">
            <Select
              label="Tema del panel"
              value={theme}
              onChange={(event) => setTheme(event.target.value as 'light' | 'dark' | 'system')}
              hint="«Del sistema» sigue la preferencia del navegador."
            >
              <option value="system">Del sistema</option>
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </Select>
          </Card>
        </div>
      </div>
    </>
  );
}
