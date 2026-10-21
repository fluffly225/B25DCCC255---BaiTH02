interface Props {
  kind: 'idle' | 'loading' | 'error';
  onRetry?: () => void;
}

export default function StatusView({ kind, onRetry }: Props) {
  if (kind === 'idle') {
    return (
      <div className="status">
        <p className="status-icon">🧭</p>
        <p>Chọn một thành phố ở danh sách để xem thời tiết.</p>
      </div>
    );
  }

  if (kind === 'loading') {
    return (
      <div className="status" role="status" aria-live="polite">
        <div className="spinner" />
        <p>Đang tải dữ liệu thời tiết…</p>
      </div>
    );
  }

  return (
    <div className="status" role="alert">
      <p className="status-icon">⚠️</p>
      <p>Không tải được dữ liệu. Kiểm tra kết nối mạng rồi thử lại.</p>
      <button type="button" className="retry-btn" onClick={onRetry}>
        Thử lại
      </button>
    </div>
  );
}
