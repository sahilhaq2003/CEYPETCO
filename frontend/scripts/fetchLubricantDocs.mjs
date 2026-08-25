import { mkdir, writeFile } from 'node:fs/promises'

const base = 'https://ceypetco.gov.lk/wp-content/uploads/2025/11/'
const products = [
  ['Ceypetco 2T JASO FC','TDS-Ceypetco-2T-JASO-FC.pdf','MSDS-Ceypetco-2T-JASO-FC.pdf'],
  ['Ceypetco Enduro SAE 10W30, 15W40, 20W50','TDS-Ceypetco-Enduro-15W40.pdf','MSDS-Ceypetco-Enduro-SAE-10W30-15W4020W50.pdf'],
  ['Ceypetco Power Steering Oil','TDS-Ceypetco-Power-Steering-Oil.pdf','MSDS-Ceypetco-Power-Steering-Oil.pdf'],
  ['Ceypetco 4T JASO MA2','TDS-Ceypetco-4T-JASO-MA2.pdf','MSDS-Ceypetco-4T-JASO-MA2.pdf'],
  ['Ceypetco ATF Dexron III','TDS-Ceypetco-ATF-Dexron-III.pdf','MSDS-Ceypetco-ATF-Dexron-III.pdf'],
  ['Ceypetco Brake Fluid DOT3','TDS-Ceypetco-Brake-Fluid-DOT3.pdf','MSDS-Ceypetco-Brake-Fluid-DOT-3.pdf'],
  ['Ceypetco Brake Fluid DOT4','TDS-Ceypetco-Brake-Fluid-DOT4.pdf','MSDS-Ceypetco-Brake-Fluid-DOT-4.pdf'],
  ['Ceypetco Circulation Oil ISO VG 150',null,'MSDS-Ceypetco-Circulation-Oil-ISO-VG-150.pdf'],
  ['Ceypetco Coolant GREEN - RED','TDS-Ceypetco-Radiator-Coolant-Red.pdf','MSDS-Ceypetco-Coolant-GREEN-RED.pdf'],
  ['Ceypetco Grease MP','TDS-Ceypetco-MP-Grease.pdf','MSDS-Ceypetco-Grease-MP.pdf'],
  ['Ceypetco Grease EP','TDS-Ceypetco-EP-Grease.pdf','MSDS-Ceypetco-Grease-EP.pdf'],
  ['Ceypetco HVI Hydra','TDS-Ceypetco-Hydra.pdf','MSDS-Ceypetco-HVI-Hydra.pdf'],
  ['Ceypetco Hypertrans IEC 60296','TDS-Ceypetco-Hypertrans-IEC-60296.pdf','MSDS-Ceypetco-Hypertrans-SDS-IEC-60296-2020.pdf'],
  ['Ceypetco Penetrating Oil','TDS-Ceypetco-Penetrating-Oil.pdf','MSDS-Ceypetco-Penetrating-Oil.pdf'],
  ['Ceypetco Supra','TDS-Ceypetco-Supra.pdf','MSDS-Ceypetco-Supra.pdf'],
  ['Ceypetco Supreme XHD','TDS-Ceypetco-Supreme-XHD.pdf','MSDS-Ceypetco-Supreme-XHD.pdf'],
  ['Ceypetco Automotive Gear Oil GL-5','TDS-Ceypetco-Gear-Oil-GL-5.pdf','MSDS-Ceypetco-Automotive-Gear-Oil-GL-5.pdf'],
  ['Ceypetco Automotive Gear Oil GL-4','TDS-Ceypetco-Gear-Oil-GL-4.pdf','MSDS-Ceypetco-Automotive-Gear-Oil-GL-4.pdf'],
  ['Ceypetco Universal Tractor Fluid','TDS-Ceypetco-Universal-Tractor-Fluid.pdf',null],
  ['Ceypetco 4T Scooter JASO MB','TDS-Ceypetco-4T-Scooter-JASO-MB.pdf',null],
  ['Ceypetco Rodeo Xtra','TDS-Ceypetco-Rodeo-Xtra.pdf',null],
  ['Ceypetco Platinum 0W-20','TDS-Ceypetco-Platineum-0W-20-1.pdf',null],
  ['Ceypetco MTF 80W-90 GL-4','TDS-Ceypetco-MTF-80W-90-GL-4.pdf',null],
].map(([name,tds,msds]) => ({ name, tds: tds ? `/documents/lubricants/${tds}` : null, msds: msds ? `/documents/lubricants/${msds}` : null }))

const output = new URL('../public/documents/lubricants/', import.meta.url)
await mkdir(output, { recursive: true })
const files = [...new Set(products.flatMap(({tds,msds}) => [tds,msds]).filter(Boolean).map(path => path.split('/').pop()))]
await Promise.all(files.map(async (file) => {
  const response = await fetch(`${base}${file}`)
  if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`)
  await writeFile(new URL(file, output), Buffer.from(await response.arrayBuffer()))
  console.log(file)
}))
await writeFile(new URL('../src/data/lubricants.json', import.meta.url), `${JSON.stringify(products, null, 2)}\n`)
