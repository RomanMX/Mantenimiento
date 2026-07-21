import { useState, type FormEvent } from "react";

interface CommentFormProps {
  onSubmit: (comentario: string) => void;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [comentario, setComentario] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = comentario.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setComentario("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "var(--space-2)" }}>
      <input
        className="input"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Agregar comentario..."
        aria-label="Nuevo comentario"
      />
      <button type="submit" className="btn btn-primary" disabled={!comentario.trim()}>
        Comentar
      </button>
    </form>
  );
}
