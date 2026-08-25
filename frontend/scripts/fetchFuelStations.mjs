import { mkdir, writeFile } from 'node:fs/promises'

const districts = {
  Colombo: 'fs-colombo-2', Gampaha: 'fs-gampaha', Kalutara: 'fs-kaluthara', Kandy: 'fs-kandy',
  Matale: 'fs-matale', 'Nuwara Eliya': 'fs-nuwara-eliya', Galle: 'fs-galle', Matara: 'fs-matara',
  Hambantota: 'fs-hambanthota', Jaffna: 'fs-jaffna', Mannar: 'fs-mannar', Mullaitivu: 'fs-mullaitivu',
  Vavuniya: 'fs-vavunia', Batticaloa: 'fs-batticloa', Ampara: 'fs-ampara', Trincomalee: 'fs-trinco',
  Kurunegala: 'fs-kurunagala', Puttalam: 'fs-puttalam', Anuradhapura: 'fs-anuradhapura',
  Polonnaruwa: 'fs-polonnaruwa', Badulla: 'fs-badulla', Monaragala: 'fs-monaragala',
  Ratnapura: 'fs-ratnapura', Kegalle: 'fs-kagalle', Kilinochchi: 'fs-kilinochchi',
}

const decode = (value) => value
  .replace(/<[^>]*>/g, ' ')
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'")
  .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

const data = {}
for (const [district, slug] of Object.entries(districts)) {
  const response = await fetch(`https://ceypetco.gov.lk/${slug}/`)
  if (!response.ok) throw new Error(`${district}: HTTP ${response.status}`)
  const html = await response.text()
  const table = html.match(/<table[\s\S]*?<\/table>/i)?.[0]
  if (!table) throw new Error(`${district}: table not found`)
  const rows = [...table.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map(([row]) =>
    [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(([, cell]) => decode(cell)))
  data[district] = rows.filter((row) => row.length >= 3 && /^\d+$/.test(row[0])).map(([dealerNo, address, dealerName]) => ({ dealerNo, address, dealerName }))
  console.log(`${district}: ${data[district].length}`)
}

await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })
await writeFile(new URL('../src/data/fuelStations.json', import.meta.url), `${JSON.stringify(data, null, 2)}\n`)
