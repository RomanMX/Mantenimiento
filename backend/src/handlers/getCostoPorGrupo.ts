import { listAllElementos } from "../repositories/ElementoRepository";
import { listGrupos } from "../repositories/GrupoRepository";
import { getCostoPorGrupoUltimos12Meses } from "../domain/bitacora";
import { ok } from "../http";

export async function handler() {
  const [elementos, grupos] = await Promise.all([listAllElementos(), listGrupos()]);
  return ok(getCostoPorGrupoUltimos12Meses(grupos, elementos));
}
