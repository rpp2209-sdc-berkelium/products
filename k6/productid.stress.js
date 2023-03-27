import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 3700,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 4000,
      maxVUs: 6000
    }
  }
}

export default function () {
  http.get(`http://localhost:8080/products/999889`);
}