import { useState } from 'react';
import styles from './style.module.css';

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

interface ConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ message, onConfirm, onCancel }: ConfirmProps) {
  return (
    <Modal>
      <p>{message}</p>
      <div className={styles.buttons}>
        <button onClick={onConfirm}>Sim</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </Modal>
  );
}

interface DateModalProps {
  onSave: (date: string) => void;
  onCancel: () => void;
}

export function DateModal({ onSave, onCancel }: DateModalProps) {
  const [date, setDate] = useState('');
  return (
    <Modal>
      <p>Selecione a data do pagamento</p>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <div className={styles.buttons}>
        <button onClick={() => onSave(date)}>Salvar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </Modal>
  );
}
