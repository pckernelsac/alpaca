import { useCallback, useState } from 'react';

import { PageHeader } from '../components/layout/Shell';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { DataTable, Pagination } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Drawer } from '../components/ui/Drawer';
import { Input, Select } from '../components/ui/Field';
import { IconPencil, IconPlus, IconSearch, IconTrash } from '../components/ui/Icon';
import { Badge, Card, Tabs } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useDebounced, useResource } from '../hooks/useResource';
import { ApiRequestError, iamApi } from '../lib/api';
import { formatDateTime } from '../lib/format';
import { statusLabel } from '../lib/orderStatus';
import type { Department, Paginated, Role, StaffUser, UserInput } from '../lib/types';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';
import styles from './Page.module.css';

interface FormState {
  name: string;
  email: string;
  password: string;
  phone: string;
  employee_id: string;
  position: string;
  role_id: string;
  department_id: string;
  status: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  employee_id: '',
  position: '',
  role_id: '',
  department_id: '',
  status: 'active',
};

export function Users() {
  usePageTitle('Personal');
  const toast = useToast();
  const { user: me } = useAuth();

  const [tab, setTab] = useState<'personal' | 'roles'>('personal');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounced(search);

  const [editing, setEditing] = useState<StaffUser | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toDisable, setToDisable] = useState<StaffUser | null>(null);
  const [disabling, setDisabling] = useState(false);

  const usersLoader = useCallback(
    (signal: AbortSignal) =>
      iamApi.users({ page, limit: 20, search: debouncedSearch || undefined }, signal),
    [page, debouncedSearch],
  );
  const { data, loading, error, reload } = useResource<Paginated<StaffUser>>(usersLoader, [
    page,
    debouncedSearch,
  ]);

  const refsLoader = useCallback(
    async (signal: AbortSignal) => ({
      roles: await iamApi.roles(signal),
      departments: await iamApi.departments(signal),
    }),
    [],
  );
  const { data: refs, loading: refsLoading } = useResource<{
    roles: Role[];
    departments: Department[];
  }>(refsLoader);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditing(null);
    setCreating(true);
  }

  function openEdit(user: StaffUser) {
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      phone: user.phone ?? '',
      employee_id: user.employeeId ?? '',
      position: user.position ?? '',
      role_id: user.roleId ? String(user.roleId) : '',
      department_id: user.departmentId ? String(user.departmentId) : '',
      status: user.status,
    });
    setEditing(user);
    setCreating(false);
  }

  function closeDrawer() {
    setEditing(null);
    setCreating(false);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const base: UserInput = {
        name: form.name.trim(),
        phone: form.phone || null,
        position: form.position || null,
        role_id: form.role_id ? Number(form.role_id) : undefined,
        department_id: form.department_id ? Number(form.department_id) : null,
        status: form.status,
      };

      if (editing) {
        // La contraseña vacía significa "no la toques", no "borrala".
        await iamApi.updateUser(editing.id, {
          ...base,
          password: form.password ? form.password : undefined,
        });
        toast.success('Usuario actualizado');
      } else {
        await iamApi.createUser({
          ...base,
          email: form.email.trim(),
          password: form.password,
          employee_id: form.employee_id || null,
        });
        toast.success('Usuario creado');
      }
      closeDrawer();
      reload();
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos guardar');
    } finally {
      setSaving(false);
    }
  }

  async function confirmDisable() {
    if (!toDisable) return;
    setDisabling(true);
    try {
      await iamApi.deleteUser(toDisable.id);
      toast.success(`${toDisable.name} quedó inactivo`);
      setToDisable(null);
      reload();
    } catch (caught) {
      toast.error(caught instanceof ApiRequestError ? caught.message : 'No pudimos desactivarlo');
    } finally {
      setDisabling(false);
    }
  }

  const userColumns: Column<StaffUser>[] = [
    {
      key: 'name',
      header: 'Persona',
      sortValue: (row) => row.name,
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.name}</strong>
          <small>{row.email}</small>
        </span>
      ),
    },
    {
      key: 'role',
      header: 'Rol',
      sortValue: (row) => row.role ?? '',
      render: (row) => <span className={styles.muted}>{row.role ?? '—'}</span>,
    },
    {
      key: 'position',
      header: 'Puesto',
      secondary: true,
      sortValue: (row) => row.position ?? '',
      render: (row) => <span className={styles.muted}>{row.position ?? '—'}</span>,
    },
    {
      key: 'department',
      header: 'Área',
      secondary: true,
      sortValue: (row) => row.department ?? '',
      render: (row) => <span className={styles.muted}>{row.department ?? '—'}</span>,
    },
    {
      key: 'lastAccess',
      header: 'Último acceso',
      secondary: true,
      sortValue: (row) => row.lastAccessAt ?? '',
      render: (row) => <span className={styles.muted}>{formatDateTime(row.lastAccessAt)}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      sortValue: (row) => row.status,
      render: (row) => (
        <Badge tone={row.status === 'active' ? 'success' : 'neutral'}>
          {statusLabel(row.status)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '6rem',
      render: (row) => (
        <div className={styles.rowActions}>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Editar ${row.name}`}
            onClick={() => openEdit(row)}
          >
            <IconPencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Desactivar ${row.name}`}
            // El backend rechaza que alguien se desactive a sí mismo; el botón
            // no debería ni ofrecerlo.
            disabled={row.id === me?.id || row.status !== 'active'}
            onClick={() => setToDisable(row)}
          >
            <IconTrash size={16} />
          </Button>
        </div>
      ),
    },
  ];

  const roleColumns: Column<Role>[] = [
    {
      key: 'name',
      header: 'Rol',
      sortValue: (row) => row.name,
      render: (row) => (
        <span className={styles.primaryCell}>
          <strong>{row.name}</strong>
          <small>{row.description ?? '—'}</small>
        </span>
      ),
    },
    {
      key: 'category',
      header: 'Categoría',
      secondary: true,
      sortValue: (row) => row.category ?? '',
      render: (row) => <span className={styles.muted}>{row.category ?? '—'}</span>,
    },
    {
      key: 'permissions',
      header: 'Permisos',
      align: 'right',
      sortValue: (row) => row.permissions.length,
      render: (row) => <span className={styles.numeric}>{row.permissions.length}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      sortValue: (row) => row.status,
      render: (row) => (
        <Badge tone={row.status === 'active' ? 'success' : 'neutral'}>
          {statusLabel(row.status)}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Personal"
        description="Quién trabaja en Alpacart y con qué permisos entra al panel."
        actions={
          tab === 'personal' ? (
            <Button size="sm" onClick={openCreate}>
              <IconPlus size={16} />
              Nuevo usuario
            </Button>
          ) : undefined
        }
      />

      <div className={styles.toolbar}>
        <Tabs
          value={tab}
          options={[
            { value: 'personal', label: 'Personal', count: data?.meta.total },
            { value: 'roles', label: 'Roles', count: refs?.roles.length },
          ]}
          onChange={setTab}
        />
        {tab === 'personal' && (
          <>
            <span className={styles.toolbarSpacer} />
            <div className={`${styles.toolbarSearch} ${styles.compactField}`}>
              <Input
                label="Buscar"
                type="search"
                placeholder="Nombre o correo…"
                icon={<IconSearch size={16} />}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>
          </>
        )}
      </div>

      <Card padded={false}>
        {tab === 'personal' ? (
          <>
            <DataTable
              columns={userColumns}
              rows={data?.data ?? []}
              rowKey={(row) => row.id}
              loading={loading}
              error={error}
              emptyTitle="No hay personal con esa búsqueda"
            />
            {data && (
              <Pagination
                page={data.meta.page}
                totalPages={data.meta.total_pages}
                total={data.meta.total}
                onChange={setPage}
              />
            )}
          </>
        ) : (
          <DataTable
            columns={roleColumns}
            rows={refs?.roles ?? []}
            rowKey={(row) => row.id}
            loading={refsLoading}
            emptyTitle="No hay roles definidos"
          />
        )}
      </Card>

      <Drawer
        open={creating || editing !== null}
        title={editing ? 'Editar usuario' : 'Nuevo usuario'}
        description={editing?.email}
        onClose={closeDrawer}
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={closeDrawer} disabled={saving}>
              Cancelar
            </Button>
            <Button size="sm" type="submit" form="user-form" loading={saving}>
              Guardar
            </Button>
          </>
        }
      >
        <form id="user-form" className={styles.formGrid} onSubmit={save}>
          <div className={styles.formGridFull}>
            <Input
              label="Nombre completo"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </div>

          {!editing && (
            <>
              <Input
                label="Correo"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <Input
                label="Legajo"
                value={form.employee_id}
                onChange={(event) => setForm({ ...form, employee_id: event.target.value })}
              />
            </>
          )}

          <Input
            label={editing ? 'Nueva contraseña' : 'Contraseña'}
            type="password"
            required={!editing}
            minLength={8}
            hint={editing ? 'Dejala vacía para no cambiarla' : 'Mínimo 8 caracteres'}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />

          <Input
            label="Teléfono"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />

          <Select
            label="Rol"
            required
            value={form.role_id}
            onChange={(event) => setForm({ ...form, role_id: event.target.value })}
          >
            <option value="">Elegí un rol</option>
            {refs?.roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </Select>

          <Select
            label="Área"
            value={form.department_id}
            onChange={(event) => setForm({ ...form, department_id: event.target.value })}
          >
            <option value="">Sin área</option>
            {refs?.departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </Select>

          <Input
            label="Puesto"
            value={form.position}
            onChange={(event) => setForm({ ...form, position: event.target.value })}
          />

          <Select
            label="Estado"
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </Select>
        </form>
      </Drawer>

      <ConfirmDialog
        open={toDisable !== null}
        title="Desactivar usuario"
        message={`${toDisable?.name ?? ''} no va a poder ingresar al panel. Su historial se conserva.`}
        confirmLabel="Desactivar"
        loading={disabling}
        onConfirm={confirmDisable}
        onCancel={() => setToDisable(null)}
      />
    </>
  );
}
