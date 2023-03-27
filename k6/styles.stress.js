import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 3000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 3200,
      maxVUs: 5000
    }
  }
}

export default function () {
  http.get('http://localhost:8080/products/987698/styles');
}