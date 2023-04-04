const http = require("http");

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

const allowedPaths = /^\/v2\/(time_entries\?external_reference_id=.+)$/;

const harvestApi = process.env.HARVEST_API || 'https://api.harvestapp.com/';

const harvestApiToken = process.env.HARVEST_TOKEN || '';
const harvestApiAccountId = process.env.HARVEST_ACCOUNT_ID || '';

const elgentosAuthorization = process.env.ELGENTOS_AUTHORIZATION || '';

const harvestHeaders = {
    "Authorization": `Bearer ${harvestApiToken}`,
    "Harvest-Account-Id": harvestApiAccountId,
    "User-Agent": "Elgentos Time Manager (info@elgentos.nl)"
};


const requestListener = async (req, res) => {
    const headers = req.headers;

    res.setHeader('Content-type', 'application/json');

    if (elgentosAuthorization && headers?.authorization !== elgentosAuthorization ) {
        res.writeHead(404);
        res.end('{}');
        return;
    }

    if (! req.url.match(allowedPaths)) {
        res.writeHead(403);
        res.end('{}');
        return;
    }

    const hvRes = await fetch(`${harvestApi}${req.url}`, {
        headers: harvestHeaders
    });

    const body = await hvRes.text();

    res.writeHead(hvRes.status);
    res.end(body);
};

const server = new http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}/`);
});


process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(0);
});
