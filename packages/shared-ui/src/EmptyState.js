export function EmptyState({ icon = 'inbox', title, description, action, className = '' }) {
  return (
    <div className={className} style={{ textAlign: 'center', padding: '40px 20px' }}>
      {icon && <span style={{ fontSize: 48, color: '#bbb' }} className="material-symbols-outlined">{icon}</span>}
      {title && <h3 style={{ margin: '12px 0 4px', color: '#555' }}>{title}</h3>}
      {description && <p style={{ margin: 0, color: '#888', fontSize: 14 }}>{description}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}
