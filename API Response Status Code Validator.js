function questionName(statusCode) {
  let result;

  switch (statusCode) {
    case 200:
      result = "PASS - OK: Request successful";
      break;
    case 201:
      result = "PASS - Created: Resource created successfully";
      break;
    case 301:
      result = "WARNING - Moved Permanently: URL has changed";
      break;
    case 400:
      result = "FAIL - Bad Request: Check request payload";
      break;
    case 401:
      result = "FAIL - Unauthorized: Check auth token";
      break;
    case 403:
      result = "FAIL - Forbidden: Insufficient permissions";
      break;
    case 404:
      result = "FAIL - Not Found: Check endpoint URL";
      break;
    case 500:
      result = "FAIL - Internal Server Error: Backend issue";
      break;
    default:
      result = "UNKNOWN - Unhandled status code";
  }

  return `Status Code : ${statusCode} Result : ${result}`;
}
