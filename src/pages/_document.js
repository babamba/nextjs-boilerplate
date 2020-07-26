import Document, { Html, Head as HeadDocument, Main, NextScript } from 'next/document';
import Head from 'next/head';
import { ServerStyleSheet, createGlobalStyle } from 'styled-components';

// https://www.johanbleuzen.fr/blog/next-remove-clientside-javascript

const GA_TRACKING_ID = '';

const GlobalStyle = createGlobalStyle`
    html,
    body {
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }
`;

class HeadProduction extends HeadDocument {
    render() {
        const { head } = this.context._documentProps;
        const children = this.props.children;

        return(
            <Head>
                <GlobalStyle/>
                {children}
                {head}
            </Head>
        );
    }
}

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="kr">
                <HeadProduction>
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"/>
                    
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${GA_TRACKING_ID}', {
								page_path: window.location.pathname,
							});
						`,
                        }}
                    />
                </HeadProduction>
                
                <HeadDocument/>
                <body>
                    <Main/>
                    {false && <NextScript />}
                </body>
            </Html>
        );
    }
}
