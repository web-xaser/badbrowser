import badbrowser from '../src/lib/badbrowser';

describe('badbrowser init', () => {

  it('init badbrowser with custom useragent', () => {
    const userAgent = 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 9 Build/LMY48T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Safari/537.36';
    const bb = new badbrowser({ userAgent });
    expect(bb.userAgent).toBe(userAgent);
  });

  it('init badbrowser with current browser useragent', () => {
    const userAgent = window.navigator.userAgent;
    const bb = new badbrowser();
    expect(bb.userAgent).toBe(userAgent);
  })

});

describe('check badbrowser options fullscreen', () => {

  it('fullscreen', () => {
    const fullscreen = true;
    const bb = new badbrowser({ fullscreen });
    expect(bb.settings.fullscreen).toBe(fullscreen);
  });

});


describe('default supported browsers', () => {

  const userAgentsSupported = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/38.0',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.2; Trident/6.0; ARM; Touch; WPDesktop)',
    'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/26',
    'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/6.0.5 Safari/533.21.1',
    'Mozilla/5.0 (Linux; U; Android 4.3; de-de; Galaxy Nexus Build/JWR66Y) AppleWebKit/534.30 (KHTML, like Gecko) Version/10.0 Mobile Safari/534.30',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0'
  ];

  const userAgentsUnSupported = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/37.0',
    'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.2; Trident/6.0; ARM; Touch; WPDesktop)',
    'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14',
    'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    'Mozilla/5.0 (Linux; U; Android 4.3; de-de; Galaxy Nexus Build/JWR66Y) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/11.0'
  ];

  userAgentsSupported.forEach((userAgent) => {
    const bb = new badbrowser({ userAgent });
    const isSupported = bb.check();

    it(`support (${bb.version}>=${bb.minSupportVersion}) "${userAgent}"`, () => {
      expect(isSupported).toBe(true);
    });
  });

  userAgentsUnSupported.forEach((userAgent) => {
    const bb = new badbrowser({ userAgent });
    const isSupported = bb.check();

    it(`unsupport (${bb.version}<${bb.minSupportVersion}) "${userAgent}"`, () => {
      expect(isSupported).toBe(false);
    });
  });

});
