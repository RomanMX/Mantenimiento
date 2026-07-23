import { listGrupos } from "../repositories/GrupoRepository";
import { ok } from "../http";

export async function handler() {
  const grupos = await listGrupos();
  return ok(grupos);
}
