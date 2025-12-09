import { NextResponse } from 'next/server';

const harvestApi = process.env.HARVEST_API || 'https://api.harvestapp.com/';
const harvestApiToken = process.env.HARVEST_TOKEN || '';
const harvestApiAccountId = process.env.HARVEST_ACCOUNT_ID || '';
const elgentosAuthorization = process.env.ELGENTOS_AUTHORIZATION || '';

const harvestHeaders = {
  "Authorization": `Bearer ${harvestApiToken}`,
  "Harvest-Account-Id": harvestApiAccountId,
  "User-Agent": "Elgentos Time Manager (info@elgentos.nl)"
};

export async function GET(request, { params }) {
  // Get the full path from the URL
  const { searchParams } = new URL(request.url);
  const path = params.path.join('/');
  const queryString = searchParams.toString();
  const fullPath = `/v2/${path}${queryString ? `?${queryString}` : ''}`;

  console.log('Request details:', {
    path,
    queryString,
    fullPath,
    authHeader: request.headers.get('authorization'),
    externalRefId: searchParams.get('external_reference_id')
  });

  // Check authorization if configured
  const authHeader = request.headers.get('authorization');
  if (elgentosAuthorization && authHeader !== elgentosAuthorization) {
    console.log('Authorization failed:', { expected: elgentosAuthorization, received: authHeader });
    return NextResponse.json({}, { status: 404 });
  }

  // Validate the path is time_entries and has external_reference_id parameter
  if (path !== 'time_entries') {
    console.log('Invalid path:', path);
    return NextResponse.json({}, { status: 403 });
  }

  if (!searchParams.get('external_reference_id')) {
    console.log('Missing external_reference_id parameter');
    return NextResponse.json({}, { status: 403 });
  }

  try {
    // Proxy the request to Harvest API
    const harvestUrl = `${harvestApi}${fullPath}`;
    console.log('Proxying to:', harvestUrl);

    const hvRes = await fetch(harvestUrl, {
      headers: harvestHeaders
    });

    const body = await hvRes.text();
    console.log('Harvest API response status:', hvRes.status);

    // Return the response from Harvest API
    return new NextResponse(body, {
      status: hvRes.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error proxying to Harvest API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

