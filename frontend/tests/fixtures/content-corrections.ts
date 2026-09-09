// Explicit corrections authorized by the local release preparation on 2026-09-09.
// Keep baseline.json unchanged as the historical CRA reference.
export const contentCorrections: Record<string, [string, string][]> = {
  '/impressum': [
    ['EU-Streitschlichtung', ''],
    [
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.',
      '',
    ],
  ],
  '/datenschutz': [
    [
      'WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2,',
      'WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5,',
    ],
    [
      'Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA',
      'Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA',
    ],
    [
      'ein unsichtbares Kontrollfeld eingesetzt und die Anzahl der Absendungen je Verbindung lediglich kurzzeitig und ohne dauerhafte Speicherung technisch begrenzt.',
      'ein unsichtbares Kontrollfeld eingesetzt. Die übermittelten Angaben werden serverseitig auf gültige Formate und zulässige Längen geprüft.',
    ],
    [
      '10. Links zu externen Angeboten (Google, WhatsApp, EU-Plattform)',
      '10. Links zu externen Angeboten (Google, WhatsApp)',
    ],
    ['WhatsApp sowie auf die Plattform der EU-Kommission zur Online-Streitbeilegung.', 'WhatsApp.'],
  ],
};
export function correctedOriginal(text: string, route: string) {
  let result = text.replace(/\s/g, '');
  for (const [before, after] of contentCorrections[route] || [])
    result = result.replace(before.replace(/\s/g, ''), after.replace(/\s/g, ''));
  return result;
}
