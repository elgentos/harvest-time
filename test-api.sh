#!/bin/bash

# Test script for the Harvest Time Proxy API

echo "Testing Harvest Time Proxy API - ADD THE AUTH HEADER FROM YOUR .ENV FILE ON THIS: AUTHHIER "
echo "================================"
echo ""

# Test 1: Without authorization (should fail with 404 if ELGENTOS_AUTHORIZATION is set)
echo "Test 1: Request without authorization header"
curl -v "http://localhost:3000/api/v2/time_entries?external_reference_id=highlite%2Fmagento2%23173"
echo -e "\n\n"

# Test 2: With correct authorization
echo "Test 2: Request with correct authorization header"
curl -v -H "Authorization: AUTHHIER" "http://localhost:3000/api/v2/time_entries?external_reference_id=highlite%2Fmagento2%23173"
echo -e "\n\n"

# Test 4: Invalid path (should return 403)
echo "Test 4: Invalid path (should return 403)"
curl -v -H "Authorization: AUTHHIER" "http://localhost:3000/api/v2/invalid_endpoint?external_reference_id=test"
echo -e "\n\n"

# Test 5: Missing external_reference_id (should return 403)
echo "Test 5: Missing external_reference_id (should return 403)"
curl -v -H "Authorization: AUTHHIER " "http://localhost:3000/api/v2/time_entries"
echo -e "\n\n"

