
import sys
c=open('src/App.jsx','r',encoding='utf-8').read()
t='''          <a className="hp-marketing-link" href="/marketing-sales/historical-prices">
            <span>
              <small>EXPLORE THE ARCHIVE</small>
              <b>Historical fuel prices</b>
              <span>Browse published prices and bitumen revisions dating back to 1990.</span>
            </span>
            <Icon name="arrow" size={22} />
          </a>'''

r='''          <a className="premium-historical-btn" href="/marketing-sales/historical-prices">
            <div className="premium-historical-btn-content">
              <span className="premium-historical-btn-eyebrow">Explore the Archive</span>
              <span className="premium-historical-btn-title">Historical Fuel Prices</span>
              <span className="premium-historical-btn-desc">Browse published prices and bitumen revisions dating back to 1990.</span>
            </div>
            <div className="premium-historical-btn-icon">
              <Icon name="arrow" size={24} />
            </div>
          </a>'''

print('Found target in \\n:', t.replace('\r\n', '\n') in c)
c=c.replace(t, r)
c=c.replace(t.replace('\r\n', '\n'), r.replace('\r\n', '\n'))
open('src/App.jsx','w',encoding='utf-8').write(c)

