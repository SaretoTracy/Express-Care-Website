
//prevent circular dependency and enables global auth signaling.

export const AuthEvents = {
  EXPIRED: "auth-expired",
};

export const emitAuthExpired = () => {
  window.dispatchEvent(new Event(AuthEvents.EXPIRED));
};