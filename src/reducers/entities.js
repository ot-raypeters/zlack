import { UPSERT_ENTITIES } from '../actions/entities';

const INITIAL_STATE = {
  byId: {},
  all: []
};

const upsertEntities = (state, entities) => {
  const byId = entities.reduce((map, entity) => {
    map[entity.uid] = entity;
    return map;
  }, { ...state.byId });

  const all = Object.values(byId);
  return { byId, all };
};

const entities = (state = {}, action) => {
  if (action.type !== UPSERT_ENTITIES) {
    return state;
  }

  const { entityType, items } = action;
  const previousEntityState = state[entityType] || INITIAL_STATE;
  const newEntityState = upsertEntities(previousEntityState, items);

  const patch = { [entityType]: newEntityState };
  return { ...state, ...patch };
};

export default entities;
