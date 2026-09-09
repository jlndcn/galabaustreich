import { getSeason } from '../data/seasons';
const section = document.querySelector<HTMLElement>('[data-season-month]');
if (section) {
  const season = getSeason();
  const services = [
    ...document.querySelectorAll<HTMLElement>('.service-list [data-service-id]'),
  ].map((el) => ({
    id: el.dataset.serviceId!,
    title: el.dataset.serviceTitle!,
    claim: el.dataset.serviceClaim!,
    teaser: el.querySelector('p')!.textContent!,
  }));
  const top = season.ids
    .slice(0, 3)
    .map((id) => services.find((service) => service.id === id))
    .filter((service) => service !== undefined);
  if (section.dataset.seasonMonth !== String(season.month)) {
    document.querySelectorAll('[data-season-name]').forEach((el) => {
      el.textContent = season.monthName;
    });
    document.querySelectorAll('[data-season-note]').forEach((el) => {
      el.textContent = season.note;
    });
    const template = document.querySelector<HTMLTemplateElement>('#season-card-template')!;
    const cards = top.map((service, index) => {
      const card = template.content.firstElementChild!.cloneNode(true) as HTMLAnchorElement;
      card.href = `/leistungen#${service.id}`;
      card.dataset.serviceId = service.id;
      card.dataset.serviceTitle = service.title;
      card.querySelector('.card-number')!.textContent = `0${index + 1}`;
      card.querySelector('h3')!.textContent = service.title;
      card.querySelector('.service-claim')!.textContent = service.claim;
      card.querySelector('[data-teaser]')!.textContent = service.teaser;
      return card;
    });
    section.querySelector('[data-season-cards]')!.replaceChildren(...cards);
    const links = document.querySelector('[data-season-links]');
    if (links)
      links.replaceChildren(
        ...season.ids
          .map((id) => services.find((service) => service.id === id))
          .filter((service) => service !== undefined)
          .map((service) => {
            const link = document.createElement('a');
            link.href = `/leistungen#${service.id}`;
            link.textContent = service.title;
            return link;
          }),
      );
  }
}
