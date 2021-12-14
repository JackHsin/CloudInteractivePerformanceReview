import moment from "moment-timezone";

export const YYYYMMDDHHMM = "YYYY-MM-DD HH:mm";
export function timeFormat(dateTime: string, format: string) {
  return moment(dateTime).format(format);
}

// eslint-disable-next-line import/prefer-default-export
export function scrollTo({
  duration = 300,
  position = 0,
  el,
}: {
  duration?: number;
  position?: number;
  el?: string;
}) {
  let endPosition = position;
  if (el) {
    const dom = document.querySelector(el)! as HTMLElement;
    const domOffsetTop = dom.offsetTop;
    endPosition += domOffsetTop;
  }
  let scrollY = document.scrollingElement.scrollTop;
  const totalScrollDistance = scrollY - endPosition;
  let oldTimestamp = null;
  if (scrollY === endPosition) return;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      scrollY -=
        (totalScrollDistance * (newTimestamp - oldTimestamp)) / duration;
      if (totalScrollDistance > 0 && scrollY <= endPosition) {
        document.scrollingElement.scrollTop = endPosition;
        return;
      }
      if (totalScrollDistance < 0 && scrollY >= endPosition) {
        document.scrollingElement.scrollTop = endPosition;
        return;
      }
      document.scrollingElement.scrollTop = scrollY;
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}
