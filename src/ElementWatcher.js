export default function (link, { max, delay, callback, count } = {}) {
  function _fire() {
    callback(link);

    _totalFireCount++;

    _resetStore();

    _hasJustFired = true;

    if (max !== null && _totalFireCount >= max) {
      _updateListeners("remove");
    }
  }

  function _handleMouseLeave() {
    clearTimeout(_timeout);
    return _hasJustFired || _updateStoreTime();
  }

  function _handleMouseOver() {
    _hasJustFired = false;
    _hoverStart = Date.now();
    _store.interactions++;

    return _maybeFireBasedOnCount() || _maybeFireBasedOnTime();
  }

  function _updateListeners(type) {
    for (let i in _mouseEventHandlers) {
      link[`${type}EventListener`](i, _mouseEventHandlers[i]);
    }
  }

  function _maybeFireBasedOnCount() {
    if (_triggers.count === null) return false;

    if (_store.interactions >= _triggers.count) {
      _fire();
      return true;
    }

    return false;
  }

  function _maybeFireBasedOnTime() {
    if (_triggers.delay === null) return false;

    _timeout = setTimeout(() => {
      _fire();
    }, _getTimeRemainingUntilFire());

    return _timeout;
  }

  function _getTimeRemainingUntilFire() {
    return _triggers.delay - _store.time;
  }

  function _resetStore() {
    _store = {
      time: 0,
      interactions: 0,
    };
  }

  function _updateStoreTime() {
    _store.time = _store.time + (Date.now() - _hoverStart);
  }

  let _triggers = { delay, count };
  let _hasJustFired = false;
  let _totalFireCount = 0;
  let _hoverStart = 0;
  let _timeout = null;
  let _store = {
    time: 0,
    interactions: 0,
  };

  const _mouseEventHandlers = {
    mouseover: _handleMouseOver.bind(this),
    mouseleave: _handleMouseLeave.bind(this),
  };

  _updateListeners("add");

  return {
    remove: () => _updateListeners("remove"),
  };
}
