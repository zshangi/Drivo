const fs = require('fs');

// Function to generate the content for the robots.txt file
function generateRobotsTxt() {
  const robotsTxtContent = `
User-agent: *
Disallow: /path-to-private-page/
Disallow: /another-private-page/
# Add more disallowed paths if needed

Sitemap: https://drivo.ae.com/sitemap.xml
# Replace with the URL of your sitemap
`;

  const robotsTxtPath = 'public/robots.txt'; // Set the path to the robots.txt file

  fs.writeFile(robotsTxtPath, robotsTxtContent, (err) => {
    if (err) {
      console.error('Error writing robots.txt:', err);
    } else {
      console.log('robots.txt generated/updated successfully.');
    }
  });
}

// Run the function to generate/update the robots.txt file
generateRobotsTxt();
