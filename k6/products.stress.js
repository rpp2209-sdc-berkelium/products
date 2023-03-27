import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 600,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 2000,
      maxVUs: 4000
    }
  }
}

export default function () {
  http.get('http://localhost:8080/products?page=100&count=50');
}