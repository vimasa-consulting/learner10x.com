/**
 * Authentication System Test Script for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This script tests all authentication endpoints and security features
 */

const BASE_URL = 'http://localhost:3003';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'X7p!kM9qL2jR5tN8vB3mW6yZ4',
  firstName: 'John',
  lastName: 'Doe',
  acceptTerms: true,
  acceptPrivacy: true,
};

let authTokens = null;

// Helper function to make HTTP requests
async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    const data = await response.json();
    
    return {
      status: response.status,
      ok: response.ok,
      data,
    };
  } catch (error) {
    console.error(`Request failed for ${endpoint}:`, error.message);
    return {
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

// Test functions
async function testUserRegistration() {
  console.log('\n🔐 Testing User Registration...');
  
  const response = await makeRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(testUser),
  });

  if (response.ok && response.data.success) {
    console.log('✅ Registration successful');
    console.log(`   User ID: ${response.data.user.id}`);
    console.log(`   Email: ${response.data.user.email}`);
    console.log(`   Role: ${response.data.user.role}`);
    console.log(`   Email Verified: ${response.data.user.emailVerified}`);
    
    if (response.data.tokens) {
      authTokens = response.data.tokens;
      console.log('✅ JWT tokens received');
    }
    
    return true;
  } else {
    console.log('❌ Registration failed');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    return false;
  }
}

async function testUserLogin() {
  console.log('\n🔑 Testing User Login...');
  
  const loginData = {
    email: testUser.email,
    password: testUser.password,
    rememberMe: false,
  };

  const response = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
  });

  if (response.ok && response.data.success) {
    console.log('✅ Login successful');
    console.log(`   User ID: ${response.data.user.id}`);
    console.log(`   Email: ${response.data.user.email}`);
    console.log(`   Role: ${response.data.user.role}`);
    
    if (response.data.tokens) {
      authTokens = response.data.tokens;
      console.log('✅ JWT tokens updated');
    }
    
    return true;
  } else {
    console.log('❌ Login failed');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    return false;
  }
}

async function testProtectedRoute() {
  console.log('\n🛡️ Testing Protected Route (Profile)...');
  
  if (!authTokens) {
    console.log('❌ No auth tokens available');
    return false;
  }

  const response = await makeRequest('/api/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authTokens.accessToken}`,
    },
  });

  if (response.ok && response.data.success) {
    console.log('✅ Protected route access successful');
    console.log(`   User ID: ${response.data.user.id}`);
    console.log(`   Email: ${response.data.user.email}`);
    console.log(`   Role: ${response.data.user.role}`);
    console.log(`   Permissions: ${response.data.user.permissions.join(', ')}`);
    return true;
  } else {
    console.log('❌ Protected route access failed');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    return false;
  }
}

async function testUnauthorizedAccess() {
  console.log('\n🚫 Testing Unauthorized Access...');
  
  const response = await makeRequest('/api/auth/profile', {
    method: 'GET',
    // No authorization header
  });

  if (!response.ok && response.status === 401) {
    console.log('✅ Unauthorized access properly blocked');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    return true;
  } else {
    console.log('❌ Unauthorized access not properly blocked');
    console.log(`   Status: ${response.status}`);
    return false;
  }
}

async function testInvalidToken() {
  console.log('\n🔒 Testing Invalid Token...');
  
  const response = await makeRequest('/api/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer invalid-token-here',
    },
  });

  if (!response.ok && response.status === 401) {
    console.log('✅ Invalid token properly rejected');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    return true;
  } else {
    console.log('❌ Invalid token not properly rejected');
    console.log(`   Status: ${response.status}`);
    return false;
  }
}

async function testUserLogout() {
  console.log('\n🚪 Testing User Logout...');
  
  if (!authTokens) {
    console.log('❌ No auth tokens available');
    return false;
  }

  const response = await makeRequest('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authTokens.accessToken}`,
    },
    body: JSON.stringify({}),
  });

  if (response.ok && response.data.success) {
    console.log('✅ Logout successful');
    console.log(`   Message: ${response.data.message}`);
    console.log(`   Sessions destroyed: ${response.data.sessionsDestroyed}`);
    
    // Clear tokens
    authTokens = null;
    return true;
  } else {
    console.log('❌ Logout failed');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    return false;
  }
}

async function testLogoutAll() {
  console.log('\n🚪🚪 Testing Logout All Devices...');
  
  // First login again to get tokens
  const loginResponse = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: testUser.email,
      password: testUser.password,
      rememberMe: false,
    }),
  });

  if (!loginResponse.ok || !loginResponse.data.success) {
    console.log('❌ Could not login for logout all test');
    console.log(`   Status: ${loginResponse.status}`);
    console.log(`   Message: ${loginResponse.data.message || 'Unknown error'}`);
    return false;
  }

  authTokens = loginResponse.data.tokens;

  const response = await makeRequest('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authTokens.accessToken}`,
    },
    body: JSON.stringify({ logoutAll: true }),
  });

  if (response.ok && response.data.success) {
    console.log('✅ Logout all devices successful');
    console.log(`   Message: ${response.data.message}`);
    console.log(`   Sessions destroyed: ${response.data.sessionsDestroyed}`);
    
    authTokens = null;
    return true;
  } else {
    console.log('❌ Logout all devices failed');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message || 'Unknown error'}`);
    return false;
  }
}

async function testPasswordValidation() {
  console.log('\n🔐 Testing Password Validation...');
  
  const weakPasswordUser = {
    ...testUser,
    email: 'weak@example.com',
    password: '123', // Weak password
  };

  const response = await makeRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(weakPasswordUser),
  });

  if (!response.ok && response.status === 400) {
    console.log('✅ Weak password properly rejected');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    if (response.data.errors) {
      console.log(`   Errors: ${response.data.errors.join(', ')}`);
    }
    return true;
  } else {
    console.log('❌ Weak password not properly rejected');
    console.log(`   Status: ${response.status}`);
    return false;
  }
}

async function testDuplicateRegistration() {
  console.log('\n👥 Testing Duplicate Registration...');
  
  const response = await makeRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(testUser), // Same user as before
  });

  if (!response.ok && response.status === 409) {
    console.log('✅ Duplicate registration properly blocked');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    return true;
  } else {
    console.log('❌ Duplicate registration not properly blocked');
    console.log(`   Status: ${response.status}`);
    return false;
  }
}

async function testInvalidLogin() {
  console.log('\n🔑 Testing Invalid Login...');
  
  const invalidLoginData = {
    email: testUser.email,
    password: 'WrongPassword123!',
  };

  const response = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(invalidLoginData),
  });

  if (!response.ok && response.status === 401) {
    console.log('✅ Invalid login properly rejected');
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${response.data.message}`);
    return true;
  } else {
    console.log('❌ Invalid login not properly rejected');
    console.log(`   Status: ${response.status}`);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🧪 Starting Authentication System Tests');
  console.log('=====================================');

  const tests = [
    { name: 'User Registration', fn: testUserRegistration },
    { name: 'Password Validation', fn: testPasswordValidation },
    { name: 'Duplicate Registration', fn: testDuplicateRegistration },
    { name: 'User Login', fn: testUserLogin },
    { name: 'Invalid Login', fn: testInvalidLogin },
    { name: 'Protected Route Access', fn: testProtectedRoute },
    { name: 'Unauthorized Access', fn: testUnauthorizedAccess },
    { name: 'Invalid Token', fn: testInvalidToken },
    { name: 'User Logout', fn: testUserLogout },
    { name: 'Logout All Devices', fn: testLogoutAll },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(`❌ Test "${test.name}" threw an error:`, error.message);
      failed++;
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Test Results');
  console.log('===============');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Authentication system is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the implementation.');
  }
}

// Run tests if this script is executed directly
if (typeof window === 'undefined') {
  runAllTests().catch(console.error);
}

module.exports = {
  runAllTests,
  testUserRegistration,
  testUserLogin,
  testProtectedRoute,
  testUserLogout,
};
