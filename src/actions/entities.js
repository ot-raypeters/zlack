export const UPSERT_ENTITIES = 'UPSERT_ENTITIES';

export function upsertEntities(entityType, items) {
  return (dispatch) => {
    dispatch({ type: UPSERT_ENTITIES, entityType, items });
  };
}
