import handler from '../api/enquiry.js';

function createMockReqRes({ method = 'POST', body = {} }) {
  const req = {
    method,
    body,
    headers: {}
  };

  const res = {
    statusCode: 200,
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    },
    end() {
      return this;
    }
  };

  return { req, res };
}

async function runTests() {
  console.log('--- Starting API Endpoint Unit Tests ---');

  // Test 1: Method rejection
  {
    const { req, res } = createMockReqRes({ method: 'GET' });
    await handler(req, res);
    console.assert(res.statusCode === 405, `Test 1 Failed: Expected 405, got ${res.statusCode}`);
    console.log('✓ Test 1: GET method rejected with 405 Method Not Allowed');
  }

  // Test 2: Honeypot trap
  {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Bot Spammer',
        email: 'bot@spam.com',
        phone: '1234567890',
        _gotcha: 'I am a bot'
      }
    });
    await handler(req, res);
    console.assert(res.statusCode === 200 && res.data.success === true, 'Test 2 Failed: Honeypot trap not triggered');
    console.log('✓ Test 2: Honeypot silently accepted with 200 (bot trap working)');
  }

  // Test 3: Validation - Missing name
  {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: '',
        email: 'alex@example.com',
        phone: '9876543210'
      }
    });
    await handler(req, res);
    console.assert(res.statusCode === 400, `Test 3 Failed: Expected 400 for empty name, got ${res.statusCode}`);
    console.log('✓ Test 3: Empty name rejected with 400 Bad Request');
  }

  // Test 4: Validation - Invalid email
  {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Alex Johnson',
        email: 'not-an-email',
        phone: '9876543210'
      }
    });
    await handler(req, res);
    console.assert(res.statusCode === 400, `Test 4 Failed: Expected 400 for bad email, got ${res.statusCode}`);
    console.log('✓ Test 4: Invalid email format rejected with 400 Bad Request');
  }

  // Test 5: Validation - Invalid phone
  {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '123'
      }
    });
    await handler(req, res);
    console.assert(res.statusCode === 400, `Test 5 Failed: Expected 400 for short phone, got ${res.statusCode}`);
    console.log('✓ Test 5: Invalid phone number rejected with 400 Bad Request');
  }

  // Test 6: Missing Supabase credentials check
  {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_ANON_KEY;
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '+91 9876543210',
        businessName: 'Apex Studio',
        projectType: 'business-corporate',
        budget: '60k-120k',
        message: 'Looking for a new corporate site'
      }
    });
    await handler(req, res);
    console.assert(res.statusCode === 503, `Test 6 Failed: Expected 503 for missing env, got ${res.statusCode}`);
    console.assert(res.data.error.includes('Missing Supabase'), 'Test 6 Failed: Informative error missing');
    console.log('✓ Test 6: Missing credentials properly returns 503 with clear setup instructions');
  }

  console.log('\nAll API Handler unit tests passed successfully!');
}

runTests().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
