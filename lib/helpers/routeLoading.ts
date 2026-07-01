export const ROUTE_LOADING_START_EVENT = 'rentasib:route-loading-start';

export const dispatchRouteLoadingStart = () => {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(new Event(ROUTE_LOADING_START_EVENT));
};
