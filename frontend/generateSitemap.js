const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const { Readable } = require('stream');

// Define your website's URLs (replace with your actual URLs)
const pages = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/products', changefreq: 'monthly', priority: 0.99 },
    { url: '/productvehicle', changefreq: 'monthly', priority: 0.9 },
  
    { url: '/product', changefreq: 'monthly', priority: 0.8 },
    { url: '/cart', changefreq: 'monthly', priority: 0.7 },
    { url: '/service', changefreq: 'monthly', priority: 0.7 },
    { url: '/servicecenter', changefreq: 'monthly', priority: 0.7 },
    { url: '/order', changefreq: 'monthly', priority: 0.7 },
    { url: '/payment', changefreq: 'monthly', priority: 0.7 },
    { url: '/registerotpscreen', changefreq: 'monthly', priority: 0.7 },
    { url: '/profile', changefreq: 'monthly', priority: 0.7 },
    { url: '/garage', changefreq: 'monthly', priority: 0.7 },
    { url: '/location', changefreq: 'monthly', priority: 0.7 },
    { url: '/my', changefreq: 'monthly', priority: 0.7 },
];

// Function to generate the sitemap
async function generateSitemap() {
  const links = pages.map((page) => ({
    url: page.url,
    changefreq: page.changefreq,
    priority: page.priority,
  }));

  const stream = new SitemapStream({ hostname: 'https://www.yourwebsite.com' }); // Replace with your website's hostname
  const pipeline = Readable.from(links).pipe(stream);

  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  const writeStream = fs.createWriteStream(sitemapPath);
  const gzipStream = createGzip();

  pipeline.pipe(writeStream).on('error', (err) => {
    throw err;
  });

  // If you want to generate a gzipped version of the sitemap (recommended)
  pipeline.pipe(gzipStream).pipe(fs.createWriteStream(sitemapPath + '.gz')).on('error', (err) => {
    throw err;
  });

  await streamToPromise(pipeline);
  console.log('Sitemap generated successfully.');
}

// Run the sitemap generation
generateSitemap();

