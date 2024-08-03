const handleSocketEvents = async (
  socket,
  eventName,
  updateCachedData,
  cacheDataLoaded,
  cacheEntryRemoved,
) => {
  try {
    await cacheDataLoaded;
    const handleEvent = (payload) => {
      updateCachedData((draft) => {
        draft.push(payload);
      });
    };
    socket.on(eventName, handleEvent);
  } catch (err) {
    console.error(err);
  }
  await cacheEntryRemoved;
  socket.off(eventName);
};

export default handleSocketEvents;
