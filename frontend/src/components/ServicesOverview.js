import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";

export function ServicesOverview() {
  const trackRef = useRef(null);
  const dotRef = useRef(null);
  const [active, setActive] = useState(services[0].id);
  useEffect(() => {
    const track = trackRef.current;
    const links = [...track.querySelectorAll("a")];
    const sections = services.map((service) =>
      document.getElementById(service.id),
    );
    let frame = 0;
    let previous = -1;
    const update = () => {
      frame = 0;
      const mobile = window.innerWidth < 1024;
      const threshold = mobile ? 220 : 160;
      let index = 0;
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= threshold)
          index = i;
      });
      const link = links[index];
      dotRef.current.style.transform = `translate3d(${link.offsetLeft + 6}px, ${link.offsetTop + link.offsetHeight / 2 - 4}px, 0)`;
      if (index !== previous) {
        previous = index;
        setActive(services[index].id);
        if (mobile) {
          track.scrollTo({
            left: Math.max(
              0,
              link.offsetLeft - (track.clientWidth - link.offsetWidth) / 2,
            ),
            behavior: "instant",
          });
        } else {
          const nav = track.parentElement;
          const top = link.offsetTop + track.offsetTop;
          if (
            top < nav.scrollTop ||
            top + link.offsetHeight > nav.scrollTop + nav.clientHeight
          )
            nav.scrollTop = Math.max(0, top - nav.clientHeight / 2);
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedule)
        : null;
    resize?.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <nav aria-label="Leistungsübersicht" data-testid="services-overview-nav">
      <h2>Übersicht</h2>
      <div className="service-track" ref={trackRef}>
        <span
          className="service-position-dot"
          ref={dotRef}
          aria-hidden="true"
        />
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <a
                href={`#${service.id}`}
                data-testid="service-jump-link"
                aria-current={active === service.id ? "location" : undefined}
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
