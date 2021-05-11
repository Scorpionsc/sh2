interface GenericActionWithPayload {
  type: unknown;
  payload: unknown;
}

const actionFn = <TAction extends GenericActionWithPayload>(
  actionType: TAction['type'],
) => {
  return (payload: TAction['payload']) =>
    ({
      type: actionType,
      payload,
    } as TAction);
};

export default actionFn;
