import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import './historical-prices.css';

const PAGE_SIZE = 20;
const FUEL_COLUMNS = ['Date', 'LP 95', 'LP 92', 'LAD', 'LSD', 'LK', 'LIK', 'FUR. 800', 'FUR 1500 (High)', 'FUR. 1500 (Low)'];
const BITUMEN_COLUMNS = ['Date', 'Circular No.', '80/100', '60/70'];

const formatCell = (value) => value || '—';

function HistoricalPricesPage() {
  const [archiveRecords, setArchiveRecords] = useState({ fuel: [], bitumen: [] });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [category, setCategory] = useState('fuel');
  const [year, setYear] = useState('');
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    api.get('/admin/historical-prices/active').then((response) => {
      if (cancelled) return;
      const data = response.data?.data;
      if (!Array.isArray(data)) throw new Error('Invalid archive response');
      const mapRecord = (record) => ({
        id: record._id,
        date: record.dateLabel,
        year: record.year,
        continuation: record.note === 'Additional entry',
        values: [record.dateLabel, ...record.values],
      });
      setArchiveRecords({
        fuel: data.filter((record) => record.kind === 'fuel').map(mapRecord),
        bitumen: data.filter((record) => record.kind === 'bitumen').map(mapRecord),
      });
    }).catch(() => { if (!cancelled) setLoadError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const records = archiveRecords[category];
  const years = [...new Set(records.map((record) => record.year))].filter(Boolean).sort((a, b) => b.localeCompare(a));
  const earliestYear = archiveRecords.fuel.reduce((oldest, record) =>
    record.year && (!oldest || record.year < oldest) ? record.year : oldest, '');
  const columns = category === 'fuel' ? FUEL_COLUMNS : BITUMEN_COLUMNS;
  const selectedColumns = category === 'fuel' && product !== 'all'
    ? [0, Number(product)]
    : columns.map((_, index) => index);
  const filtered = useMemo(() => records.filter((record) =>
    (!year || record.year === year) &&
    (!search.trim() || record.date.toLowerCase().includes(search.trim().toLowerCase()))
  ), [records, year, search]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);
  const changeCategory = (next) => {
    setCategory(next);
    setYear('');
    setSearch('');
    setProduct('all');
    resetPage();
  };

  return (
    <section className="hp-page content-section" aria-labelledby="hp-title">
      <div className="container">
        <a className="hp-back" href="/marketing-sales">← Back to Marketing &amp; Sales</a>
        <div className="hp-intro">
          <div>
            <p className="eyebrow">PRICE HISTORY</p>
            <h2 id="hp-title">Explore the historical price archive</h2>
            <p>Browse Ceypetco&apos;s published fuel prices from 1990 onward and historical bitumen revisions. Use the filters to find a date or focus on one fuel product.</p>
          </div>
          <div className="hp-summary" aria-label="Archive coverage">
            <span><b>{earliestYear || '—'}</b><small>Earliest fuel record</small></span>
            <span><b>{archiveRecords.fuel.length}</b><small>Fuel price records</small></span>
            <span><b>{archiveRecords.bitumen.length}</b><small>Bitumen entries</small></span>
          </div>
        </div>

        <div className="hp-panel">
          <div className="hp-tabs" role="group" aria-label="Price archive category">
            <button type="button" aria-pressed={category === 'fuel'} className={category === 'fuel' ? 'active' : ''} onClick={() => changeCategory('fuel')}>Fuel prices</button>
            <button type="button" aria-pressed={category === 'bitumen'} className={category === 'bitumen' ? 'active' : ''} onClick={() => changeCategory('bitumen')}>Bitumen revisions</button>
          </div>
          <div className="hp-panel-heading">
            <div>
              <h3>{category === 'fuel' ? 'Historical fuel prices' : 'Bitumen price revisions'}</h3>
              <p>{category === 'fuel' ? 'Published price figures in Sri Lankan rupees.' : 'Published revision entries for 80/100 and 60/70 grades. Units and supply form are shown as recorded.'}</p>
            </div>
            <span className="hp-record-count">{filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}</span>
          </div>
          <div className="hp-filters">
            <label>
              <span>Find a date</span>
              <input type="search" value={search} onChange={(event) => { setSearch(event.target.value); resetPage(); }} placeholder="e.g. 01.03.1990" />
            </label>
            <label>
              <span>Year</span>
              <select value={year} onChange={(event) => { setYear(event.target.value); resetPage(); }}>
                <option value="">All years</option>
                {years.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
            {category === 'fuel' && (
              <label>
                <span>Product</span>
                <select value={product} onChange={(event) => { setProduct(event.target.value); resetPage(); }}>
                  <option value="all">All products</option>
                  {FUEL_COLUMNS.slice(1).map((name, index) => <option key={name} value={index + 1}>{name}</option>)}
                </select>
              </label>
            )}
          </div>
          <div className="hp-table-scroll" role="region" aria-label={`${category === 'fuel' ? 'Fuel price' : 'Bitumen price'} table`} tabIndex={0}>
            <table className="hp-table">
              <thead><tr>{selectedColumns.map((index) => <th key={index} scope="col">{columns[index]}</th>)}</tr></thead>
              <tbody>
                {visible.map((record) => (
                  <tr key={record.id}>
                    {selectedColumns.map((index) => (
                      <td key={index}>
                        {index === 0 && record.continuation ? <><span>{record.date}</span><small>Additional entry</small></> : formatCell(record.values[index])}
                      </td>
                    ))}
                  </tr>
                ))}
                {visible.length === 0 && <tr><td className="hp-empty" colSpan={selectedColumns.length}>{loading ? 'Loading archive...' : loadError ? 'The archive is temporarily unavailable.' : 'No records match these filters.'}</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="hp-pagination">
            <span>{filtered.length ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}` : '0 entries'}</span>
            <div>
              <button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button>
              <span>Page {page} of {pages}</span>
              <button type="button" disabled={page === pages} onClick={() => setPage((value) => value + 1)}>Next</button>
            </div>
          </div>
        </div>
        <p className="hp-source">Source: Ceylon Petroleum Corporation historical prices, initially imported 18 September 2026. Records are managed through the admin dashboard. This archive is a dated reference, not a live price feed.</p>
      </div>
    </section>
  );
}

export default HistoricalPricesPage;
