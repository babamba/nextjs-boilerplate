import React from 'react';
import { getPagesSitemap } from 'lib/utils';

const DOMAIN = 'https://apick.kr';

const createSitemap = async () => {
    const getDate = new Date().toISOString();

    const pagesSitemap = await getPagesSitemap(DOMAIN, getDate);

    let addSitemap = '';
    if (pagesSitemap) {
        addSitemap += pagesSitemap;
    }

    const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset
		xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
		
		${addSitemap}
	</urlset>`;

    return generatedSitemap;
};

class Sitemap extends React.Component {
    static async getInitialProps({ res }) {
        const sitemap = await createSitemap();

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();
    }
}

export default Sitemap;
